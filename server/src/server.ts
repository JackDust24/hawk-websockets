import express from 'express';
import { createServer } from 'http';
import apiRouter from './api';
import { setupWebSockets } from './websockets';

const port = process.env.PORT || 8000;
const app = express();

// api
app.use(express.json());
app.use('/api', apiRouter);

// websockets
const server = createServer(app);
setupWebSockets(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
