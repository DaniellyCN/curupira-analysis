const invalidUserResponse = {
  statusCode: 401,
  body: JSON.stringify({
    message: 'Usuário ou senha inválidos !',
  }),
};

module.exports = { invalidUserResponse };
