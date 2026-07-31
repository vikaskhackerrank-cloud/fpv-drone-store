import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomBuilder from './components/CustomBuilder';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false); // Admin Switch
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const pId = product.id || product._id;
      const existing = prev.find((item) => (item.id || item._id) === pId);
      if (existing) {
        return prev.map((item) =>
          (item.id || item._id) === pId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (pId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if ((item.id || item._id) === pId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (pId) => {
    setCartItems((prev) => prev.filter((item) => (item.id || item._id) !== pId));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Render Admin View
  if (isAdminView) {
    return <AdminDashboard onBackToStore={() => setIsAdminView(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)} 
        user={user} 
        onLogout={handleLogout} 
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminView(true)}
      />
      <Hero />
      
      <CustomBuilder onAddToCart={handleAddToCart} />

      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Popular FPV Accessories</h2>
            <p className="text-gray-400 text-sm mt-1">Fetched dynamically from Express API</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-cyan-400 font-semibold animate-pulse">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id || product._id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        user={user}
      />
    </div>
  );
}

export default App;