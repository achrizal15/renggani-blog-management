import User from '../models/users.js'; // Pastikan path ke model User sesuai

const users = [
  {
    name: 'ACH RIZAL',
    username: 'achrizal',
    email: 'achrizal@rks.com',
    password: '123456',
  },
];

const seedUsers = async () => {
  try {
    for (const user of users) {
      await User.create(user);
    }
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

seedUsers().then(() => {
  console.log('Seeding completed.');
  process.exit();
});
