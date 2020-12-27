const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
  res.send("Running API");
});

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

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
