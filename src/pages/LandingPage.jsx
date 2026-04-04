import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Users, Bell, CheckCircle, ArrowRight, Zap, Eye, Clock } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        padding: scrolled ? '12px 40px' : '20px 40px',
        background: scrolled ? 'rgba(7,8,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99,102,241,0.4)',
        }}>
          <Shield size={22} color="white" />
        </div>
        <div>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
            SĀMĀDHĀN
          </div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(148,163,184,0.8)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Smart Admin System
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {['Home', 'Features', 'How it Works', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
            whileHover={{ color: '#818cf8' }}
            style={{ padding: '8px 14px', fontSize: '0.88rem', color: 'rgba(241,245,249,0.7)', fontWeight: 500, transition: 'color 0.2s' }}
          >
            {item}
          </motion.a>
        ))}
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginLeft: 8, padding: '10px 22px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white', border: 'none', borderRadius: 10,
              fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Login
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  const features = [
    { icon: MapPin, label: 'Live Location Tracking' },
    { icon: Zap, label: 'Instant Assignments' },
    { icon: Bell, label: 'Real-time Alerts' },
  ];

  return (
    <section id="home" style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 20px 80px' }}>
      {/* Animated background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '10%', left: '5%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', bottom: '5%', right: '5%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ position: 'relative', maxWidth: 850, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 999,
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
            fontSize: '0.8rem', color: '#818cf8', fontWeight: 600,
            marginBottom: 24, letterSpacing: 0.5,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Smart Administration & Monitoring System
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.08, marginBottom: 24 }}
        >
          Resolve{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            City Problems
          </span>
          <br />
          Smarter & Faster
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94a3b8', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}
        >
          SAMADHAN bridges the gap between citizens and administration. Raise complaints with your live location, track resolution in real-time, and get notified the moment your issue is resolved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}
        >
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 14,
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: 'white', border: 'none', fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              }}
            >
              Get Started Free <ArrowRight size={18} />
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(99,102,241,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 32px', borderRadius: 14,
                background: 'transparent', color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.12)', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {features.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500,
              }}
            >
              <Icon size={15} color="#6366f1" /> {label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </section>
  );
};

const FeaturesSection = () => {
  const cards = [
    { icon: MapPin, title: 'Location-Based Complaints', desc: 'Auto-detect your exact location using GPS and raise a complaint with a single click. Google Maps integration for precision.', color: '#6366f1' },
    { icon: Eye, title: 'Live Status Tracking', desc: 'Track your complaint through every phase: Submitted to Assigned to Reverification to Resolved. Real-time updates.', color: '#22d3ee' },
    { icon: Users, title: 'Worker Assignment', desc: 'Admins intelligently assign trained workers to each complaint based on category and area for fastest resolution.', color: '#f59e0b' },
    { icon: Bell, title: 'Instant Notifications', desc: 'Get notified at every stage. When your worker is assigned, when review begins, and when the issue is finally resolved.', color: '#10b981' },
    { icon: Shield, title: 'Secure & Verified', desc: 'All users authenticated via Google. Admins go through a separate secure login. Data encrypted end-to-end.', color: '#f97316' },
    { icon: Clock, title: 'Fast Resolution', desc: 'Our streamlined workflow ensures complaints do not sit idle. SLA tracking keeps admins accountable.', color: '#a855f7' },
  ];

  return (
    <section id="features" style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          Features
        </div>
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>
          Everything You Need
        </h2>
        <p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          A complete ecosystem for citizen complaint management, built for speed, transparency and accountability.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: `0 20px 50px ${card.color}20` }}
            style={{
              padding: 28, borderRadius: 20,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              cursor: 'default', transition: 'all 0.3s',
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 14, marginBottom: 20,
              background: `${card.color}20`, border: `1px solid ${card.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <card.icon size={24} color={card.color} />
            </div>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{card.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7 }}>{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { num: '01', title: 'Register with Google', desc: 'Sign up instantly using your Google account. No lengthy forms.', color: '#6366f1' },
    { num: '02', title: 'Raise a Complaint', desc: 'Your location is auto-detected. Describe the problem and submit.', color: '#22d3ee' },
    { num: '03', title: 'Admin Reviews & Assigns', desc: 'An admin reviews your complaint and assigns a qualified worker.', color: '#f59e0b' },
    { num: '04', title: 'Worker Resolves it', desc: 'The assigned worker visits and fixes the issue on the ground.', color: '#10b981' },
    { num: '05', title: 'Admin Re-verifies', desc: 'Admin does a final verification to ensure quality resolution.', color: '#f97316' },
    { num: '06', title: 'You Get Notified', desc: 'A notification confirms your complaint is officially resolved!', color: '#a855f7' },
  ];

  return (
    <section id="how-it-works" style={{ padding: '100px 40px', background: 'rgba(13,15,30,0.6)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{ color: '#22d3ee', fontWeight: 600, fontSize: '0.85rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            Process
          </div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>
            How It Works
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: 500, margin: '0 auto' }}>
            Six simple steps from complaint to resolution.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
                border: `1px solid ${step.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1rem', color: step.color,
              }}>
                {step.num}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, marginBottom: 6 }}>{step.title}</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: '10K+', label: 'Complaints Resolved' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '48h', label: 'Avg Resolution Time' },
    { value: '50+', label: 'Active Workers' },
  ];
  return (
    <section style={{ padding: '80px 40px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center', padding: '32px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: '3rem', fontWeight: 900, background: 'linear-gradient(135deg, #818cf8, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {s.value}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: 8 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={18} color="white" />
        </div>
        <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800 }}>SAMADHAN</span>
      </div>
      <p style={{ color: '#475569', fontSize: '0.85rem', maxWidth: 400 }}>
        Smart Administration & Monitoring System — Empowering citizens with transparent governance.
      </p>
      <p style={{ color: '#334155', fontSize: '0.78rem' }}>© 2026 SAMADHAN. All rights reserved.</p>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="bg-mesh" />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
