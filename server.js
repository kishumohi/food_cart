require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongodbStore = require("connect-mongo");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect("mongodb://localhost/pizza", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected");
});
connection.on("error", (err) => {
  console.log("Connection failed", err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Store
const mongoStore = MongodbStore.create({
  mongoUrl: "mongodb://localhost/pizza",
  collectionName: "sessions",
});

// Session Config (Move this above global middleware)
app.use(
  session({
    secret: process.env.COOKIE_SECRET || "default_secret",
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

app.use(flash());

// Global middleware (Now req.session will be available)
app.use((req, res, next) => {
  // console.log(req.session); // Now req.session should be defined
  res.locals.session = req.session;
  next();
});

// Assets
app.use(express.static("public"));

// Set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// Routes
require("./routes/web.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
