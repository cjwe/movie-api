// Require necessary modules 
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

// Express function declared as variable 'app'
const app = express();

// JSON movie data objects 
let movies = [{
    title: 'The Castle of Cagliostro',
    director:  'Hayao Miyazaki',
    year: '1979',
    producer: 'Tetsuo Katayama',
    starring: [
      'Yasuo Yamada',
      'Eiko Masuyama',
      'Kiyoshi Kobayashi',
      'Makio Inoue',
      'Gorō Naya'
    ],
    music: 'Yuji Ohno'
  },
  {
    title: 'Nausicaä of the Valley of the Wind',
    director:  'Hayao Miyazaki',
    year: '1984',
    producer: 'Isao Takahata',
    starring: [
      'Sumi Shimamoto',
      'Gorō Naya',
      'Yōji Matsuda',
      'Yoshiko Sakakibara',
      'Iemasa Kayumi'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Castle in the Sky',
    director:  'Hayao Miyazaki',
    year: '1986',
    producer: 'Isao Takahata',
    starring: [
      'Mayumi Tanaka',
      'Keiko Yokozawa',
      'Kotoe Hatsui',
      'Minori Terada'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'My Neighbor Totoro',
    director:  'Hayao Miyazaki',
    year: '1988',
    producer: 'Toru Hara',
    starring: [
      'Chika Sakamoto',
      'Noriko Hidaka',
      'Hitoshi Takagi'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Kiki\'s Delivery Service',
    director:  'Hayao Miyazaki',
    year: '1989',
    producer:  'Hayao Miyazaki',
    starring: [
      'Minami Takayama',
      'Rei Sakuma',
      'Kappei Yamaguchi'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Porco Rosso',
    director:  'Hayao Miyazaki',
    year: '1992',
    producer: 'Toshio Suzuki',
    starring: [
      'Shūichirō Moriyama',
      'Tokiko Kato',
      'Akemi Okamura',
      'Akio Ōtsuka'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Princess Mononoke',
    director:  'Hayao Miyazaki',
    year: '1997',
    producer: 'Toshio Suzuki',
    starring: [
      'Yōji Matsuda',
      'Yuriko Ishida',
      'Yūko Tanaka',
      'Kaoru Kobayashi',
      'Masahiko Nishimura'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Spirited Away',
    director: {
      name:  'Hayao Miyazaki',
      birth: 'January 5, 1941'
    },
    year: '2001',
    producer: 'Toshio Suzuki',
    starring: [
      'Rumi Hiiragi',
      'Miyu Irino',
      'Mari Natsuki',
      'Takeshi Naito',
      'Yasuko Sawaguchi'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Howl\'s Moving Castle',
    director:  'Hayao Miyazaki',
    year: '2004',
    producer: 'Toshio Suzuki',
    starring: [
      'Chieko Baisho',
      'Takuya Kimura',
      'Akihiro Miwa'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Ponyo',
    director:  'Hayao Miyazaki',
    year: '2008',
    producer: 'Toshio Suzuki',
    starring: [
      'Tomoko Yamaguchi',
      'Kazushige Nagashima',
      'Yūki Amami',
      'George Tokoro',
      'Yuria Nara'
    ],
    music: 'Joe Hisaishi'
  }
];

let genres = [
  {
    name: 'action',
    description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, rescues and frantic chases.'
  },
  {
    name: 'adventure',
    description: 'The adventure genre consists of movies where the protagonist goes on an epic journey, either personally or geographically. Often the protagonist has a mission and faces many obstacles in their way.'
  }
];

let directors = [
  {
    name: 'Hayao Miyazaki',
    birthdate: 	'5 January 1941',
    bio: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.'
  }
];

let users = [
  {
    name: 'Christa',
    age: '27'
  }
];

//Middleware to...
app.use(express.static('public')); // serve static files
app.use(morgan('common')); // log requests to terminal
app.use(bodyParser.json()); // use body-parser

// GET requests
// Get home page
app.get('/', (req, res) => {
  res.send('Welcome to the Miyazaki Movie Database');
});

// Get documentation page
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {
    root: __dirname
  });
});

// Get complete movie list
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get movie by title
app.get('/movies/:Title', (req, res) => {
  res.json(movies.find((movie) =>
    movie.title === req.params.Title));
});

// Get genre by name
app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
    genre.name === req.params.name));
});

// Get director data by name
app.get('/directors/:Name', (req, res) => {
  res.json(directors.find((director) =>
    director.name === req.params.Name));
});

// Adds new user 
app.post ('/users', (req,res) =>{
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing username in request body.'
    res.status(400).send(message);
  } else {
    res.status(201).send(newUser);
  }
});

// Allows user to update username
app.put('/users/:name', (req, res) => {
  let user = users.find((user) => { return user.name === req.params.name });
  res.status(201).send(`Username was updated to ${req.params.name}`);
});

// Allows user to add movie to favorites 
app.put('/users/:name/favorites/:movieTitle', (req, res) => {
  res.status(201).send(`${req.params.movieTitle} was added to ${req.params.name}'s favorites.`);
});

// Allows user to delete movie from favorites
app.delete('/users/:name/favorites/:movieTitle', (req, res) => {
  res.status(201).send(`${req.params.movieTitle} was removed from ${req.params.name}'s favorites.`);
});

// Deletes user by username 
app.delete ('/users/:name', (req,res) =>{
  res.status(201).send(`User ${req.params.name} was deleted.`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('App is listening on port 8080.')
});