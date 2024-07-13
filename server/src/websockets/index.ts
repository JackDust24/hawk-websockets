import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { v4 as uuidv4 } from 'uuid';

type Client = {
  [key: string]: WebSocket;
};

type User = {
  [key: string]: any;
};

type TypesDef = {
  USER_EVENT: string;
  CONTENT_CHANGE: string;
};

type JsonMessage = {
  type: string;
  data: any;
};

type Content = {
  user: string;
  content: string;
};

export const clients: Client = {};
export const users: User = {};
let editorContent: Content[] = [];
let userActivity: string[] = [];
let user: string | null = null;

// Event types
const typesDef: TypesDef = {
  USER_EVENT: 'user',
  CONTENT_CHANGE: 'content',
};

export const setupWebSockets = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (connection) => {
    const userId = uuidv4();
    clients[userId] = connection;

    connection.on('message', (message) => {
      handleMessage(message, userId);
    });

    connection.on('close', () => {
      handleDisconnect(userId);
    });
  });
};

export function broadcastMessage(json: JsonMessage): void {
  const data = JSON.stringify(json);

  for (let userId in clients) {
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

export function handleMessage(message: any, userId: string) {
  const dataFromClient = JSON.parse(message.toString());
  const json: JsonMessage = { type: dataFromClient.type, data: {} };
  console.log(json, userId);

  if (dataFromClient.type === typesDef.USER_EVENT) {
    console.log(`${dataFromClient.username} joined the chat`);

    users[userId] = dataFromClient;
    userActivity.push(`${dataFromClient.username} joined the chat`);
    json.data = { users, userActivity };
  } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    editorContent.push({
      user: dataFromClient.username,
      content: dataFromClient.content,
    });
    json.data = { editorContent, userActivity, user };
  }

  broadcastMessage(json);
}

export function handleDisconnect(userId: string) {
  const json: JsonMessage = { type: typesDef.USER_EVENT, data: {} };

  const username = users[userId]?.username || userId;
  userActivity.push(`${username} left the chat`);
  json.data = { users, userActivity };

  delete clients[userId];
  delete users[userId];

  broadcastMessage(json);
}
