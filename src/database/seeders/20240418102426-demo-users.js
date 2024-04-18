import bcrypt from 'bcrypt';
import model from '../../models';

const { User } = model;

const NUM_USERS = 10;
let seededUsers = [];

const generateUsers = async () => {
  try {
    let dummyPhoneNumber = '1234567890';
    const fakeUsers = Array.from({ length: NUM_USERS }, (_, index) => ({
      name: `User${index + 1}`,
      email: `user${index + 1}@example.com`,
      password: 'password123',
      phone: (dummyPhoneNumber++).toString()
    }));

    const usersWithHashedPasswords = await Promise.all(fakeUsers.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    }));

    const createdUsers = await User.bulkCreate(usersWithHashedPasswords);
    seededUsers = createdUsers.map(user => user.id);

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const undoSeeding = async () => {
  try {
    await User.destroy({ where: { id: seededUsers } });
    console.log('Seeding undone successfully!');
  } catch (error) {
    console.error('Error undoing seeding:', error);
  }
};

export const up = async () => {
  await generateUsers();
};

export const down = async () => {
  await undoSeeding();
};
