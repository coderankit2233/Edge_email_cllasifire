export type TabType = 'docs' | 'simulator' | 'hardware' | 'code' | 'presentation';

export interface TeamMember {
  name: string;
  regNo: string;
  role: string;
}

export interface Mentor {
  name: string;
  designation: string;
}

export interface ProjectMeta {
  title: string;
  subtitle: string;
  type: string;
  department: string;
  institution: string;
  location: string;
  teamName: string;
  teamMembers: TeamMember[];
  mentor: Mentor;
}

export type UrgencyLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type IntentCategory = 
  | 'Technical Incident'
  | 'Billing & Invoicing'
  | 'Account Security'
  | 'Product Support'
  | 'Feature Request'
  | 'General Inquiry';

export type SentimentType = 'Frustrated / Urgent' | 'Dissatisfied' | 'Neutral' | 'Constructive' | 'Satisfied';

export interface Ticket {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  timestamp: string;
  category?: IntentCategory;
  urgency?: UrgencyLevel;
  urgencyScore?: number; // 1 to 5
  sentiment?: SentimentType;
  sentimentScore?: number; // -1.0 to 1.0
  intentConfidence?: number; // 0 to 100%
  extractedEntities?: {
    orderId?: string;
    accountNo?: string;
    errorCode?: string;
    serviceName?: string;
  };
  draftReply?: string;
  templateUsed?: string;
  status: 'Unprocessed' | 'Draft Ready' | 'Approved' | 'Sent' | 'Modified & Approved' | 'Rejected';
  executionMetrics?: {
    model: string;
    totalLatencyMs: number;
    tokensPerSecond: number;
    memoryAllocatedMB: number;
    powerWattage: number;
  };
}

export interface HardwareSpec {
  component: string;
  proposedSpec: string;
  role: string;
  details: string;
  memoryImpact: string;
}
