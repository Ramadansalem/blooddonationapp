// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ استدعاء مسارات المستخدمين والتبرعات وطلبات الدم والإدارة
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const bloodRequestRoutes = require('./routes/bloodRequestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bloodUnitRoutes = require('./routes/bloodUnitRoutes');
const campaignRoutes = require('./routes/campaignRoutes');

// ✅ إنشاء تطبيق Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ طباعة كل طلب يدخل إلى السيرفر لتتبعه
app.use((req, res, next) => {
  console.log(`📥 تم استقبال طلب: ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ ميدل وير
app.use(cors());
app.use(express.json());

// ✅ ربط المسارات
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/blood-units', bloodUnitRoutes);
app.use('/api/campaigns', campaignRoutes);

// ✅ مسار اختبار بسيط
app.get('/', (req, res) => {
  res.send('🚑 Blood Bank API is running...');
});

// ✅ الاتصال بـ MongoDB
const connectToDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('❌ MONGO_URI is not defined in .env file');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectToDatabase();
