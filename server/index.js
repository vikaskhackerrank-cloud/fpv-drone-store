import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import Product from './models/Product.js';
import Order from './models/Order.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import productRoutes from './routes/products.js'; // 👈 Fixed import syntax

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Health Check
app.get('/', (req, res) => {
  res.send('⚡ VectorFPV Database Server Active!');
});

// Auth Routes Link
app.use('/api/auth', authRoutes);

// Admin Routes Link
app.use('/api/admin', adminRoutes);

// Products Routes Link (Includes Cloudinary /upload and / get)
app.use('/api/products', productRoutes);

// Orders API
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Drone Build Order Received!', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Order Placement Failed' });
  }
});

// 💳 Razorpay Order Creation Route (Test Mode)
app.post('/api/payment/create-order', (req, res) => {
  const { amount } = req.body;
  
  // Dummy order object for testing Razorpay flow
  const order = {
    id: `order_rzp_${Date.now()}`,
    currency: "INR",
    amount: amount * 100, // convert rupees to paise
  };

  res.json({ success: true, order });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 })
  .then(() => {
    console.log('✅ Connected to MongoDB Cloud Database Successfully!');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.log('❌ DB Connection Error:', err.message));