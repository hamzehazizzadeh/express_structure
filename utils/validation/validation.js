const Yup = require("yup");

const { userRoleItems } = require("../enum");

// Phone Number
const phoneNumberRegex = /^09\d{9}$/;

exports.isValidPhoneNumber = (phoneNumber) => {
  return phoneNumberRegex.test(phoneNumber);
};

// Email
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.isValidEmail = (email) => {
  return emailRegex.test(email);
};

// Text
const persianRegex = /^[\u0600-\u06FF\u200C\u200B\s]+$/;
const englishRegex = /^[A-Za-z\s]+$/;

// Validation
const firstName = Yup.string()
  .required("نام الزامی است")
  .max(255, "نام نمی تواند بیشتر از 255 کاراکتر باشد");
const lastName = Yup.string()
  .required("نام خانوادگی الزامی است")
  .max(255, "نام خانوادگی نمی تواند بیشتر از 255 کاراکتر باشد");
const userName = Yup.string()
  .required("نام کاربری الزامی است")
  .max(255, "نام کاربری نمی تواند بیشتر از 255 کاراکتر باشد");
const nationalNumber = Yup.string()
  .required("کد ملی الزامی است")
  .min(10, "کد ملی نمی تواند کمتر از 10 کاراکتر باشد")
  .max(10, "کد ملی نمی تواند بیشتر از 10 کاراکتر باشد");
const phoneNumber = Yup.string()
  .required("شماره موبایل الزامی است")
  .min(11, "شماره موبایل نمی تواند کمتر از 11 کاراکتر باشد")
  .max(11, "شماره موبایل نمی تواند بیشتر از 11 کاراکتر باشد")
  .matches(phoneNumberRegex, "شماره موبایل وارد شده معتبر نیست");
const role = Yup.mixed().oneOf(userRoleItems, "نقش معتبر نیست");
const password = Yup.string()
  .required("کلمه عبور الزامی است")
  .min(6, "کلمه عبور نمی تواند کمتر از 6 کاراکتر باشد")
  .max(255, "کلمه عبور نمی تواند بیشتر از 255 کاراکتر باشد");
const confirmPassword = Yup.string()
  .required("تکرار کلمه عبور الزامی است")
  .oneOf(
    [Yup.ref("password"), null],
    "کلمه عبور و تکرار کلمه عبور یکسان نیستند"
  );

// Create User
exports.userValidation = Yup.object().shape({
  firstName,
  lastName,
  userName,
  nationalNumber,
  phoneNumber,
  role,
  password,
  confirmPassword,
});
