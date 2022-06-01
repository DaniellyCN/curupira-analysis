'use strict';

const { compare, crypt } = require('../utils/password');
const { mountToken } = require('../utils/token');
const { findUserByUsername } = require('../adapters/database/users');

const invalidUserResponse = {
  statusCode: 401,
  body: JSON.stringify({
    message: 'Usuário ou senha inválidos !',
  }),
};

const login = () => {
  return async function (event) {
    console.log('Login invoked..', new Date(), event.body);

    const { username, password } = JSON.parse(event.body);
    const user = findUserByUsername(username);

    if (!user) return invalidUserResponse;
    if (!compare(password, user.password)) return invalidUserResponse;

    const permissions = user.permissions;
    const token = mountToken({ username, permissions });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Autenticação realizada com sucesso !',
          token,
        },
        null,
        2
      ),
    };
  };
};

module.exports = login();
