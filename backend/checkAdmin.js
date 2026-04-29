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
    
    // Find the admin user
    const user = await User.findOne({ email: 'admin@example.com' });

    if (!user) {
        console.log('❌ User admin@example.com NOT FOUND in database.');
    } else {
        console.log('✅ User Found:');
        console.log(`Username: ${user.username}`);
        console.log(`Email:    ${user.email}`);
        console.log(`Role:     ${user.role}`);
        console.log(`ID:       ${user._id}`);
    }

    process.exit();
  })
  .catch(err => {
      console.error(err);
      process.exit(1);
  });
