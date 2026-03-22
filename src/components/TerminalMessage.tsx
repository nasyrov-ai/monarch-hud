"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TerminalMessageProps {
  text: string;
  type?: 'info' | 'error' | 'warning' | 'success';
}

export const TerminalMessage = ({ text, type = 'info' }: TerminalMessageProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < text.length) {
        setDisplayedText(text.slice(0, current + 1));
        current++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  const isCritical = type === 'error' || type === 'warning' || text.includes('ERROR') || text.includes('WARNING');

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      className={`border-l-2 pl-4 py-1 font-mono text-sm ${
        isCritical ? 'border-red-500 text-red-400' : 'border-cyan-500/20 text-slate-300'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className={`uppercase font-bold text-[10px] mt-1 ${isCritical ? 'text-red-500 animate-pulse' : 'text-cyan-500'}`}>
          {isCritical ? '[CRITICAL]' : 'SYSTEM:'}
        </span>
        <span className={isCritical ? 'glitch-text' : ''}>
          {displayedText}
          {!isDone && <span className="animate-pulse">_</span>}
        </span>
      </div>
      
      {isCritical && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="absolute inset-0 bg-red-500/5 pointer-events-none"
        />
      )}
    </motion.div>
  );
};
