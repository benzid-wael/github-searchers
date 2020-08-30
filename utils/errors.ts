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
    this.name = "MethodNotAllowed";
    this.stack = (<any> new Error()).stack;
  }
}


export class InvalidPayload extends ApiError {
  static statusCode = 400;

  constructor(public message: string) {
    super(message);
    this.name = "InvalidPayload";
    this.stack = (<any> new Error()).stack;
  }
}


export class PreconditionFailed extends ApiError {
  static statusCode = 412;

  constructor(public message: string) {
    super(message);
    this.name = "PreconditionFailed";
    this.stack = (<any> new Error()).stack;
  }
}


export class RateLimitReached extends ApiError {
  static statusCode = 429;

  constructor(public message: string) {
    super(message);
    this.name = "PreconditionFailed";
    this.stack = (<any> new Error()).stack;
  }
}