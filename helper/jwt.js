const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtUtil = {};
jwtUtil.issuer = process.env.ISSUER;
jwtUtil.privateKEY = fs.readFileSync(`${__dirname}/../ssh/private.key`, 'utf8');
jwtUtil.publicKEY = fs.readFileSync(`${__dirname}/../ssh/public.key`, 'utf8');

jwtUtil.createSecretToken = (data) => {
  return jwt.sign(
    data,
    jwtUtil.privateKEY,
    {
      expiresIn: '7300d',
      issuer: jwtUtil.issuer,
      algorithm: 'RS256'
    }
  );
};

jwtUtil.verify = (token) => {
  let decoded = {};
  if (token) {
    try {
      decoded = jwt.verify(
        token,
        jwtUtil.publicKEY, {
        algorithms: ['RS256'],
        issuer: jwtUtil.issuer,
      }
      );
    } catch (err) {
      console.log(err);
    }
  }
  return decoded;
};

module.exports = jwtUtil;
