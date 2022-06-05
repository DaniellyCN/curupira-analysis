const invalidUserResponse = {
  statusCode: 401,
  body: JSON.stringify({
    message: 'Usuário ou senha inválidos !',
  }),
};

const userNotAllowed = {
  statusCode: 403,
  body: JSON.stringify({
    message: 'Este usuário não possui permissão',
  }),
};

const invalidToken = {
  statusCode: 401,
  body: JSON.stringify({
    message: 'Token inválido',
  }),
};

module.exports = { invalidUserResponse, userNotAllowed, invalidToken };
