import { ProjectMeta, HardwareSpec } from '../types';

export const PROJECT_METADATA: ProjectMeta = {
  title: "Edge Email & Ticket Classifier with Auto-Drafting",
  subtitle: "Hardware-Deployed Zero-Shot Intent Triage & Contextual SLM Auto-Drafting Engine",
  type: "Hardware Project (Applied AI & Embedded Edge Computing)",
  department: "Department of Computer Science & Engineering (Applied AI)",
  institution: "GIFT Autonomous College",
  location: "Bhubaneswar, Odisha, India",
  teamName: "Trackmind",
  teamMembers: [
    {
      name: "Ankit Kumar Manjhi",
      regNo: "2301298317",
      role: "Edge ML Pipeline & SLM Quantization Lead"
    },
    {
      name: "Amardeep Kumar",
      regNo: "2301298308",
      role: "Embedded Hardware Integration & LangChain Architect"
    }
  ],
  mentor: {
    name: "Kalpa Pandit",
    designation: "AI Master Trainer & Technical Guide"
  }
};

export const HARDWARE_SPECS: HardwareSpec[] = [
  {
    component: "Edge Device",
    proposedSpec: "NVIDIA Jetson Nano Orin Developer Kit (8GB Unified LPDDR5)",
    role: "Runs the local SLM and the full classification + drafting pipeline on-device",
    details: "1024-core Ampere architecture GPU with 32 Tensor Cores, 6-core ARM Cortex-A78AE CPU, up to 40 TOPS INT8 AI compute. Configurable 7W–15W power profile.",
    memoryImpact: "~1.8 GB OS/runtime + ~2.2 GB SLM INT4 VRAM allocation"
  },
  {
    component: "Language Model (SLM)",
    proposedSpec: "Phi-3.5-mini-instruct (3.8B) or Llama 3.2 (3B-Instruct) [Q4_K_M / AWQ Quantized]",
    role: "Performs intent classification, sentiment analysis, and context-aware draft generation",
    details: "Zero-shot classification via constrained prompt schema; context injection; generates professional email responses without remote API dependency.",
    memoryImpact: "~2.1 GB – 2.4 GB unified VRAM footprint at 4-bit precision"
  },
  {
    component: "Ticket Ingestion Layer",
    proposedSpec: "Incoming Email / Support-Ticket Feed (IMAP / Webhook / REST daemon)",
    role: "Supplies raw messages and metadata to the edge pipeline for automated ingestion",
    details: "Sanitizes raw MIME headers, strips tracking pixels, extracts sender signatures, and enqueues unclassified tickets into memory FIFO.",
    memoryImpact: "< 50 MB memory overhead"
  },
  {
    component: "Orchestration Layer",
    proposedSpec: "LangChain (LCEL Pipelines) with Local C/C++ Binding (llama.cpp / Ollama / vLLM)",
    role: "Chains classification, urgency scoring, sentiment analysis, and drafting steps around the SLM",
    details: "Sequential prompt chains with structured JSON output parsing, token-efficient system prompts, and Jinja2 context interpolation.",
    memoryImpact: "~120 MB Python runtime footprint"
  },
  {
    component: "Database Engine",
    proposedSpec: "SQLite (Embedded Zero-Config ACID Relational Store)",
    role: "Stores incoming tickets, classification tags, confidence scores, and generated drafts",
    details: "Lightweight on-disk SQL database storing raw tickets, intent taxonomy, sentiment score, urgency rating, human feedback status, and generated draft text.",
    memoryImpact: "< 30 MB RAM, fast M.2 NVMe reads/writes"
  },
  {
    component: "Templating Engine",
    proposedSpec: "Jinja2 (Declarative Logic-Free Response Templates)",
    role: "Formats structured, context-aware draft replies tailored to intent categories",
    details: "Interpolates customer names, support ticket IDs, diagnosed issue points, personalized resolution guidance, and compliance disclaimers.",
    memoryImpact: "< 10 MB RAM"
  }
];

export const BENCHMARK_COMPARISON = [
  {
    metric: "Target Device / Setup",
    orinNano: "NVIDIA Jetson Orin Nano (8GB)",
    legacyNano: "Legacy Jetson Nano (4GB Maxwell)",
    cloudLLM: "Cloud API (GPT-4o / Claude 3.5)"
  },
  {
    metric: "AI Compute Capacity",
    orinNano: "40 TOPS INT8 (Ampere)",
    legacyNano: "0.47 TFLOPS FP16 (Maxwell)",
    cloudLLM: "Server Farm Cluster (H100/A100)"
  },
  {
    metric: "SLM Feasibility (3B Parameters)",
    orinNano: "Native 4-bit / 8-bit Real-time (~22-28 tokens/s)",
    legacyNano: "Infeasible (OOM crash or <1 token/s)",
    cloudLLM: "Server-side only"
  },
  {
    metric: "Internet / Cloud Dependency",
    orinNano: "0% (Completely offline & air-gapped)",
    legacyNano: "0% (Offline, but lacks compute)",
    cloudLLM: "100% required (Breaks during downtime)"
  },
  {
    metric: "Data Privacy & Compliance",
    orinNano: "100% On-Premise (Zero telemetry leak)",
    legacyNano: "Local, but unsupported for 3B SLMs",
    cloudLLM: "Customer data leaves security perimeter"
  },
  {
    metric: "Ongoing Operating Cost",
    orinNano: "$0.00 / month (One-time hardware purchase)",
    legacyNano: "$0.00 / month",
    cloudLLM: "$250 – $1,200+ monthly API billing"
  },
  {
    metric: "Power Consumption",
    orinNano: "7W – 15W Max Draw",
    legacyNano: "5W – 10W",
    cloudLLM: "> 700W server racks per node"
  }
];

export const MEMORY_BUDGET = [
  { item: "JetPack 6.x Linux OS & Background Daemons", sizeGB: 1.6, percentage: 20 },
  { item: "Llama 3.2 / Phi-3.5 4-Bit Quantized Weights", sizeGB: 2.2, percentage: 27.5 },
  { item: "KV Cache Context Window (up to 4,096 tokens)", sizeGB: 0.5, percentage: 6.25 },
  { item: "LangChain Orchestrator & Python Runtime", sizeGB: 0.3, percentage: 3.75 },
  { item: "SQLite Buffer & OS Page Cache", sizeGB: 0.2, percentage: 2.5 },
  { item: "Dynamic Memory Headroom (Safe Operating Margin)", sizeGB: 3.2, percentage: 40.0 }
];

export const CODE_SNIPPETS = {
  pipelinePy: `"""
Edge Email & Ticket Classifier with Auto-Drafting
Team Trackmind | Department of CSE (Applied AI), GIFT Autonomous College
Target Hardware: NVIDIA Jetson Orin Nano (8GB)
"""

import sqlite3
import json
import time
from typing import Dict, Any
from jinja2 import Environment, FileSystemLoader
from langchain_community.llms import LlamaCpp
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# 1. Initialize SQLite Edge Storage
conn = sqlite3.connect("edge_tickets.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    sender TEXT,
    email TEXT,
    subject TEXT,
    body TEXT,
    intent TEXT,
    urgency TEXT,
    urgency_score INTEGER,
    sentiment TEXT,
    draft_reply TEXT,
    status TEXT,
    latency_ms REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""")
conn.commit()

# 2. Load Local Quantized SLM on Jetson Orin Nano
# Model: Meta Llama-3.2-3B-Instruct or Phi-3.5-mini-instruct in Q4_K_M GGUF
llm = LlamaCpp(
    model_path="./models/llama-3.2-3b-instruct-q4_k_m.gguf",
    n_gpu_layers=33,        # Offload all layers to Orin Ampere GPU
    n_ctx=4096,             # Context window
    n_threads=6,            # 6 ARM Cortex-A78AE cores
    temperature=0.1,        # Deterministic triage
    f16_kv=True,            # Half-precision KV cache to save unified memory
    verbose=False
)

# 3. Zero-Shot Intent & Urgency Extraction Prompt
CLASSIFIER_PROMPT = PromptTemplate.from_template("""<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are an edge AI ticket triage engine. Analyze the inbound message and return ONLY a JSON object with:
- "intent": One of ["Technical Incident", "Billing & Invoicing", "Account Security", "Product Support", "Feature Request", "General Inquiry"]
- "urgency": One of ["Critical", "High", "Medium", "Low"]
- "urgency_score": Integer 1 to 5
- "sentiment": One of ["Frustrated / Urgent", "Dissatisfied", "Neutral", "Satisfied"]
- "confidence": Integer 0 to 100
- "key_entities": Extracted ticket reference, error codes, or customer account info
Do NOT output reasoning. Output valid JSON only.<|eot_id|>
<|start_header_id|>user<|end_header_id|>
SUBJECT: {subject}
MESSAGE: {body}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
""")

# 4. Jinja2 Response Template Engine
jinja_env = Environment(loader=FileSystemLoader("templates"))
reply_template = jinja_env.get_template("ticket_reply.j2")

def process_ticket(ticket_data: Dict[str, Any]) -> Dict[str, Any]:
    t0 = time.time()
    
    # Step A: Zero-shot classification
    raw_analysis = llm.invoke(CLASSIFIER_PROMPT.format(
        subject=ticket_data["subject"],
        body=ticket_data["body"]
    ))
    analysis = json.loads(raw_analysis)
    
    # Step B: Templating with Jinja2 context injection
    template_context = {
        "customer_name": ticket_data["sender"],
        "ticket_id": ticket_data["id"],
        "category": analysis["intent"],
        "urgency": analysis["urgency"],
        "entities": analysis.get("key_entities", {})
    }
    
    # Step C: Generate context-aware draft
    draft_prompt = f"""<|start_header_id|>system<|end_header_id|>
Draft a reassuring, highly professional support response for a {analysis['intent']} ticket (Urgency: {analysis['urgency']}).
Address customer as {ticket_data['sender']}. Keep it concise, helpful, and ready for human agent approval.<|eot_id|>
<|start_header_id|>user<|end_header_id|>
Customer Inquiry: {ticket_data['body']}<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>"""
    
    draft_reply = llm.invoke(draft_prompt)
    latency_ms = round((time.time() - t0) * 1000, 2)
    
    # Step D: Persist to SQLite
    cursor.execute("""
    INSERT OR REPLACE INTO tickets 
    (id, sender, email, subject, body, intent, urgency, urgency_score, sentiment, draft_reply, status, latency_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Draft Ready', ?)
    """, (
        ticket_data["id"],
        ticket_data["sender"],
        ticket_data["email"],
        ticket_data["subject"],
        ticket_data["body"],
        analysis["intent"],
        analysis["urgency"],
        analysis["urgency_score"],
        analysis["sentiment"],
        draft_reply.strip(),
        latency_ms
    ))
    conn.commit()
    
    return {
        "analysis": analysis,
        "draft_reply": draft_reply.strip(),
        "latency_ms": latency_ms
    }
`,
  sqliteSchema: `-- Edge Database Schema: edge_tickets.db
-- Target: SQLite 3.x on Jetson Orin Nano M.2 NVMe Storage

CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    sender TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    intent TEXT,
    urgency TEXT,
    urgency_score INTEGER CHECK(urgency_score BETWEEN 1 AND 5),
    sentiment TEXT,
    intent_confidence REAL,
    draft_reply TEXT,
    status TEXT DEFAULT 'Unprocessed' CHECK(status IN ('Unprocessed', 'Draft Ready', 'Approved', 'Sent', 'Modified & Approved', 'Rejected')),
    modified_draft TEXT,
    reviewer_notes TEXT,
    hardware_model TEXT DEFAULT 'NVIDIA Jetson Orin Nano (8GB)',
    slm_name TEXT DEFAULT 'Llama-3.2-3B-Instruct-Q4_K_M',
    latency_ms REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tickets_urgency ON tickets (urgency);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets (status);
CREATE INDEX IF NOT EXISTS idx_tickets_intent ON tickets (intent);

-- Audit log for continuous learning from human edits (Future Scope)
CREATE TABLE IF NOT EXISTS draft_feedback_log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT REFERENCES tickets(id),
    original_draft TEXT NOT NULL,
    edited_draft TEXT NOT NULL,
    edit_distance INTEGER,
    agent_id TEXT,
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,
  jinjaTemplate: `{# templates/ticket_reply.j2 #}
{# Jinja2 Context Template for Edge Ticket Auto-Drafting #}

Dear {{ customer_name }},

Thank you for reaching out to our Technical Support Engineering team.
Your inquiry regarding "{{ subject }}" has been logged under Reference ID [{{ ticket_id }}].

{% if urgency == 'Critical' %}
[URGENT INCIDENT ESCALATION]
Our Site Reliability and Engineering incident commanders have been alerted. 
We have assigned priority triage to this ticket and are actively reviewing upstream telemetries.
{% elif urgency == 'High' %}
We have prioritized your request for expedited review with our specialized support specialists.
{% else %}
We have queued your ticket with our support specialists and will provide updates as soon as diagnostics complete.
{% endif %}

--- Proposed Next Steps ---
{% if intent == 'Technical Incident' %}
1. Our engineering team is currently inspecting cluster metrics and error traces: {{ entities.error_code | default('Reported upstream anomaly') }}.
2. We will follow up within our guaranteed SLA timeline with root-cause confirmation.
{% elif intent == 'Billing & Invoicing' %}
1. Our accounts desk is auditing transaction ref {{ entities.transaction_ref | default(entities.order_id | default('latest invoice')) }}.
2. If duplicate charges are confirmed, immediate credit reimbursement will be processed to your source payment method.
{% elif intent == 'Account Security' %}
1. For security compliance, an authenticated identity verification link will be dispatched to your backup credentials.
2. Please do not share passwords or OTP codes with anyone.
{% else %}
1. Your detailed remarks have been cataloged for immediate staff investigation.
{% endif %}

Sincerely,
Customer Operations & Support Desk
Automated Edge Triage (Pending Human Verification)`,

  jetsonSetupSh: `#!/usr/bin/env bash
# ==============================================================================
# Jetson Orin Nano (8GB) Edge Environment Provisioning
# Department of CSE (Applied AI), GIFT Autonomous College | Team Trackmind
# ==============================================================================

set -e
echo ">>> Initializing NVIDIA Jetson Orin Nano Edge Environment..."

# 1. Update OS and system dependencies
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y git build-essential cmake python3-pip python3-dev sqlite3 libopenblas-dev

# 2. Set Max-N Performance Mode (15W Power Mode)
echo ">>> Setting Jetson Power Model to 15W MAX-N..."
sudo nvpmodel -m 0
sudo jetson_clocks

# 3. Create Virtual Environment
python3 -m venv ~/edge_ai_env
source ~/edge_ai_env/bin/activate

# 4. Install CUDA-accelerated llama-cpp-python for Ampere GPU
echo ">>> Compiling llama-cpp-python with CUDA Ampere Compute Capability..."
CMAKE_ARGS="-DLLAMA_CUBLAS=on" FORCE_CMAKE=1 pip install llama-cpp-python

# 5. Install LangChain, Jinja2, and SQLite dependencies
pip install langchain langchain-community langchain-core jinja2 pydantic uvicorn fastapi

# 6. Fetch 4-Bit Quantized Models (Phi-3.5-mini / Llama-3.2-3B)
mkdir -p ~/edge_classifier/models ~/edge_classifier/templates
echo ">>> Downloading quantized GGUF weights to NVMe storage..."
# wget -O ~/edge_classifier/models/llama-3.2-3b-instruct-q4_k_m.gguf <huggingface_url>

echo ">>> Setup completed successfully. Ready for edge pipeline execution!"
`
};

export const PRESENTATION_SLIDES = [
  {
    slideNumber: 1,
    title: "Edge Email & Ticket Classifier with Auto-Drafting",
    subtitle: "Hardware-Deployed Zero-Shot Intent Triage & Contextual SLM Auto-Drafting Engine",
    institution: "Department of Computer Science & Engineering (Applied AI), GIFT Autonomous College, Bhubaneswar",
    team: "Team Trackmind: Ankit Kumar Manjhi (2301298317) & Amardeep Kumar (2301298308)",
    mentor: "Under the Guidance of: Kalpa Pandit, AI Master Trainer",
    keyPoints: [
      "Department of CSE (Applied AI) Capstone Project Abstract Defense",
      "Hardware-Centric Edge Computing Paradigm with Zero Cloud AI Dependency",
      "Unified Edge Pipeline on NVIDIA Jetson Orin Nano 8GB Developer Kit"
    ]
  },
  {
    slideNumber: 2,
    title: "1. Project Objective & Problem Statement",
    subtitle: "Addressing the Core Bottlenecks of Modern Support Operations",
    institution: "GIFT Autonomous College | Applied AI",
    team: "Trackmind",
    mentor: "Guide: Kalpa Pandit",
    keyPoints: [
      "Manual Triage Bottlenecks: Support desks face overwhelming ticket volume where manual reading, urgency tagging, and initial replies cause significant SLA delays.",
      "Off-Hours & Resource-Constrained Gaps: Inability to triage high-urgency incidents during night shifts, remote branch offices, or internet bandwidth blackouts.",
      "Data Sovereignty & Privacy: Enterprise email contains sensitive PII, passwords, and billing records; sending all text to third-party cloud LLMs risks regulatory compliance breaches (GDPR/HIPAA).",
      "Core Aim 1: Zero-shot intent & urgency classification without task-specific labeled training datasets.",
      "Core Aim 2: Automated context-aware draft reply generation via edge SLMs (Phi-3.5-mini / Llama 3.2 3B) ready for human sign-off.",
      "Core Aim 3: 100% on-device hardware execution on NVIDIA Jetson Orin Nano with zero remote cloud API reliance."
    ]
  },
  {
    slideNumber: 3,
    title: "2. Hardware Specifications & Architecture",
    subtitle: "NVIDIA Jetson Orin Nano Developer Kit (8GB Unified Memory)",
    institution: "GIFT Autonomous College | Applied AI",
    team: "Trackmind",
    mentor: "Guide: Kalpa Pandit",
    keyPoints: [
      "Edge Device: NVIDIA Jetson Orin Nano Developer Kit with Ampere GPU (1024 CUDA Cores + 32 Tensor Cores) delivering up to 40 TOPS INT8 AI compute.",
      "Memory Architecture: 8GB 128-bit LPDDR5 Unified Memory. Shared zero-copy architecture allows GPU and CPU to access quantized weights without PCIe bus copy overhead.",
      "Quantization Sweet Spot: 4-bit AWQ / GGUF quantization shrinks 3B SLM footprint from 7.6GB down to ~2.2GB VRAM, leaving >3GB memory headroom.",
      "Power Envelope: Operates cleanly between 7W (low power) and 15W (MAX-N performance mode) with active heatsink cooling.",
      "Fast NVMe Storage: M.2 PCIe Gen4 NVMe SSD for fast cold-boot weight loading (<2.4 seconds) and ACID SQLite persistence."
    ]
  },
  {
    slideNumber: 4,
    title: "3. Software Layer & Pipeline Orchestration",
    subtitle: "LangChain, Target SLMs, SQLite & Jinja2 Templating",
    institution: "GIFT Autonomous College | Applied AI",
    team: "Trackmind",
    mentor: "Guide: Kalpa Pandit",
    keyPoints: [
      "Target Language Models: Microsoft Phi-3.5-mini-instruct (3.8B) and Meta Llama 3.2 (3B-Instruct) quantized for on-device edge inference.",
      "Ticket Ingestion Layer: Raw email/ticket stream sanitized (MIME parsing, header extraction, entity detection) on edge CPU.",
      "Zero-Shot Intent Classification: Structured output schema categorizing tickets into Technical Incident, Billing, Security, Support, Feature Request, or Inquiry.",
      "Urgency & Sentiment Engine: Evaluates emotional distress and business urgency (1-5 scale) to auto-prioritize inbox placement.",
      "LangChain Orchestration: Coordinates prompt chaining, context retrieval, and structured JSON output parsing.",
      "Jinja2 & SQLite: Jinja2 formats professional structured draft replies; SQLite indexes tickets, urgency tags, and drafts locally."
    ]
  },
  {
    slideNumber: 5,
    title: "4. Expected Outcomes & Measurable Targets",
    subtitle: "Delivering a Fully Verified, Production-Ready Edge Appliance",
    institution: "GIFT Autonomous College | Applied AI",
    team: "Trackmind",
    mentor: "Guide: Kalpa Pandit",
    keyPoints: [
      "Sorted Inbox: Inbound tickets dynamically organized by urgency level (Critical, High, Medium, Low) and category.",
      "Pre-Generated Draft Replies: Contextual draft attached to every ticket for human-in-the-loop (HITL) approval before dispatch.",
      "Zero-Shot Generalization: Robust classification accuracy across unseen, unstructured customer inquiries without custom fine-tuning data.",
      "100% Edge Autonomy: Full pipeline functions uninterrupted when offline; zero external API charges or cloud server subscriptions.",
      "Latency & Throughput: Sub-2-second end-to-end turnaround per ticket on Jetson Orin Nano (generating ~22-28 tokens/sec)."
    ]
  },
  {
    slideNumber: 6,
    title: "5. Future Scope & Research Roadmap",
    subtitle: "Scalable Evolution on the NVIDIA Jetson Orin Nano Platform",
    institution: "GIFT Autonomous College | Applied AI",
    team: "Trackmind",
    mentor: "Guide: Kalpa Pandit",
    keyPoints: [
      "Multi-Channel Ingestion: Extend pipeline to ingest WhatsApp Business messages, Slack help channels, and social media tickets directly on the same edge device.",
      "Automated Team Routing: Intelligent dispatch to designated engineering pods, billing desks, or Tier-3 escalation teams.",
      "Continuous Human Feedback Learning: Ingest human edits to generated drafts to perform on-device LoRA / DPO micro-tuning, improving drafting tone over time.",
      "Multilingual Ticket Handling: Local edge translation and zero-shot reasoning for regional languages including Odia, Hindi, Bengali, and Spanish."
    ]
  }
];
