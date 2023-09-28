const { resMessage } = require("../utils");

exports.errorHandler = (error, req, res, next) => {
  const status = error.path ? 422 : error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  resMessage(res, status, message, data);
};
