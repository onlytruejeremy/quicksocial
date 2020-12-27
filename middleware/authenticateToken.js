const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // if there is a hidder then split on Bearer
  const token = authHeader && authHeader.split(" ")[1];
  // no token then not authed
  if (token == null) return res.status(401).send("Not Authorized");
  //verify token and set user
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("No token");

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
