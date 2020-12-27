const express = require("express");
const router = express.Router();
const con = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

router.post("/", (req, res) => {
  const { email } = req.body;
  const sql = `select * from users where email = ?`;

  try {
    con.query(sql, [email], async (err, result) => {
      if (err) {
        console.warn(err);
        res.status(500).send("Database Error");
      }
      // getting user data
      const userInfo = result[0];

      //comparing hashed password
      if (await bcrypt.compare(req.body.password, userInfo.password)) {
        const person = {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        };
        //signing token and sending
        jwt.sign(
          person,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 86400 },
          (err, accessToken) => {
            if (err) {
              console.warn(err);
            }
            res.status(200).json({
              accessToken,
            });
          }
        );
      } else {
        res.status(401).send("Not Authorized");
      }
    });
  } catch (error) {
    res.status(500).send("Database Error");
  }
});

module.exports = router;
