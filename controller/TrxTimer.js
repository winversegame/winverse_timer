const { default: axios } = require("axios");
const {
  queryDb,
  functionToreturnDummyResult,
} = require("../helper/adminHelper");
const moment = require("moment");
const schedule = require("node-cron");
const soment = require("moment-timezone");

exports.generatedTimeEveryAfterEveryOneMinTRX = (io) => {
  let oneMinTrxJob = schedule.schedule("* * * * * *", function () {
    // const currentTime = new Date();
    // const timeToSend =
    //   currentTime.getSeconds() > 0
    //     ? 60 - currentTime.getSeconds()
    //     : currentTime.getSeconds();
    // io.emit("onemintrx", timeToSend);
    const now = new Date();
    const nowIST = soment(now).tz("Asia/Kolkata");

    const currentMinute = nowIST.minutes();
    const currentSecond = nowIST.seconds();
    io.emit("onemintrx", `${currentMinute}_${currentSecond}`);

    if (currentSecond === 54) {
      let timetosend = new Date();
      timetosend.setSeconds(54);
      timetosend.setMilliseconds(0);

      let updatedTimestamp = parseInt(timetosend.getTime().toString());
      const actualtome = soment.tz("Asia/Kolkata");
      const time = actualtome.add(5, "hours").add(30, "minutes").valueOf();
      setTimeout(async () => {
        const res = await axios
          .get(
            `https://apilist.tronscanapi.com/api/block`,
            {
              params: {
                sort: "-balance",
                start: "0",
                limit: "20",
                producer: "",
                number: "",
                start_timestamp: updatedTimestamp,
                end_timestamp: updatedTimestamp,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (result) => {
            if (result?.data?.data[0]) {
              const obj = result.data.data[0];
              sendOneMinResultToDatabase(time, obj);
            } else {
              sendOneMinResultToDatabase(
                time,
                functionToreturnDummyResult(
                  Math.floor(Math.random() * (4 - 0 + 1)) + 0
                )
              );
            }
          })
          .catch((e) => {
            console.log("error in tron api");
            sendOneMinResultToDatabase(
              time,
              functionToreturnDummyResult(
                Math.floor(Math.random() * (4 - 0 + 1)) + 0
              )
            );
          });
      }, [4000]);
    }
  });
};

const sendOneMinResultToDatabase = async (time, obj) => {
  const newString = obj.hash;
  let num = null;
  for (let i = newString.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(newString[i]))) {
      num = parseInt(newString[i]);
      break;
    }
  }
  const query = `CALL sp_insert_trx_one_min_result(?, ?, ?, ?, ?, ?, ?)`;
  await queryDb(query, [
    num,
    String(moment(time).format("HH:mm:ss")),
    1,
    `**${obj.hash.slice(-4)}`,
    JSON.stringify(obj),
    `${obj.hash.slice(-5)}`,
    obj.number,
  ])
    .then((result) => {})
    .catch((e) => {
      console.log(e);
    });
};
