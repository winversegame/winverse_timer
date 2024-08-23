const sequelize = require("../config/db.config");
let bet_data = [];
let already_call_functon = true;
let total_cashout_temp = 0;
let total_bet_place_temp = 0;
let total_candidate = 0;
exports.aviator_Start_function = async (io) => {
  async function generateAndSendMessage(
    io,
    loss_amount,
    get_counter,
    lossess_amount
  ) {
    let timerInterval;
    let crashInterval;

    let counterboolean = true;
    let find_any_loss_amount_match_with_60_percent = [];
    // await applyBet.deleteMany({})
    const time = Math.floor(100 + Math.random() * (1200 - 100));
    console.log(time, "this is time to send to the uer or client");
    io.emit("message", time);
    io.emit("crash", false);
    let fly_time = 0;
    let milliseconds = 0;
    let seconds = 1;

    io.emit("setloder", false);
    io.emit("isFlying", true);

    /////////////////////////////////////////////////////////////////////// start main calculaton for cashs out ///////////////////////////

    ////////////////////////////// interval for timer //////////////////////////////////////////////

    timerInterval = setInterval(async () => {
      if (milliseconds === 100) {
        seconds += 1;
        milliseconds = 0;
      }

      io.emit("seconds", `${String(milliseconds).padStart(2, "0")}_${seconds}`);
      // console.log(
      //   `${String(milliseconds).padStart(2, "0")}_${seconds}`,
      //   "hiii"
      // );
      const newTime = fly_time + 1;
      if (newTime >= time) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        already_call_functon &&
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`),
            "pre"
          );
        already_call_functon = false;
        return;
      }
      if (seconds === 1) {
        const percent_60_bet_amount = total_bet_place_temp * (100 / 60);
        find_any_loss_amount_match_with_60_percent = [
          lossess_amount?.find(
            (i) => Number(i?.lossAmount) <= percent_60_bet_amount
          ),
        ];
      }

      milliseconds += 1;
      fly_time = newTime;
    }, 100);

    ///////////////////////////////////// thsi is the calculation of total cashout sum

    crashInterval = setInterval(async () => {
      const total_amount_ka_60_percent = total_bet_place_temp * (60 / 100); /// 60 percent se upar jayega to crash kra dena hai

      /////////////////// condition for loss amount //////////////////////////

      if (loss_amount !== 0 && total_bet_place_temp !== 0) {
        if (get_counter >= 3) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          // this_is_recusive_function_for_remove_all_lossAmount_if_counter_greater_than_3(
          //   total_bet_place_temp
          // );
          already_call_functon &&
            thisFunctonMustBePerFormAfterCrash(
              Number(`${seconds}.${milliseconds}`),
              "counter_jyada_ho_chuka_hai"
            );
          already_call_functon = false;
          return;
        } else if (loss_amount <= total_bet_place_temp) {
          counterboolean = false;
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);

          already_call_functon &&
            thisFunctonMustBePerFormAfterCrash(
              Number(`${seconds}.${milliseconds}`),
              "remove_all_loss_and_set_counter_to_zero"
            );
          already_call_functon = false;
          return;
        } else {
          if (
            find_any_loss_amount_match_with_60_percent?.[0] &&
            find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount >
              total_bet_place_temp
          ) {
            clearInterval(timerInterval);
            clearInterval(crashInterval);
            clearInterval(timerInterval);
            clearInterval(crashInterval);

            const remaining_amount =
              find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount -
              total_bet_place_temp;

            if (
              remaining_amount > 0 &&
              find_any_loss_amount_match_with_60_percent?.[0]
            ) {
              already_call_functon &&
                thisFunctonMustBePerFormAfterCrash(
                  Number(`${seconds}.${milliseconds}`),
                  "loss_if_loss_jyada_hai_bet_amount_se_aur_60_percent_se_koi_match_bhi_kiya_hai",
                  find_any_loss_amount_match_with_60_percent
                );
              already_call_functon = false;
              return;
            }
          } else {
            /////////////////// means bet_amount jyada hai ////////////////////
            if (find_any_loss_amount_match_with_60_percent?.[0]) {
              clearInterval(timerInterval);
              clearInterval(crashInterval);
              clearInterval(timerInterval);
              clearInterval(crashInterval);

              already_call_functon &&
                thisFunctonMustBePerFormAfterCrash(
                  Number(`${seconds}.${milliseconds}`),
                  "recursive_functoin_for_all_removel_amount"
                );
              already_call_functon = false;
              return;
            } else {
              if (
                total_bet_place_temp > 0 &&
                counterboolean &&
                total_cashout_temp > 0
              ) {
                counterboolean = false;
                const query_for_incr_counter =
                  "UPDATE aviator_loss_counter SET counter = counter + 1 WHERE id = 1;";
                // await queryDb(query_for_incr_counter, []);
                await sequelize.query(query_for_incr_counter);
              }
            }
          }
        }
      }

      if (total_candidate <= 1 && total_bet_place_temp >= 100) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        already_call_functon &&
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`)
          );
        already_call_functon = false;
        return;
      }

      ///////////////////////////////////// thsi is the calculation of total cashout sum
      if (total_candidate <= 2 && total_bet_place_temp >= 200) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        already_call_functon &&
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`)
          );
        already_call_functon = false;
        return;
      }

      /////////// conditoin for that if total amount is grater or equal that 500 Rs. creash ////////////////////
      if (total_candidate <= 5 && total_bet_place_temp >= 500) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        already_call_functon &&
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`)
          );
        already_call_functon = false;
        return;
      }
      ////////////////////// conndition is that means agar cashout 60% se jyada huaa to crash kra do///////////////
      if (total_cashout_temp > total_amount_ka_60_percent) {
        console.log("Function is called now 60 percent se jyada");
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        counterboolean = false;
        ///////////////// this is the condition that means if cashout is grater than //////////////////////
        if (total_cashout_temp > total_bet_place_temp) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          already_call_functon &&
            thisFunctonMustBePerFormAfterCrash(
              Number(`${seconds}.${milliseconds}`),
              "sixty_percent_se_jyada_ka_crash"
            );
          already_call_functon = false;
          return;
        } else if (total_cashout_temp < total_bet_place_temp) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          already_call_functon &&
            thisFunctonMustBePerFormAfterCrash(
              Number(`${seconds}.${milliseconds}`),
              "null"
            );
          already_call_functon = false;
          return;
        }
        ///////////////// this is the condition that means if cashout is grater than //////////////////////
      }
      //////////////////// agar bet lgi hui hai to  second 4 se jyada nhi hone chahiye (+1 krna pdega hmesa q ki ui me +1 karke dikhaya gya hai each and everything)
      if (total_bet_place_temp > 0) {
        if (Number(seconds >= 3)) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          already_call_functon &&
            thisFunctonMustBePerFormAfterCrash(
              Number(`${seconds}.${milliseconds}`)
            );
          already_call_functon = false;
          return;
        }
      }
    }, 200);

    async function thisFunctonMustBePerFormAfterCrash(time, msg) {
      already_call_functon = false;
      clearInterval(timerInterval);
      clearInterval(crashInterval);
      clearInterval(timerInterval);
      clearInterval(crashInterval);
      console.log("thisFunctonMustBePerFormAfterCrash HOOOOOOO crached");
      // const round = await GameRound?.find({});
      io.emit("crash", true);

      io.emit("isFlying", false);
      io.emit("setcolorofdigit", true);
      io.emit("apply_bet_counter", []);
      io.emit("cash_out_counter", []);
      /////////////////////////// fake process //////////////////////

      if (msg === "counter_jyada_ho_chuka_hai") {
        const query_for_remove_from_loss_table = `CALL sp_to_remove_loss_amount_aviator_table(?);`;
        // await queryDb(query_for_remove_from_loss_table, [total_bet_place_temp]);
        await sequelize.query(query_for_remove_from_loss_table, {
          replacements: [total_bet_place_temp],
        });
      }
      if (
        msg ===
        "loss_if_loss_jyada_hai_bet_amount_se_aur_60_percent_se_koi_match_bhi_kiya_hai"
      ) {
        const percent_60_bet_amount = total_bet_place_temp * (100 / 60);
        const query_for_find_record_less_than_equal_to_60_percent = `SELECT * FROM aviator_loss WHERE lossAmount <= ${percent_60_bet_amount} ORDER BY lossAmount DESC LIMIT 1;`;
        const find_any_loss_amount_match_with_60_percent =
          await sequelize.query(
            query_for_find_record_less_than_equal_to_60_percent
          );

        const query_update_record_if_found = `UPDATE aviator_loss SET lossAmount = lossAmount - ${total_bet_place_temp} WHERE id = ?`;
        await sequelize.query(query_update_record_if_found, {
          replacements: [
            find_any_loss_amount_match_with_60_percent?.[0]?.[0]?.id,
          ],
        });
      }

      if (msg === "recursive_functoin_for_all_removel_amount") {
        const query_for_remove_60_percent_loss_wala_data =
          "CALL sp_for_release_60_percent_amount_from_loss_table(?,?);";
        await sequelize.query(query_for_remove_60_percent_loss_wala_data, {
          replacements: [total_bet_place_temp, 60],
        });
      }

      // if (msg === "sixty_percent_se_jyada_ka_crash") {
      //   console.log("sixty_percent_se_jyada_ka_crash");

      //   const query_for_insert_record_in_loss_table = `INSERT INTO aviator_loss(lossAmount) VALUES(${
      //     total_cashout_temp - total_bet_place_temp
      //   })`;
      //   await queryDb(query_for_insert_record_in_loss_table, []);
      // }

      if (msg === "remove_all_loss_and_set_counter_to_zero") {
        const query_for_truncate_loss_table = `TRUNCATE TABLE aviator_loss;`;
        await sequelize.query(query_for_truncate_loss_table);
        const query_for_update_counter = `UPDATE aviator_loss_counter SET counter = 0 WHERE id = 1;`;
        await sequelize.query(query_for_update_counter);
      }

      const query_for_insert_game_history = `INSERT INTO aviator_game_history(round,multiplier) VALUES(?,?);`;
      await sequelize.query(query_for_insert_game_history, {
        replacements: [10000, msg === "pre" ? time : time - 0.01],
      });

      setTimeout(() => {
        io.emit("setcolorofdigit", false);
        io.emit("setloder", true);
      }, 3000);
      const query_for_get_total_loss_amount = `SELECT SUM(lossAmount) as sum_total FROM aviator_loss;`;
      let loss_amount = await sequelize.query(query_for_get_total_loss_amount);

      //const set_counter = await SetCounter.find({});
      const query_for_get_counter = `SELECT counter FROM aviator_loss_counter WHERE id = 1;`;
      const set_counter = await sequelize.query(query_for_get_counter);
      let get_counter = set_counter?.[0]?.[0]?.counter || 0;

      const query_for_update_wallet_and_loss_table =
        "CALL sp_clear_remaining_bet_aviator();";
      await sequelize.query(query_for_update_wallet_and_loss_table);

      setTimeout(async () => {
        bet_data = [];
        total_cashout_temp = 0;
        total_bet_place_temp = 0;
        total_candidate = 0;
        const query_for_get_all_loss_amount =
          "SELECT id,lossAmount FROM aviator_loss ORDER BY lossAmount DESC;";
        const all_lossess = await sequelize
          .query(query_for_get_all_loss_amount)
          .then((result) => {
            return result;
          })
          .catch((e) => {
            console.log("Error in fetching all lossess");
          });
        generateAndSendMessage(
          io,
          loss_amount?.[0],
          get_counter,
          all_lossess?.[0]
        );
        already_call_functon = true;
      }, 20000);
    }
  }
  generateAndSendMessage(io, 0, 0, []);
};

exports.betPlacedAviator = async (req, res) => {
  try {
    const { userid, id, amount, button_type } = req.body;
    if (!userid || !id || !amount)
      return res.status(403).json({
        msg: "All field is required",
      });
    total_bet_place_temp = total_bet_place_temp + amount;
    total_candidate = total_candidate + 1;
    const query_for_bet_place =
      "CALL `sp_place_bet_aviator`(?,?,?,?,@result_msg);";
    const params = [
      String(userid),
      String(Date.now()),
      String(amount),
      button_type,
    ];
    await sequelize.query(query_for_bet_place, { replacements: params });
    const [resultMessage] = await sequelize.query(
      "SELECT @result_msg AS result_msg;"
    );
    return res.status(200).json({
      msg: resultMessage?.[0]?.result_msg,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something went wrong in bet placing",
    });
  }
};

exports.cashOutFunction = async (req, res) => {
  try {
    const { userid, id, amount, multiplier, button_type } = req.body;
    if (!userid || !id || !amount || !multiplier || !button_type)
      return res.status(403).json({
        msg: "All field is required",
      });

    total_cashout_temp = total_cashout_temp + amount;

    const query_for_cash_out =
      "CALL sp_clear_bet_aviator(?,?,?,?,?,@result_msg);";
    const params = [
      String(userid),
      String(Date.now()),
      String(amount),
      Number(multiplier)?.toFixed(2),
      button_type,
    ];
    await sequelize.query(query_for_cash_out, { replacements: params });

    const [resultMessage] = await sequelize.query(
      "SELECT @result_msg AS result_msg;"
    );
    return res.status(200).json({
      msg: resultMessage?.[0]?.result_msg,
    });

    ////////////////// revert the final response
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something went wrong in create user query",
    });
  }
};

exports.getGameHistoryAviator = async (req, res) => {
  try {
    const query_for_game_history = `SELECT * FROM aviator_game_history;`;
    const data = await sequelize
      .query(query_for_game_history)
      .then((result) => {
        return result?.[0];
      })
      .catch((e) => {
        console.log("Error in fetching game history");
      });
    // const data = await GameHistory.find({});

    if (!data)
      return res.status(400).json({
        msg: "Data not found",
      });
    return res.status(200).json({
      data: data,
      msg: "Data fetched successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getLederData = async (req, res) => {
  try {
    const query_for_get_ledger =
      "SELECT fn_get_total_aviator_trading() as local_length,  a.`amount`,a.`amountcashed`,a.`multiplier`,a.`createdAt`,a.`updatedAt`,u.`or_m_email` as email,u.`or_m_name` as full_name,u.`or_m_mobile_no` as mobile FROM `aviator_bet_place_ledger` AS a LEFT JOIN `m03_user_detail` AS u ON a.`userid` = u.`or_m_reg_id` ORDER BY(a.`amountcashed`) DESC LIMIT 100;";
    // const data = await ApplyBetLedger.find({}).populate("main_id").limit(100);
    const data = await sequelize
      .query(query_for_get_ledger)
      .then((result) => {
        return result?.[0];
      })
      .catch((e) => {
        console.log("Error in fetching game history");
      });
    if (!data)
      return res.status(400).json({
        msg: "Data not found",
      });
    return res.status(200).json({
      data: data,
      msg: "Data fetched successfully",
    });
  } catch (e) {
    console.log(e);
  }
};
exports.getWalletByUserId = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({
        msg: "Undefined uesr id",
      });
    // const data = await User.findById({ _id: id });
    const query_for_get_balance =
      "SELECT or_m_user_wallet as wallet,0 as winning FROM `m03_user_detail` WHERE or_m_reg_id = ?;";
    const data = await sequelize.query(query_for_get_balance, {
      replacements: [Number(id)],
    });

    if (!data)
      return res.status(400).json({
        msg: "User not found",
      });
    return res.status(200).json({
      data: {
        wallet: data?.[0]?.[0]?.wallet,
        winning: data?.[0]?.[0]?.winning,
      },
      msg: "Data fetched successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getMyHistoryByID = async (req, res) => {
  try {
    const { user_id_node } = req.body;
    console.log("HII");
    if (!user_id_node)
      return res.status(400).json({
        msg: "Please provider user id",
      });
    // const data = await ApplyBetLedger.find({ userid: String(user_id_node) });
    const query_for_get_my_history =
      "SELECT * FROM `aviator_bet_place_ledger` WHERE userid = ? ORDER BY(id) DESC LIMIT 100;";
    const data = await sequelize.query(query_for_get_my_history, {
      replacements: [Number(user_id_node)],
    });

    if (!data)
      return res.status(400).json({
        msg: "Data not found",
      });
    return res.status(200).json({
      data: data,
      msg: "Data fetched successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getTopRecordsAviator = async (req, res) => {
  try {
    const query_for_find_top_winner =
      "SELECT a.`amount`,a.`amountcashed`,a.`multiplier`,a.`createdAt`,a.`updatedAt`,u.`or_m_email`,u.`or_m_name`,u.`or_m_dob` FROM `aviator_bet_place_ledger` AS a LEFT JOIN `m03_user_detail` AS u ON a.`userid` = u.`or_m_reg_id` ORDER BY a.`amountcashed` DESC LIMIT 10;";

    const data = await sequelize.query(query_for_find_top_winner);
    return res.status(200).json({
      msg: "Data save successfully",
      data: data?.[0],
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Something went wrong in create user query",
    });
  }
};
