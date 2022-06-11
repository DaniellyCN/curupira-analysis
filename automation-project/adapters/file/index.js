var fs = require('fs');
const readline = require('readline');

const Program = require('../../core/entities/Program');
const University = require('../../core/entities/University');
const ProgramType = require('../../core/entities/ProgramType');

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

const processPrograms = async (filename) => {
  let programs = [];
  const fileStream = fs.createReadStream(filename);

  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of lines) {
    // Nome do Programa;Código do Programa;Nome da IES;Sigla da IES;UF;ME;DO;MP;DP
    const [
      programName,
      programCode,
      universityName,
      universityInitials,
      universityUf,
      meRate,
      doRate,
      mpRate,
      dpRate,
    ] = line.split(';');
    const universityCode = programCode.trim().substring(0, 8);
    const types = createTypes({ meRate, doRate, mpRate, dpRate });
    const university = new University(
      universityName,
      universityCode,
      universityInitials,
      universityUf
    );

    const program = new Program(
      programName.trim(),
      programCode.trim(),
      university,
      types
    );
    programs = [...programs, program];
  }

  return programs;
};

const createTypes = ({ meRate, doRate, mpRate, dpRate }) => {
  let types = [];
  const meType = new ProgramType('me', meRate.trim());
  const doType = new ProgramType('do', doRate.trim());
  const mpType = new ProgramType('mp', mpRate.trim());
  const dpType = new ProgramType('dp', dpRate.trim());

  if (meType.rate !== '-') types = [...types, meType];
  if (doType.rate !== '-') types = [...types, doType];
  if (mpType.rate !== '-') types = [...types, mpType];
  if (dpType.rate !== '-') types = [...types, dpType];

  return types;
};

module.exports = { writeFile, normalizeText, processPrograms };
