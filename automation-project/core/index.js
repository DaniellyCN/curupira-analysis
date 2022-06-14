const { processPrograms, writeFile } = require('../adapters/file');
const { loadPermanentCollaboratorProfessors } = require('../core/graphics/graphic-name/use-cases');

const loadAndWritePrograms = async () => {
  const programs = await processPrograms(__dirname + '/../data/lake/programs.csv');
  writeFile({filename: __dirname + '/../data/processed/programs.json', data: programs })
  return programs;
}

const load = async () => {
  const programs = await processPrograms(__dirname + '/../data/lake/programs.csv');
  return programs;
}

const test = async () => {
  const programs = await load();
  await loadPermanentCollaboratorProfessors(programs);
}

test();
