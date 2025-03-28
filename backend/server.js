import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Đọc file .env
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log(' MongoDB connect error:', err));

// ============ SCHEMA + MODEL ============
// 🛒 Định nghĩa Schema cho Orders
const orderSchema = new mongoose.Schema({
    "Order ID": String,
    "Customer ID": String,
    "Product ID": String,
    "Total Value": Number,
    "Promo Code": String,
    "Status": String,
    "Created Date": String,
    "Completed Date": String,
    "Payment Date": String,
    "Payment Method": String,
    "Estimated Delivery": String,  // Ngày dự kiến giao hàng
    "Shipping Address": String,    // Địa chỉ giao hàng
    "Phone Number": String,        // Số điện thoại
    "Return Requested": Boolean,   // Cho checkbox Return
    "Voucher Code": String         // Mã voucher
  }, { collection: 'orders' });
const Order = mongoose.model('Order', orderSchema);

// 📦 Định nghĩa Schema cho Order Items
const orderItemSchema = new mongoose.Schema({
  "Order ID": String,
  "Product ID": String,
  "Quantity": Number,
  "Unit Price": Number,
  "Total Price": Number
}, { collection: 'orderitems' });

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

// 🏷️ Định nghĩa Schema cho Products
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

// ============ ROUTES ============

// 1️⃣ Lấy toàn bộ đơn hàng
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2️⃣ Lấy 1 đơn hàng + danh sách item (có thông tin sản phẩm)
app.get('/orders/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params;
    const order = await Order.findOne({ "Order ID": orderID });

    if (!order) {
      return res.status(404).json({ message: '❌ Order not found' });
    }

    // Lấy danh sách order items
    const orderItems = await OrderItem.find({ "Order ID": orderID });

    // "JOIN" thông tin sản phẩm vào từng item
    const enrichedOrderItems = await Promise.all(orderItems.map(async item => {
      const product = await Product.findOne({ "Product ID": item["Product ID"] });
      return { ...item.toObject(), productDetails: product };
    }));

    return res.json({ order, orderItems: enrichedOrderItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với API của chúng tôi!');
});

