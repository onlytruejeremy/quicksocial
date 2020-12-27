const express = require("express");
const router = express.Router();
const con = require("../db/connection");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/all", (req, res) => {
  const sql = `call get_all_posts()`;
  try {
    con.query(sql, (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      console.log(result);
      res.status(200).json(result[0]);
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
  const img = imageUrl;
  try {
    con.query(sql, [userId, message, img], (err, result) => {
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
  const sql = `call update_post(?, ?, ?)`;
  const { postId, message, imageUrl } = req.body;
  const img = imageUrl;
  try {
    con.query(sql, [postId, message, img], (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      res.status(201).json("Edited Post");
    });
  } catch (error) {
    res.status(500).send("Database Error");
  }
});
router.delete("/", (req, res) => {
  const sql = `call delete_post(?)`;
  const { postId } = req.body;
  try {
    con.query(sql, [postId], (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      res.status(201).json("Post Deleted");
    });
  } catch (error) {
    res.status(500).send("Database Error");
  }
});

module.exports = router;
