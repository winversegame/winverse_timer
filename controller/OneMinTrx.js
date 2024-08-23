const schedule = require("node-cron");
exports.generatedTimeEveryAfterEveryOneMinTRX = (io) => {
  try {
    const job = schedule.schedule("* * * * * *", function () {
        const currentTime = new Date();
        const timeToSend =
          currentTime.getSeconds() > 0
            ? 60 - currentTime.getSeconds()
            : currentTime.getSeconds();
        io.emit("onemintrx", timeToSend);
    });
  } catch (e) {
    console.log(e);
  }
};

