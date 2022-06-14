const { writeFile, normalizeText } = require('../../../../adapters/file');
const automation = require('../../../../adapters/automation/puppeteer');

const components = require('../../../components');
const ProfessorProgram = require('../../../entities/ProfessorProgram');

/**
 * Method to load univesities by course path
 *
 * @param {*} coursePath an array with courses name
 */
const loadPermanentCollaboratorProfessors = async programs => {
  const allProgramsProfessors = [];

  for (const index in programs) {
    console.log(programs[index]);

    const program = programs[index];
    const professors = await getProfessors(program);
    allProgramsProfessors.push(professors);
  }

  writeFile({ filename: getFilename(), data: allProgramsProfessors });
};

const getProfessors = async program => {
  await automation.createAutomationInstance();
  await automation.goTo('https://sucupira.capes.gov.br/sucupira/');
  await automation.click('cssSelector', components.COLLECT_CAPES_DIV);
  await automation.click('xpath', components.ACCEPT_BUTTON);

  await automation.click('xpath', components.PROFESSORS_LINK);
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
  await automation.pressEnter();

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
};

const isVisitor = text => text.includes('VISITANTE');
const isPermanent = text => text.includes('PERMANENTE');
const isColaborator = text => text.includes('COLABORADOR');

const getFilename = () => {
  const year = new Date().getFullYear();
  return `${__dirname}/../../../../data/processed/${year}_professors_type_by_program.json`;
};

module.exports = { loadPermanentCollaboratorProfessors };
