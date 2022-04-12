const menuComponents = {
  EVALUATED_COURSES: "img[src='/sucupira/images/ico-cursos.png']",
  BY_EVALUATION_AREA: "//a[contains(text(), 'Por Área de Avaliação')]",
};

const genericComponents = {
  TABLE_CONTENT: '//tbody/tr',
  TABLE_ITEM: "//a[contains(text(), 'XXX')]",
  ACCEPT_BUTTON: "//button[contains(text(), 'ACEITO')]"
};

const evaluationTableComponents = {
  TABLE_EVALUATION_AMOUNT_MASTER: '//tbody/tr[XXX]/td[10]',
  TABLE_EVALUATION_AMOUNT_DOCTORATE: '//tbody/tr[XXX]/td[11]',
  TABLE_EVALUATION_AMOUNT_PROFESSIONAL_MASTER: '//tbody/tr[XXX]/td[12]',
  TABLE_EVALUATION_AMOUNT_PROFESSIONAL_DOCTORATE: '//tbody/tr[XXX]/td[13]',
};

const knowledgeTableComponents = {
  TABLE_KNOWLEDGE_AMOUNT_MASTER: '//tbody/tr[XXX]/td[11]',
  TABLE_KNOWLEDGE_AMOUNT_DOCTORATE: '//tbody/tr[XXX]/td[12]',
  TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_MASTER: '//tbody/tr[XXX]/td[13]',
  TABLE_KNOWLEDGE_AMOUNT_PROFESSIONAL_DOCTORATE: '//tbody/tr[XXX]/td[14]',
};

const universityTableComponents = {
  TABLE_UNIVERSITY_NAME: '//tbody/tr[XXX]/td[1]',
  TABLE_UNIVERSITY_UF: '//tbody/tr[XXX]/td[2]',
  TABLE_UNIVERSITY_AMOUNT_MASTER: '//tbody/tr[XXX]/td[11]',
  TABLE_UNIVERSITY_AMOUNT_DOCTORATE: '//tbody/tr[XXX]/td[12]',
  TABLE_UNIVERSITY_AMOUNT_PROFESSIONAL_MASTER: '//tbody/tr[XXX]/td[13]',
  TABLE_UNIVERSITY_AMOUNT_PROFESSIONAL_DOCTORATE: '//tbody/tr[XXX]/td[14]',
};

module.exports = {
  ...menuComponents,
  ...genericComponents,
  ...evaluationTableComponents,
  ...knowledgeTableComponents,
  ...universityTableComponents,
};
