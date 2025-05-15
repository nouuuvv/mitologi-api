require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mitologiRoutes = require("./routes/mitologiRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/mitologi", mitologiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API berjalan di port ${PORT}`);
});
