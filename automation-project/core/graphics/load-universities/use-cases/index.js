const { log, error } = require('../../../../adapters/logger');
const automation = require('../../../../adapters/automation/puppeteer');

const EvaluationArea = require('../../../entities/EvaluationArea');
const KnowledgeArea = require('../../../entities/KnowledgeArea');
const University = require('../../../entities/University');

const components = require('../../../components');

// to test json length
var fs = require('fs');

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

  await automation.click('xpath', components.ACCEPT_BUTTON);

  const evaluationArea = new EvaluationArea(evaluationAreaName);
  await fillEvaluationArea({ area: evaluationArea, courseLine, automation });

  let tableItem = components.TABLE_ITEM.replace('XXX', evaluationArea.name);
  await automation.click('xpath', tableItem);

  const knowledgeAreas = generalArea.knowledgeAreas;
  await mapKnowledgeAreas({
    knowledgeAreas,
    automation,
    evaluationArea,
  });

  await mapUniversities({ automation, areas: evaluationArea.knowledgeAreas });

  console.log(evaluationArea);
  var json = JSON.stringify(evaluationArea);
  fs.writeFile(
    'myjsonfile.json',
    json,
    'utf8',
    function (err) {
      if (err) throw err;
      console.log('complete');
    }
  );
  await automation.finishAutomation();
};

// complex method split in others
const mapUniversities = async ({ automation, areas }) => {
  for (let index = 0; index < areas.length; index++) {
    const area = areas[index];
    const tableItem = components.TABLE_ITEM.replace('XXX', area.name);
    await automation.click('xpath', tableItem);

    const amount = await automation.getAmountElementsByXpath(
      components.TABLE_CONTENT
    );
    for (let universityIndex = 1; universityIndex < amount; universityIndex++) {
      const [
        nameSelector,
        ufSelector,
        masterSelector,
        doctorateSelector,
        professionalMasterSelector,
        professionalDoctorateSelector,
      ] = replaceBatchSeletors(
        [
          components.TABLE_UNIVERSITY_NAME,
          components.TABLE_UNIVERSITY_UF,
          components.TABLE_UNIVERSITY_AMOUNT_MASTER,
          components.TABLE_UNIVERSITY_AMOUNT_DOCTORATE,
          components.TABLE_UNIVERSITY_AMOUNT_PROFESSIONAL_MASTER,
          components.TABLE_UNIVERSITY_AMOUNT_PROFESSIONAL_DOCTORATE,
        ],
        universityIndex
      );

      const fullName = await automation.getText('xpath', nameSelector);
      const [name, initials] = splitUniversityName(fullName);
      const university = new University(name, initials);

      const uf = await automation.getText('xpath', ufSelector);
      const masterDegreeAmount = await automation.getText(
        'xpath',
        masterSelector
      );
      const doctorateDegreeAmount = await automation.getText(
        'xpath',
        doctorateSelector
      );
      const professionalMasterDegreeAmount = await automation.getText(
        'xpath',
        professionalMasterSelector
      );
      const professionalDoctorateDegreeAmount = await automation.getText(
        'xpath',
        professionalDoctorateSelector
      );

      university.uf = uf.replace('\n', '').trim();
      university.masterDegreeAmount = Number(
        masterDegreeAmount.replace('\n', '').trim()
      );
      university.doctorateDegreeAmount = Number(
        doctorateDegreeAmount.replace('\n', '').trim()
      );
      university.professionalMasterDegreeAmount = Number(
        professionalMasterDegreeAmount.replace('\n', '').trim()
      );
      university.professionalDoctorateDegreeAmount = Number(
        professionalDoctorateDegreeAmount.replace('\n', '').trim()
      );

      area.addUniversity(university);
    }
    // need turn back to map others universities.
  }
};

const replaceBatchSeletors = (selectors, toReplace) =>
  selectors.map(selector => selector.replace('XXX', toReplace));

const splitUniversityName = name => {
  const normalizedName = name.replace(')', '');
  return normalizedName.split('(');
};

// complex method split in others
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

// complex method split in others
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
      components.TABLE_EVALUATION_AMOUNT_PROFESSIONAL_MASTER.replace(
        'XXX',
        courseLine
      )
    )
  );
  area.setProfessionalDoctorateDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_EVALUATION_AMOUNT_PROFESSIONAL_DOCTORATE.replace(
        'XXX',
        courseLine
      )
    )
  );
};

// complex method split in others
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
      components.TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_MASTER.replace(
        'XXX',
        courseLine
      )
    )
  );
  area.setProfessionalDoctorateDegreeAmount(
    await automation.getText(
      'xpath',
      components.TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_DOCTORATE.replace(
        'XXX',
        courseLine
      )
    )
  );
};

const findCourseLine = (courseName, lines) => {
  log(`Looking for ${courseName} course in table`);
  return lines.findIndex(line => line.includes(courseName));
};

module.exports = { loadUniversities };
