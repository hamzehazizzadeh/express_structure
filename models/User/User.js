const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { errorMessage } = require("../../utils");
const { userValidation } = require("../../utils/validation");

const mongoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 255,
    },
    nationalNumber: {
      type: String,
      required: true,
      unique: [true, "email must be unique"],
      minlength: 10,
      maxlength: 10,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 11,
      maxlength: 11,
    },
    role: {
      type: String,
      enum: ["ADMIN", "CITY", "CENTER", "EXPERT"],
      require: true,
    },
    isConfirm: {
      type: Boolean,
      default: true,
      require: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

mongoSchema.statics.schemaValidation = function (body) {
  return userValidation.validate(body);
};

mongoSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

mongoSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyValue.nationalNumber) {
      errorMessage(
        `کاربری با کد ملی ${error.keyValue.nationalNumber} قبلا ثبت نام کرده است`,
        422
      );
    } else if (error.keyValue.phoneNumber) {
      errorMessage(
        `کاربری با شماره موبایل ${error.keyValue.phoneNumber} قبلا ثبت نام کرده است`,
        422
      );
    } else if (error.keyValue.userName) {
      errorMessage(`کاربری با این نام کاربری قبلا ثبت نام کرده است`, 422);
    } else {
      next();
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("User", mongoSchema);
