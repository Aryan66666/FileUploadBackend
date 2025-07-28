export class AppError extends Error {
  constructor(message?: string, public statusCode?: number) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}