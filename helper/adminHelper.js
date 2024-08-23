"user strict";
const sequelize = require("../config/db.config.js");
module.exports = {
  queryDb: function (query, param) {
    return new Promise((resolve, reject) => {
      sequelize.query(
        query,
        {
          replacements: param,
        },
        (err, result) => {
          if (err) {
            console.log(result);
            //return reject(err);
            return console.log(err);
          }
          resolve(result);
        }
      );
    });
  },
};
