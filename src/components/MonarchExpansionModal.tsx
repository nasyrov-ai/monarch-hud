"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  X, 
  Brain, 
  Activity, 
  ScrollText, 
  Cpu,
  ChevronRight,
  RefreshCw,
  Search,
  Filter,
  Star,
  ShieldCheck,
  Code
} from 'lucide-react';
import { SoundService } from '@/services/SoundService';

interface ShadowSkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Skill {
  name: string;
  description: string;
  emoji?: string;
  eligible: boolean;
  source: string;
  bundled: boolean;
  rank?: string;
}

interface CronJob {
  id: string;
  name: string;
  enabled: boolean;
  schedule: any;
  state: {
    nextRunAtMs: number;
    lastRunAtMs: number;
    lastStatus: string;
    lastError?: string;
  };
}

interface MemoryScroll {
  name: string;
  path: string;
  content?: string;
}

export function MonarchExpansionModal({ isOpen, onClose }: ShadowSkillsModalProps) {
  const [activeTab, setActiveTab] = useState<'skills' | 'processes' | 'files'>('skills');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [processes, setProcesses] = useState<CronJob[]>([]);
  const [files, setFiles] = useState<MemoryScroll[]>([]);
  const [selectedFile, setSelectedFile] = useState<MemoryScroll | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchSkills();
      fetchProcesses();
      fetchFiles();
    }
  }, [isOpen]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      
      // Assign Ranks based on Solo Leveling logic
      const rankedSkills = data.map((s: Skill) => {
        let rank = 'E';
        if (s.source === 'openclaw-workspace') rank = 'A';
        else if (s.bundled && s.eligible) rank = 'S';
        else if (s.eligible) rank = 'B';
        else if (s.source === 'openclaw-managed') rank = 'C';
        return { ...s, rank };
      });
      
      setSkills(rankedSkills);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProcesses = async () => {
    try {
      const res = await fetch('/api/processes');
      const data = await res.json();
      setProcesses(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      const data = await res.json();
      setFiles(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFileContent = async (file: MemoryScroll) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/files?path=${encodeURIComponent(file.path)}`);
      const data = await res.json();
      setSelectedFile({ ...file, content: data.content });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'S': return 'text-purple-400 border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]';
      case 'A': return 'text-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]';
      case 'B': return 'text-emerald-400 border-emerald-400';
      case 'C': return 'text-amber-400 border-amber-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  const filteredSkills = skills.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-slate-950 border border-cyan-500/30 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <header className="px-6 py-4 border-b border-cyan-950/50 bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Zap className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-widest text-white uppercase italic">System Authority</h2>
                  <p className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-tighter">Monarch Expansion Interface</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
                {(['skills', 'processes', 'files'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      SoundService.playClick();
                      setActiveTab(tab);
                      setSelectedFile(null);
                    }}
                    className={`px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </header>

            {/* Sub-Header / Search */}
            <div className="px-6 py-3 border-b border-slate-900 bg-slate-950/50 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded px-10 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              <button 
                onClick={() => {
                  if (activeTab === 'skills') fetchSkills();
                  if (activeTab === 'processes') fetchProcesses();
                  if (activeTab === 'files') fetchFiles();
                }}
                className={`p-2 rounded border border-slate-800 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all ${loading ? 'animate-spin' : ''}`}
              >
                <RefreshCw size={14} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex">
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {activeTab === 'skills' && (
                    <motion.div 
                      key="skills"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                    >
                      {filteredSkills.map((skill) => (
                        <div 
                          key={skill.name}
                          className="group p-4 rounded-lg border border-slate-800 bg-slate-900/40 hover:border-cyan-500/20 transition-all relative overflow-hidden"
                        >
                          <div className={`absolute top-0 right-0 px-2 py-1 border-b border-l text-[10px] font-black italic rounded-bl ${getRankColor(skill.rank || 'E')}`}>
                            {skill.rank}-RANK
                          </div>
                          
                          <div className="flex items-start gap-4 mb-3">
                            <div className="text-2xl">{skill.emoji || '🔮'}</div>
                            <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{skill.name}</h4>
                              <p className="text-[10px] text-cyan-500/60 font-mono italic">{skill.source}</p>
                            </div>
                          </div>
                          
                          <p className="text-[11px] text-slate-400 line-clamp-2 font-mono leading-relaxed mb-4">
                            {skill.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {skill.eligible && <ShieldCheck size={14} className="text-emerald-500" title="Eligible" />}
                              {skill.bundled && <Package size={14} className="text-indigo-500" title="Bundled" />}
                            </div>
                            <button className="text-[9px] font-mono text-slate-600 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                              Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'processes' && (
                    <motion.div 
                      key="processes"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {processes.map((proc) => (
                        <div key={proc.id} className="p-4 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between group hover:border-emerald-500/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded bg-slate-950 border border-slate-800 flex items-center justify-center ${proc.enabled ? 'text-emerald-400' : 'text-slate-600'}`}>
                              <Cpu size={24} className={proc.enabled ? 'animate-pulse' : ''} />
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest">{proc.name}</h4>
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${
                                  proc.state.lastStatus === 'ok' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'
                                }`}>
                                  {proc.state.lastStatus.toUpperCase()}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 mt-1 font-mono text-[10px]">
                                <span className="text-slate-500">NEXT: <span className="text-cyan-400">{new Date(proc.state.nextRunAtMs).toLocaleString()}</span></span>
                                <span className="text-slate-500">LAST: <span className="text-slate-400">{new Date(proc.state.lastRunAtMs).toLocaleTimeString()}</span></span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className={`w-3 h-3 rounded-full ${proc.enabled ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                            <span className="text-[9px] font-mono text-slate-600 uppercase">Sentinel Mode</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'files' && (
                    <motion.div 
                      key="files"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="space-y-3">
                        {files.map((file) => (
                          <button
                            key={file.path}
                            onClick={() => {
                              SoundService.playClick();
                              fetchFileContent(file);
                            }}
                            className={`w-full p-4 rounded-lg border text-left transition-all flex items-center gap-4 ${
                              selectedFile?.path === file.path 
                                ? 'bg-cyan-500/10 border-cyan-500/40' 
                                : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/20'
                            }`}
                          >
                            <ScrollText className={selectedFile?.path === file.path ? 'text-cyan-400' : 'text-slate-500'} size={24} />
                            <div>
                              <h4 className={`text-sm font-bold uppercase tracking-widest ${selectedFile?.path === file.path ? 'text-white' : 'text-slate-300'}`}>
                                {file.name}
                              </h4>
                              <p className="text-[9px] font-mono text-slate-600 truncate max-w-[200px]">{file.path}</p>
                            </div>
                            <ChevronRight className="ml-auto text-slate-700" size={18} />
                          </button>
                        ))}
                      </div>

                      <div className="bg-slate-950/50 border border-slate-900 rounded-lg p-6 font-mono overflow-hidden flex flex-col min-h-[400px]">
                        {selectedFile ? (
                          <>
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                              <span className="text-[10px] text-cyan-500 uppercase">Scroll Decrypted: {selectedFile.name}</span>
                            </div>
                            <div className="flex-1 overflow-y-auto text-[11px] text-slate-400 leading-relaxed custom-scrollbar whitespace-pre-wrap italic">
                              {selectedFile.content}
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-4 opacity-50">
                            <ScrollText size={48} />
                            <span className="text-xs uppercase tracking-[0.2em]">Select a scroll to decrypt</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <footer className="px-6 py-3 border-t border-cyan-950/50 bg-slate-900/50 flex justify-between items-center">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase italic">Encryption: <span className="text-emerald-400/70">Shadow-Standard</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase italic">Link: <span className="text-cyan-400/70">OpenClaw Bridge 1.0</span></span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-600 italic">
                {activeTab === 'skills' ? `${skills.length} Shadows Registered` : 
                 activeTab === 'processes' ? `${processes.length} Sentinels Active` :
                 `${files.length} Ancient Scrolls Detected`}
              </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
