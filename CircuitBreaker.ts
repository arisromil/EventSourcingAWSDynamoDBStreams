class CircuitBreaker {
  private failures: number = 0;
  private nextAttempt: number = Date.now();
  private readonly threshold: number = 5;
  private readonly resetTimeout: number = 60000; // 1 minute
  
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
