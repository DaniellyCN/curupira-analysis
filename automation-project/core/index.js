const {
  processPrograms,
  writeFile,
  filterByFile,
} = require('../adapters/file');

const {
  loadPermanentCollaboratorProfessors,
} = require('./graphics/professors-kind');

const pathCsvAllPrograms = `${__dirname}/../data/lake/all_programs.csv`;
const pathCsvInOperationPrograms = `${__dirname}/../data/lake/in_operation_programs.csv`;

const pathJsonAllPrograms = `${__dirname}/../data/processed/all_programs.json`;
const pathJsonActivePrograms = `${__dirname}/../data/processed/active_programs.json`;

const loadActivePrograms = async () => {
  const programs = require(pathJsonActivePrograms);
  return programs;
};

const loadAllPrograms = async () => {
  const programs = require(pathJsonAllPrograms);
  return programs;
};


const saveOnlyActivePrograms = async () => {
  const programs = await processPrograms(pathCsvAllPrograms);
  writeFile({ filename: pathJsonAllPrograms, data: programs });

  const activePrograms = await filterByFile({
    programs,
    csvFilter: pathCsvInOperationPrograms,
  });

  writeFile({ filename: pathJsonActivePrograms, data: activePrograms });
  return activePrograms;
};

const loadGraphics = async () => {
  const programs = await loadActivePrograms();

  // Professors kinds
  // await loadPermanentCollaboratorProfessors(programs, '2017');
  // await loadPermanentCollaboratorProfessors(programs, '2018');
  // await loadPermanentCollaboratorProfessors(programs, '2019');
  // await loadPermanentCollaboratorProfessors(programs, '2020');
  // await loadPermanentCollaboratorProfessors(programs, '2021');
  await loadPermanentCollaboratorProfessors(programs, '2022');
};

loadGraphics();
