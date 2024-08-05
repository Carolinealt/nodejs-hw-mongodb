import { HttpError } from 'http-errors';

export const notFoundHandler = async (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(404).json({
      status: err.status,
      message: err.name,
      data: err,
    });
  }
  res.status(404).json({ message: 'Page not found' });
};
