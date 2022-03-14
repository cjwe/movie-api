const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

/**
 * Generates JWT web token.
 * @function generateJWTToken
 * @param {object} - Object containing the user data
 * @returns {string} - jwt web token
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

/**
 * POST login credentials and create JWT token.
 * @param {*} router
 */
module.exports = (router) => {
  router.use(passport.initialize());
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Error authenticating login.',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
