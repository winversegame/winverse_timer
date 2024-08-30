const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const bodyParser = require('body-parser');

const schedule = require("node-schedule");
const OneMinWinGo = require("./controller/OneMinWinGo");
const ThreeMinWinGo = require("./controller/ThreeMinWinGo");
const FiveMinWinGo = require("./controller/FiveMinWinGo");

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

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(bodyParser.json({ limit: '10mb' })); // Body parser for JSON
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Body parser for URL-encoded data

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
// OneMinWinGo.generatedTimeEveryAfterEveryOneMin(io);
// ThreeMinWinGo.generatedTimeEveryAfterEveryThreeMin(io);
// FiveMinWinGo.generatedTimeEveryAfterEveryFiveMin(io);
app.get("/", (req, res) => {
  res.send(`<h1>server running at port=====> ${PORT}</h1>`);
});

httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
