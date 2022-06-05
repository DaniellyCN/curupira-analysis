const { JWT_KEY, verify } = require('../utils/token');
const { userNotAllowed, invalidToken } = require('../utils/responses');

const authorizer = (nextFunction, permission) => {
  return async function (event) {
    try {
      const token = event.headers.authorization;
      const { user } = verify(token, JWT_KEY);

      const isAllowed = user.permissions.find(p => p === permission);
      if (!isAllowed) return userNotAllowed;

      return nextFunction({ ...event, user, token });
    } catch (error) {
      console.error(error);
      return invalidToken;
    }
  };
};

module.exports = authorizer;
