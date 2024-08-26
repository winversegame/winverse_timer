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
  try {
    const query =
      "SELECT * FROM tr42_win_slot WHERE tr41_packtype = 1 ORDER BY tr_transaction_id DESC LIMIT 100";
    await sequelize
      .query(query)
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
          msg: result?.[0]?.[0]?.message
        });
      })
      .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return res.status(500).json({
      msg:"Somethig went wrong in bet placing."
    })
  }
};

exports.placeBetTrx = async (req, res) => {
  const { user_id, type, round_no, amount, bet_number, description } = req.body;
  if (round_no && Number(round_no) <= 1) {
    return res.status(200).json({
      msg: `Refresh your page may be your game history not updated.`,
    });
  }

  if (!user_id || !type || !round_no || !amount || !bet_number || !description)
    return res.status(200).json({
      msg: `Everything is required`,
    });

  if (user_id && Number(user_id) <= 0) {
    return res.status(200).json({
      msg: `Please refresh your page`,
    });
  }

  if (Number(amount) <= 0)
    return res.status(200).json({
      msg: `Amount should be grater or equal to 1.`,
    });
  if (type && Number(type) <= 0)
    return res.status(200).json({
      msg: `Type is not define`,
    });
  if (type && Number(type) >= 4)
    return res.status(200).json({
      msg: `Type is not define`,
    });
  let get_round = `SELECT tr_tranaction_id FROM tr_game WHERE tr_id = 1;`;

  const get_round_number =
    get_round !== "" &&
    (await sequelize
      .query(get_round)
      .then((result) => {
        return result?.[0];
      })
      .catch((e) => {
        console.log("Something went wrong in get round.");
      }));
  try {
    if (Number(get_round_number?.[0]?.tr_tranaction_id || 0) > 0) {
      let query_string =
        "SELECT tr_package FROM tr35_retopup_temp WHERE tr_transid = ? AND tr_user_id = ? AND tr_type = 1";

      await sequelize
        .query(query_string, {
          replacements: [
            String(Number(get_round_number?.[0]?.tr_tranaction_id) + 1),
            Number(user_id),
          ],
        })
        .then(async (re) => {
          const result = re?.[0];
          if (
            [11, 12, 13]?.includes(Number(bet_number)) &&
            result?.find((i) => [11, 12, 13]?.includes(i?.tr_package))
          ) {
            return res.status(200).json({
              msg: `Already Placed on color`,
            });
          } else if (
            [14, 15]?.includes(Number(bet_number)) &&
            result?.find((i) => [14, 15]?.includes(i?.tr_package))
          ) {
            return res.status(200).json({
              msg: `Already placed on big/small`,
            });
          } else if (
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.includes(Number(bet_number)) &&
            result?.filter((i) =>
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.includes(i?.tr_package)
            )?.length > 2
          ) {
            return res.status(200).json({
              msg: `You have already placed 3  bets.`,
            });
          } else {
            const procedureCall =
              "CALL trx_bet_placing_node(?, ?, ?, ?, ?, ?, @result_msg);";
            await sequelize.query(procedureCall, {
              replacements: [
                user_id,
                type,
                round_no,
                amount,
                bet_number,
                description,
              ],
            });

            const [resultMessage] = await sequelize.query(
              "SELECT @result_msg AS result_msg;"
            );
            return res.status(200).json({
              msg: resultMessage?.[0]?.result_msg,
            });
          }
        })
        .catch((e) => {
          return res.status(500).json({
            msg: `Something went wrong api calling`,
          });
        });
    }
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};

exports.get_Royality_Date = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id)
    return res.status(200).json({
      msg: `Everything is required`,
    });

  if (user_id && Number(user_id) <= 0) {
    return res.status(200).json({
      msg: `Please refresh your page`,
    });
  }

  const id = Number(user_id);
  if (typeof id !== "number")
    return res.status(200).json({
      msg: `Please refresh your page`,
    });

  try {
    const query = `CALL sp_for_reamining_days_to_achive_ro_club(?,@remaining_days,@type_of_club); `;
    await sequelize.query(query, {
      replacements: [id],
    });

    const [resultMessage] = await sequelize.query(
      "SELECT @remaining_days,@type_of_club;"
    );
    return res.status(200).json({
      msg: "Data found successfully",
      data: {
        date: resultMessage?.[0]?.["@remaining_days"],
        club: resultMessage?.[0]?.["@type_of_club"],
      },
    });
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};
