const { processPrograms, writeFile } = require('../adapters/file');

const loadAndWritePrograms = async () => {
  const programs = await processPrograms(__dirname + '/../data/lake/programs.csv');
  writeFile({filename: __dirname + '/../data/processed/programs.json', data: programs })
}

const load = async () => {
  const programs = await processPrograms(__dirname + '/../data/lake/programs.csv');
  console.log(JSON.stringify(programs[0]))
  return programs;
}

// loadAndWritePrograms();
load()