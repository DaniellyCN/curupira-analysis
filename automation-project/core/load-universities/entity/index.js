class University {
  /**
   * Method to create an university instance.
   *
   * @param {*} name your full name for example: Universidade Federal do Pampa
   * @param {*} initials your initials for example: UNIPAMPA
   */
  constructor(name, initials) {
    this.name = name;
    this.initials = initials;
  }

  setMasterDegreeAmount(amount) {
    this.masterDegreeAmount = amount;
  }

  setProfessionalMasterDegreeAmount(amount) {
    this.professionalMasterDegreeAmount = amount;
  }

  setDoctorateDegreeAmount(amount) {
    this.doctorateDegreeAmount = amount;
  }

  setProfessionalDoctorateDegreeAmount(amount) {
    this.professionalDoctorateDegreeAmount = amount;
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

module.exports = University;
