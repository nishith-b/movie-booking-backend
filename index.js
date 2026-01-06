const express = require("express");
const dotenv = require("dotenv");
const DBConnect = require("./utils/db");

const MovieRoutes = require("./routes/movie-routes");
const TheatreRoutes = require("./routes/theatre-routes");
const AuthRoutes = require("./routes/auth-routes");
const UserRoutes = require("./routes/user-routes");
const BookingRoutes = require("./routes/booking-routes");
const ShowRoutes = require("./routes/show-routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MovieRoutes(app);
TheatreRoutes(app);
AuthRoutes(app);
UserRoutes(app);
BookingRoutes(app);
ShowRoutes(app);

const startServer = async () => {
  try {
    await DBConnect();
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
