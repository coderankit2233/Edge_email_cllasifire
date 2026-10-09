import { Ticket } from '../types';

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TCK-8921",
    sender: "Sarah Jenkins",
    senderEmail: "s.jenkins@apexcloud.io",
    subject: "URGENT: Production API returning 502 Bad Gateway across US-East cluster",
    body: "Hi Support Team,\n\nOur production application has been throwing continuous HTTP 502 Bad Gateway errors since 04:15 AM EST. This is impacting over 14,000 active enterprise users who cannot complete checkouts. Error code returned by gateway: NGINX_502_UPSTREAM_TIMEOUT.\n\nPlease escalate this to the on-call Site Reliability Engineering pod immediately and let us know the current incident status.",
    timestamp: "12 mins ago",
    status: "Unprocessed",
    extractedEntities: {
      errorCode: "NGINX_502_UPSTREAM_TIMEOUT",
      serviceName: "US-East cluster"
    }
  },
  {
    id: "TCK-8922",
    sender: "Rahul Deshmukh",
    senderEmail: "rahul.d@fintechpay.in",
    subject: "Double deduction on subscription renewal invoice #INV-2026-904",
    body: "Hello,\n\nI was charged twice ($149.00 x 2) on my corporate credit card for invoice #INV-2026-904 on October 7th. Transaction reference is TXN_984128. I only have one active Pro license.\n\nPlease reverse the duplicate charge and issue an updated credit note as soon as possible.",
    timestamp: "28 mins ago",
    status: "Unprocessed",
    extractedEntities: {
      orderId: "#INV-2026-904",
      accountNo: "TXN_984128"
    }
  },
  {
    id: "TCK-8923",
    sender: "Dr. Elena Rostova",
    senderEmail: "elena.r@biolabs.org",
    subject: "Locked out of 2FA authenticator device after phone replacement",
    body: "Dear Support,\n\nI recently switched my university mobile phone and lost access to my Google Authenticator app for account elena.r@biolabs.org. I do not have access to my emergency one-time backup keys.\n\nCould you please initiate an identity verification check so I can regain access to my team's genomic datasets?",
    timestamp: "45 mins ago",
    status: "Unprocessed",
    extractedEntities: {
      accountNo: "elena.r@biolabs.org"
    }
  },
  {
    id: "TCK-8924",
    sender: "Marcus Vance",
    senderEmail: "marcus@vancedesign.co",
    subject: "Proposal: Native Figma token sync integration for component library",
    body: "Hey there,\n\nOur design team loves the ticket dashboard! We were wondering if there are any plans on the roadmap to support direct bi-directional synchronization with Figma design tokens or GitHub Actions webhook triggers?\n\nThis would save our team at least 4 hours every sprint. Keep up the great work!",
    timestamp: "1 hour ago",
    status: "Unprocessed"
  },
  {
    id: "TCK-8925",
    sender: "Priya Sharma",
    senderEmail: "priya.sharma@logisticsfast.com",
    subject: "Webhook latency inquiry on European endpoints",
    body: "Hi team,\n\nWe noticed a slight increase in round-trip latency on the EU-Central webhook dispatcher (averaging ~340ms vs our standard ~80ms baseline). Is there any scheduled maintenance or cloud routing degradation ongoing in the Frankfurt data center?",
    timestamp: "2 hours ago",
    status: "Unprocessed",
    extractedEntities: {
      serviceName: "EU-Central Frankfurt endpoint"
    }
  }
];
