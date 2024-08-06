const bcrypt = require('bcryptjs');
const db = require('./models'); // Adjust path if necessary

async function createAdmin() {
  try {
    const username = 'admin1'; // Change this to your preferred admin username
    const password = 'admin1password'; // Change this to your preferred admin password
    const email = 'admin1@example.com'; // Change this to your preferred admin email

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the admin user
    const adminUser = await db.User.create({
      username,
      password: hashedPassword,
      email,
      role: 'admin' // Ensure 'admin' role is set
    });

    console.log('Admin user created successfully:', adminUser);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin();
