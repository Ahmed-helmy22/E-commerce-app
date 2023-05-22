export class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOpretional = true;
    // Error.captureStackTrace(this, this.constructor);
  }
}
