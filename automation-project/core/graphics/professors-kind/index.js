const { writeFile } = require('../../../adapters/file');
const automation = require('../../../adapters/automation/puppeteer');

const components = require('../../components');
const ProfessorProgram = require('../../entities/ProfessorProgram');

/**
 * Method to load collaborator type by program.
 *
 * @param {*} programs
 * @param {String} year
 */
const loadPermanentCollaboratorProfessors = async (programs, year) => {
  const alreadyDonePrograms = loadOrCreateProcessedFile(year);

  const processed = [];
  const notProcessed = [];

  for (const index in programs) {
    const program = programs[index];

    try {
      const professors = await getProfessors(program, year);
      processed.push(professors);
    } catch (error) {
      notProcessed.push(program);
    }
    break;
  }

  const mergedPrograms = [...processed, ...alreadyDonePrograms];
  writeFile({ filename: getFilename(year), data: mergedPrograms });
  writeFile({ filename: getErrorFilename(year), data: notProcessed });
};

const getProfessors = async (program, year) => {
  await automation.createAutomationInstance();

  try {
    await automation.goTo('https://sucupira.capes.gov.br/sucupira/');
    await automation.click('cssSelector', components.COLLECT_CAPES_DIV);
    await automation.click('xpath', components.ACCEPT_BUTTON);

    await automation.click('xpath', components.PROFESSORS_LINK);
    await automation.sleep(2000);
    await automation.clearField(components.PROFESSORS_YEAR);
    await automation.sleep(500);
    await automation.type('cssSelector', components.PROFESSORS_YEAR, year);

    await automation.type(
      'cssSelector',
      components.UNIVERSITY_PROFESSOR_INPUT,
      program.university.code
    );

    await automation.sleep(2000);
    await automation.click(
      'xpath',
      components.OPTION_CONTAINS.replace('XXX', program.university.code)
    );
    await automation.sleep(2000);
    await automation.click('cssSelector', components.PROGRAM_SELECT);

    await automation.sleep(2000);
    const value = await automation.getOptionValue(
      components.PROGRAM_SELECT,
      program.code
    );

    await automation.sleep(2000);
    await automation.setSelectValue(components.PROGRAM_SELECT, value);

    await automation.sleep(2000);
    await automation.click('cssSelector', components.SEARCH_PROFESSORS_BUTTON);

    await automation.sleep(2500);
    const amountProfessors = await automation.getAmountElementsByXpath(
      components.TABLE_CONTENT
    );

    let visitors = 0;
    let permanents = 0;
    let collaborators = 0;

    for (let index = 0; index < amountProfessors; index++) {
      const professorType = await automation.getText(
        'xpath',
        components.PROFESSOR_TYPE_COLUMN.replace('XXX', index + 1)
      );
      if (isVisitor(professorType)) visitors += 1;
      if (isPermanent(professorType)) permanents += 1;
      if (isColaborator(professorType)) collaborators += 1;
    }

    await automation.finishAutomation();

    const professors = new ProfessorProgram(
      program,
      permanents,
      visitors,
      collaborators
    );

    return professors;
  } catch (error) {
    await automation.finishAutomation();
    throw error;
  }
};

const isVisitor = text => text.includes('VISITANTE');
const isPermanent = text => text.includes('PERMANENTE');
const isColaborator = text => text.includes('COLABORADOR');

const getFilename = year => {
  return `${__dirname}/../../../data/processed/${year}_professors_type_by_program.json`;
};

const getErrorFilename = year => {
  return `${__dirname}/../../../data/processed/${year}_professors_type_by_program_error.json`;
};

const loadOrCreateProcessedFile = year => {
  try {
    const alreadyDonePrograms = require(getFilename());
    return alreadyDonePrograms;
  } catch (error) {
    writeFile({ filename: getFilename(year), data: [] });
    return [];
  }
};

module.exports = { loadPermanentCollaboratorProfessors };
