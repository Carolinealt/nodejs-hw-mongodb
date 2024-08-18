import createHttpError from 'http-errors';

export const notFoundHandler = async (req, res, next) => {
  console.log(req);

  res.status(404).json({ status: 404, message: 'Page not found' });
};
