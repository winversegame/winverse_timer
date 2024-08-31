const express = require("express");
const {
  getGameHistory,
  betPlacingWingo,
  topWinners,
  lastTradeTopWinners,
  fundRequst,
} = require("../controller");
const {
  betPlacedAviator,
  cashOutFunction,
  getGameHistoryAviator,
  getLederData,
  getWalletByUserId,
  getMyHistoryByID,
  getTopRecordsAviator,
} = require("../controller/AviatorStart");
// const { betPlacedAviator } = require("../controller/aviatorStart");
const router = express.Router();

router.post("/wingo-result", getGameHistory);
router.post("/bid-placing-wingo", betPlacingWingo);
router.get("/top-winners", topWinners);
router.get("/last-trade-top-winners", lastTradeTopWinners);
router.post("/fund-request", fundRequst);

// aviator api's
router.post("/api/v1/apply-bet", betPlacedAviator);
router.post("/api/v1/cash-out", cashOutFunction);
router.get("/api/v1/get-game-history", getGameHistoryAviator);
router.get("/api/v1/get-ledger-data", getLederData);
router.post("/api/v1/get-wallet-amount-by-id", getWalletByUserId);
router.post("/api/v1/my-history-by-user-id", getMyHistoryByID);
router.get("/api/v1/get-top-users", getTopRecordsAviator);

module.exports = router;
