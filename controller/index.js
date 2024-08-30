const sequelize = require("../config/db.config");
const { failMsg } = require("../helper/helperResponse");

exports.getGameHistory = async (req, res) => {
  const { gameid, limit } = req.body;

  if (!gameid || !limit) {
    return res.status(400).json({
      // Changed to 400 for bad request
      msg: "gameid and limit are required",
    });
  }
  let query =
    "SELECT * FROM `tr41_win_slot` WHERE tr41_packtype = 1 ORDER BY tr41_s_id DESC LIMIT 100;";
  if (Number(gameid) === 1)
    query =
      "SELECT * FROM `tr41_win_slot` WHERE tr41_packtype = ? ORDER BY tr41_s_id DESC LIMIT 100;";
  else if (Number(gameid) === 2)
    query =
      "SELECT * FROM `tr41_win_slot` WHERE tr41_packtype = ? ORDER BY tr41_s_id DESC LIMIT 100;";
  else
    query =
      "SELECT * FROM `tr41_win_slot` WHERE tr41_packtype = ? ORDER BY tr41_s_id DESC LIMIT 100;";

  try {
    await sequelize
      .query(query, {
        replacements: [Number(gameid)],
      })
      .then((result) => {
        return res.status(200).json({
          msg: "Data fetched successfully",
          data: result?.[0],
        });
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};
exports.betPlacingWingo = async (req, res) => {
  const { userid, amount, number, gameid } = req.body;

  if (!gameid || !userid || !amount || !number) {
    return res.status(201).json({
      // Changed to 400 for bad request
      msg: "Everything is required.",
    });
  }
  try {
    const query = `CALL sp_fund_member_topup(?,?,?,?,?,@msg,@msg2);`;
    await sequelize.query(query, {
      replacements: [
        Number(userid),
        Number(gameid),
        Number(number),
        Number(amount),
        Number(userid),
      ],
    });
    const query_for_msg = `SELECT @msg as message;`;
    await sequelize
      .query(query_for_msg)
      .then((result) => {
        return res.status(200).json({
          msg: result?.[0]?.[0]?.message,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return res.status(500).json({
      msg: "Somethig went wrong in bet placing.",
    });
  }
};
exports.topWinners = async (req, res) => {
  try {
    const query =
      "SELECT det.`or_m_user_id`,det.`or_m_email`,det.`or_m_mobile_no`,bet.tr_income,bet.tr_date FROM `tr34_retopup` AS bet LEFT JOIN `m03_user_detail` AS det ON bet.`tr_user_id` = det.`or_m_reg_id` WHERE TIME(bet.`income_date`) >= TIME(NOW()) - INTERVAL 24 HOUR ORDER BY bet.`tr_income` DESC LIMIT 10;";
    await sequelize
      .query(query)
      .then((result) => {
        return res.status(200).json({
          msg: "Data get successfully.",
          data: result?.[0],
        });
      })
      .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return res.status(500).json({
      msg: "Somethig went wrong in bet placing.",
    });
  }
};
exports.lastTradeTopWinners = async (req, res) => {
  try {
    const query =
      "SELECT det.`or_m_user_id`,det.`or_m_email`,det.`or_m_mobile_no`,bet.tr_income,bet.tr_date FROM `tr34_retopup` AS bet LEFT JOIN `m03_user_detail` AS det ON bet.`tr_user_id` = det.`or_m_reg_id` WHERE CAST(bet.tr_transid AS UNSIGNED) = CAST((SELECT tr_tranaction_id FROM `tr_game2` WHERE tr_id = 1) AS UNSIGNED) -1 ORDER BY bet.`tr_income` DESC LIMIT 5;";
    await sequelize
      .query(query)
      .then((result) => {
        return res.status(200).json({
          msg: "Data get successfully.",
          data: result?.[0],
        });
      })
      .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return res.status(500).json({
      msg: "Somethig went wrong in bet placing.",
    });
  }
};



exports.fundRequst = async (req, res) => {
  try {
    const { deposit_type, user_id, req_amount,transaction_no,req_curr_type, file } = req.body;

    if (!deposit_type || !user_id || !req_amount || !req_curr_type || !file || !transaction_no)
      return res.status(201)?.json({
        msg: "Everything is required.",
      });

    if (Number(req_amount) <= 0)
      return res.status(201)?.json({
        msg: "Amount should be grater than 0.",
      });

    const query = "CALL sp_fund_request(?,?,?,?,?,?,?,?,?,?,@msg);";
    const replacement = [
      0,
      Number(deposit_type),
      Number(user_id),
      Number(req_amount)?.toFixed(2),
      1,
      Number(req_curr_type),
      transaction_no,
      file,
      0,
      1,
    ];
    await sequelize.query(query, {
      replacements: replacement,
    });
    const [resultMessage] = await sequelize.query("SELECT @msg AS result_msg;");
    return res.status(200).json({
      msg: resultMessage?.[0]?.result_msg,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Somethig went wrong in bet placing.",
    });
  }
};
