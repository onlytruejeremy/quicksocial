const express = require("express");
const router = express.Router();
const con = require("../db/connection");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/all", (req, res) => {
  const sql = `select * from posts order by postId desc`;
  try {
    con.query(sql, (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      console.log(result);
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).send("Database Error");
  }
});

router.get("/:userId", (req, res) => {
  const sql = `select * from posts where userId = ${req.params.userId} order by postId desc`;
  try {
    con.query(sql, (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      console.log(result);
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).send("Database Error");
  }
});

router.post("/", (req, res) => {
  const sql = `call insert_post(?,?,?)`;
  const { userId, message, imageUrl } = req.body;
  try {
    con.query(sql, [userId, message, imageUrl], (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      res.status(201).json("Submitted Post");
    });
  } catch (error) {
    res.status(500).send("Database Error");
  }
});

router.put("/", (req, res) => {
  res.send("Route Not Ready");
});
router.delete("/", (req, res) => {
  res.send("Route Not Ready");
});

module.exports = router;
