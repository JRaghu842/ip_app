let express = require("express");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");
const { cityRouter } = require("./routes/cityname.routes");
// let { logger } = require("./helpers/logger");
require("dotenv").config();

let app = express();

// app.use(logger)

app.use(express.json());

app.use("/user", UserRouter);

app.use("/api", cityRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log("Not able to connect to MOngoDB Atlas");
  }
  console.log(`Server is live at port ${process.env.PORT}`);
});
