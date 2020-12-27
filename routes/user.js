const express = require("express");
const router = express.Router();
const con = require("../db/connection");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  let sql = `call select_users()`;
  try {
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send("Database Error");
        console.warn(err.message);
      }
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.warn(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  let sql = `call insert_user(?,?,?,?)`;
  const { firstName, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  const checkUser = `call check_account(?)`;
  try {
    con.query(checkUser, [email], (err, result) => {
      if (err) {
        res.status(500).send("Database Error");
        console.warn(err.message);
      }
      console.log(result[0].length);
      if (result[0].length > 0) {
        res.status(200).send("User Exists");
      } else {
        con.query(
          sql,
          [firstName, lastName, email, hashedPassword],
          (err, result) => {
            if (err) {
              res.status(500).send("Database Error");
              console.warn(err.message);
            }
            res.status(201).json(result);
          }
        );
      }
    });
  } catch (error) {
    console.warn(error.message);
    res.status(500).send("Database Error");
  }
});

router.put("/", async (req, res) => {
  let sql = `call update_users(?,?,?,?,?)`;
  const { firstName, lastName, email, password } = req.body;
  const userId = req.params.id;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    con.query(
      sql,
      [userId, firstName, lastName, email, password],
      (err, result) => {
        if (err) {
          res.status(500).send("Database Error");
          console.warn(err);
        }
        res.status(201).json("Updated User");
      }
    );
  } catch (error) {
    console.warn(error.message);
    res.status(500).send("Database Error");
  }
});

router.delete("/", (req, res) => {
  let sql = `call delete_users(?)`;
  const userId = req.params.id;
  try {
    con.query(sql, [userId], (err, result) => {
      if (err) {
        res.status(500).send("Database Error");
      } else {
        res.status(200).json("User Deleted");
      }
    });
  } catch (error) {
    console.warn(error.message);
    res.status(500).send("Database Error");
  }
});

module.exports = router;
