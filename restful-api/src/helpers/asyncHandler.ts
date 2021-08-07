import { Request, Response, NextFunction } from 'express';

/**
 * Function to handle async errors as a middleware
 * @param {Function} cb
 * @returns null
 * the function will execute the callback passed if theres no errors
 * or will pass the error to next() nad express will handle the error
 */
function asyncHandler(cb: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log('Error: ', error);
      next(error);
    }
  };
}

export default asyncHandler;
