// Server-safe icon set (stroke, inherits colour)
const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const Icon = {
  Bulb: () => (<svg {...base}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" /></svg>),
  People: () => (<svg {...base}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M17 14c2.5 0 4.5 2 4.5 4.5" /></svg>),
  Bolt: () => (<svg {...base}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>),
  Trophy: () => (<svg {...base}><path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8" /></svg>),
  Network: () => (<svg {...base}><circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M11 7l-5 9M13 7l5 9M7.2 18h9.6" /></svg>),
  Workshop: () => (<svg {...base}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M7 9h4M7 12h7" /></svg>),
  Mentor: () => (<svg {...base}><path d="M12 3l9 4.5-9 4.5-9-4.5zM6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" /></svg>),
  Arrow: () => (<svg {...base} width={18} height={18} strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  Phone: () => (<svg {...base} width={20} height={20}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>),
  Mail: () => (<svg {...base} width={20} height={20}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" /></svg>),
  Check: () => (<svg {...base} width={18} height={18} strokeWidth={2.4}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>),
  Plus: () => (<svg {...base} width={18} height={18} strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>),
};
