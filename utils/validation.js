exports.mobilePhoneNumberRegex = (phoneNumber) => {
  if (/^(\+98|0)?9\d{9}$/.test(phoneNumber) && phoneNumber.length === 11) {
    return true;
  } else {
    return false;
  }
};

exports.userValidation = Yup.object().shape({
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
