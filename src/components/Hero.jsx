import React from 'react';
import { ShieldCheck, Cpu, Zap, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-slate-950 overflow-hidden border-b border-slate-800">
      {/* Background Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-medium">
            <Zap className="h-4 w-4" />
            <span>Next-Gen FPV Manufacturing & Supplies</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            FLY HIGHER WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
              CUSTOM BUILT QUADS
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
            From high-KV brushless motors to carbon fiber frames and digital VTX systems. 
            We build and ship pilot-tested FPV drones & accessories worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#builder"
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold px-8 py-3.5 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-cyan-500/20"
            >
              <span>⚡ Start Custom Drone Builder</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            
            <a
              href="#products"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-8 py-3.5 rounded-xl transition"
            >
              Explore Accessories
            </a>
          </div>

          {/* Features Badges */}
          <div className="grid grid-cols-3 gap-4 pt-12 border-t border-slate-800/80 mt-12 text-gray-400 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-cyan-400" />
              <span>Tested & Calibrated</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <span>Betaflight Ready</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span>Express Shipping</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;