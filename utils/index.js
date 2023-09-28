const moment = require("jalali-moment");

//* Start Math
exports.generateRandomHash = (hashLength) => {
  const result = [];
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < hashLength; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

exports.generateRandomNumber = (sum = 1000, mult = 9000) => {
  return Math.floor(sum + Math.random() * mult);
};
//* End Math

//* Start Response Message
exports.errorMessage = (message, statusCode, data) => {
  const error = new Error(message);
  error.statusCode = statusCode || 422;
  if (data) {
    error.data = data;
  }
  throw error;
};

exports.resMessage = (res, status, message, result) => {
  res.status(status).json({
    resultMessage: message,
    resultCode: status,
    result: result,
  });
};
//* End Response Message

//* Start Swagger
exports.swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: ["./routes/authRoutes/authRoutes.js"],
};
//* End Swagger

//* Start Date
exports.convertDateFormat = (date, locale = "fa", format = "D MM YYYY") => {
  return moment(date).locale(locale).format(format);
};
//* End Date
