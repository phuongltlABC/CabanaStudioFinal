// const express = require('express');
// const Product = require('../models/Product'); 
// routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET: Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Truy vấn toàn bộ sản phẩm
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Lấy thông tin chi tiết của một sản phẩm theo ID
// router.get('/:productID', async (req, res) => {
//     try {
//         const { productID } = req.params;
//         console.log("Received productID:", productID);  
//         const product = await Product.findOne({ "productId": productID });

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.json(product);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


router.get('/:productID', async (req, res) => {
  try {
      const { productID } = req.params;
      console.log("Received productID:", productID);  // Log giá trị của productID nhận từ URL

      // Kiểm tra xem productId có khớp với giá trị trong cơ sở dữ liệu không
      const product = await Product.findOne({ "productId": productID });

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// module.exports = router;
export default router; // Dùng export default thay vì module.exports