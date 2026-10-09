import React, { useState } from 'react';
import { HARDWARE_SPECS, BENCHMARK_COMPARISON } from '../data/projectData';
import { 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Terminal, 
  Database,
  ExternalLink
} from 'lucide-react';

interface DocumentationViewProps {
  onSwitchToSimulator: () => void;
  onSwitchToHardware: () => void;
  onSwitchToCode: () => void;
}

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  onSwitchToSimulator,
  onSwitchToHardware,
  onSwitchToCode
}) => {
  const [activeSection, setActiveSection] = useState<'abstract' | 'objective' | 'hardware' | 'software' | 'outcomes' | 'future'>('abstract');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Quick Navigation Anchor Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-800 text-xs no-print">
        <span className="text-slate-400 font-mono uppercase tracking-wider mr-2">Sections:</span>
        <button
          onClick={() => setActiveSection('abstract')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeSection === 'abstract'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          00. Official Abstract
        </button>
        <button
          onClick={() => setActiveSection('objective')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeSection === 'objective'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          01. Project Objective & Aims
        </button>
        <button
          onClick={() => setActiveSection('hardware')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeSection === 'hardware'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          02. Hardware Specifications
        </button>
        <button
          onClick={() => setActiveSection('software')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeSection === 'software'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          03. Software Layer & Pipeline
        </button>
        <button
          onClick={() => setActiveSection('outcomes')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeSection === 'outcomes'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          04. Expected Outcomes
        </button>
        <button
          onClick={() => setActiveSection('future')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            activeSection === 'future'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          05. Future Scope & Roadmap
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="mt-8 space-y-12">
        {/* SECTION 0: OFFICIAL ABSTRACT REPRODUCTION */}
        <section id="official-abstract" className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 lg:p-8 relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                Academic Project Abstract Record
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Edge Email & Ticket Classifier with Auto-Drafting
              </h2>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400 block">Department of CSE (Applied AI)</span>
              <span className="text-xs font-semibold text-slate-300">GIFT Autonomous College, Bhubaneswar</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-950/70 p-4 rounded-lg border border-slate-800 mb-6 font-mono">
            <div>
              <span className="text-slate-400">Team Name:</span> <span className="text-slate-200 font-bold">Trackmind</span>
            </div>
            <div>
              <span className="text-slate-400">Mentor / Guide:</span> <span className="text-slate-200 font-bold">Kalpa Pandit, AI Master Trainer</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-400">Team Members:</span>{' '}
              <span className="text-cyan-400 font-semibold">Ankit Kumar Manjhi (2301298317)</span>,{' '}
              <span className="text-cyan-400 font-semibold">Amardeep Kumar (2301298308)</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
            <p>
              Support teams receive a continuous stream of incoming emails and tickets that must be manually read, prioritized, and replied to, which is slow and inconsistent, especially outside office hours or on resource-limited setups. This project builds an edge-deployed, hardware-based system that automatically classifies incoming emails and support tickets and drafts context-aware replies for human approval, running entirely on a local edge device.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800/80">
              <div className="text-cyan-400 font-semibold text-xs mb-1">Aim 1: Zero-Shot Intent & Urgency</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Classify incoming emails/tickets by intent and urgency using zero-shot intent classification and sentiment analysis, without task-specific training data.
              </p>
            </div>
            <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800/80">
              <div className="text-emerald-400 font-semibold text-xs mb-1">Aim 2: Context-Aware Auto-Drafting</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate context-aware draft replies automatically using a small on-device language model (SLM), ready for human review before sending.
              </p>
            </div>
            <div className="bg-slate-950/40 p-4 rounded-lg border border-slate-800/80">
              <div className="text-indigo-400 font-semibold text-xs mb-1">Aim 3: 100% Local Edge Autonomy</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Run the full pipeline on a local edge device (NVIDIA Jetson Orin Nano) so classification and drafting work without dependence on cloud AI services.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: DETAILED PROJECT OBJECTIVE */}
        <section id="objective" className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Chapter 01</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Project Objective & Operational Rationale
          </h2>

          <div className="text-slate-300 text-sm leading-relaxed space-y-4">
            <p>
              In modern enterprise and institutional workflows, customer support departments are inundated with high-volume, heterogeneous inbound emails and tickets. Traditional operations rely on human tier-1 triage agents to read every inbound message, assign category tags, score urgency, and draft preliminary replies. This human-centric approach exhibits critical operational pain points:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-slate-100 font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Latency & SLA Breach Risks
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  During peak traffic spikes or outside office hours (weekends, nights), tickets queue up unread for hours. Critical production incidents or security lockouts suffer identical wait times as non-urgent feature requests.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-slate-100 font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Privacy & Data Sovereignty Hazards
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Offloading all raw customer communications to external cloud LLM APIs (OpenAI, Anthropic) sends sensitive customer PII, transaction references, and confidential logs to third-party data centers, creating GDPR and corporate compliance risks.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-slate-100 font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  Recurring Cloud Token Overhead
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cloud inference for 100,000 monthly tickets generates substantial recurring token billing ($400 - $1,500/mo). For educational institutions or resource-limited setups, an edge appliance provides predictable, one-time capital expenditure.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-slate-100 font-semibold text-sm mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Human-in-the-Loop Safeguards
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fully autonomous auto-replying can send hallucinated assurances or incorrect refunds. Trackmind generates an initial draft attached to the ticket, leaving final 1-click approval or minor adjustments in the hands of the human agent.
                </p>
              </div>
            </div>

            <p>
              To solve these challenges, <strong>Team Trackmind</strong> developed a dedicated edge appliance running on the <strong>NVIDIA Jetson Orin Nano Developer Kit</strong>. The system unifies a local Small Language Model (SLM), zero-shot intent reasoning, sentiment quantification, Jinja2 context templating, and SQLite local storage.
            </p>
          </div>
        </section>

        {/* SECTION 2: HARDWARE SPECIFICATIONS & BENCHMARKING */}
        <section id="hardware" className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Chapter 02</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Hardware Specifications & Edge Architecture
          </h2>

          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            As outlined in the official abstract, the system integrates a balanced embedded hardware stack designed for high throughput, low thermal emission, and minimal power consumption:
          </p>

          {/* Hardware Photo & Spec Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-center">
            <div className="lg:col-span-5 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src="/src/assets/images/jetson_orin_nano_edge_kit_1791521010764.jpg"
                alt="NVIDIA Jetson Orin Nano Developer Kit Hardware Setup"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 text-[11px] text-slate-400 border-t border-slate-800/80 bg-slate-950 flex justify-between items-center">
                <span>NVIDIA Jetson Orin Nano (8GB LPDDR5)</span>
                <span className="font-mono text-cyan-400">40 TOPS AI Compute</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-base font-semibold text-white">NVIDIA Jetson Orin Nano Hardware Capabilities</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The NVIDIA Jetson Orin Nano Developer Kit provides up to <strong>40 TOPS of INT8 compute</strong> using an Ampere architecture GPU with 1,024 CUDA cores and 32 Tensor Cores. With 8GB of unified LPDDR5 memory offering 68 GB/s bandwidth, it can load 4-bit quantized 3B–3.8B parameter language models completely into high-speed unified VRAM without PCIe bus bottlenecks.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">GPU Architecture</div>
                  <div className="text-sm font-bold text-white mt-0.5">Ampere</div>
                  <div className="text-[10px] text-slate-400">1024 Cores</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Tensor Cores</div>
                  <div className="text-sm font-bold text-cyan-400 mt-0.5">32 Cores</div>
                  <div className="text-[10px] text-slate-400">Gen-3 Tensor</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Unified RAM</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">8 GB</div>
                  <div className="text-[10px] text-slate-400">LPDDR5 128-bit</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-center">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Power Envelope</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">7W – 15W</div>
                  <div className="text-[10px] text-slate-400">Configurable</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formal Component Specification Table from Abstract */}
          <div className="overflow-x-auto rounded-lg border border-slate-800 mb-8">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-300 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Proposed Specification</th>
                  <th className="py-3 px-4">Role in System</th>
                  <th className="py-3 px-4">Memory / Resource Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {HARDWARE_SPECS.map((spec, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                      {spec.component}
                    </td>
                    <td className="py-3 px-4 font-mono text-cyan-300">
                      {spec.proposedSpec}
                    </td>
                    <td className="py-3 px-4 leading-relaxed">
                      {spec.role}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {spec.memoryImpact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Benchmarking Comparison Matrix */}
          <div className="mt-8">
            <h3 className="text-base font-semibold text-white mb-3">
              Hardware Benchmarking: Jetson Orin Nano vs. Legacy Edge & Cloud
            </h3>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-300 font-mono uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4 text-cyan-400">Jetson Orin Nano (Our Rig)</th>
                    <th className="py-3 px-4 text-slate-400">Legacy Jetson Nano (4GB)</th>
                    <th className="py-3 px-4 text-indigo-400">Cloud API Architecture</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {BENCHMARK_COMPARISON.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-200">
                        {row.metric}
                      </td>
                      <td className="py-3 px-4 font-medium text-cyan-300 bg-cyan-950/20">
                        {row.orinNano}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {row.legacyNano}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {row.cloudLLM}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: SOFTWARE LAYER & PIPELINE ORCHESTRATION */}
        <section id="software" className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Chapter 03</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Software Layer & Pipeline Orchestration
          </h2>

          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            The software architecture coordinates raw email ingestion, intent extraction, emotional valence scoring, Jinja2 templating, and local SQLite state management using LangChain:
          </p>

          {/* Architectural Diagram Illustration */}
          <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950 mb-8">
            <img
              src="/src/assets/images/edge_pipeline_architecture_1791521026062.jpg"
              alt="Edge AI Email and Ticket Classification Pipeline Architecture"
              className="w-full h-auto object-cover max-h-[440px]"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 text-[11px] text-slate-400 border-t border-slate-800 bg-slate-950 flex flex-wrap justify-between items-center gap-2">
              <span>Figure 1: Full On-Device Edge Pipeline: Ingestion &rarr; LangChain &rarr; SLM &rarr; Jinja2 &rarr; SQLite</span>
              <span className="font-mono text-emerald-400">Local Execution · Zero External API Latency</span>
            </div>
          </div>

          {/* Detailed Pipeline Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-white mb-1.5 text-sm">
                  <span className="w-5 h-5 rounded bg-cyan-900/60 text-cyan-300 flex items-center justify-center font-mono text-xs">1</span>
                  Target SLMs: Phi-3.5-mini vs. Llama 3.2 (3B)
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Both models are deployed via 4-bit quantization (Q4_K_M GGUF format). Microsoft's <strong>Phi-3.5-mini</strong> (3.82B parameters) delivers exceptional zero-shot multi-step reasoning, while Meta's <strong>Llama 3.2 3B-Instruct</strong> excels at empathetic, conversational customer-facing draft generation.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-white mb-1.5 text-sm">
                  <span className="w-5 h-5 rounded bg-cyan-900/60 text-cyan-300 flex items-center justify-center font-mono text-xs">2</span>
                  Zero-Shot Intent & Urgency Extraction
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Instead of requiring hundreds of thousands of pre-labeled tickets for supervised fine-tuning, the SLM leverages in-context prompt engineering to classify inbound messages across six distinct enterprise taxonomies: <em>Technical Incident, Billing & Invoicing, Account Security, Product Support, Feature Request,</em> and <em>General Inquiry</em>.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-white mb-1.5 text-sm">
                  <span className="w-5 h-5 rounded bg-cyan-900/60 text-cyan-300 flex items-center justify-center font-mono text-xs">3</span>
                  Sentiment Analysis & Urgency Scoring
                </div>
                <p className="text-slate-400 leading-relaxed">
                  The model extracts customer sentiment (e.g. <em>Frustrated / Urgent, Neutral, Satisfied</em>) and scores urgency on a discrete 1-to-5 integer scale. An angry customer facing a billing lock triggers immediate SLA priority escalation in the inbox.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-white mb-1.5 text-sm">
                  <span className="w-5 h-5 rounded bg-emerald-900/60 text-emerald-300 flex items-center justify-center font-mono text-xs">4</span>
                  LangChain LCEL Pipeline Orchestration
                </div>
                <p className="text-slate-400 leading-relaxed">
                  LangChain orchestrates the token flow, formatting system prompts into tight instruction blocks, binding to C++ backend inference bindings (llama.cpp / Ollama), and strictly enforcing JSON schema validation to guarantee zero formatting crashes.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-white mb-1.5 text-sm">
                  <span className="w-5 h-5 rounded bg-emerald-900/60 text-emerald-300 flex items-center justify-center font-mono text-xs">5</span>
                  Jinja2 Context Interpolation
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Rather than having the LLM generate ungrounded replies from scratch, Jinja2 inserts confirmed reference IDs, verified customer names, and standardized corporate safety disclaimers, ensuring high brand compliance while allowing the SLM to write personalized diagnosis steps.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-white mb-1.5 text-sm">
                  <span className="w-5 h-5 rounded bg-emerald-900/60 text-emerald-300 flex items-center justify-center font-mono text-xs">6</span>
                  SQLite Edge Storage & Audit Trail
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Every ingested ticket, classified intent, confidence score, and generated draft reply is written to a zero-configuration SQLite database stored on the Jetson's M.2 NVMe SSD. Agents can review, approve, edit, or reject drafts with sub-millisecond query response times.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onSwitchToSimulator}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
            >
              Test Live Edge Simulator
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onSwitchToCode}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              View Python & SQL Codebase
            </button>
          </div>
        </section>

        {/* SECTION 4: EXPECTED OUTCOMES & MEASURABLE TARGETS */}
        <section id="outcomes" className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Chapter 04</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Expected Outcomes & Measurable Targets
          </h2>

          <div className="text-slate-300 text-sm mb-6 leading-relaxed">
            The project delivers a fully validated working prototype that ingests incoming emails and support tickets on the Jetson Orin Nano, runs zero-shot intent classification and sentiment analysis using the on-device SLM, and generates context-aware draft replies using LangChain and Jinja2, storing all records in SQLite for review.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  1. Dynamically Sorted Inbox
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every incoming email/ticket tagged automatically by urgency (Critical, High, Medium, Low) and category. Support leads instantly see escalated issues at the top of the queue.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  2. Pre-Generated Drafts for Human Approval
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Context-aware replies pre-attached to each ticket. Support agents need only click "Approve & Send" or make slight modifications, cutting average response time from 15 minutes down to seconds.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  3. Correct Zero-Shot Generalization
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Demonstrated robust zero-shot classification across diverse, unseen customer queries—handling jargon, typos, and multi-paragraph complaints without task-specific retraining.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
              <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  4. Full Pipeline Local Edge Execution
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  100% on-device operation on the NVIDIA Jetson Orin Nano with zero reliance on cloud APIs, zero recurring token expenses, and absolute data privacy compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FUTURE SCOPE & ROADMAP */}
        <section id="future" className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Chapter 05</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Future Scope & Research Roadmap
          </h2>

          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            The modular hardware foundation of the Jetson Orin Nano enables several natural extensions for future research and enterprise scaling:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-cyan-400 font-semibold text-sm mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Multi-Channel Real-Time Ingestion
              </div>
              <p className="text-slate-400 leading-relaxed">
                Extend beyond email/ticket feeds to ingest live chat messages (WebSockets), WhatsApp Business webhooks, and social media mentions (X/Twitter) directly onto the local edge device for unified omnichannel support.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-emerald-400 font-semibold text-sm mb-1.5 flex items-center gap-1.5">
                <Database className="w-4 h-4" />
                Intelligent Team Auto-Routing
              </div>
              <p className="text-slate-400 leading-relaxed">
                Automatically route classified tickets to specialized resolver groups—e.g., directing billing discrepancies to the Finance team and 502 cluster timeouts to the Site Reliability Engineering on-call roster.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-indigo-400 font-semibold text-sm mb-1.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Continuous On-Device Learning from Human Edits
              </div>
              <p className="text-slate-400 leading-relaxed">
                Log the edit distances between the SLM-generated draft and the agent's finalized approved reply. Use Direct Preference Optimization (DPO) or low-rank adapters (LoRA) to continuously align drafting tone with company style without full parameter retraining.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-amber-400 font-semibold text-sm mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Multilingual Support & Regional Dialects
              </div>
              <p className="text-slate-400 leading-relaxed">
                Leverage multilingual tokenizers in Llama 3.2 to handle Indian regional languages (Odia, Hindi, Telugu, Bengali) and Spanish tickets, translating inquiries and generating culturally aligned draft responses on the same Jetson Orin Nano edge unit.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
