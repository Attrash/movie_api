const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();
app.use(morgan("common"));
app.use(express.static("public"));
app.use(bodyParser.json());

const movies = [
  {
    title: "V For Vendetta",
    director: "James McTeigue",
    genre: ["Thriller", "Action", "Sci-Fi"],
    year: "2006",
  },
  {
    title: "Paradise Now",
    director: "Hany Abu-Assad",
    genre: ["Drama", "Thriller", "War", "Crime"],
    year: "2005",
  },
];

const genres = [
  {
    name: "Action",
    description:
      "Fast-paced, emphasizing physical feats, chases, and often violence.",
  },

  {
    name: "Drama",
    description:
      "Explores serious themes and human emotions, often with complex characters.",
  },

  {
    name: "Sci-fi",
    description:
      "Explores futuristic concepts, technology, and often space travel.",
  },
  {
    name: "War",
    description:
      "Explores combat, survival, sacrifice, the futility and inhumanity of battle, and the effects of war on society.",
  },
  {
    name: "Thriller",
    description:
      "Builds suspense and tension, often with a dangerous or mysterious element.",
  },
];
let users = [
  {
    id: "",
    name: "Ahmad",
    favMovie: "V for Vendetta",
  },
  {
    id: "",
    name: "Sarah",
    favMovie: "Paradise Now",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to My lists of movies!");
});

app.get("/movies", (req, res, next) => {
  res.json(movies);
});

app.get("/movies/:title", (req, res) => {
  const movieTitle = req.params.title;
  const movie = movies.find((mo) => mo.title === movieTitle);
  if (!movie) {
    res.status(401).send("movie not available");
  } else {
    res.json(movie);
  }
});

app.get("movies/genres/:genre", (req, res) => {
  const genreName = req.params.genre;
  const genreDetails = genres.find((gn) => gn.genre === genreName);
  if (!genreDetails) {
    res.status(401).send("genre information not avvailable");
  } else {
    res.json(genreDetails);
  }
});

app.get("movies/directors/:director", (req, res) => {
  const directorName = req.params.genre;
  const directorDetails = directors.find((dr) => dr.director === directorName);
  if (!directorDetails) {
    res.status(401).send("director information not available");
  } else {
    res.json(directorDetails);
  }
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name) {
    res.status(401).send("information entered incorrectly");
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send("New user was created", newUser);
  }
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  let user = users.find((us) => us.id === userId);

  if (!user) {
    res.status(400).send("user does not exist");
  } else {
    user.name = updateUser.name;
    res.status(201).send("user was updated successfully");
  }
});

app.post("/users/:id/:favorites", (req, res) => {
  const userId = req.params.id;
  const movieTitle = req.body.title;
  let user = users.find((us) => us.id === userId);
  if (user) {
    user.favorites.push(movieTitle);
    res
      .status(201)
      .send(`${movieTitle} has been added to ${id} favorites list`);
  } else {
    res.status(400).send("user does not exist, therefor can not add the movie");
  }
});

app.delete("/users/:id/favorites", (req, res) => {
  const userId = req.params.id;
  const movieTitle = req.body.title;
  let user = users.find((us) => us.id === userId);

  if (user) {
    users = users.filter((us) => us.id === !userId);
    res
      .status(201)
      .send(`${movieTitle} was deleted from ${userId}'s favorites list.`);
  } else {
    res.status(400).send("user does not exist");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  let user = users.find((us) => us.id === userId);
  if (user) {
    users = users.filter((us) => us.id === !userId);
    res.status(201).send(`${userId} was deleted`);
  } else {
    res.status(401).send("user does not exist");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
