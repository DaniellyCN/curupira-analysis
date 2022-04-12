class KnowledgeArea {
  /**
   * Method to create an university instance.
   *
   * @param {*} name your full name for example: ENGENHARIA DE SOFTWARE
   * @param {*} evaluationArea your full name for example: CIÊNCIA DA COMPUTAÇÃO
   */
  constructor(name, evaluationArea) {
    this.name = name;
    this.evaluationArea = evaluationArea;
    this.universities = [];
  }

  addUniversity(university) {
    this.universities.push(university);
  }

  setMasterDegreeAmount(amount) {
    this.masterDegreeAmount = Number(amount.replace('\n', '').trim());
  }

  setProfessionalMasterDegreeAmount(amount) {
    this.professionalMasterDegreeAmount =  Number(amount.replace('\n', '').trim());
  }

  setDoctorateDegreeAmount(amount) {
    this.doctorateDegreeAmount =  Number(amount.replace('\n', '').trim());
  }

  setProfessionalDoctorateDegreeAmount(amount) {
    this.professionalDoctorateDegreeAmount =  Number(amount.replace('\n', '').trim());
  }

  getAllCoursesAmount() {
    return (
      this.doctorateDegreeAmount +
      this.masterDegreeAmount +
      this.professionalDoctorateDegreeAmount +
      this.professionalMasterDegreeAmount
    );
  }
}

module.exports = KnowledgeArea;
