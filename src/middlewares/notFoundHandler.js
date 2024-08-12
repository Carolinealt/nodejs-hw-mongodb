import createHttpError from 'http-errors';

export const notFoundHandler = async (req, res, next) => {
  res.status(404).json({ message: 'Page not found' });
};
