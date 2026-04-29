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
    
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
        console.log('Admin already exists');
        process.exit();
    }

    const admin = new User({
        username: 'Admin',
        email: 'admin@example.com',
        password: 'adminpassword', // Will be hashed by pre-save hook
        role: 'admin'
    });

    await admin.save();
    console.log('Admin user created');
    console.log('Email: admin@example.com');
    console.log('Password: adminpassword');
    process.exit();
  })
  .catch(err => {
      console.error(err);
      process.exit(1);
  });
