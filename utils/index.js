const jwt = require("jsonwebtoken");
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

exports.resMessageWithPagination = (
  pageNumber,
  numberOfItem,
  itemsCount,
  result
) => {
  return {
    currentPage: pageNumber,
    allPagesCount: Math.ceil(numberOfItem / itemsCount),
    nextPage: pageNumber + 1,
    previousPage: pageNumber - 1,
    hasNextPage: itemsCount * pageNumber < numberOfItem,
    hasPreviousPage: pageNumber > 1,
    ...result,
  };
};
//* End Response Message

//* Start Swagger
exports.swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ECommerce API with Swagger",
      version: "1.0.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: [
    "./routes/adminRoutes/adminRoutes.js",
    "./routes/authRoutes/authRoutes.js",
    "./routes/buyerRoutes/buyerRoutes.js",
    "./routes/publicRoutes/publicRoutes.js",
    "./routes/userRoutes/userRoutes.js",
  ],
};
//* End Swagger

//* Start Date
exports.convertDateFormat = (date, format = "D MM YYYY", locale = "fa") => {
  return moment(date).locale(locale).format(format);
};
//* End Date

//* Start Token
exports.generateToken = (user) => {
  return jwt.sign(
    {
      uid: user._id.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
//* End Token
