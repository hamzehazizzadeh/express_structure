const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User/User");
const { errorMessage, resMessage } = require("../../utils");

exports.handleSignIn = async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      errorMessage("نام کاربری یا رمز عبور اشتباه میباشد", 422);
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      errorMessage("نام کاربری یا رمز عبور اشتباه میباشد", 422);
    }

    if (!user.isActive) {
      errorMessage("حساب کاربری شما غیر فعال است", 422);
    }

    const token = jwt.sign(
      {
        uid: user._id.toString(),
        userName: user.userName,
        nationalNumber: user.nationalNumber,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    resMessage(res, 200, "ورود به حساب کاربری با موفقیت انجام شد", {
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.handleSignUp = async (req, res, next) => {
  try {
    await User.schemaValidation(req.body);
    const {
      firstName,
      lastName,
      userName,
      nationalNumber,
      phoneNumber,
      role,
      password,
    } = req.body;

    await User.create({
      firstName,
      lastName,
      userName,
      nationalNumber,
      phoneNumber,
      role,
      password,
    });

    resMessage(res, 200, "حساب کاربری با موفقیت ایجاد شد");
  } catch (err) {
    next(err);
  }
};
