class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

// class AppError extends Error {
//     public statusCode: number;
//     public status: string;

//     constructor(message: string, statusCode = 500) {
//       super(message);
//       this.statusCode = statusCode;
//       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

//       Error.captureStackTrace(this, this.constructor);
//     }
//   }

//   export default AppError;
