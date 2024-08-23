const schedule  = require("node-cron");

exports.generatedTimeEveryAfterEveryThreeMinTRX = (io) => {
  let min = 2;
  schedule.schedule("* * * * * *", function () {
    const currentTime = new Date().getSeconds(); // Get the current time
    const timeToSend = currentTime > 0 ? 60 - currentTime : currentTime;
    io.emit("threemintrx", `${min}_${timeToSend}`);
    if (currentTime === 0) {
      min--;
      if (min < 0) min = 2; 
    }
  });
};
