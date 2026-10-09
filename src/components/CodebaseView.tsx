import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/projectData';
import { Terminal, Copy, Check, FileCode, Database, Cpu } from 'lucide-react';

export const CodebaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'schema' | 'jinja' | 'setup'>('pipeline');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (key: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const currentCode = 
    activeTab === 'pipeline' ? CODE_SNIPPETS.pipelinePy :
    activeTab === 'schema' ? CODE_SNIPPETS.sqliteSchema :
    activeTab === 'jinja' ? CODE_SNIPPETS.jinjaTemplate :
    CODE_SNIPPETS.jetsonSetupSh;

  const currentFileName = 
    activeTab === 'pipeline' ? 'edge_classifier/pipeline.py' :
    activeTab === 'schema' ? 'edge_classifier/schema.sql' :
    activeTab === 'jinja' ? 'edge_classifier/templates/ticket_reply.j2' :
    'edge_classifier/setup_jetson.sh';

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
          Production Edge Pipeline Implementation
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Edge Scripts & Deployment Codebases
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Clean, documented Python, SQL, Jinja2, and Bash implementation scripts configured specifically for the NVIDIA Jetson Orin Nano hardware platform.
        </p>
      </div>

      {/* Code File Selector Tabs */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'pipeline'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            pipeline.py (LangChain & SLM)
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            schema.sql (SQLite Store)
          </button>

          <button
            onClick={() => setActiveTab('jinja')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'jinja'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            ticket_reply.j2 (Jinja2 Template)
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'setup'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            setup_jetson.sh (Environment Setup)
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={() => handleCopy(activeTab, currentCode)}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {copied === activeTab ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy File Code
            </>
          )}
        </button>
      </div>

      {/* Code Display Container */}
      <div className="mt-4 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
            <span className="text-slate-200">{currentFileName}</span>
          </div>
          <span>UTF-8 · LF</span>
        </div>

        <pre className="p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[640px]">
          <code>{currentCode}</code>
        </pre>
      </div>
    </div>
  );
};
