exports.mobilePhoneNumberRegex = (phoneNumber) => {
  if (/^(\+98|0)?9\d{9}$/.test(phoneNumber) && phoneNumber.length === 11) {
    return true;
  } else {
    return false;
  }
};
