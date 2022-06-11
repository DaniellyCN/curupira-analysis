const automation = require('../../../../adapters/automation/puppeteer');
const components = require('../../../components');

/**
 * Method to load univesities by course path
 *
 * @param {*} coursePath an array with courses name
 */
const loadPermanentCollaboratorProfessors = async generalArea => {

};

const getProfessors = async () => {
  await automation.createAutomationInstance();
  await automation.goTo('https://sucupira.capes.gov.br/sucupira/');
  await automation.finishAutomation();
}

module.exports = { loadPermanentCollaboratorProfessors };
