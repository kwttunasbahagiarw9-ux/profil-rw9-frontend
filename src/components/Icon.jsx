const Icon = ({ name, className = "h-6 w-6" }) => {
  const paths = {
    document: (
      <>
        <path d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M14 2v5h5" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),
    health: (
      <>
        <path d="M12 21s-7-4.5-9.5-8.5C.8 9.5 2.5 6 6 6c2 0 3.2 1.2 4 2.5C10.8 7.2 12 6 14 6c3.5 0 5.2 3.5 3.5 6.5C15 16.5 12 21 12 21z" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 15.5v.5" />
      </>
    ),
    shop: (
      <>
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        <path d="M4 12v8h16v-8" />
        <path d="M9 20v-5h6v5" />
      </>
    ),
    leaf: (
      <>
        <path d="M4 20c0-9 7-16 16-16 0 9-7 16-16 16z" />
        <path d="M4 20c4-6 8-10 14-13" />
        <path d="M4 20c1-6 3-11 7-15" />
      </>
    ),
    heart: (
      <>
        <path d="M12 21s-8-4.5-10-9.5C.8 8 3 5 6 5c2.2 0 3.6 1.2 4.5 2.5C11.4 6.2 12.8 5 15 5c3 0 5.2 3 4 6.5C17 16.5 12 21 12 21z" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
      </>
    ),
    mail: (
      <>
        <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 22s8-4.5 8-12a8 8 0 1 0-16 0c0 7.5 8 12 8 12z" />
        <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    check: <path d="m4 12 5 5L20 6" />,
    wave: (
      <>
        <path d="M2 12c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" />
        <path d="M2 18c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" />
        <path d="M2 6c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" />
      </>
    ),
    facebook: (
      <path d="M14 8h3V5h-3a4 4 0 0 0-4 4v3H7v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
      </>
    ),
    youtube: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="m10 9.5 5 2.5-5 2.5z" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
        <path d="M8.8 9.2c-.2.4-.1.9.3 1.3 1 1.5 2.5 2.7 4 3.2.5.2 1 .1 1.3-.3l.5-.8c.3-.3.7-.3 1-.1l1.4.8c.4.2.5.7.2 1-.8 1.5-2.6 2.1-4.1 1.5-2.7-1.1-5-3.4-5.8-6.1-.3-.8 0-1.4.5-1.7.3-.2.7-.2 1-.1l.7.6z" />
      </>
    ),
    external: (
      <>
        <path d="M14 4h6v6" />
        <path d="M20 4 11 13" />
        <path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5" />
        <path d="M21 12H9" />
      </>
    ),
    admin: (
      <>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <circle cx="17" cy="9.5" r="2.5" />
        <path d="M15.5 15.5a5 5 0 0 1 6 4.5" />
      </>
    )
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.document}
    </svg>
  );
};

export default Icon;
