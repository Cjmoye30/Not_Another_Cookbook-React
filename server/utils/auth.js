const jwt = require('jsonwebtoken');

const secret = 'testSecret';
const expiration = '2h';

module.exports = {

  authMiddleware: function ({ req }) {

    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // console.log("no token");
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log("Token Data: ", data)
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log("Token Payload: ", payload)
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
