const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("admin_winversegmnew", "winversegmnew", "t8^mV04c1", {
  dialect: "mysql",
  host: "103.180.163.173",
  // logging:false
});
module.exports = sequelize;
