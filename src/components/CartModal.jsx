import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, user }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleTestCheckout = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);

    try {
      const orderPayload = {
        customerName: user ? user.name : "Guest Pilot",
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: totalAmount,
        status: "Payment Received / Assembling"
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
          onClose();
          window.location.reload();
        }, 2000);
      } else {
        console.error("Server returned error:", data);
        alert("Checkout Failed: " + (data.error || "Server issue"));
        setLoading(false);
      }

    } catch (err) {
      console.error("Order network error:", err);
      setLoading(false);
      alert("Checkout Network Error!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 flex flex-col justify-between relative shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Your Shopping Cart</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {success ? (
              <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl text-center space-y-3 my-8">
                <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Payment Successful!</h4>
                <p className="text-xs text-green-400">Order saved to Cloud Database & Sent to Admin Dashboard!</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                Your cart is empty. Add some FPV gear!
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id || item._id} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  
                  <div className="flex-1 px-3">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                    <p className="text-cyan-400 text-xs font-semibold mt-0.5">₹{item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900">
                      <button
                        onClick={() => onUpdateQuantity(item.id || item._id, -1)}
                        className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1.5 text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id || item._id, 1)}
                        className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id || item._id)}
                      className="text-gray-500 hover:text-red-400 transition p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && !success && (
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-xl font-black text-cyan-400">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center space-x-1.5 text-[11px] text-gray-500 justify-center">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <span>Secured Test Checkout Gateway</span>
            </div>

            <button
              onClick={handleTestCheckout}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2 text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Pay ₹{totalAmount.toLocaleString('en-IN')} Now</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;