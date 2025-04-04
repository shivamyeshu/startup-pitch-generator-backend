const express = require("express");
const dotenv = require("dotenv");
const pitchRoutes = require("./routes/pitch");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", pitchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
