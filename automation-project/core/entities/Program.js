class Program {
  constructor(name, code, university, types, status = 'IN OPERATION') {
    this.name = name;
    this.code = code;
    this.types = types;
    this.status = status;
    this.university = university;
  }

  setStatus(status) {
    this.status = status;
  }
}

module.exports = Program;
