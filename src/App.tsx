import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { AcademicHeader } from './components/AcademicHeader';
import { DocumentationView } from './components/DocumentationView';
import { EdgeSimulator } from './components/EdgeSimulator';
import { HardwareSpecsView } from './components/HardwareSpecsView';
import { CodebaseView } from './components/CodebaseView';
import { PresentationMode } from './components/PresentationMode';
import { ExportModal } from './components/ExportModal';
import { PROJECT_METADATA } from './data/projectData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('docs');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handlePrint = () => {
    // Switch to docs tab for printing so full report is printed
    setActiveTab('docs');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Universal 3-Zone Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        onPrint={handlePrint}
      />

      {/* Official Academic Institution Strip */}
      <AcademicHeader />

      {/* Primary Workspace View based on Tab */}
      <main className="flex-1 pb-16">
        {activeTab === 'docs' && (
          <DocumentationView
            onSwitchToSimulator={() => setActiveTab('simulator')}
            onSwitchToHardware={() => setActiveTab('hardware')}
            onSwitchToCode={() => setActiveTab('code')}
          />
        )}

        {activeTab === 'simulator' && <EdgeSimulator />}

        {activeTab === 'hardware' && <HardwareSpecsView />}

        {activeTab === 'code' && <CodebaseView />}

        {activeTab === 'presentation' && <PresentationMode />}
      </main>

      {/* Export / Download Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onPrint={handlePrint}
      />

      {/* Clean Academic Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 px-6 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-semibold text-slate-300">
              {PROJECT_METADATA.title}
            </span>
            <div className="text-slate-400 text-[11px] mt-0.5">
              {PROJECT_METADATA.department} · {PROJECT_METADATA.institution}, {PROJECT_METADATA.location}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Team Trackmind</span>
            <span>·</span>
            <span>Guide: {PROJECT_METADATA.mentor.name}</span>
            <span>·</span>
            <span className="font-mono text-cyan-400">NVIDIA Jetson Orin Nano (8GB)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
