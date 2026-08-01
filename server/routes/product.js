const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../config/cloudinary');

// POST Route: Image Upload + Create Product
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Cloudinary returns the uploaded image URL in req.file.path
    const imageUrl = req.file.path;

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      stock: req.body.stock,
      image: imageUrl, // Saving ONLY the Cloudinary URL in MongoDB
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

module.exports = router;