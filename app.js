const express = require("express");
const app = express();
const port = 3000;
const session = require('express-session');

const userRoutes = require("./routes/userRoutes");
const voteRoutes = require("./routes/voteRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'shantanu',
  resave: false,
  saveUninitialized: false
}));





app.use("/", userRoutes);
app.use("/vote", voteRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
