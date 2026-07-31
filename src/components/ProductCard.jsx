import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/50 transition group">
      <div>
        <div className="relative overflow-hidden rounded-xl h-48 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 text-yellow-400 text-xs font-bold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{product.rating || 5.0}</span>
          </div>
        </div>

        <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-gray-400 text-xs line-clamp-2 mb-4">{product.specs}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <span className="text-lg font-black text-cyan-400">₹{product.price?.toLocaleString('en-IN')}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-slate-800 hover:bg-cyan-500 hover:text-black text-white p-2.5 rounded-xl transition flex items-center space-x-1.5 text-xs font-bold"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;