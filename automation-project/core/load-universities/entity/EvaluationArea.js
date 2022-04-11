class EvaluationArea {
  /**
   * Method to create an university instance.
   *
   * @param {*} name your full name for example: CIÊNCIA DA COMPUTAÇÃO
   */
  constructor(name) {
    this.name = name;
    this.knowledgeAreas = [];
  }

  setMasterDegreeAmount(amount) {
    this.masterDegreeAmount = Number(amount.replace('\n', '').trim());
  }

  setProfessionalMasterDegreeAmount(amount) {
    this.professionalMasterDegreeAmount = Number(
      amount.replace('\n', '').trim()
    );
  }

  setDoctorateDegreeAmount(amount) {
    this.doctorateDegreeAmount = Number(amount.replace('\n', '').trim());
  }

  setProfessionalDoctorateDegreeAmount(amount) {
    this.professionalDoctorateDegreeAmount = Number(
      amount.replace('\n', '').trim()
    );
  }

  addKnowledgeArea(area) {
    this.knowledgeAreas.push(area);
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

module.exports = EvaluationArea;
