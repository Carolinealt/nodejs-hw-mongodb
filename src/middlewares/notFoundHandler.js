import createHttpError from 'http-errors';

export const notFoundHandler = async (req, res, next) => {
  next(new createHttpError(404, { message: 'Page not found' }));
};
