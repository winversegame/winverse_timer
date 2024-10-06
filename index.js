const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const moment = require("moment");
require("dotenv").config();
const bodyParser = require("body-parser");
const soment = require("moment-timezone");
const OneMinWinGo = require("./controller/OneMinWinGo");

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
app.use(bodyParser.json({ limit: "10mb" })); // Body parser for JSON
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true })); // Body parser for URL-encoded data

const PORT = process.env.PORT || 4000;
const allRoutes = require("./routes/Routes");
const {
  generatedTimeEveryAfterEveryOneMinTRX,
} = require("./controller/TrxTimer");

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

  setTimeout(() => {
    OneMinWinGo.generatedTimeEveryAfterEveryOneMin(io);
    generatedTimeEveryAfterEveryOneMinTRX(io);
    x = false;  
  }, secondsUntilNextMinute * 1000);
}
app.get("/", (req, res) => {
  res.send(`<h1>server running at port=====> ${PORT}</h1>`);
});
///////////
httpServer.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
