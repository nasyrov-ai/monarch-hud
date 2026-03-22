"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, X, CheckCircle2, Circle } from 'lucide-react';
import { useQuests } from '@/hooks/useQuests';

interface QuestLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuestLogModal = ({ isOpen, onClose }: QuestLogModalProps) => {
  const { quests, loading } = useQuests();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0.9, opacity: 0, x: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden"
        >
          <div className="p-4 border-b border-cyan-500/20 flex justify-between items-center bg-cyan-950/20">
            <h2 className="text-cyan-400 font-mono flex items-center gap-2 tracking-widest uppercase">
              <Scroll size={18} /> Quest Log
            </h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : quests.length === 0 ? (
              <div className="text-center py-12 text-slate-500 font-mono italic">
                No active quests found in the system.
              </div>
            ) : (
              <div className="space-y-4">
                {quests.map((quest, i) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded border ${
                      quest.status === 'completed' 
                        ? 'bg-emerald-500/5 border-emerald-500/20' 
                        : 'bg-slate-950/50 border-slate-800'
                    } group`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {quest.status === 'completed' ? (
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        ) : (
                          <Circle size={16} className="text-cyan-500 animate-pulse" />
                        )}
                        <h3 className={`text-sm font-bold ${quest.status === 'completed' ? 'text-emerald-400' : 'text-white'}`}>
                          {quest.title}
                        </h3>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        quest.rank === 'S' ? 'border-orange-500 text-orange-400' : 
                        quest.rank === 'A' ? 'border-purple-500 text-purple-400' :
                        'border-cyan-500 text-cyan-400'
                      }`}>
                        RANK {quest.rank}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{quest.description}</p>
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                      <div className="text-cyan-500/70">REWARD: {quest.reward_xp} XP</div>
                      <div className={quest.status === 'completed' ? 'text-emerald-500' : 'text-cyan-500'}>
                        {quest.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950/50 border-t border-slate-800 text-[10px] font-mono text-cyan-500/50 flex justify-center">
            DAILY QUESTS RESET IN 04:22:11
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
