const { processPrograms, writeFile } = require('../adapters/file');
const { loadPermanentCollaboratorProfessors } = require('./graphics/professors-kind');

const loadAndWritePrograms = async () => {
  const programs = await processPrograms(__dirname + '/../data/lake/all_programs.csv');
  writeFile({filename: __dirname + '/../data/processed/all_programs.json', data: programs })
  return programs;
}

const load = async () => {
  const programs = require(__dirname + '/../data/processed/all_programs.json');
  return programs;
}

const loadGraphics = async () => {
  const programs = await load();

  // Professors kinds
  // await loadPermanentCollaboratorProfessors(programs, '2017');
  // await loadPermanentCollaboratorProfessors(programs, '2018');
  // await loadPermanentCollaboratorProfessors(programs, '2019');
  // await loadPermanentCollaboratorProfessors(programs, '2020');
  // await loadPermanentCollaboratorProfessors(programs, '2021');
  await loadPermanentCollaboratorProfessors(programs, '2022');
}

loadGraphics();
