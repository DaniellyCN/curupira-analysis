const { loadUniversities } = require('./graphics/load-universities/use-cases');

const load = async () => {
  await loadUniversities({
    name: 'INTERDISCIPLINAR',
    knowledgeAreas: ['INTERDISCIPLINAR'],
  });

  await loadUniversities({
    name: 'CIÊNCIA DA COMPUTAÇÃO',
    knowledgeAreas: ['CIÊNCIA DA COMPUTAÇÃO'],
  });

  await loadUniversities({
    name: 'ENGENHARIAS IV',
    knowledgeAreas: ['ENGENHARIA BIOMÉDICA'],
  });

  await loadUniversities({
    name: 'ENGENHARIAS IV',
    knowledgeAreas: ['ENGENHARIA ELÉTRICA'],
  });
};

load();