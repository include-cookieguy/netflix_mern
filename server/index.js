const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const db = require("./config/db");
//Connect to DB
db.connect();

//Use middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/upload", require("./routes/uploadRouter"));
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/usersRouter"));
app.use("/api", require("./routes/moviesRouter"));
app.use("/api", require("./routes/listsRouter"));
app.use("/api", require("./routes/episodeRouter"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
