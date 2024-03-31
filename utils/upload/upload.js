const multer = require("multer");

const { errorMessage } = require("..");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 3;

// Create the multer instance with enhanced security options
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /\.(jpg|jpeg|png)$/;

    if (!file.originalname.match(allowedFileTypes)) {
      return cb(new Error("پسوند فایل مورد نظر مجاز نیست"), false);
    }
    cb(null, true);
  },
});
const multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      errorMessage(`حجم فایل نمی تواند بیشتر از ${maxSize} مگابایت باشد`, 422);
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      errorMessage("تعداد فایل‌های مجاز نمی تواند بیشتر از 1 باشد", 422);
    } else {
      errorMessage("خطا در آپلود فایل", 422);
    }
  } else if (err) {
    errorMessage(err.message || "خطا در آپلود فایل", 422);
  }
  next();
};

module.exports = { upload, multerError };
