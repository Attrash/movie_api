const express = require("express"),
  morgan = require("morgan");

const app = express();

const movies = [
  {
    title: "V For Vendetta",
    director: "James McTeigue",
    year: "2006"
  },
  {
    title: "Paradise Now",
    director: "Hany Abu-Assad",
    year: "2005",
  }
];

app.use(morgan("common"));

app.get("/movies", (req, res, next) => {
  res.json(movies);
});
app.get("/", (req, res) => {
  res.send("Welcome to My lists of movies!");
});

app.use(express.static("public"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
