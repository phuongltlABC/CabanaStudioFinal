import mongoose from 'mongoose';

//Định nghĩa Schema cho Products
const productSchema = new mongoose.Schema({
  "Product ID": String,
  "name": String,
  "brand": String,
  "description": String,
  "room": String,
  "type": String,
  "color": String,
  "material": String,
  "price": Number,
  "stock": Number,
  "status": String,
  "discount": Object,
  "dimensions": Object,
  "images": [String]
}, { collection: 'products' });

const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
//  // Export model để sử dụng ở nơi khác
export default Product; // ✅ Dùng export default thay vì module.exports