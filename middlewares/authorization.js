const jwt = require("jsonwebtoken");

exports.authorization = (req, res, next) => {
  const authHeader = req.get("Authorization");

  try {
    if (!authHeader) {
      const error = new Error("لطفا توکن اعتبارسنجی را ارسال کنید");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("توکن اعتبارسنجی ارسالی نامعتبر است");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.uid;
    req.userName = decodedToken.userName;
    req.userNationalNumber = decodedToken.nationalNumber;
    req.userPhoneNumber = decodedToken.phoneNumber;
    req.userRole = decodedToken.role;

    next();
  } catch (err) {
    next(err);
  }
};
