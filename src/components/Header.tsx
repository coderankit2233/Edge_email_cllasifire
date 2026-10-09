import React from 'react';
import { TabType } from '../types';
import { Printer, Download, Cpu, BookOpen, Play, Code2, Presentation } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenExport: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onPrint
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, single line */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-950/40">
            <Cpu className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            Trackmind <span className="font-normal text-slate-400">· Edge AI Classifier</span>
          </span>
        </div>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('docs')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeTab === 'docs'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Project Documentation
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeTab === 'simulator'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Edge Simulator Workbench
          </button>

          <button
            onClick={() => setActiveTab('hardware')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeTab === 'hardware'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Hardware & Memory Specs
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeTab === 'code'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Pipeline Codebase
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeTab === 'presentation'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'hover:text-white text-slate-400'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            Viva Defense Deck
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onPrint}
            title="Print or Save as Academic PDF"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md shadow-sm transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            Export Documentation
          </button>
        </div>
      </div>
    </header>
  );
};
