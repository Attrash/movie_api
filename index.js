const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));

app.get("/movies", (req, res, next) => {
  res.send("Here are my top 10 movies!");
});
app.get("/", (req, res) => {
  res.send("Welcome to My lists of movies!");
});

app.use("/public/documentation.html", express.static("public"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
