import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: "Vector X5 Freestyle Carbon Frame (5-inch)",
    category: "Frames",
    price: 3499,
    rating: 4.9,
    specs: "3K Full Carbon Fiber, 5mm arms, T-Motor compatibility.",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "Vector 2207 1960KV Motors (4x Set)",
    category: "Motors",
    price: 6999,
    rating: 4.8,
    specs: "High torque 6S motors designed for extreme freestyle.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "F722 FC + 55A 4-in-1 ESC Stack",
    category: "Electronics",
    price: 8999,
    rating: 5.0,
    specs: "Betaflight ready with high performance 32-bit ESC.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60"
  },
  {
    name: "DJI O3 HD Digital Air Unit Kit",
    category: "VTX & Camera",
    price: 21999,
    rating: 5.0,
    specs: "4K 60fps recording, ultra-low latency digital transmission.",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&auto=format&fit=crop&q=60"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({}); // Purana empty list clear karega
    await Product.insertMany(sampleProducts); // Sample products database me daal dega
    console.log("✅ Sample Products Successfully Added to MongoDB!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();