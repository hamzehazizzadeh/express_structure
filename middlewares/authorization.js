const jwt = require("jsonwebtoken");

const { errorMessage } = require("../utils");

exports.verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (_) {
    errorMessage("توکن اعتبارسنجی ارسالی نامعتبر است", 401);
  }
};

exports.authenticated = (roles) => {
  return async (req, res, next) => {
    const authHeader = req.get("Authorization");

    try {
      if (!authHeader) errorMessage("لطفا توکن اعتبارسنجی را ارسال کنید", 401);

      const token = authHeader.split(" ")[1];

      const decodedToken = this.verifyToken(token);

      if (!decodedToken)
        errorMessage("توکن اعتبارسنجی ارسالی نامعتبر است", 401);

      if (!roles.includes(decodedToken.role))
        errorMessage("شما مجوز کافی برای این درخواست ندارید", 403);

      const user = {
        id: decodedToken.uid,
        role: decodedToken.role,
      };

      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  };
};
