// Require necessary modules 
const express = require('express'),
  morgan = require('morgan');

// Express function declared as variable 'app'
const app = express();

// JSON movie data objects 
let topMovies = [{
    title: 'The Castle of Cagliostro',
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
    year: '1989',
    producer: 'Hayao Miyazaki',
    starring: [
      'Minami Takayama',
      'Rei Sakuma',
      'Kappei Yamaguchi'
    ],
    music: 'Joe Hisaishi'
  },
  {
    title: 'Porco Rosso',
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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
    director: 'Hayao Miyazaki',
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

//Middleware to...
app.use(express.static('public')); // serve static files
app.use(morgan('common')); // log requests to terminal

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to the Miyazaki Movie Database');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {
    root: __dirname
  });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
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