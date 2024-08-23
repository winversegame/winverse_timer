const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const schedule = require("node-schedule");
// const OneMinTrx = require("./controller/OneMinTrx");
// const ThreeMinTrx = require("./controller/ThreeMinTrx");
// const FiveMinTrx = require("./controller/FiveMinTrx");
// const OneMinWinGo = require("./controller/OneMinWinGo");
// const ThreeMinWinGo = require("./controller/ThreeMinWinGo");
// const FiveMinWinGo = require("./controller/FiveMinWinGo");
// const AviatorStart = require("./controller/AviatorStart");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const allRoutes = require("./routes/Routes");
app.use("", allRoutes);
io.on("connection", (socket) => {});


let x = true;
let trx = true;
//////////////////////
if (x) {
  console.log("Waiting for the next minute to start...");
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  console.log(
    "start after ",
    moment(new Date()).format("HH:mm:ss"),
    secondsUntilNextMinute
  );
////////////
  setTimeout(() => {
    // OneMinTrx.insertOneMinTrxResultByCron();
    
    // AviatorStart.aviator_Start_function(io);
    OneMinTrx.generatedTimeEveryAfterEveryOneMinTRX(io);
    OneMinWinGo.generatedTimeEveryAfterEveryOneMin(io);
    ThreeMinWinGo.generatedTimeEveryAfterEveryThreeMin(io);
    FiveMinWinGo.generatedTimeEveryAfterEveryFiveMin(io);
    x = false;
  }, secondsUntilNextMinute * 1000);
}

const finalRescheduleJob = schedule.scheduleJob(
  "15,30,45,0 * * * *",
  function () {
    // ThreeMinTrx.generatedTimeEveryAfterEveryThreeMinTRX(io);
    // FiveMinTrx.generatedTimeEveryAfterEveryFiveMinTRX(io);
  }
);
// AviatorStart.aviator_Start_function(io);
//////////////////////////
app.get("/", (req, res) => {
  res.send(`<h1>server running at port=====> ${PORT}</h1>`);
});

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
