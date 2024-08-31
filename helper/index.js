const CryptoJS = require('crypto-js');
exports.deCryptData = (data) => {
    const value =
      (data &&
        CryptoJS.AES.decrypt(data, "anand")?.toString(CryptoJS.enc.Utf8)) ||
      null;
    return value && JSON.parse(value);
  };