"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, max, color }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-mono text-white">{value}</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(34,211,238,0.5)]`}
        />
      </div>
    </div>
  );
};
