const schedule = require("node-cron");

exports.generatedTimeEveryAfterEveryFiveMinTRX = (io) => {
  let min = 4;
   schedule.schedule("* * * * * *", function () {
    const currentTime = new Date().getSeconds(); // Get the current time
    const timeToSend = currentTime > 0 ? 60 - currentTime : currentTime;
    io.emit("fivemintrx", `${min}_${timeToSend}`);
    if (currentTime === 0) {
      min--;
      if (min < 0) min = 4;
    }
  });
};


