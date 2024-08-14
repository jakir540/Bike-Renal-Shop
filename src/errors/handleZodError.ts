import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/Error';

const handleZodError = (err: ZodError) => {
  const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Error Occured!',
    errorSource,
    stack: err?.stack,
  };
};

export default handleZodError;
