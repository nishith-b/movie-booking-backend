const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie-routes");
const TheatreRoutes = require("./routes/theatre-routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MovieRoutes(app);
TheatreRoutes(app);

app.get("/home", (req, res) => {
  return res.json({
    success: true,
    message: "Fetched Home",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected To Database");

    app.listen(PORT, () => {
      console.log(`Server Running On PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Not Able To Connect To Database", error);
    process.exit(1);
  }
};

startServer();
