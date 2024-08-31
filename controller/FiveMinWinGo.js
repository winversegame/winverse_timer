const { default: axios } = require("axios");
const schedule = require("node-cron");

exports.generatedTimeEveryAfterEveryFiveMin = (io) => {
  let min = 4;

  const job = schedule.schedule("* * * * * *", function () {
    const currentTime = new Date().getSeconds(); // Get the current time
    const timeToSend = currentTime > 0 ? 60 - currentTime : currentTime;
    io.emit("fivemin", `${min}_${timeToSend}`);
    if (min <= 0 && currentTime === 5) fiveMinTrx();
    if (currentTime === 0) {
      min--;
      if (min < 0) {
        min = 4; // Reset min to 2 when it reaches 0
      }
    }
    if (timeToSend === 0) {
    }
  });
};

async function fiveMinTrx() {
  try {
    const res = await axios.get(
      "https://admin.zupeegame.info/api/resultfivemin"
    );
  } catch (e) {
    console.log(e);
  }
}
