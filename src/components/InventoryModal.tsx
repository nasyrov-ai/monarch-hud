"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Package, X, Shield, Sword, Box, Zap, Lock, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InventoryItem {
  name: string;
  rank: string;
  type: string;
  description: string;
  status: string;
}

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryModal = ({ isOpen, onClose }: InventoryModalProps) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // In a real app we'd fetch this from an API route that reads the file
    // For now, I'll simulate the data based on what I read from INVENTORY.md
    setItems([
      {
        rank: 'S',
        name: 'Shadow Lip-Sync Engine (Wav2Lip-HD)',
        type: 'Visual Synthesis Artifact',
        description: 'Allows the Player to breathe life into static images, creating high-fidelity VSL videos.',
        status: 'Offline (Ready for Activation)'
      },
      {
        rank: 'A',
        name: 'ElevenLabs Voice Forge',
        type: 'Sonic Alchemy',
        description: 'Generates human-like voices for any GEO. Core asset of the VSL-Automation pipeline.',
        status: 'Active (API Integration Ready)'
      },
      {
        rank: 'A',
        name: 'Antigravity Image Generator',
        type: 'Creative Manifestation',
        description: 'Generates high-resolution visuals via Gemini 3 Pro.',
        status: 'Active'
      },
      {
        rank: 'S',
        name: 'Git Protection Layer',
        type: 'System Defense',
        description: 'Protects the core configuration (openclaw.json) from corruption and resets.',
        status: 'Active (Version Control Engaged)'
      },
      {
        rank: 'Quest',
        name: 'Supabase Master Key',
        type: 'Authentication Artifact',
        description: 'Provides full access to the System\'s memory and stats.',
        status: 'In Player\'s Possession'
      }
    ]);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
        />
        
        {/* Solo Leveling Style Modal */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, rotateX: 10 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.95, opacity: 0, rotateX: 10 }}
          className="relative w-full max-w-4xl bg-slate-900 border-2 border-cyan-500/40 rounded-sm shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b-2 border-cyan-500/20 flex justify-between items-center bg-gradient-to-r from-cyan-950/40 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Package className="text-cyan-400" size={24} />
              </div>
              <div>
                <h2 className="text-cyan-400 font-black text-2xl flex items-center gap-2 tracking-[0.2em] uppercase italic">
                  Inventory Vault
                </h2>
                <div className="flex gap-4 mt-1">
                  <span className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">Storage Unit: Delta-9</span>
                  <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest">Access Granted</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 border border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:border-cyan-500/50 transition-all hover:bg-cyan-500/10"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-12 h-[600px]">
            {/* Sidebar Stats */}
            <div className="col-span-3 border-r border-slate-800 p-6 bg-slate-950/30 flex flex-col gap-8">
              <div>
                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Categories</h4>
                <div className="space-y-2">
                  {[
                    { icon: Sword, label: 'Weapons', count: 1 },
                    { icon: Shield, label: 'Defense', count: 1 },
                    { icon: Zap, label: 'Skills', count: 2 },
                    { icon: Compass, label: 'Quest', count: 1 }
                  ].map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-cyan-500/5 rounded transition-colors">
                      <div className="flex items-center gap-3">
                        <cat.icon size={14} className="text-slate-500 group-hover:text-cyan-400" />
                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider">{cat.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-600">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Lock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Monarch Authority</span>
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed font-mono">Only the Shadow Monarch can access the deeper layers of this vault.</p>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="col-span-9 p-8 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.05)_0%,transparent_100%)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-sm bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group relative overflow-hidden"
                  >
                    {/* Background Icon */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      {item.rank === 'S' ? <Zap size={80} /> : <Box size={80} />}
                    </div>

                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-sm border ${
                        item.rank === 'S' ? 'border-orange-500 text-orange-400 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 
                        item.rank === 'A' ? 'border-purple-500 text-purple-400 bg-purple-500/10' :
                        'border-cyan-500 text-cyan-400 bg-cyan-500/10'
                      }`}>
                        RANK {item.rank}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">{item.type}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-wider relative z-10">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 min-h-[3rem] relative z-10">
                      {item.description}
                    </p>
                    
                    <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.status.includes('Active') || item.status.includes('Possession') ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-red-500 shadow-[0_0_5px_#ef4444]'}`}></div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">{item.status}</span>
                      </div>
                      <button className="text-[9px] font-mono text-cyan-500 hover:text-white uppercase tracking-widest transition-colors">
                        Details →
                      </button>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-700" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950 border-t-2 border-cyan-500/20 text-[10px] font-mono text-cyan-500/30 flex justify-between items-center px-8">
            <div className="flex gap-6">
              <span>VAULT ID: MONARCH-X-77</span>
              <span>SECURITY: CLASS-S</span>
            </div>
            <div className="flex gap-6">
              <span>STORAGE: {items.length} / UNLIMITED</span>
              <span>LAST SYNC: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
