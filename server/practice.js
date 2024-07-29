const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

mongoose.connect("mongodb://localhost:27017/election_analysis");

const pieChartDataSchema = new mongoose.Schema({
  category: String,
  data: [
    {
      label: String,
      value: Number,
    },
  ],
});

const PieChartData = mongoose.model("PieChartData", pieChartDataSchema);

app.use(cors());
app.use(express.json());

app.get("/api/piechartdata", async (req, res) => {
  try {
    const data = await PieChartData.find();
    console.log(data);
    if (data.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
