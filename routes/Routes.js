const express = require("express");
const {
  betPlacedAviator,
  cashOutFunction,
  getGameHistoryAviator,
  getLederData,
  getWalletByUserId,
  getMyHistoryByID,
  getTopRecordsAviator,
} = require("../controller/AviatorStart");
const router = express.Router();

// aviator api's
router.post("/api/v1/apply-bet-aviator-first", betPlacedAviator);
router.post("/api/v1/cash-out-aviator-last", cashOutFunction);
router.get("/api/v1/get-game-history", getGameHistoryAviator);
router.get("/api/v1/get-ledger-data", getLederData);
router.post("/api/v1/get-wallet-amount-by-id", getWalletByUserId);
router.post("/api/v1/my-history-by-user-id", getMyHistoryByID);
router.get("/api/v1/get-top-users", getTopRecordsAviator);
module.exports = router;
