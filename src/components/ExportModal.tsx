import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, FileText } from 'lucide-react';
import { PROJECT_METADATA, HARDWARE_SPECS, BENCHMARK_COMPARISON } from '../data/projectData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onPrint
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Generate comprehensive markdown document
  const markdownContent = `# PROJECT ABSTRACT – HARDWARE PROJECT
## ${PROJECT_METADATA.title}
### ${PROJECT_METADATA.department}, ${PROJECT_METADATA.institution}, ${PROJECT_METADATA.location}

**Team Name:** ${PROJECT_METADATA.teamName}  
**Team Members:** ${PROJECT_METADATA.teamMembers.map(m => `${m.name} (${m.regNo})`).join(', ')}  
**Mentor / Guide:** ${PROJECT_METADATA.mentor.name}, ${PROJECT_METADATA.mentor.designation}

---

### 1. Project Objective
Support teams receive a continuous stream of incoming emails and tickets that must be manually read, prioritized and replied to, which is slow and inconsistent, especially outside office hours or on resource-limited setups. This project builds an edge-deployed, hardware-based system that automatically classifies incoming emails and support tickets and drafts context-aware replies for human approval, running entirely on a local edge device. It has three aims:
- **Classify incoming emails/tickets** by intent and urgency using zero-shot intent classification and sentiment analysis, without task-specific training data.
- **Generate context-aware draft replies** automatically using a small on-device language model (SLM), ready for human review before sending.
- **Run the full pipeline on a local edge device** so classification and drafting work without dependence on cloud AI services.

---

### 2. Hardware Specifications

| Component | Proposed Specification | Role |
| :--- | :--- | :--- |
${HARDWARE_SPECS.map(s => `| ${s.component} | ${s.proposedSpec} | ${s.role} |`).join('\n')}

**Software layer:** Phi-3.5-mini / Llama 3.2 (3B) SLM, LangChain (pipeline orchestration), zero-shot intent classification, sentiment analysis, context-aware draft generation, SQLite (storage), Jinja2 (reply templating).

---

### 3. Edge Architecture & Memory Budgeting
- **Device:** NVIDIA Jetson Orin Nano Developer Kit (8GB Unified LPDDR5 Memory)
- **AI Performance:** Up to 40 TOPS INT8 (1024 CUDA Cores + 32 Tensor Cores)
- **Quantization:** 4-bit AWQ / Q4_K_M GGUF quantization (~2.2 GB VRAM footprint)
- **Power Profile:** 7W to 15W configurable TDP with zero cloud API dependence.

---

### 4. Expected Outcome
The project will deliver a working prototype that ingests incoming emails and support tickets on the Jetson Orin Nano, runs zero-shot intent classification and sentiment analysis using the on-device SLM, and generates a context-aware draft reply for each message using LangChain and Jinja2. Classified tickets and drafts are stored in SQLite for review.

**Measurable targets:**
- Sorted inbox with each email/ticket tagged by urgency and category.
- Pre-generated draft reply attached to each ticket, ready for human approval.
- Correct zero-shot classification of intent and sentiment across varied, unseen message types.
- Full pipeline running locally on the Jetson Orin Nano without cloud dependency.

---

### 5. Future Scope
- Extend toward multi-channel support (chat, social media).
- Auto-routing tickets to the right team.
- Learning from human edits to drafts (on-device LoRA / DPO adaptation).
- Multilingual ticket handling (Odia, Hindi, Spanish) using the same Jetson Orin Nano edge deployment.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Edge_Email_Ticket_Classifier_Documentation.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full text-xs shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">
              Export Academic Documentation
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Export the full formal documentation for <strong>Edge Email & Ticket Classifier with Auto-Drafting</strong> for academic submission at GIFT Autonomous College, review panel evaluation, or engineering archiving.
        </p>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => {
              onClose();
              onPrint();
            }}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
          >
            <Printer className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="font-semibold text-white">Print / Save PDF</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Formatted for academic submission</div>
          </button>

          <button
            onClick={handleDownload}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400 mb-1" />
            <div className="font-semibold text-white">Download Markdown</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Full .md report file</div>
          </button>

          <button
            onClick={handleCopy}
            className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-left transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400 mb-1" />
            ) : (
              <Copy className="w-4 h-4 text-indigo-400 mb-1" />
            )}
            <div className="font-semibold text-white">
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Instant clipboard buffer</div>
          </button>
        </div>

        {/* Markdown Preview Box */}
        <div className="border border-slate-800 rounded-lg bg-slate-950 p-3 max-h-52 overflow-y-auto font-mono text-[11px] text-slate-400">
          <pre>{markdownContent}</pre>
        </div>

        <div className="flex justify-end mt-4 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
