"user strict";
var sql = require("../config/db.config");
// const path = require("path");
const CryptoJS = require("crypto-js");
module.exports = {
  deCryptData: (data) => {
    const value =
      (data &&
        CryptoJS.AES.decrypt(data, "anand")?.toString(CryptoJS.enc.Utf8)) ||
      null;
    return value && JSON.parse(value);
  },
  queryDb: function (query, param) {
    return new Promise((resolve, reject) => {
      sql.query(query, param, (err, result) => {
        if (err) {
          //return reject(err);
          return console.log(err);
        }
        resolve(result);
      });
    });
  },
};
