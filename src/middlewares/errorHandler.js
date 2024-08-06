import { isHttpError } from 'http-errors';

export const errorHandler = async (err, req, res, next) => {
  if (isHttpError(err) === true) {
    res.status(err.status).send({
      status: err.status,
      message: err.message,
    });
  }

  console.error(err);

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
