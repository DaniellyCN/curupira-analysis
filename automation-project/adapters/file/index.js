var fs = require('fs');

const writeFile = ({ filename, data }) => {
  const formatedData = JSON.stringify(data);
  fs.writeFile(filename, formatedData, 'utf8', finish);
};

const finish = error =>
  error ? console.error(error) : console.log('FILE WRITED');

const normalizeText = text => {
  let textToNormalize = text.toLowerCase().trim();
  textToNormalize = textToNormalize.split(' ').join('_');
  return textToNormalize.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

module.exports = { writeFile, normalizeText };
