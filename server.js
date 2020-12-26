const express = require("express");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Running API");
});
app.listen(port, () => {
  console.log("listening on 5000");
});

app.use("/api/users", require("./routes/user"));

//serve static if production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on: ${port}`);
});
