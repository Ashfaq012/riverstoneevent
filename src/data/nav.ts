// Primary navigation, shared by Header (top nav) and Footer (Quick Links)
// so the two never drift out of sync.
export const mainNav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/hire/', label: 'Hire' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/contact/', label: 'Contact' },
] as const;
