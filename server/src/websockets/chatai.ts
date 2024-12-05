import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import { webSocketRateLimiter } from '../utils/rateLimiter';
import dotenv from 'dotenv';

dotenv.config();

type AiClient = {
  [key: string]: WebSocket;
};

type AiTypesDef = {
  AI_CHAT_MESSAGE: string;
};

type AiJsonMessage = {
  type: string;
  data: any;
};

export const aiClients: AiClient = {};

const aiTypesDef: AiTypesDef = {
  AI_CHAT_MESSAGE: 'ai_chat',
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const setupAiChatWebSocket = (server: Server) => {
  const aiWss = new WebSocketServer({
    server,
    path: '/ai-chat',
  });

  const cleanupInterval = setInterval(() => {
    webSocketRateLimiter.cleanupClients();
  }, 60 * 60 * 1000);

  aiWss.on('connection', (connection, req) => {
    const aiChatId = uuidv4();

    const clientIp = req.socket.remoteAddress || aiChatId;

    const clientLimiter = webSocketRateLimiter.registerClient(
      clientIp,
      connection
    );

    if (clientLimiter) {
      clientLimiter.ws = connection;
    }
    aiClients[aiChatId] = connection;

    connection.on('message', async (message) => {
      try {
        const dataFromClient = JSON.parse(message.toString());
        // Rate limit check
        const isRateLimited = await webSocketRateLimiter.checkRateLimit(
          clientIp
        );

        if (!isRateLimited) return;

        // Existing message handling logic...
        await handleAiChatMessage(message, connection);
      } catch (error) {
        console.error('AI Chat setupAiChatWebSocket Error:', error);
        connection.send(
          JSON.stringify({
            type: 'error',
            data: { message: 'An error occurred processing your request' },
          })
        );
      }
    });

    connection.on('close', () => {
      delete aiClients[aiChatId];
    });
  });
};

async function handleAiChatMessage(message: any, connection: WebSocket) {
  try {
    const dataFromClient = JSON.parse(message.toString());
    if (dataFromClient.type !== aiTypesDef.AI_CHAT_MESSAGE) {
      throw new Error('Invalid message type');
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for a loyalty program.',
        },
        {
          role: 'user',
          content: dataFromClient.message,
        },
      ],
      max_tokens: 150,
    });

    // Prepare response
    const aiResponse: AiJsonMessage = {
      type: aiTypesDef.AI_CHAT_MESSAGE,
      data: {
        message: completion.choices[0].message.content,
        timestamp: new Date().toISOString(),
      },
    };

    connection.send(JSON.stringify(aiResponse));
  } catch (error) {
    console.error('AI Chat handleAiChatMessage Error:', error);

    // Send error response
    const errorResponse: AiJsonMessage = {
      type: aiTypesDef.AI_CHAT_MESSAGE,
      data: {
        error: 'Failed to process your message',
        timestamp: new Date().toISOString(),
      },
    };

    connection.send(JSON.stringify(errorResponse));
  }
}

export default setupAiChatWebSocket;
