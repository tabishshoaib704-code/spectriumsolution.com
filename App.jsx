import React, { useState, useEffect, useRef } from 'react';

// ============================================
// SPECTRIUM SOLUTIONS - FINAL VERSION
// All static classes, no external dependencies
// ============================================

// Animated Counter Hook
const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, start]);
  
  return [count, ref];
};

// Scroll Animation Hook
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return [ref, isVisible];
};

// SVG Icons
const Icons = {
  Wifi: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  Tv: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" />
    </svg>
  ),
  Phone: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  MapPin: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Shield: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Clock: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Star: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Menu: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Play: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Headphones: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Award: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Download: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Upload: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Monitor: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Gamepad: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  ),
  Home: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  MessageCircle: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Sparkles: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  ),
  Rocket: ({ className = "w-6 h-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

// Decorative Image Card Component (uses gradients instead of external images)
const ImageCard = ({ gradient, icon: Icon, iconBg, children, className = "" }) => (
  <div className={`relative h-48 overflow-hidden ${gradient} ${className}`}>
    {/* Dot Pattern */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
    </div>
    
    {/* Large Background Icon */}
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <Icon className="w-32 h-32 text-white" />
    </div>
    
    {/* Decorative Blurs */}
    <div className="absolute top-4 right-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl" />
    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white opacity-10 rounded-full blur-lg" />
    
    {/* Icon Badge */}
    <div className={`absolute top-4 left-4 w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    
    {/* Bottom Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    
    {children}
  </div>
);

// Cookie Banner
const CookieBanner = ({ visible, onAccept, onDecline }) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slideUp">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-gray-900 font-semibold mb-1 text-sm">🍪 Cookie Preferences</h3>
            <p className="text-gray-600 text-xs">We use cookies to enhance your experience. See our Privacy Policy for details.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onDecline} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium">Decline</button>
            <button onClick={onAccept} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">Accept All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Action Button
const FloatingButton = ({ onClick }) => {
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <button onClick={onClick} className="fixed bottom-6 right-6 z-40 group animate-bounceIn">
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg transition-all duration-1000 ${pulse ? 'opacity-70 scale-110' : 'opacity-50 scale-100'}`} />
      <div className="relative flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
        <Icons.MessageCircle className="w-5 h-5" />
        <span className="font-semibold text-sm">Get Started</span>
        <Icons.Sparkles className="w-4 h-4" />
      </div>
    </button>
  );
};

// Navigation
const Navigation = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const items = [
    { id: 'Home', label: 'Home' },
    { id: 'Spectrum', label: 'Spectrum' },
    { id: 'Internet', label: 'Internet' },
    { id: 'Plans', label: 'Plans' },
    { id: 'Coverage', label: 'Coverage' },
    { id: 'About', label: 'About' },
    { id: 'Contact', label: 'Contact' },
  ];
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-white/80 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={() => setPage('Home')} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all group-hover:scale-105">
              <Icons.Wifi className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Spectrium</span>
              <span className="text-xs text-gray-500 font-semibold tracking-wider -mt-1">SOLUTIONS</span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center gap-1">
            {items.map(item => (
              <button key={item.id} onClick={() => setPage(item.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${page === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+18005551234" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Icons.Phone className="w-4 h-4" />
              <span className="text-sm font-medium">1-800-555-1234</span>
            </a>
            <button onClick={() => setPage('Coverage')} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105">
              Check Availability
            </button>
          </div>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
            {menuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {items.map(item => (
            <button key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); }} className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${page === item.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}>
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100">
            <button onClick={() => { setPage('Coverage'); setMenuOpen(false); }} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer with Google Ads Compliant Disclaimers
const Footer = ({ setPage }) => (
  <footer className="bg-gray-50 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Icons.Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">Spectrium</span>
              <span className="text-xs text-gray-500 font-semibold block -mt-0.5 tracking-wider">SOLUTIONS</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">Your trusted provider for high-speed internet and premium cable TV services.</p>
        </div>
        
        <div>
          <h4 className="text-gray-900 font-semibold mb-4 text-sm">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'Spectrum', 'Internet', 'Plans', 'Coverage', 'About', 'Contact'].map(link => (
              <li key={link}><button onClick={() => setPage(link)} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">{link}</button></li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-gray-900 font-semibold mb-4 text-sm">Legal</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setPage('Privacy')} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Privacy Policy</button></li>
            <li><button onClick={() => setPage('Terms')} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Terms & Conditions</button></li>
            <li><button onClick={() => setPage('Refund')} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Refund Policy</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-gray-900 font-semibold mb-4 text-sm">Contact</h4>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2"><Icons.Phone className="w-4 h-4 text-blue-600" />1-800-555-1234</li>
            <li className="flex items-center gap-2"><Icons.Mail className="w-4 h-4 text-blue-600" />support@spectriumsolutions.com</li>
            <li className="flex items-start gap-2"><Icons.MapPin className="w-4 h-4 text-blue-600 mt-0.5" /><span>123 Tech Blvd<br/>New York, NY 10001</span></li>
          </ul>
        </div>
      </div>
      
      {/* Google Ads Compliant Disclaimers */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="bg-gray-100 rounded-2xl p-6 mb-6">
          <h5 className="text-gray-900 font-semibold text-sm mb-3">Important Disclaimers</h5>
          <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-600 leading-relaxed">
            <div>
              <p className="mb-2"><strong>Pricing:</strong> All prices shown are monthly rates for new residential customers. Promotional pricing may be valid for a limited time; standard rates apply thereafter. Prices do not include taxes, fees, or equipment charges.</p>
              <p><strong>Service:</strong> We are an authorized retailer helping customers sign up for Spectrum internet service. Service availability, speeds, and pricing vary by location.</p>
            </div>
            <div>
              <p className="mb-2"><strong>Speed & Availability:</strong> Advertised speeds are maximum speeds and are not guaranteed. Actual speeds may vary based on device, location, network congestion, and other factors.</p>
              <p><strong>Spectrum:</strong> Spectrum is a registered trademark of Charter Communications. We are an independent authorized retailer, not an employee or agent of Charter Communications.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Spectrium Solutions is an independent authorized retailer of Spectrum services. We help customers find and sign up for Spectrum internet plans. All trademarks are property of their respective owners.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm">© 2025 Spectrium Solutions LLC. All rights reserved.</p>
            <p className="text-gray-400 text-xs mt-1">Business Registration: NY-12345678 | Licensed & Insured</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <button onClick={() => setPage('Privacy')} className="hover:text-blue-600 transition-colors">Privacy</button>
            <span>|</span>
            <button onClick={() => setPage('Terms')} className="hover:text-blue-600 transition-colors">Terms</button>
            <span>|</span>
            <button onClick={() => setPage('Refund')} className="hover:text-blue-600 transition-colors">Refunds</button>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-4">
          This website complies with Google Ads policies. Contact: compliance@spectriumsolutions.com | 1-800-555-1234
        </p>
      </div>
    </div>
  </footer>
);

// ============================================
// HOME PAGE
// ============================================
const HomePage = ({ setPage }) => {
  const [customerCount, customerRef] = useCounter(50000, 2000);
  const [channelCount, channelRef] = useCounter(250, 1500);
  const [uptimeCount, uptimeRef] = useCounter(99, 1500);
  const [ref1, visible1] = useScrollAnimation();
  const [ref2, visible2] = useScrollAnimation();
  const [ref3, visible3] = useScrollAnimation();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 left-20 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-float" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 mb-6 animate-fadeInLeft">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-700 text-sm font-medium">Trusted by 50,000+ Customers</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInLeft animation-delay-100">
                Experience
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Lightning-Fast
                </span>
                Internet & TV
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fadeInLeft animation-delay-200">
                Stream, game, and work from home without interruption. Get blazing fast speeds up to 
                <span className="font-bold text-blue-600"> 1 Gbps</span> and access to 
                <span className="font-bold text-indigo-600"> 250+ premium channels</span>.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fadeInLeft animation-delay-300">
                <button onClick={() => setPage('Coverage')} className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Check Availability
                    <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button onClick={() => setPage('Spectrum')} className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                  <Icons.Play className="w-5 h-5" />
                  View Spectrum Plans
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 animate-fadeInLeft animation-delay-400">
                <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <Icons.Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <Icons.Headphones className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <Icons.Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Award Winning</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="order-1 lg:order-2 relative animate-fadeInRight">
              {/* Floating Icons */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl z-10 animate-bounce-slow">
                <Icons.Zap className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl z-10 animate-bounce-slow animation-delay-1000">
                <Icons.Wifi className="w-10 h-10 text-white" />
              </div>
              
              {/* Main Dashboard Card */}
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl shadow-blue-500/20">
                {/* Speed Meters */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#22D3EE" strokeWidth="8" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="0" className="animate-draw-circle" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">1</span>
                        <span className="text-sm text-white/80">Gbps</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">Download</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#A78BFA" strokeWidth="8" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="125" className="animate-draw-circle animation-delay-300" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">500</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">Upload Mbps</p>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center animate-fadeInUp animation-delay-500">
                    <Icons.Zap className="w-5 h-5 text-cyan-300 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">5ms</p>
                    <p className="text-white/60 text-xs">Latency</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center animate-fadeInUp animation-delay-600">
                    <Icons.Tv className="w-5 h-5 text-cyan-300 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">250+</p>
                    <p className="text-white/60 text-xs">Channels</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center animate-fadeInUp animation-delay-700">
                    <Icons.Monitor className="w-5 h-5 text-cyan-300 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">∞</p>
                    <p className="text-white/60 text-xs">Devices</p>
                  </div>
                </div>
                
                {/* Live Status */}
                <div className="mt-6 flex items-center justify-center gap-2 text-white/80 text-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Network Status: Excellent
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div ref={customerRef} className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fadeInUp">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <Icons.Users className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">{customerCount.toLocaleString()}+</p>
                <p className="text-gray-500">Customers Helped</p>
              </div>
            </div>
            
            <div ref={channelRef} className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fadeInUp animation-delay-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <Icons.MapPin className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">{channelCount}+</p>
                <p className="text-gray-500">Service Areas</p>
              </div>
            </div>
            
            <div ref={uptimeRef} className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fadeInUp animation-delay-200">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <Icons.Star className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">{uptimeCount}%</p>
                <p className="text-gray-500">Satisfaction Rate</p>
              </div>
            </div>
            
            <div className="relative group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 overflow-hidden animate-fadeInUp animation-delay-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 mb-4">
                  <Icons.Headphones className="w-6 h-6" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">24/7</p>
                <p className="text-gray-500">Expert Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - 3 Column Image Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={ref1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className={`inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 ${visible1 ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Why Choose Us
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${visible1 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>
              Everything You Need, <span className="text-blue-600">All in One Place</span>
            </h2>
            <p className={`text-gray-600 text-lg max-w-2xl mx-auto ${visible1 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              From blazing-fast internet to premium entertainment, we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 ${visible1 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <ImageCard 
                gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700"
                icon={Icons.Wifi}
                iconBg="bg-blue-400/30 backdrop-blur"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">High-Speed Internet</h3>
                <p className="text-gray-600 mb-4">Find plans with speeds up to 1 Gbps. Stream 4K, game online, and video chat without buffering.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Up to 1 Gbps</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Unlimited Data</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">No Contracts</span>
                </div>
              </div>
            </div>
            
            {/* Feature Card 2 */}
            <div className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 ${visible1 ? 'animate-fadeInUp animation-delay-300' : 'opacity-0'}`}>
              <ImageCard 
                gradient="bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700"
                icon={Icons.MapPin}
                iconBg="bg-purple-400/30 backdrop-blur"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">Compare All Providers</h3>
                <p className="text-gray-600 mb-4">We compare every internet provider in your area so you can find the best deal without the hassle.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">All Providers</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">Best Prices</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">Unbiased</span>
                </div>
              </div>
            </div>
            
            {/* Feature Card 3 */}
            <div className={`group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 ${visible1 ? 'animate-fadeInUp animation-delay-400' : 'opacity-0'}`}>
              <ImageCard 
                gradient="bg-gradient-to-br from-purple-500 via-pink-600 to-pink-700"
                icon={Icons.Headphones}
                iconBg="bg-pink-400/30 backdrop-blur"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Expert Support</h3>
                <p className="text-gray-600 mb-4">Our team helps you choose the right plan and guides you through the entire signup process.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">Free Consultation</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">Expert Advice</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">24/7 Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Plans Section */}
      <section className="py-20 bg-white" ref={ref2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4 ${visible2 ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Flexible Plans
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${visible2 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>
              Choose Your Perfect Plan
            </h2>
            <p className={`text-gray-600 text-lg max-w-2xl mx-auto ${visible2 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              No hidden fees, no contracts. Cancel anytime with our 30-day money-back guarantee.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic Plan */}
            <div className={`relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl ${visible2 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>
              <div className="text-center mb-6 pt-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-500 mb-4 shadow-lg">
                  <Icons.Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Basic</h3>
                <p className="text-sm text-blue-600 mb-4">100 Mbps</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">$39.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {['Unlimited Data', 'Free Modem', 'Email Support'].map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-blue-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setPage('Coverage')} className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                Get Started
              </button>
            </div>
            
            {/* Standard Plan - Popular */}
            <div className={`relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/30 scale-105 z-10 ${visible2 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg animate-pulse">
                ⭐ Most Popular
              </div>
              <div className="text-center mb-6 pt-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-4 shadow-lg">
                  <Icons.Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Standard</h3>
                <p className="text-sm text-blue-200 mb-4">300 Mbps</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">$59.99</span>
                  <span className="text-blue-200">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {['Unlimited Data', 'Free Router', 'Priority Support', '100+ Channels'].map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-blue-100">
                    <div className="w-5 h-5 rounded-full bg-blue-400/30 flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-blue-200" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setPage('Coverage')} className="w-full py-3 rounded-xl font-semibold bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
            
            {/* Premium Plan */}
            <div className={`relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 bg-white border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl ${visible2 ? 'animate-fadeInUp animation-delay-300' : 'opacity-0'}`}>
              <div className="text-center mb-6 pt-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
                  <Icons.Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Premium</h3>
                <p className="text-sm text-purple-600 mb-4">500 Mbps</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">$79.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {['Unlimited Data', 'Premium Equipment', '24/7 VIP Support', '200+ Channels'].map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-purple-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setPage('Coverage')} className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                Get Started
              </button>
            </div>
            
            {/* Ultra Plan */}
            <div className={`relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-3 bg-white border-2 border-gray-100 hover:border-pink-200 hover:shadow-xl ${visible2 ? 'animate-fadeInUp animation-delay-400' : 'opacity-0'}`}>
              <div className="text-center mb-6 pt-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4 shadow-lg">
                  <Icons.Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Ultra</h3>
                <p className="text-sm text-pink-600 mb-4">1 Gbps</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">$99.99</span>
                  <span className="text-gray-500">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {['Unlimited Data', 'Best Equipment', 'Dedicated Support', '250+ Channels'].map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                      <Icons.Check className="w-3 h-3 text-pink-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setPage('Coverage')} className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-lg hover:shadow-pink-500/30 transition-all">
                Get Started
              </button>
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            * Prices are monthly rates. Equipment fees may apply. <button onClick={() => setPage('Terms')} className="text-blue-600 hover:underline">Terms apply</button>.
          </p>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50" ref={ref3}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4 ${visible3 ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Customer Stories
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${visible3 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>
              Loved by <span className="text-purple-600">Thousands</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible3 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">"They helped me find an internet plan that was $30 cheaper than what I was paying! The whole process took less than 15 minutes."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  SJ
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Sarah Johnson</p>
                  <p className="text-gray-500 text-sm">Austin, TX</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible3 ? 'animate-fadeInUp animation-delay-300' : 'opacity-0'}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">"I didn't know there were so many options in my area. They compared everything and got me set up with gigabit internet the next day!"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  MC
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Michael Chen</p>
                  <p className="text-gray-500 text-sm">Denver, CO</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible3 ? 'animate-fadeInUp animation-delay-400' : 'opacity-0'}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed italic">"Moving to a new city was stressful, but they made getting internet so easy. Found me the best provider for my apartment in minutes."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  ER
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Emily Rodriguez</p>
                  <p className="text-gray-500 text-sm">Seattle, WA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeInUp">
            Ready for a Better Internet Experience?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
            Join 50,000+ satisfied customers. Check availability in your area and get connected today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp animation-delay-200">
            <button onClick={() => setPage('Coverage')} className="group px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
              Check Availability
              <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <a href="tel:+18005551234" className="px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3">
              <Icons.Phone className="w-6 h-6" />
              1-800-555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// SPECTRUM PAGE
// ============================================
const SpectrumPage = ({ setPage }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [ref1, visible1] = useScrollAnimation();
  const [ref2, visible2] = useScrollAnimation();
  
  const spectrumPlans = [
    { name: 'Spectrum Internet', speed: '300 Mbps', price: 49.99, features: ['Unlimited Data', 'Free Modem', 'No Contracts', 'Free Antivirus'], color: 'blue', popular: false },
    { name: 'Spectrum Internet Ultra', speed: '500 Mbps', price: 69.99, features: ['Unlimited Data', 'Free Modem', 'No Contracts', 'Free Antivirus', 'Advanced WiFi'], color: 'indigo', popular: true },
    { name: 'Spectrum Internet Gig', speed: '1 Gbps', price: 89.99, features: ['Unlimited Data', 'Free Modem', 'No Contracts', 'Free Antivirus', 'Advanced WiFi', 'Priority Support'], color: 'purple', popular: false },
  ];
  
  return (
    <div className="pt-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6 animate-fadeInLeft">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-blue-700 text-sm font-medium">Official Spectrum Authorized Retailer</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fadeInLeft animation-delay-100">
                Get
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Spectrum Internet
                </span>
                Today
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fadeInLeft animation-delay-200">
                Fast, reliable internet with speeds up to <span className="font-bold text-blue-600">1 Gbps</span>. 
                No data caps, no contracts, and a free modem included with every plan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInLeft animation-delay-300">
                <button onClick={() => setPage('Coverage')} className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2">
                  Check Availability
                  <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="tel:+18005551234" className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2">
                  <Icons.Phone className="w-5 h-5" />
                  1-800-555-1234
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 animate-fadeInLeft animation-delay-400">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Icons.Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">No Data Caps</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Icons.Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">No Contracts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <Icons.Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Free Modem</span>
                </div>
              </div>
            </div>
            
            {/* Right - Visual */}
            <div className="relative animate-fadeInRight">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 shadow-2xl">
                {/* Speed Display */}
                <div className="text-center mb-6">
                  <p className="text-blue-200 text-sm mb-2">Speeds up to</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-7xl font-bold text-white">1</span>
                    <span className="text-3xl font-bold text-blue-200">Gbps</span>
                  </div>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Icons.Wifi, label: 'Ultra-Fast WiFi' },
                    { icon: Icons.Shield, label: 'Free Security' },
                    { icon: Icons.Download, label: 'Unlimited Data' },
                    { icon: Icons.Headphones, label: '24/7 Support' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                      <item.icon className="w-6 h-6 text-cyan-300 mx-auto mb-2" />
                      <p className="text-white text-sm">{item.label}</p>
                    </div>
                  ))}
                </div>
                
                {/* Price Callout */}
                <div className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center">
                  <p className="text-blue-200 text-sm">Starting at just</p>
                  <p className="text-4xl font-bold text-white">$49.99<span className="text-lg text-blue-200">/mo</span></p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce-slow">
                🎉 Special Offer!
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Plans Section */}
      <section className="py-20 bg-white" ref={ref1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 ${visible1 ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Spectrum Internet Plans
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${visible1 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>
              Choose Your Speed
            </h2>
            <p className={`text-gray-600 text-lg max-w-2xl mx-auto ${visible1 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              All plans include unlimited data, no contracts, and a free modem
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {spectrumPlans.map((plan, i) => (
              <div
                key={i}
                onClick={() => setSelectedPlan(plan)}
                className={`relative rounded-3xl p-8 transition-all duration-500 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl scale-105 z-10'
                    : selectedPlan?.name === plan.name
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-xl'
                    : 'bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2'
                } ${visible1 ? `animate-fadeInUp animation-delay-${(i + 2) * 100}` : 'opacity-0'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 rounded-full text-xs font-bold shadow-lg">
                    ⭐ Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                  <p className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-cyan-300' : 'text-blue-600'}`}>{plan.speed}</p>
                  <div className="flex items-baseline justify-center gap-1 mt-4">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>${plan.price}</span>
                    <span className={plan.popular ? 'text-blue-200' : 'text-gray-500'}>/mo</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className={`flex items-center gap-3 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-blue-500/30' : 'bg-blue-100'}`}>
                        <Icons.Check className={`w-3 h-3 ${plan.popular ? 'text-cyan-300' : 'text-blue-600'}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={(e) => { e.stopPropagation(); setPage('Coverage'); }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
                >
                  Get This Plan
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            * Prices shown are for new customers. Taxes and fees may apply. <button onClick={() => setPage('Terms')} className="text-blue-600 hover:underline">Terms apply</button>.
          </p>
        </div>
      </section>
      
      {/* Why Spectrum Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={ref2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${visible2 ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Why Choose Spectrum?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible2 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4">
                <Icons.Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Speeds</h3>
              <p className="text-gray-600 text-sm">Up to 1 Gbps download speeds for streaming, gaming, and more</p>
            </div>
            
            <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible2 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center mb-4">
                <Icons.Shield className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Data Caps</h3>
              <p className="text-gray-600 text-sm">Use as much data as you want without overage fees</p>
            </div>
            
            <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible2 ? 'animate-fadeInUp animation-delay-300' : 'opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4">
                <Icons.Clock className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Contracts</h3>
              <p className="text-gray-600 text-sm">Month-to-month service with no long-term commitment</p>
            </div>
            
            <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 ${visible2 ? 'animate-fadeInUp animation-delay-400' : 'opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center mb-4">
                <Icons.Wifi className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Free Modem</h3>
              <p className="text-gray-600 text-sm">Equipment included at no extra cost with your plan</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeInUp">
            Ready to Get Spectrum Internet?
          </h2>
          <p className="text-blue-100 text-xl mb-10 animate-fadeInUp animation-delay-100">
            Check if Spectrum is available at your address and get connected today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp animation-delay-200">
            <button onClick={() => setPage('Coverage')} className="group px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
              Check Availability
              <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <a href="tel:+18005551234" className="px-10 py-5 bg-transparent text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3">
              <Icons.Phone className="w-6 h-6" />
              1-800-555-1234
            </a>
          </div>
        </div>
      </section>
      
      <FloatingButton onClick={() => setPage('Coverage')} />
    </div>
  );
};

// ============================================
// INTERNET PAGE
// ============================================
const InternetPage = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('internet');
  const [selectedSpeed, setSelectedSpeed] = useState(null);
  const [isSpeedTestRunning, setIsSpeedTestRunning] = useState(false);
  const [speedTestResult, setSpeedTestResult] = useState(null);
  const [ref1, visible1] = useScrollAnimation();
  
  const runSpeedTest = () => {
    setIsSpeedTestRunning(true);
    setSpeedTestResult(null);
    setTimeout(() => {
      setIsSpeedTestRunning(false);
      setSpeedTestResult({
        download: Math.floor(Math.random() * 200 + 800),
        upload: Math.floor(Math.random() * 100 + 400),
        ping: Math.floor(Math.random() * 10 + 5),
      });
    }, 3000);
  };
  
  const speedTiers = [
    { speed: 100, label: 'Basic', desc: 'Perfect for browsing & email', devices: '1-3', price: 39.99 },
    { speed: 300, label: 'Standard', desc: 'Great for streaming & gaming', devices: '3-5', price: 59.99 },
    { speed: 500, label: 'Premium', desc: 'Ideal for families & WFH', devices: '5-10', price: 79.99 },
    { speed: 1000, label: 'Ultra', desc: 'Maximum speed for power users', devices: '10+', price: 99.99 },
  ];
  
  return (
    <div className="pt-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6 border border-blue-200 animate-fadeInUp">
              <Icons.Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Interactive Experience</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp animation-delay-100">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Internet Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
              Compare speeds, explore features, and get connected with the right plan for your home
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-12 animate-fadeInUp animation-delay-300">
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-xl border border-gray-100">
              <button onClick={() => setActiveTab('internet')} className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${activeTab === 'internet' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                <Icons.Wifi className="w-5 h-5" />
                <span className="hidden sm:inline">Internet Speeds</span>
              </button>
              <button onClick={() => setActiveTab('compare')} className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${activeTab === 'compare' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                <Icons.Monitor className="w-5 h-5" />
                <span className="hidden sm:inline">Compare Plans</span>
              </button>
              <button onClick={() => setActiveTab('speedtest')} className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${activeTab === 'speedtest' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                <Icons.Rocket className="w-5 h-5" />
                <span className="hidden sm:inline">Speed Test</span>
              </button>
            </div>
          </div>
          
          {/* Internet Tab */}
          {activeTab === 'internet' && (
            <div className="animate-fadeInUp">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {speedTiers.map((tier, i) => (
                  <button key={i} onClick={() => setSelectedSpeed(tier)} className={`relative p-6 rounded-3xl border-2 transition-all duration-500 text-left overflow-hidden group ${selectedSpeed?.speed === tier.speed ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-xl shadow-blue-500/20' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-2'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100">
                        <Icons.Wifi className="w-7 h-7 text-blue-600" />
                      </div>
                      <p className="text-4xl font-bold text-gray-900 mb-1">{tier.speed}</p>
                      <p className="text-gray-500 text-sm mb-3">Mbps</p>
                      <p className="font-bold text-gray-900 text-lg mb-1">{tier.label}</p>
                      <p className="text-gray-500 text-sm mb-3">{tier.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">${tier.price}</span>
                        <span className="text-gray-400 text-sm">/mo</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedSpeed && (
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-12 animate-fadeInUp">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                      <Icons.Download className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <p className="text-3xl font-bold text-gray-900">{selectedSpeed.speed} Mbps</p>
                      <p className="text-gray-600">Download Speed</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                      <Icons.Upload className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                      <p className="text-3xl font-bold text-gray-900">{Math.round(selectedSpeed.speed / 10)} Mbps</p>
                      <p className="text-gray-600">Upload Speed</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                      <Icons.Monitor className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <p className="text-3xl font-bold text-gray-900">{selectedSpeed.devices}</p>
                      <p className="text-gray-600">Connected Devices</p>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <button onClick={() => setPage('Coverage')} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105">
                      Get {selectedSpeed.label} Plan - ${selectedSpeed.price}/mo
                    </button>
                  </div>
                </div>
              )}
              
              {/* Use Cases */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Icons.Tv, label: '4K Streaming', speed: '25+ Mbps' },
                  { icon: Icons.Gamepad, label: 'Online Gaming', speed: '50+ Mbps' },
                  { icon: Icons.Users, label: 'Video Calls', speed: '10+ Mbps' },
                  { icon: Icons.Home, label: 'Smart Home', speed: '100+ Mbps' },
                ].map((use, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100 cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <use.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{use.label}</p>
                      <p className="text-gray-500 text-sm">{use.speed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Compare Plans Tab */}
          {activeTab === 'compare' && (
            <div className="animate-fadeInUp">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Compare Internet Plans</h3>
                <p className="text-gray-600">See what each speed tier can handle for your household</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-10">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-4 text-gray-900 font-semibold">What You Do</th>
                        <th className="text-center py-4 px-4 text-gray-600">100 Mbps</th>
                        <th className="text-center py-4 px-4 text-gray-600">300 Mbps</th>
                        <th className="text-center py-4 px-4 text-gray-600">500 Mbps</th>
                        <th className="text-center py-4 px-4 text-blue-600 font-semibold bg-blue-50 rounded-t-xl">1 Gbps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { activity: 'HD Streaming', s100: '2 TVs', s300: '5 TVs', s500: '10+ TVs', s1000: 'Unlimited' },
                        { activity: '4K Streaming', s100: '1 TV', s300: '3 TVs', s500: '6 TVs', s1000: 'Unlimited' },
                        { activity: 'Online Gaming', s100: 'Good', s300: 'Great', s500: 'Excellent', s1000: 'Pro-Level' },
                        { activity: 'Video Calls', s100: '1-2 people', s300: '3-5 people', s500: '5-10 people', s1000: 'Unlimited' },
                        { activity: 'Work From Home', s100: '1 person', s300: '2 people', s500: '3-4 people', s1000: 'Whole team' },
                        { activity: 'Smart Home Devices', s100: 'Up to 10', s300: 'Up to 25', s500: 'Up to 50', s1000: 'Unlimited' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-gray-900 font-medium">{row.activity}</td>
                          <td className="py-4 px-4 text-center text-gray-600">{row.s100}</td>
                          <td className="py-4 px-4 text-center text-gray-600">{row.s300}</td>
                          <td className="py-4 px-4 text-center text-gray-600">{row.s500}</td>
                          <td className="py-4 px-4 text-center text-blue-600 font-semibold bg-blue-50">{row.s1000}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Recommendation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icons.Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">1-2 People</h4>
                  <p className="text-gray-600 text-sm mb-4">Basic browsing, email, and occasional streaming</p>
                  <p className="text-2xl font-bold text-blue-600">100-300 Mbps</p>
                </div>
                <div className="p-6 bg-indigo-50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icons.Home className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Family (3-5)</h4>
                  <p className="text-gray-600 text-sm mb-4">Multiple streamers, gamers, and remote workers</p>
                  <p className="text-2xl font-bold text-indigo-600">300-500 Mbps</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-2xl text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icons.Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Power Users</h4>
                  <p className="text-gray-600 text-sm mb-4">Heavy gaming, 4K streaming, smart home enthusiasts</p>
                  <p className="text-2xl font-bold text-purple-600">500 Mbps - 1 Gbps</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Speed Test Tab */}
          {activeTab === 'speedtest' && (
            <div className="animate-fadeInUp">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Test Your Connection</h3>
                  <p className="text-gray-600 mb-10">See how fast your current internet is and find out if you could upgrade</p>
                  
                  {/* Meter */}
                  <div className="relative w-64 h-64 mx-auto mb-10">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#F3F4F6" strokeWidth="10" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#testGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${speedTestResult ? (speedTestResult.download / 10) * 2.83 : isSpeedTestRunning ? 150 : 0} 283`} style={{transition: 'stroke-dasharray 1s ease-out'}} />
                      <defs>
                        <linearGradient id="testGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {isSpeedTestRunning ? (
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-gray-600 font-medium">Testing...</p>
                        </div>
                      ) : speedTestResult ? (
                        <>
                          <p className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {speedTestResult.download}
                          </p>
                          <p className="text-gray-500 text-lg">Mbps</p>
                        </>
                      ) : (
                        <>
                          <Icons.Rocket className="w-16 h-16 text-blue-600 mb-3" />
                          <p className="text-gray-500 font-medium">Ready to test</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Results */}
                  {speedTestResult && (
                    <div className="grid grid-cols-3 gap-4 mb-10 animate-fadeInUp">
                      <div className="p-5 bg-blue-50 rounded-2xl">
                        <Icons.Download className="w-7 h-7 text-blue-600 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-gray-900">{speedTestResult.download}</p>
                        <p className="text-gray-500 text-sm">Download Mbps</p>
                      </div>
                      <div className="p-5 bg-indigo-50 rounded-2xl">
                        <Icons.Upload className="w-7 h-7 text-indigo-600 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-gray-900">{speedTestResult.upload}</p>
                        <p className="text-gray-500 text-sm">Upload Mbps</p>
                      </div>
                      <div className="p-5 bg-purple-50 rounded-2xl">
                        <Icons.Zap className="w-7 h-7 text-purple-600 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-gray-900">{speedTestResult.ping}</p>
                        <p className="text-gray-500 text-sm">Ping ms</p>
                      </div>
                    </div>
                  )}
                  
                  <button onClick={runSpeedTest} disabled={isSpeedTestRunning} className="px-12 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSpeedTestRunning ? 'Running Test...' : speedTestResult ? 'Test Again' : 'Start Speed Test'}
                  </button>
                  
                  <p className="text-gray-400 text-xs mt-6">
                    * This is a simulated speed test for demonstration purposes only.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Comparison Table */}
      <section className="py-20 bg-white" ref={ref1}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${visible1 ? 'animate-fadeInUp' : 'opacity-0'}`}>Speed Comparison</h2>
            <p className={`text-gray-600 text-lg ${visible1 ? 'animate-fadeInUp animation-delay-100' : 'opacity-0'}`}>See what each speed tier can handle</p>
          </div>
          
          <div className={`bg-gray-50 rounded-3xl overflow-hidden shadow-xl border border-gray-100 ${visible1 ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <th className="text-left py-5 px-6 text-white font-semibold">Activity</th>
                    <th className="text-center py-5 px-4 text-white/80 font-medium">100 Mbps</th>
                    <th className="text-center py-5 px-4 text-white/80 font-medium">300 Mbps</th>
                    <th className="text-center py-5 px-4 text-white/80 font-medium">500 Mbps</th>
                    <th className="text-center py-5 px-4 text-white font-semibold bg-white/10">1 Gbps</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { activity: 'HD Streaming', s100: '2 devices', s300: '5 devices', s500: '10+ devices', s1000: 'Unlimited' },
                    { activity: '4K Streaming', s100: '1 device', s300: '3 devices', s500: '6 devices', s1000: 'Unlimited' },
                    { activity: 'Online Gaming', s100: 'Good', s300: 'Great', s500: 'Excellent', s1000: 'Pro-Level' },
                    { activity: 'Video Calls', s100: '✓', s300: '✓✓', s500: '✓✓✓', s1000: '✓✓✓' },
                    { activity: 'Download 1GB', s100: '~80 sec', s300: '~27 sec', s500: '~16 sec', s1000: '~8 sec' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-gray-200 hover:bg-blue-50/50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-4 px-6 text-gray-900 font-medium">{row.activity}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.s100}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.s300}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.s500}</td>
                      <td className="py-4 px-4 text-center text-blue-600 font-semibold bg-blue-50/50">{row.s1000}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeInUp">
            Ready to Experience the Difference?
          </h2>
          <p className="text-blue-100 text-xl mb-10 animate-fadeInUp animation-delay-100">
            Check availability in your area and get connected today
          </p>
          <button onClick={() => setPage('Coverage')} className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 animate-fadeInUp animation-delay-200">
            Check Availability Now
          </button>
        </div>
      </section>
      
      <FloatingButton onClick={() => setPage('Coverage')} />
    </div>
  );
};

// ============================================
// OTHER PAGES (Simplified)
// ============================================
const ServicesPage = ({ setPage }) => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-gray-600 text-lg">We help you find and get the best internet service for your needs</p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-blue-50 rounded-3xl hover:shadow-xl transition-all">
            <Icons.Wifi className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Internet Plan Comparison</h3>
            <p className="text-gray-600">We compare all available internet plans in your area to find the best speed and price for your needs.</p>
          </div>
          <div className="p-8 bg-indigo-50 rounded-3xl hover:shadow-xl transition-all">
            <Icons.MapPin className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Availability Check</h3>
            <p className="text-gray-600">Enter your address and we'll show you all the internet providers and plans available at your location.</p>
          </div>
          <div className="p-8 bg-purple-50 rounded-3xl hover:shadow-xl transition-all">
            <Icons.Headphones className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Expert Consultation</h3>
            <p className="text-gray-600">Not sure what speed you need? Our experts will help you choose the right plan for your household.</p>
          </div>
          <div className="p-8 bg-pink-50 rounded-3xl hover:shadow-xl transition-all">
            <Icons.Zap className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Easy Setup Assistance</h3>
            <p className="text-gray-600">We guide you through the signup process and help ensure your installation goes smoothly.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const PlansPage = ({ setPage }) => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Internet Plans</h1>
        <p className="text-gray-600 text-lg">Compare plans and find the perfect speed for your home</p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Basic', speed: '100 Mbps', price: 39.99, popular: false, ideal: 'Browsing & Email' },
            { name: 'Standard', speed: '300 Mbps', price: 59.99, popular: true, ideal: 'Streaming & Gaming' },
            { name: 'Premium', speed: '500 Mbps', price: 79.99, popular: false, ideal: 'Large Families' },
            { name: 'Ultra', speed: '1 Gbps', price: 99.99, popular: false, ideal: 'Power Users' },
          ].map((p, i) => (
            <div key={i} className={`p-6 rounded-3xl text-center ${p.popular ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl scale-105' : 'bg-white border-2 border-gray-100'}`}>
              {p.popular && <span className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold mb-3">Most Popular</span>}
              <h3 className={`text-xl font-bold mb-2 ${p.popular ? 'text-white' : 'text-gray-900'}`}>{p.name}</h3>
              <p className={`text-sm mb-2 ${p.popular ? 'text-blue-200' : 'text-blue-600'}`}>{p.speed}</p>
              <p className={`text-xs mb-4 ${p.popular ? 'text-blue-200' : 'text-gray-500'}`}>Ideal for: {p.ideal}</p>
              <p className={`text-4xl font-bold mb-2 ${p.popular ? 'text-white' : 'text-gray-900'}`}>${p.price}<span className="text-sm">/mo*</span></p>
              <p className={`text-xs mb-6 ${p.popular ? 'text-blue-200' : 'text-gray-400'}`}>Starting price</p>
              <button onClick={() => setPage('Coverage')} className={`w-full py-3 rounded-xl font-semibold ${p.popular ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>Check Availability</button>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          * Prices shown are starting rates and may vary by provider and location. <button onClick={() => setPage('Terms')} className="text-blue-600 hover:underline">Terms apply</button>.
        </p>
      </div>
    </section>
  </div>
);

const CoveragePage = ({ setPage }) => {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);
  
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Check Internet Availability</h1>
            <p className="text-gray-600">Enter your ZIP code to see available internet providers and plans in your area</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="Enter your ZIP code" className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg mb-4 focus:outline-none focus:border-blue-500" />
            <button onClick={() => setResult({ available: true })} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-lg transition-all">Check Availability</button>
            {result && (
              <div className="mt-6 p-6 bg-green-50 rounded-2xl text-center animate-fadeInUp">
                <Icons.Check className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-700 font-semibold text-lg mb-2">Great News! Internet Service Available!</p>
                <p className="text-gray-600 text-sm mb-4">We found multiple providers in your area with speeds up to 1 Gbps.</p>
                <button onClick={() => setPage('Plans')} className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all">View Available Plans</button>
              </div>
            )}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            We'll help you compare all available options and find the best deal for your home.
          </p>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg">Helping you find the best internet service since 2010.</p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">At Spectrium Solutions, we believe everyone deserves fast, reliable internet at a fair price. We help you navigate the confusing world of internet service providers to find the perfect plan for your needs.</p>
            <p className="text-gray-600 leading-relaxed">Our team of experts compares plans, speeds, and prices from multiple providers in your area so you don't have to. We're committed to transparency and exceptional customer service.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ v: '50K+', l: 'Customers Helped' }, { v: '14+', l: 'Years Experience' }, { v: '100+', l: 'Service Areas' }, { v: '24/7', l: 'Support' }].map((s, i) => (
              <div key={i} className="p-6 bg-blue-50 rounded-2xl text-center">
                <p className="text-3xl font-bold text-blue-600">{s.v}</p>
                <p className="text-gray-600">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = ({ setPage }) => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">We're here to help</p>
      </div>
    </section>
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Icons.Phone className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">1-800-555-1234</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Icons.Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">support@spectriumsolutions.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <Icons.MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-gray-600">123 Tech Blvd, New York, NY 10001</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h3>
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3" />
            <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3" />
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold">Send Message</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const PrivacyPage = () => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4"><h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1><p className="text-gray-600 mt-2">Last Updated: January 2025</p></div>
    </section>
    <section className="py-12"><div className="max-w-4xl mx-auto px-4"><p className="text-gray-600 leading-relaxed">Spectrium Solutions is committed to protecting your privacy. We collect personal information to provide services, process transactions, and improve your experience. You have the right to access, correct, or delete your data at any time. Contact us at privacy@spectriumsolutions.com for any questions.</p></div></section>
  </div>
);

const TermsPage = () => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4"><h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1><p className="text-gray-600 mt-2">Last Updated: January 2025</p></div>
    </section>
    <section className="py-12"><div className="max-w-4xl mx-auto px-4"><p className="text-gray-600 leading-relaxed">By using Spectrium Solutions services, you agree to these terms. Services are billed monthly. No annual contracts required for residential plans. Contact legal@spectriumsolutions.com for questions.</p></div></section>
  </div>
);

const RefundPage = () => (
  <div className="pt-20 min-h-screen bg-white">
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4"><h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1><p className="text-gray-600 mt-2">Last Updated: January 2025</p></div>
    </section>
    <section className="py-12"><div className="max-w-4xl mx-auto px-4"><p className="text-gray-600 leading-relaxed">New customers are eligible for a full refund within 30 days. Contact 1-800-555-1234 to request a refund. Return leased equipment within 14 days of cancellation.</p></div></section>
  </div>
);

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [page, setPage] = useState('Home');
  const [showCookie, setShowCookie] = useState(true);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  
  const renderPage = () => {
    switch (page) {
      case 'Home': return <HomePage setPage={setPage} />;
      case 'Spectrum': return <SpectrumPage setPage={setPage} />;
      case 'Internet': return <InternetPage setPage={setPage} />;
      case 'Plans': return <PlansPage setPage={setPage} />;
      case 'Coverage': return <CoveragePage setPage={setPage} />;
      case 'About': return <AboutPage />;
      case 'Contact': return <ContactPage setPage={setPage} />;
      case 'Privacy': return <PrivacyPage />;
      case 'Terms': return <TermsPage />;
      case 'Refund': return <RefundPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation page={page} setPage={setPage} />
      {renderPage()}
      <Footer setPage={setPage} />
      <CookieBanner visible={showCookie} onAccept={() => setShowCookie(false)} onDecline={() => setShowCookie(false)} />
    </div>
  );
}
