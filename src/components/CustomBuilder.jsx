import React, { useState } from 'react';
import { Cpu, CheckCircle2, Sparkles, ShoppingBag } from 'lucide-react';

const builderParts = {
  frames: [
    { id: 'f1', name: 'Vector X5 Freestyle Carbon Frame (5-inch)', price: 3499, spec: '5mm Arms | 3K Carbon' },
    { id: 'f2', name: 'Vector Cinewhoop 3-inch Frame (Ducts)', price: 2999, spec: 'Protected Propellers | HD Cam Ready' },
  ],
  motors: [
    { id: 'm1', name: 'Vector 2207 1960KV Motors (4x Set) - 6S', price: 6999, spec: 'High Speed | Freestyle' },
    { id: 'm2', name: 'Vector 1404 3800KV Motors (4x Set) - 4S', price: 4999, spec: 'Lightweight | Long Range' },
  ],
  stacks: [
    { id: 's1', name: 'F722 Flight Controller + 55A 4-in-1 ESC', price: 8999, spec: 'Betaflight | O3 Compatible' },
    { id: 's2', name: 'F411 AIO 20A Flight Controller + ESC', price: 4500, spec: 'Compact Micro Build' },
  ],
  vtx: [
    { id: 'v1', name: 'DJI O3 HD Digital Air Unit Camera Kit', price: 21999, spec: '4K/60fps Recording | Digital HD' },
    { id: 'v2', name: '5.8GHz 800mW Analog VTX + Foxeer Cam', price: 3999, spec: 'Ultra Low Latency | Analog' },
  ]
};

const CustomBuilder = ({ onAddToCart }) => {
  const [selected, setSelected] = useState({
    frame: builderParts.frames[0],
    motor: builderParts.motors[0],
    stack: builderParts.stacks[0],
    vtx: builderParts.vtx[0],
  });

  const [added, setAdded] = useState(false);

  const totalPrice = Object.values(selected).reduce((sum, item) => sum + (item ? item.price : 0), 0);

  const handleAddBuildToCart = () => {
    const customDroneProduct = {
      _id: `custom-build-${Date.now()}`,
      name: `Custom Quad (${selected.frame.name.split(' ')[1]} Build)`,
      category: 'Custom Drone',
      price: totalPrice,
      specs: `${selected.frame.name} + ${selected.motor.name} + ${selected.stack.name} + ${selected.vtx.name}`,
      image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&auto=format&fit=crop&q=60'
    };

    if (onAddToCart) {
      onAddToCart(customDroneProduct);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section id="builder" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="h-4 w-4" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            CUSTOM FPV DRONE BUILDER
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Select components. We assemble, Betaflight-tune, and flight test your drone before delivery!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Frame */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">1. Select Frame</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderParts.frames.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelected({ ...selected, frame: item })}
                    className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-start ${
                      selected.frame.id === item.id
                        ? 'bg-cyan-950/30 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.spec}</p>
                    </div>
                    <span className="font-semibold text-sm text-cyan-400">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Motors */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">2. Select Motors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderParts.motors.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelected({ ...selected, motor: item })}
                    className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-start ${
                      selected.motor.id === item.id
                        ? 'bg-cyan-950/30 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.spec}</p>
                    </div>
                    <span className="font-semibold text-sm text-cyan-400">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FC + ESC */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">3. Flight Controller & ESC</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderParts.stacks.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelected({ ...selected, stack: item })}
                    className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-start ${
                      selected.stack.id === item.id
                        ? 'bg-cyan-950/30 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.spec}</p>
                    </div>
                    <span className="font-semibold text-sm text-cyan-400">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3">4. FPV Camera & VTX</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builderParts.vtx.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelected({ ...selected, vtx: item })}
                    className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-start ${
                      selected.vtx.id === item.id
                        ? 'bg-cyan-950/30 border-cyan-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.spec}</p>
                    </div>
                    <span className="font-semibold text-sm text-cyan-400">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Build Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 sticky top-24 space-y-6">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
                <Cpu className="h-6 w-6 text-cyan-400" />
                <h3 className="font-extrabold text-lg">Build Summary</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-xs text-gray-500">Frame:</span>
                  <span className="font-semibold text-xs text-right max-w-[180px] truncate">{selected.frame.name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-xs text-gray-500">Motors:</span>
                  <span className="font-semibold text-xs text-right max-w-[180px] truncate">{selected.motor.name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-xs text-gray-500">FC + ESC:</span>
                  <span className="font-semibold text-xs text-right max-w-[180px] truncate">{selected.stack.name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-xs text-gray-500">Video:</span>
                  <span className="font-semibold text-xs text-right max-w-[180px] truncate">{selected.vtx.name}</span>
                </div>
              </div>

              {added && (
                <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-xl text-green-400 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Added Custom Drone to Cart!</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-gray-500 block">Total Price</span>
                    <span className="text-2xl font-black text-cyan-400">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleAddBuildToCart}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-3 rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add Custom Drone to Cart</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CustomBuilder;