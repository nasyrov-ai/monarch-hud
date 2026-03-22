"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MonarchHUD() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-cyan-400 flex items-center justify-center font-mono">
      <div className="p-12 border border-cyan-500/30 rounded-lg bg-slate-900/40 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.1)] text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="text-[10px] text-cyan-500/50 uppercase tracking-[0.5em] mb-2">System Status</div>
          <h1 className="text-4xl font-bold tracking-[0.2em] uppercase text-white shadow-cyan-500/50">
            Arise
          </h1>
        </motion.div>
        
        <div className="w-80 h-1 bg-slate-800 rounded-full overflow-hidden mb-6 mx-auto">
          <motion.div 
            initial={{ x: "-100%" }} 
            animate={{ x: "100%" }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"
          />
        </div>

        <div className="space-y-2 text-[12px] uppercase tracking-widest text-cyan-400/80">
          <p className="animate-pulse">Initializing Neural Link...</p>
          <p className="text-[10px] text-slate-500">Establishing Secure Tunnel: Gateway 18789</p>
        </div>
      </div>
    </div>
  );
}
