import { WebSocket } from 'ws';
import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

type RateLimitedClient = {
  ws: WebSocket;
  limiter: RateLimiterMemory;
  totalRequests: number;
  lastResetTime: number;
};

class WebSocketRateLimiter {
  private clients: Map<string, RateLimitedClient> = new Map();

  // Configurable rate limit settings
  private readonly MAX_REQUESTS_PER_MINUTE = 10;
  private readonly MAX_TOTAL_REQUESTS_PER_HOUR = 100;
  private readonly TOTAL_REQUESTS_WINDOW_MS = 60 * 60 * 1000; // 1 hour

  registerClient(clientId: string, ws: WebSocket): RateLimitedClient {
    let clientLimiter = this.clients.get(clientId);

    // Create limiter if not exists
    if (!clientLimiter) {
      clientLimiter = this.createClientLimiter(clientId);
    }

    // Update the WebSocket reference
    clientLimiter.ws = ws;

    return clientLimiter;
  }

  // Method to get a client (read-only)
  getClient(clientId: string): RateLimitedClient | undefined {
    return this.clients.get(clientId);
  }

  // Method to remove a client
  removeClient(clientId: string): void {
    this.clients.delete(clientId);
  }

  async checkRateLimit(clientId: string): Promise<boolean> {
    let clientLimiter = this.clients.get(clientId);

    // Create limiter if not exists
    if (!clientLimiter) {
      clientLimiter = this.createClientLimiter(clientId);
    }

    try {
      // Check per-minute rate limit
      await clientLimiter.limiter.consume(clientId, 1);

      // Check total requests per hour
      this.checkTotalRequestsLimit(clientLimiter);

      return true;
    } catch (rejRes) {
      this.sendRateLimitMessage(clientLimiter.ws);
      return false;
    }
  }

  private createClientLimiter(clientId: string): RateLimitedClient {
    const limiter = new RateLimiterMemory({
      points: this.MAX_REQUESTS_PER_MINUTE,
      duration: 60, // 1 minute
    });

    const clientLimiter: RateLimitedClient = {
      ws: null!, // Will be set when actually connecting
      limiter,
      totalRequests: 0,
      lastResetTime: Date.now(),
    };

    this.clients.set(clientId, clientLimiter);
    return clientLimiter;
  }

  private checkTotalRequestsLimit(client: RateLimitedClient) {
    const now = Date.now();

    // Reset total requests if an hour has passed
    if (now - client.lastResetTime > this.TOTAL_REQUESTS_WINDOW_MS) {
      client.totalRequests = 0;
      client.lastResetTime = now;
    }

    // Increment and check total requests
    client.totalRequests++;
    if (client.totalRequests > this.MAX_TOTAL_REQUESTS_PER_HOUR) {
      throw new Error('Hourly request limit exceeded');
    }
  }

  // Send rate limit exceeded message
  private sendRateLimitMessage(ws: WebSocket) {
    const rateLimitMessage = JSON.stringify({
      type: 'rate_limit_error',
      data: {
        message: 'Too many requests. Please wait before sending more messages.',
        retryAfter: 60, // seconds
      },
    });

    ws.send(rateLimitMessage);
  }

  // Remove old or inactive clients
  cleanupClients() {
    const now = Date.now();
    for (const [clientId, client] of this.clients.entries()) {
      // Remove clients inactive for more than 2 hours
      if (now - client.lastResetTime > 2 * 60 * 60 * 1000) {
        this.clients.delete(clientId);
      }
    }
  }
}

export const webSocketRateLimiter = new WebSocketRateLimiter();
