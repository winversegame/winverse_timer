const express = require("express");
const { getGameHistory, getMyHistory, placeBetTrx, get_Royality_Date } = require("../controller");
const { betPlacedAviator, cashOutFunction, getGameHistoryAviator, getLederData, getWalletByUserId, getMyHistoryByID, getTopRecordsAviator } = require("../controller/AviatorStart");
// const { betPlacedAviator } = require("../controller/aviatorStart");
const router = express.Router();

router.post("/trx_result-node", getGameHistory);
router.post("/trx-my-history-node", getMyHistory);
router.post("/bid-placed-node", placeBetTrx);
router.get("/get-royality-date", get_Royality_Date);



// aviator api's 
router.post("/api/v1/apply-bet",betPlacedAviator);
router.post("/api/v1/cash-out",cashOutFunction);
router.get("/api/v1/get-game-history", getGameHistoryAviator);
router.get("/api/v1/get-ledger-data", getLederData);
router.post("/api/v1/get-wallet-amount-by-id", getWalletByUserId);
router.post("/api/v1/my-history-by-user-id", getMyHistoryByID);
router.get("/api/v1/get-top-users", getTopRecordsAviator);

module.exports = router;
