const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/demo_project")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", require("./Routes/userRoutes"));
app.use("/candidate", require("./Routes/candidateRoutes"));

app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
