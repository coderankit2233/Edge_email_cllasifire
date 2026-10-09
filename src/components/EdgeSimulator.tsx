import React, { useState } from 'react';
import { Ticket, UrgencyLevel, IntentCategory, SentimentType } from '../types';
import { INITIAL_TICKETS } from '../data/sampleTickets';
import { 
  Play, 
  RefreshCw, 
  Check, 
  Edit3, 
  X, 
  Cpu, 
  Zap, 
  Database, 
  Send, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Download,
  Search,
  Filter
} from 'lucide-react';

export const EdgeSimulator: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(INITIAL_TICKETS[0].id);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [targetModel, setTargetModel] = useState<'llama3.2-3b' | 'phi3.5-mini'>('llama3.2-3b');
  const [powerMode, setPowerMode] = useState<'15w' | '7w'>('15w');
  const [isEditingDraft, setIsEditingDraft] = useState<boolean>(false);
  const [editedDraftText, setEditedDraftText] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  
  // Custom ticket form state
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');
  const [customSender, setCustomSender] = useState<string>('');
  const [customEmail, setCustomEmail] = useState<string>('');

  // Search & filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  // Pipeline simulation logic
  const handleRunPipeline = async () => {
    if (!activeTicket || isProcessing) return;

    setIsProcessing(true);
    setCurrentStep(1);

    // Step 1: Ingestion
    await new Promise(r => setTimeout(r, 350));
    setCurrentStep(2);

    // Step 2: Zero-shot classification
    await new Promise(r => setTimeout(r, 600));
    setCurrentStep(3);

    // Step 3: Sentiment & Urgency
    await new Promise(r => setTimeout(r, 500));
    setCurrentStep(4);

    // Step 4: Jinja2 Context Injection
    await new Promise(r => setTimeout(r, 300));
    setCurrentStep(5);

    // Step 5: SLM Generation & SQLite Commit
    await new Promise(r => setTimeout(r, 800));
    setCurrentStep(6);

    // Determine results based on ticket subject/body
    let intent: IntentCategory = 'General Inquiry';
    let urgency: UrgencyLevel = 'Medium';
    let urgencyScore = 3;
    let sentiment: SentimentType = 'Neutral';
    let sentimentScore = 0.0;
    let confidence = 92;

    const lowerText = (activeTicket.subject + ' ' + activeTicket.body).toLowerCase();

    if (lowerText.includes('502') || lowerText.includes('outage') || lowerText.includes('gateway') || lowerText.includes('cluster') || lowerText.includes('crash')) {
      intent = 'Technical Incident';
      urgency = 'Critical';
      urgencyScore = 5;
      sentiment = 'Frustrated / Urgent';
      sentimentScore = -0.85;
      confidence = 96;
    } else if (lowerText.includes('charge') || lowerText.includes('invoice') || lowerText.includes('deduction') || lowerText.includes('refund') || lowerText.includes('billed')) {
      intent = 'Billing & Invoicing';
      urgency = 'High';
      urgencyScore = 4;
      sentiment = 'Dissatisfied';
      sentimentScore = -0.62;
      confidence = 94;
    } else if (lowerText.includes('2fa') || lowerText.includes('locked') || lowerText.includes('authenticator') || lowerText.includes('password') || lowerText.includes('security')) {
      intent = 'Account Security';
      urgency = 'High';
      urgencyScore = 4;
      sentiment = 'Frustrated / Urgent';
      sentimentScore = -0.55;
      confidence = 97;
    } else if (lowerText.includes('proposal') || lowerText.includes('figma') || lowerText.includes('feature') || lowerText.includes('roadmap') || lowerText.includes('integration')) {
      intent = 'Feature Request';
      urgency = 'Low';
      urgencyScore = 1;
      sentiment = 'Satisfied';
      sentimentScore = 0.78;
      confidence = 91;
    } else if (lowerText.includes('latency') || lowerText.includes('inquiry') || lowerText.includes('webhook')) {
      intent = 'Product Support';
      urgency = 'Medium';
      urgencyScore = 2;
      sentiment = 'Neutral';
      sentimentScore = 0.10;
      confidence = 88;
    }

    // Generate dynamic draft reply
    let draft = '';
    const senderFirst = activeTicket.sender.split(' ')[0] || 'Customer';

    if (intent === 'Technical Incident') {
      draft = `Dear ${senderFirst},\n\nThank you for alerting us to the upstream 502 Bad Gateway occurrences on your production environment [Ticket ID: ${activeTicket.id}].\n\nOur on-call Site Reliability Engineering (SRE) pod has been notified with Critical P1 urgency. We are actively inspecting gateway timeout traces and telemetry metrics across the US-East cluster.\n\nWe will provide a status bulletin within 20 minutes with our preliminary mitigation findings. Thank you for your patience while we stabilize the cluster.\n\nSincerely,\nTrackmind Edge Support Desk (Verified by Support Agent)`;
    } else if (intent === 'Billing & Invoicing') {
      draft = `Dear ${senderFirst},\n\nWe acknowledge receipt of your billing inquiry regarding invoice ${activeTicket.extractedEntities?.orderId || '#INV-2026-904'} [Ticket ID: ${activeTicket.id}].\n\nOur accounts verification desk has pulled transaction reference ${activeTicket.extractedEntities?.accountNo || 'TXN_984128'} for review. If a duplicate charge is confirmed, an automatic credit reversal of $149.00 will be initiated to your card within 2-3 business days, along with a revised zero-balance credit memo.\n\nWe apologize for the inconvenience.\n\nBest regards,\nTrackmind Billing Team`;
    } else if (intent === 'Account Security') {
      draft = `Dear ${senderFirst},\n\nWe have received your account recovery request regarding 2FA reset for ${activeTicket.extractedEntities?.accountNo || activeTicket.senderEmail} [Ticket ID: ${activeTicket.id}].\n\nBecause this involves biometric and multi-factor credentials, our security desk requires an authenticated out-of-band verification. An encrypted verification link has been queued for your secondary registered contact.\n\nPlease follow the prompts to restore access safely. Never disclose OTP codes to anyone.\n\nRegards,\nIdentity & Security Operations`;
    } else if (intent === 'Feature Request') {
      draft = `Hi ${senderFirst},\n\nThank you for reaching out and sharing such thoughtful feedback on our platform [Ticket ID: ${activeTicket.id}]!\n\nDirect synchronization with design tokens and GitHub Actions webhooks is a fantastic idea and is currently being evaluated for our Q3/Q4 engineering roadmap. I have forwarded your workflow scenario to our Core Product Leads.\n\nWe really appreciate you taking the time to help make the product better!\n\nWarm regards,\nProduct Strategy Team`;
    } else {
      draft = `Hello ${senderFirst},\n\nThank you for reaching out to Technical Support [Ticket ID: ${activeTicket.id}].\n\nWe have inspected your inquiry regarding "${activeTicket.subject}". Our European network telemetry shows nominal packet transit with zero packet loss, though a minor DNS peering route update occurred earlier this morning. Latencies have returned to ~78ms.\n\nPlease let us know if you continue to see any variance.\n\nBest regards,\nPlatform Engineering Support`;
    }

    // Hardware metrics calculation
    const baseSpeed = powerMode === '15w' ? 26.8 : 15.2;
    const modelSpeed = targetModel === 'llama3.2-3b' ? baseSpeed : baseSpeed * 0.92;
    const tokensCount = Math.round(draft.split(' ').length * 1.3);
    const latencyMs = Math.round((tokensCount / modelSpeed) * 1000) + 420;
    const ramAllocated = targetModel === 'llama3.2-3b' ? 2180 : 2340;
    const wattage = powerMode === '15w' ? 14.1 : 6.8;

    const updatedTicket: Ticket = {
      ...activeTicket,
      status: 'Draft Ready',
      category: intent,
      urgency: urgency,
      urgencyScore: urgencyScore,
      sentiment: sentiment,
      sentimentScore: sentimentScore,
      intentConfidence: confidence,
      draftReply: draft,
      executionMetrics: {
        model: targetModel === 'llama3.2-3b' ? 'Meta Llama 3.2 (3B-Instruct) Q4_K_M' : 'Microsoft Phi-3.5-mini-instruct (3.8B) AWQ',
        totalLatencyMs: latencyMs,
        tokensPerSecond: Math.round(modelSpeed * 10) / 10,
        memoryAllocatedMB: ramAllocated,
        powerWattage: wattage
      }
    };

    setTickets(prev => prev.map(t => t.id === activeTicket.id ? updatedTicket : t));
    setEditedDraftText(draft);
    setIsProcessing(false);
  };

  const handleApproveDraft = () => {
    if (!activeTicket) return;
    const updated = {
      ...activeTicket,
      status: 'Approved' as const,
      draftReply: isEditingDraft ? editedDraftText : activeTicket.draftReply
    };
    setTickets(prev => prev.map(t => t.id === activeTicket.id ? updated : t));
    setIsEditingDraft(false);
  };

  const handleRejectDraft = () => {
    if (!activeTicket) return;
    const updated = {
      ...activeTicket,
      status: 'Rejected' as const
    };
    setTickets(prev => prev.map(t => t.id === activeTicket.id ? updated : t));
  };

  const handleCreateCustomTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSubject || !customBody) return;

    const newTicket: Ticket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      sender: customSender || 'Guest User',
      senderEmail: customEmail || 'user@example.com',
      subject: customSubject,
      body: customBody,
      timestamp: 'Just now',
      status: 'Unprocessed'
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicketId(newTicket.id);
    setShowCustomModal(false);
    setCustomSubject('');
    setCustomBody('');
    setCustomSender('');
    setCustomEmail('');
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = filterUrgency === 'all' || t.urgency === filterUrgency;
    return matchesSearch && matchesUrgency;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Workbench Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Edge Simulation Sandbox · Jetson Orin Nano
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Interactive On-Device Ticket Classifier & Drafting Workbench
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Simulate real-world inbound emails, zero-shot intent extraction, sentiment scoring, and SLM draft generation directly as it operates on the NVIDIA Jetson Orin Nano hardware.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowCustomModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            + Compose Inbound Ticket
          </button>
        </div>
      </div>

      {/* Hardware Configuration Bar */}
      <div className="mt-6 bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Target Edge SLM:</span>
            <div className="flex bg-slate-950 p-1 rounded border border-slate-800">
              <button
                onClick={() => setTargetModel('llama3.2-3b')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  targetModel === 'llama3.2-3b'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Meta Llama 3.2 (3B)
              </button>
              <button
                onClick={() => setTargetModel('phi3.5-mini')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  targetModel === 'phi3.5-mini'
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Phi-3.5-mini (3.8B)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Jetson Power Profile:</span>
            <div className="flex bg-slate-950 p-1 rounded border border-slate-800">
              <button
                onClick={() => setPowerMode('15w')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  powerMode === '15w'
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                15W MAX-N Mode
              </button>
              <button
                onClick={() => setPowerMode('7w')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  powerMode === '7w'
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                7W Low-Power Mode
              </button>
            </div>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Hardware: <span className="text-slate-200">Jetson Orin Nano (8GB UMA)</span> · Engine: <span className="text-emerald-400">Local llama.cpp</span>
        </div>
      </div>

      {/* Main Two-Column Workbench Layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inbound Ticket Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Inbound Ticket Feed ({filteredTickets.length})
              </h3>
              <span className="text-[10px] font-mono text-slate-400">SQLite: edge_tickets.db</span>
            </div>

            {/* Filter & Search Bar */}
            <div className="space-y-2 mb-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subject, sender, ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Filter className="w-3 h-3" />
                <span>Urgency:</span>
                <select
                  value={filterUrgency}
                  onChange={e => setFilterUrgency(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="all">All</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Ticket List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredTickets.map(ticket => {
                const isSelected = ticket.id === activeTicket?.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicketId(ticket.id);
                      setIsEditingDraft(false);
                      setEditedDraftText(ticket.draftReply || '');
                    }}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500/60 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-cyan-400 font-medium">{ticket.id}</span>
                      <span className="text-slate-400">{ticket.timestamp}</span>
                    </div>

                    <div className="font-medium text-slate-200 line-clamp-1 mb-1">
                      {ticket.subject}
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{ticket.sender}</span>
                      <span className={`font-mono text-[10px] ${
                        ticket.status === 'Approved' ? 'text-emerald-400' :
                        ticket.status === 'Draft Ready' ? 'text-amber-400' :
                        ticket.status === 'Rejected' ? 'text-rose-400' : 'text-slate-400'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Stage & Human-In-The-Loop Draft Review (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Ticket Detail Box */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-cyan-400 font-semibold">{activeTicket.id}</span>
                  <span>·</span>
                  <span>From: {activeTicket.sender} &lt;{activeTicket.senderEmail}&gt;</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {activeTicket.subject}
                </h3>
              </div>

              {/* Run Trigger */}
              <button
                onClick={handleRunPipeline}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-md transition-colors shrink-0 shadow-sm"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing On-Device...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {activeTicket.status === 'Unprocessed' ? 'Classify & Auto-Draft' : 'Re-Run Pipeline'}
                  </>
                )}
              </button>
            </div>

            {/* Inbound Email Body */}
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans mb-4">
              {activeTicket.body}
            </div>

            {/* Step-by-Step Progress Pipeline */}
            {isProcessing && (
              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-cyan-500/30 mb-4 animate-pulse">
                <div className="text-xs font-semibold text-cyan-400 mb-2 flex items-center justify-between">
                  <span>Executing Jetson Orin Nano Edge Pipeline...</span>
                  <span className="font-mono text-[11px]">Step {currentStep} / 6</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-full transition-all duration-300" 
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-2">
                  {currentStep === 1 && '1/6: IMAP/Webhook MIME parsing & PII tokenization...'}
                  {currentStep === 2 && '2/6: Offloading tensors to Jetson Ampere GPU (Zero-Shot Intent)...'}
                  {currentStep === 3 && '3/6: Urgency heuristics & sentiment valence scoring...'}
                  {currentStep === 4 && '4/6: Interpolating Jinja2 response template with entity slots...'}
                  {currentStep === 5 && '5/6: Streaming context-aware SLM draft tokens...'}
                  {currentStep === 6 && '6/6: Persisting classification tags & draft to SQLite...'}
                </div>
              </div>
            )}

            {/* Classification & Metadata Results */}
            {activeTicket.status !== 'Unprocessed' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-950/60 rounded-lg border border-slate-800 mb-4 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Intent Category</div>
                  <div className="font-semibold text-cyan-300 mt-0.5 truncate">
                    {activeTicket.category || 'General Inquiry'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Conf: {activeTicket.intentConfidence || 92}%
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Urgency Level</div>
                  <div className={`font-semibold mt-0.5 ${
                    activeTicket.urgency === 'Critical' ? 'text-rose-400' :
                    activeTicket.urgency === 'High' ? 'text-amber-400' :
                    activeTicket.urgency === 'Medium' ? 'text-blue-400' : 'text-slate-300'
                  }`}>
                    {activeTicket.urgency || 'Medium'} (Score: {activeTicket.urgencyScore || 3}/5)
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    SLA Priority
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Sentiment Score</div>
                  <div className="font-semibold text-slate-200 mt-0.5 truncate">
                    {activeTicket.sentiment || 'Neutral'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Valence: {activeTicket.sentimentScore || 0.0}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Review Status</div>
                  <div className={`font-semibold mt-0.5 ${
                    activeTicket.status === 'Approved' ? 'text-emerald-400' :
                    activeTicket.status === 'Draft Ready' ? 'text-amber-400' :
                    activeTicket.status === 'Rejected' ? 'text-rose-400' : 'text-slate-400'
                  }`}>
                    {activeTicket.status}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    HITL Verified
                  </div>
                </div>
              </div>
            )}

            {/* Generated Draft Reply / Human-In-The-Loop Approval Box */}
            <div className="border border-slate-800 rounded-lg p-4 bg-slate-950/90">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-semibold text-white">
                    On-Device Generated Draft Reply (Pending Human Approval)
                  </h4>
                </div>

                {activeTicket.draftReply && (
                  <button
                    onClick={() => {
                      setIsEditingDraft(!isEditingDraft);
                      setEditedDraftText(activeTicket.draftReply || '');
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                  >
                    <Edit3 className="w-3 h-3" />
                    {isEditingDraft ? 'Cancel Editing' : 'Modify Draft'}
                  </button>
                )}
              </div>

              {activeTicket.draftReply ? (
                <div>
                  {isEditingDraft ? (
                    <div className="space-y-3">
                      <textarea
                        value={editedDraftText}
                        onChange={e => setEditedDraftText(e.target.value)}
                        rows={8}
                        className="w-full bg-slate-900 border border-cyan-500/50 rounded p-3 text-xs text-slate-200 font-sans focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleApproveDraft}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Save Edits & Approve
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-line">
                      {activeTicket.draftReply}
                    </div>
                  )}

                  {/* HITL Action Controls */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Human Review Rule: No email sent without manual agent approval.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleRejectDraft}
                        className="px-3 py-1.5 text-xs font-medium text-rose-300 hover:text-white bg-slate-900 hover:bg-rose-950/40 border border-slate-800 rounded transition-colors flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject Draft
                      </button>

                      <button
                        onClick={handleApproveDraft}
                        disabled={activeTicket.status === 'Approved'}
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        {activeTicket.status === 'Approved' ? 'Approved & Dispatched' : 'Approve & Send'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  <Cpu className="w-8 h-8 mx-auto text-slate-400 mb-2 stroke-1" />
                  No draft generated yet for this ticket.
                  <div className="mt-2">
                    Click <strong className="text-cyan-400">"Classify & Auto-Draft"</strong> above to run the on-device edge pipeline.
                  </div>
                </div>
              )}
            </div>

            {/* Edge Telemetry HUD (Bottom) */}
            {activeTicket.executionMetrics && (
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] font-mono">
                <div className="text-slate-400 uppercase text-[10px] mb-2 flex items-center justify-between">
                  <span>Edge Hardware Inference Telemetry</span>
                  <span className="text-cyan-400">Jetson Orin Nano (40 TOPS)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-400">Latency: </span>
                    <span className="text-white font-bold">{activeTicket.executionMetrics.totalLatencyMs} ms</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Throughput: </span>
                    <span className="text-cyan-300 font-bold">{activeTicket.executionMetrics.tokensPerSecond} tok/s</span>
                  </div>
                  <div>
                    <span className="text-slate-400">VRAM Footprint: </span>
                    <span className="text-emerald-300 font-bold">{activeTicket.executionMetrics.memoryAllocatedMB} MB</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Power Draw: </span>
                    <span className="text-amber-300 font-bold">{activeTicket.executionMetrics.powerWattage} W</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Custom Ticket Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-white text-sm">Compose Inbound Test Ticket</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomTicket} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Customer / Sender Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Miller"
                  value={customSender}
                  onChange={e => setCustomSender(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Sender Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. david.miller@enterprise.com"
                  value={customEmail}
                  onChange={e => setCustomEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Ticket Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Database connection pool exhausted on port 5432"
                  value={customSubject}
                  onChange={e => setCustomSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Inbound Message Body</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write the detailed complaint, bug report, or billing question..."
                  value={customBody}
                  onChange={e => setCustomBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 font-semibold text-slate-950 rounded text-xs transition-colors"
                >
                  Enqueue to Edge Simulator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
