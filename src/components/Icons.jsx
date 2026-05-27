// Shared line-icon set (24x24 viewBox, stroke-based, inherits currentColor)
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const BoltIcon = (p) => (
  <svg {...base} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
);

export const BatteryIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2" />
    <path d="M6 10v4M10 10v4M14 10v4" />
  </svg>
);

export const GaugeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 14 19 7" />
    <path d="M3 20a9 9 0 1 1 18 0" />
    <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const PhoneIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

export const MailIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const MapPinIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const UserIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </svg>
);

export const TagIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
    <circle cx="7.5" cy="7.5" r="1.3" />
  </svg>
);

export const NoteIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 4h12l4 4v12H4z" />
    <path d="M8 12h8M8 16h6M8 8h5" />
  </svg>
);

export const GiftIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="8" width="18" height="4" />
    <path d="M5 12v9h14v-9M12 8v13" />
    <path d="M12 8c-2.5 0-4-1.2-4-3a2 2 0 0 1 4 0 2 2 0 0 1 4 0c0 1.8-1.5 3-4 3Z" />
  </svg>
);

export const CardIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 10h19M7 15h3" />
  </svg>
);

export const ShieldIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const CalendarIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
);

export const CheckIcon = (p) => (
  <svg {...base} {...p}><path d="m5 12 5 5L20 7" /></svg>
);

export const FacebookIcon = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-7H8v-2.88h2.44V9.85c0-2.41 1.43-3.74 3.63-3.74 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.57.74-1.57 1.5v1.81h2.67l-.43 2.88h-2.24v7A10 10 0 0 0 22 12Z" />
  </svg>
);

export const YoutubeIcon = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23 7.2a2.78 2.78 0 0 0-1.96-1.97C19.32 4.8 12 4.8 12 4.8s-7.32 0-9.04.43A2.78 2.78 0 0 0 1 7.2 29 29 0 0 0 .6 12 29 29 0 0 0 1 16.8a2.78 2.78 0 0 0 1.96 1.97c1.72.43 9.04.43 9.04.43s7.32 0 9.04-.43A2.78 2.78 0 0 0 23 16.8a29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8ZM9.75 15.36V8.64L15.5 12l-5.75 3.36Z" />
  </svg>
);

export const ZaloIcon = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C7.03 2 3 5.72 3 10.25c0 2.75 1.53 5.2 3.95 6.72L6 21l4.95-2.1c.68.1 1.36.15 2.05.15 4.97 0 9-3.72 9-8.25S16.97 2 12 2Zm-1.78 11.5h-1.6v-1.2h1.53c.58 0 1.1-.24 1.47-.67l.46-.54c.11-.12.16-.27.16-.42a.71.71 0 0 0-.2-.5.86.86 0 0 0-.61-.22H7.2v-1.2h4.38c.76 0 1.47.32 1.98.88.5.55.79 1.28.79 2.05 0 .77-.29 1.5-.79 2.05-.51.56-1.22.88-1.98.88Zm6.9 3.3H8.5v1.2H18.8v-1.2Zm0-8.35h-1.6v1.2h1.6v-1.2Z" />
  </svg>
);

export const SendIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);
