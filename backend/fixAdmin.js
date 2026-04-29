const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('MongoDB connected');
    
    // Force update the admin user to have role 'admin'
    const res = await User.updateOne(
        { email: 'admin@example.com' },
        { $set: { role: 'admin' } }
    );

    if (res.matchedCount === 0) {
        console.log('Admin user not found. Please register as admin@example.com first.');
    } else {
        console.log('Successfully updated admin@example.com to role: ADMIN');
    }

    process.exit();
  })
  .catch(err => {
      console.error(err);
      process.exit(1);
  });
