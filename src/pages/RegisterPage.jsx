import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import { signInWithPopup, auth, googleProvider } from '../firebase';
import toast from 'react-hot-toast';

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Account created! Welcome to SAMADHAN 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    'Raise complaints with live GPS location',
    'Track your complaint status in real-time',
    'Get notified when issues are resolved',
    'Secure login with your Google account',
    'Zero paperwork, fully digital process',
  ];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'stretch',
      background: 'var(--bg-primary)', overflow: 'hidden',
    }}>
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '60px', background: 'linear-gradient(145deg, rgba(99,102,241,0.15) 0%, rgba(7,8,15,0.9) 60%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48, width: 'fit-content' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(99,102,241,0.4)' }}>
            <Shield size={26} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.4rem' }}>SAMADHAN</span>
        </Link>

        <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 3vw, 2.8rem)', lineHeight: 1.15, marginBottom: 16 }}>
          Make Your Voice<br />
          <span style={{ background: 'linear-gradient(135deg, #818cf8, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Heard & Resolved
          </span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: 40, lineHeight: 1.7, maxWidth: 400 }}>
          Join thousands of citizens who are actively participating in making their city better through SAMADHAN.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {perks.map((perk, i) => (
            <motion.div
              key={perk}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.9rem', color: '#cbd5e1' }}
            >
              <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />
              {perk}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 440, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '60px 48px', background: 'rgba(13,15,30,0.8)',
        }}
      >
        <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.8rem', marginBottom: 8 }}>
          Create Account
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: 36, lineHeight: 1.6 }}>
          Register instantly with your Google account. No passwords to remember.
        </p>

        <motion.button
          id="register-google-btn"
          onClick={handleGoogleRegister}
          disabled={loading}
          whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            padding: '15px 24px', background: 'white', color: '#1f1f1f',
            borderRadius: 12, border: 'none', fontWeight: 700, fontSize: '0.95rem',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            marginBottom: 24,
          }}
        >
          <GoogleIcon />
          {loading ? 'Creating account...' : 'Continue with Google'}
        </motion.button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ color: '#475569', fontSize: '0.78rem' }}>One-click registration</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div style={{ padding: 16, borderRadius: 12, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', fontSize: '0.82rem', color: '#a5b4fc', lineHeight: 1.6, marginBottom: 28 }}>
          🔒 We use Google authentication for maximum security. Your data is stored securely and never shared.
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.83rem', color: '#64748b' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }}>Sign in here</Link>
        </p>
      </motion.div>
    </div>
  );
}
