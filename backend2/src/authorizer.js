const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const { buildIAMPolicy } = require("./lib/util");

const myRoles = {
  //role name vs function name
  "heroes:list": "private",
};

const authorizeUser = (userScopes, methodArn) => {
  return userScopes.find((scope) => methodArn.indexOf(myRoles[scope]));
};

exports.handler = async (event) => {
  const token = event.authorizationToken;

  try {
    const decodeUser = jwt.verify(token, JWT_KEY);

    const user = decodeUser.user;
    const userId = decodeUser.username;
    const isAllowed = authorizeUser(user.scopes, event.methodArn);
    //dado que irá nas requests
    const authorizerContext = {
      user: JSON.stringify(decodeUser),
    };
    const policyDocument = buildIAMPolicy(
      userId,
      isAllowed ? "Allow" : "Deny",
      event.methodArn,
      authorizerContext
    );
    return policyDocument;
  } catch (error) {
    console.error("auth error**", error.stack);
    //401 - Token expirado
    //403 - token sem permissão para acessar a função!
    return {
      statusCode: 401,
    };
  }
};
