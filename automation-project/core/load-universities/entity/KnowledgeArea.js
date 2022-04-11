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

  getMasterDegreeAmount() {
    return this.masterDegreeAmount;
  }

  getProfessionalMasterDegreeAmount() {
    return this.professionalMasterDegreeAmount;
  }

  getDoctorateDegreeAmount() {
    return this.doctorateDegreeAmount;
  }

  getProfessionalDoctorateDegreeAmount() {
    return this.professionalDoctorateDegreeAmount;
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
