import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { type: String, default: 'Pilot User' },
  items: { type: Array, default: [] },
  customBuild: { type: Object, default: null },
  totalPrice: { type: Number, required: true },
  paymentId: { type: String, default: 'PAY_TEST_' + Date.now() },
  status: { type: String, default: 'Payment Received / Assembling' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);