'use strict';

const mock = [
  {
    instituition: "PUC-MG-I-4",
    portuguese: 1,
    english: 0
  },
  {
    instituition: "UFSCAR-CC-4",
    portuguese: 36,
    english: 0
  },
  {
    instituition: "UFSCAR-CC-4",
    portuguese: 37,
    english: 2
  },
  {
    instituition: "UFSCAR-CC-4",
    portuguese: 31,
    english: 3
  }
]

const thesisByLanguage = async () => {
  return {
      statusCode: 200,
      body: JSON.stringify(mock),
    };
};

module.exports = thesisByLanguage;
