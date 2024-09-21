const schedule = require("node-cron");
const moment = require('moment')
const soment = require("moment-timezone");

exports.generatedTimeEveryAfterEveryOneMin = (io) => {
  const job = schedule.schedule("* * * * * *", function () {
    const now = new Date();
    const nowIST = soment(now).tz("Asia/Kolkata");
  
    const currentMinute = nowIST.minutes();
    const currentSecond = nowIST.seconds();
    // const timeToSend =
    //   currentTime.getSeconds() > 0
    //     ? 60 - currentTime.getSeconds()
    //     : currentTime.getSeconds();
    io.emit("onemin", `${currentMinute}_${currentSecond}`);
  });
};
