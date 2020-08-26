export class ApiError extends Error {
  static statusCode = 500;

  constructor(public message: string) {
    super(message);
    this.name = "ApiError";
    this.stack = (<any> new Error()).stack;
  }

  get status(): number {
    // @ts-ignore
    return this.constructor.statusCode;
  }
}


export class MethodNotAllowed extends ApiError {
  static statusCode = 405;

  constructor(public message: string) {
    super(message);
    this.name = "ApiError";
    this.stack = (<any> new Error()).stack;
  }
}


export class InvalidPayload extends ApiError {
  static statusCode = 400;

  constructor(public message: string) {
    super(message);
    this.name = "ApiError";
    this.stack = (<any> new Error()).stack;
  }
}