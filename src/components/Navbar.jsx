import React from 'react';
import { ShoppingBag, Zap, User, LogOut, ShieldCheck } from 'lucide-react';

const Navbar = ({ onOpenAuth, user, onLogout, cartCount, onOpenCart, onOpenAdmin }) => {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2">
          <div className="bg-cyan-500 p-2 rounded-xl text-black font-black">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-wider text-white">
            VECTOR<span className="text-cyan-400">FPV</span>
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-400">
          <a href="#builder" className="hover:text-cyan-400 transition flex items-center space-x-1">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Custom Builder</span>
          </a>
          <a href="#products" className="hover:text-cyan-400 transition">Parts & Gear</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="bg-slate-900 hover:border-cyan-500 border border-slate-800 text-xs text-cyan-400 px-3 py-1.5 rounded-xl font-bold transition flex items-center space-x-1 cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Admin Panel</span>
          </button>

          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-300 hover:text-cyan-400 transition"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-cyan-400 text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Login */}
          {user ? (
            <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <User className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-white">{user.name}</span>
              <button onClick={onLogout} title="Logout" className="text-gray-400 hover:text-red-400 ml-2">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold text-sm transition shadow-lg shadow-cyan-500/20"
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;