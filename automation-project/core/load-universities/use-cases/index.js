const { log, error } = require('../../../adapters/logger');
const automation = require('../../../adapters/automation/puppeteer');

const EvaluationArea = require('../entity/EvaluationArea');
const KnowledgeArea = require('../entity/KnowledgeArea');

const components = {
  EVALUATED_COURSES: "img[src='/sucupira/images/ico-cursos.png']",
  BY_EVALUATION_AREA: "//a[contains(text(), 'Por Área de Avaliação')]",
  TABLE_CONTENT: '//tbody/tr',
  TABLE_EVALUATION_AMOUNT_MASTER: '//tbody/tr[XXX]/td[10]',
  TABLE_EVALUATION_AMOUNT_DOCTORATE: '//tbody/tr[XXX]/td[11]',
  TABLE_EVALUATION_AMOUNT_PROFESSIONAL_MASTER: '//tbody/tr[XXX]/td[12]',
  TABLE_EVALUATION_AMOUNT_PROFESSIONAL_DOCTORATE: '//tbody/tr[XXX]/td[13]',
  TABLE_KNOWLEDGE_AMOUNT_MASTER: '//tbody/tr[XXX]/td[11]',
  TABLE_KNOWLEDGE_AMOUNT_DOCTORATE: '//tbody/tr[XXX]/td[12]',
  TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_MASTER: '//tbody/tr[XXX]/td[13]',
  TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_DOCTORATE: '//tbody/tr[XXX]/td[14]',
  TABLE_ITEM: "//a[contains(text(), 'XXX')]",
};

/**
 * Method to load univesities by course path
 *
 * @param {*} coursePath an array with courses name
 */
const loadUniversities = async generalArea => {
  await automation.createAutomationInstance();
  await automation.goTo('https://sucupira.capes.gov.br/sucupira/');
  await automation.click('cssSelector', components.EVALUATED_COURSES);
  await automation.click('xpath', components.BY_EVALUATION_AREA);
  const tableLines = await automation.getTableContentByXpath(
    components.TABLE_CONTENT
  );

  const evaluationAreaName = generalArea.name;
  const courseIndex = findCourseLine(evaluationAreaName, tableLines);
  const courseLine = courseIndex + 1;

  const evaluationArea = new EvaluationArea(evaluationAreaName);
  await fillEvaluationArea({ area: evaluationArea, courseLine, automation });

  await automation.click(
    'xpath',
    components.TABLE_ITEM.replace('XXX', evaluationArea.name)
  );

  const knowledgeAreas = generalArea.knowledgeAreas;
  await mapKnowledgeAreas({
    knowledgeAreas,
    automation,
    evaluationArea,
  });

  console.log(evaluationArea);
  await automation.finishAutomation();
};

const mapKnowledgeAreas = async ({
  knowledgeAreas,
  automation,
  evaluationArea,
}) => {
  log('Mapping all knowledge areas');
  while (knowledgeAreas.length > 0) {
    const area = knowledgeAreas.shift();
    const lines = await automation.getTableContentByXpath(
      components.TABLE_CONTENT
    );
    const courseIndex = findCourseLine(area, lines);
    const courseLine = courseIndex + 1;

    const knowledgeArea = new KnowledgeArea(area, evaluationArea.name);
    await fillKnowledgeArea({ area: knowledgeArea, courseLine, automation });

    evaluationArea.addKnowledgeArea(knowledgeArea);
  }
  log('All knowledge areas are add to evaluation area');
};

const fillEvaluationArea = async ({ area, automation, courseLine }) => {
  log('Fill evaluation area data');
  area.setMasterDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_EVALUATION_AMOUNT_MASTER.replace('XXX', courseLine)
    )
  );
  area.setDoctorateDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_EVALUATION_AMOUNT_DOCTORATE.replace('XXX', courseLine)
    )
  );
  area.setProfessionalMasterDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_EVALUATION_AMOUNT_PROFESSIONAL_MASTER.replace('XXX', courseLine)
    )
  );
  area.setProfessionalDoctorateDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_EVALUATION_AMOUNT_PROFESSIONAL_DOCTORATE.replace('XXX', courseLine)
    )
  );
};

const fillKnowledgeArea = async ({ area, automation, courseLine }) => {
  log('Fill knowledge area data');
  area.setMasterDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_KNOWLEDGE_AMOUNT_MASTER.replace('XXX', courseLine)
    )
  );
  area.setDoctorateDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_KNOWLEDGE_AMOUNT_DOCTORATE.replace('XXX', courseLine)
    )
  );
  area.setProfessionalMasterDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_MASTER.replace('XXX', courseLine)
    )
  );
  area.setProfessionalDoctorateDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_DOCTORATE.replace('XXX', courseLine)
    )
  );
};

const findCourseLine = (courseName, lines) => {
  log(`Looking for ${courseName} course in table`);
  return lines.findIndex(line => line.includes(courseName));
};

module.exports = { loadUniversities };
