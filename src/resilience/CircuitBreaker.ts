export class CircuitBreaker {
  private failures = 0;
  private nextAttempt = Date.now();
  private readonly threshold = 5;
  private readonly resetTimeout = 60_000;

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (Date.now() < this.nextAttempt) {
      throw new Error("Circuit is open");
    }

    try {
      const result = await operation();
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;

      if (this.failures >= this.threshold) {
        this.nextAttempt = Date.now() + this.resetTimeout;
      }

      throw error;
    }
  }
}
