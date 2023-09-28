const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Yup = require("yup");

const { errorMessage } = require("../../utils");

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
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .required("نام الزامی می باشد")
      .max(255, "نام نمی تواند بیشتر از 255 کاراکتر باشد"),
    lastName: Yup.string()
      .required("نام خانوادگی الزامی می باشد")
      .max(255, "نام خانوادگی نمی تواند بیشتر از 255 کاراکتر باشد"),
    userName: Yup.string()
      .required("نام کاربری الزامی می باشد")
      .max(255, "نام کاربری نمی تواند بیشتر از 255 کاراکتر باشد"),
    nationalNumber: Yup.string()
      .required("کد ملی الزامی می باشد")
      .min(10, "کد ملی نمی تواند کمتر از 10 کاراکتر باشد")
      .max(10, "کد ملی نمی تواند بیشتر از 10 کاراکتر باشد"),
    phoneNumber: Yup.string()
      .required("شماره موبایل الزامی می باشد")
      .min(11, "شماره موبایل نمی تواند کمتر از 11 کاراکتر باشد")
      .max(11, "شماره موبایل نمی تواند بیشتر از 11 کاراکتر باشد")
      .matches(/^(\+98|0)?9\d{9}$/, "شماره موبایل وارد شده معتبر نمی باشد"),
    role: Yup.mixed().oneOf(["CITY", "CENTER", "EXPERT"], "نقش معتبر نمی باشد"),
    password: Yup.string()
      .required("کلمه عبور الزامی می باشد")
      .min(6, "کلمه عبور نمی تواند کمتر از 6 کاراکتر باشد")
      .max(255, "کلمه عبور نمی تواند بیشتر از 255 کاراکتر باشد"),
    confirmPassword: Yup.string()
      .required("تکرار کلمه عبور الزامی می باشد")
      .oneOf(
        [Yup.ref("password"), null],
        "کلمه عبور و تکرار کلمه عبور یکسان نیستند"
      ),
  });

  return schema.validate(body);
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
