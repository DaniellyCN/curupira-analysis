const { sign, verify } = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;
const DEFAULT_EXPIRES_TOKEN = '60m';

const mountToken = user =>
  sign({ user }, JWT_KEY, { expiresIn: DEFAULT_EXPIRES_TOKEN });

module.exports = { mountToken, verify, JWT_KEY };
