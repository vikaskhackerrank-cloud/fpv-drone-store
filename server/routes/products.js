import express from 'express';
import Product from '../models/Product.js';
import { upload } = from '../config/cloudinary.js'; // 👈 .js extension aur curly braces zaroori hain

const router = express.Router();

// 1. GET Route: Fetch All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// 2. POST Route: Cloudinary Upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = req.file.path;

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description || `${req.body.name} - High Performance FPV Gear`,
      category: req.body.category || 'Frames',
      stock: req.body.stock || 10,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;