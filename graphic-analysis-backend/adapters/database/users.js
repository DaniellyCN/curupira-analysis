const getUsers = () => [
  {
    username: 'yuryalencar',
    password: '$2a$10$FRXeMo65p043QqwSNAGQaOQrh6ldXnvvi9TUPTB8AmNd6NTrE.FU6',
    permissions: [''],
  },
];

const findUserByUsername = username => {
  const users = getUsers();
  return users.find(
    user => user.username.toLowerCase().trim() === username.toLowerCase().trim()
  );
};

module.exports = { findUserByUsername };
