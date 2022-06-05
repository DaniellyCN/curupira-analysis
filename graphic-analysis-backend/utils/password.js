const bcrypt = require('bcryptjs');

const crypt = password => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const compare = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = { crypt, compare };
