import React, { useState, useEffect } from 'react';
import { Package, DollarSign, Clock, CheckCircle, RefreshCw, ShieldAlert, ArrowLeft } from 'lucide-react';

const AdminDashboard = ({ onBackToStore }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Orders from Express API
  const fetchOrders = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading admin orders:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Status in MongoDB
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Calculations
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Shipped').length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 sm:p-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <button
            onClick={onBackToStore}
            className="inline-flex items-center space-x-2 text-cyan-400 hover:underline text-xs font-bold mb-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to FPV Store</span>
          </button>
          <h1 className="text-3xl font-black tracking-wider flex items-center space-x-3">
            <span>VECTOR FPV ADMIN PANEL</span>
            <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2.5 py-1 rounded-full border border-cyan-500/30">
              Owner Mode
            </span>
          </h1>
        </div>

        <button
          onClick={fetchOrders}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Live Orders</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Analytics Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Revenue</p>
              <h3 className="text-2xl font-black text-cyan-400 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            </div>
            <div className="bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20 text-cyan-400">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Total Orders</p>
              <h3 className="text-2xl font-black text-white mt-1">{orders.length}</h3>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-400">
              <Package className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase">Active / In-Build</p>
              <h3 className="text-2xl font-black text-yellow-400 mt-1">{pendingOrders}</h3>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-xl border border-yellow-500/20 text-yellow-400">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Live Orders Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-5 border-b border-slate-800">
            <h3 className="font-bold text-lg text-white">Live Customer Orders</h3>
          </div>

          {loading ? (
            <div className="p-12 text-center text-cyan-400 font-semibold animate-pulse">
              Fetching database records...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500 text-sm">
              No orders placed yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-slate-950 text-gray-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Order Details</th>
                    <th className="py-3.5 px-4">Total Amount</th>
                    <th className="py-3.5 px-4">Order Date</th>
                    <th className="py-3.5 px-4">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-950/40 transition">
                      <td className="py-4 px-4 font-bold text-white">
                        {order.customerName || 'Pilot User'}
                      </td>
                      
                      <td className="py-4 px-4 max-w-xs">
                        {order.customBuild ? (
                          <div className="text-xs space-y-0.5">
                            <span className="text-cyan-400 font-semibold block">Custom Quad:</span>
                            <p className="truncate text-gray-300">{order.customBuild.frame}</p>
                          </div>
                        ) : order.items ? (
                          <div className="text-xs text-gray-300 truncate">
                            {order.items.map((i) => i.name).join(', ')}
                          </div>
                        ) : (
                          <span className="text-xs italic text-gray-500">Standard FPV Build</span>
                        )}
                      </td>

                      <td className="py-4 px-4 font-black text-cyan-400">
                        ₹{order.totalPrice?.toLocaleString('en-IN')}
                      </td>

                      <td className="py-4 px-4 text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={order.status || 'Payment Received / Assembling'}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 text-xs text-cyan-400 font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
                        >
                          <option value="Payment Received / Assembling">Assembling</option>
                          <option value="Betaflight Calibrated">Calibrated</option>
                          <option value="Flight Tested">Flight Tested</option>
                          <option value="Shipped">Shipped</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;