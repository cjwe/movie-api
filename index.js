// Require necessary modules
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Models = require("./models.js");

const Movies = Models.Movie,
  Users = Models.User;

// Mongoose connection to database for CRUD operations
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express function declared as variable 'app'
const app = express();

// JSON movie data objects
// let movies = [
//   {
//     title: "The Castle of Cagliostro",
//     director: "Hayao Miyazaki",
//     year: "1979",
//     producer: "Tetsuo Katayama",
//     starring: [
//       "Yasuo Yamada",
//       "Eiko Masuyama",
//       "Kiyoshi Kobayashi",
//       "Makio Inoue",
//       "Gorō Naya",
//     ],
//     music: "Yuji Ohno",
//   },
//   {
//     title: "Nausicaä of the Valley of the Wind",
//     director: "Hayao Miyazaki",
//     year: "1984",
//     producer: "Isao Takahata",
//     starring: [
//       "Sumi Shimamoto",
//       "Gorō Naya",
//       "Yōji Matsuda",
//       "Yoshiko Sakakibara",
//       "Iemasa Kayumi",
//     ],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Castle in the Sky",
//     director: "Hayao Miyazaki",
//     year: "1986",
//     producer: "Isao Takahata",
//     starring: [
//       "Mayumi Tanaka",
//       "Keiko Yokozawa",
//       "Kotoe Hatsui",
//       "Minori Terada",
//     ],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "My Neighbor Totoro",
//     director: "Hayao Miyazaki",
//     year: "1988",
//     producer: "Toru Hara",
//     starring: ["Chika Sakamoto", "Noriko Hidaka", "Hitoshi Takagi"],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Kiki's Delivery Service",
//     director: "Hayao Miyazaki",
//     year: "1989",
//     producer: "Hayao Miyazaki",
//     starring: ["Minami Takayama", "Rei Sakuma", "Kappei Yamaguchi"],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Porco Rosso",
//     director: "Hayao Miyazaki",
//     year: "1992",
//     producer: "Toshio Suzuki",
//     starring: [
//       "Shūichirō Moriyama",
//       "Tokiko Kato",
//       "Akemi Okamura",
//       "Akio Ōtsuka",
//     ],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Princess Mononoke",
//     director: "Hayao Miyazaki",
//     year: "1997",
//     producer: "Toshio Suzuki",
//     starring: [
//       "Yōji Matsuda",
//       "Yuriko Ishida",
//       "Yūko Tanaka",
//       "Kaoru Kobayashi",
//       "Masahiko Nishimura",
//     ],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Spirited Away",
//     director: {
//       name: "Hayao Miyazaki",
//       birth: "January 5, 1941",
//     },
//     year: "2001",
//     producer: "Toshio Suzuki",
//     starring: [
//       "Rumi Hiiragi",
//       "Miyu Irino",
//       "Mari Natsuki",
//       "Takeshi Naito",
//       "Yasuko Sawaguchi",
//     ],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Howl's Moving Castle",
//     director: "Hayao Miyazaki",
//     year: "2004",
//     producer: "Toshio Suzuki",
//     starring: ["Chieko Baisho", "Takuya Kimura", "Akihiro Miwa"],
//     music: "Joe Hisaishi",
//   },
//   {
//     title: "Ponyo",
//     director: "Hayao Miyazaki",
//     year: "2008",
//     producer: "Toshio Suzuki",
//     starring: [
//       "Tomoko Yamaguchi",
//       "Kazushige Nagashima",
//       "Yūki Amami",
//       "George Tokoro",
//       "Yuria Nara",
//     ],
//     music: "Joe Hisaishi",
//   },
// ];

//Middleware to...
app.use(express.static("public")); // serve static files
app.use(morgan("common")); // log requests to terminal
app.use(bodyParser.json()); // use body-parser

// GET requests
// Get home page
app.get("/", (req, res) => {
  res.send("Welcome to the Miyazaki Movie Database");
});

// Get documentation page
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", {
    root: __dirname,
  });
});

// Get complete movie list
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get genre by name
app.get('/movies/genre/:name', (req, res) => {
  Movies.findOne({ 'Genre.Name' : req.params.name })
    .then((genre) => {
      res.status(201).json(genre)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get director data by name
app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name' : req.params.Name })
    .then((director) => {
      res.status(201).json(director)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get user by username 
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Creates new user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Allows user to update info by username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // return updated document
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allows user to add movie to favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, 
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allows user to delete movie from favorites
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, 
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
