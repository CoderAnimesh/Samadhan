import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, auth, googleProvider } from '../firebase';
import toast from 'react-hot-toast';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const [tab, setTab] = useState('user'); // 'user' | 'admin' | 'worker'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      toast.error('Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome, Admin!');
      navigate('/admin');
    } catch (err) {
      const messages = {
        'auth/wrong-password': 'Incorrect password.',
        'auth/user-not-found': 'No admin account found with this email.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
      };
      setError(messages[err.code] || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Worker Login Successful!');
      navigate('/worker');
    } catch (err) {
      setError('Login failed. Check your worker credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG Orbs */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: 460,
          background: 'rgba(13,15,30,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '32px 32px 0', textAlign: 'center' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
              <Shield size={24} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.2rem' }}>SAMADHAN</span>
          </Link>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.6rem', marginBottom: 8 }}>Welcome Back</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Sign in to your account</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', margin: '24px 32px 0', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 4 }}>
          {[{ id: 'user', label: '👤 Citizen' }, { id: 'worker', label: '👷 Worker' }, { id: 'admin', label: '🛡️ Admin' }].map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setError(''); }}
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s',
                background: tab === t.id ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
                color: tab === t.id ? 'white' : '#94a3b8',
                boxShadow: tab === t.id ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '24px 32px 32px' }}>
          <AnimatePresence mode="wait">
            {tab === 'user' ? (
              <motion.div
                key="user"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 20, textAlign: 'center', lineHeight: 1.6 }}>
                  Citizens and residents use Google to sign in securely and instantly.
                </p>

                {error && tab === 'user' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, marginBottom: 16, fontSize: '0.85rem', color: '#fca5a5' }}>
                    <AlertCircle size={16} /> {error}
                  </motion.div>
                )}

                <button onClick={handleGoogleLogin} disabled={loading} className="btn-google" id="user-google-login">
                  <GoogleIcon />
                  {loading ? 'Signing in…' : 'Continue with Google'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.83rem', color: '#64748b' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#818cf8', fontWeight: 600 }}>Register here</Link>
                </div>
              </motion.div>
            ) : tab === 'worker' ? (
              <motion.div
                key="worker"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleWorkerLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, fontSize: '0.85rem', color: '#fca5a5' }}>
                      <AlertCircle size={16} /> {error}
                    </motion.div>
                  )}
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 10, textAlign: 'center' }}>
                    Login to view and resolve your assigned complaints.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                      <input
                        id="worker-email"
                        type="email"
                        className="form-input"
                        style={{ paddingLeft: 42 }}
                        placeholder="worker@samadhan.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                      <input
                        id="worker-password"
                        type={showPass ? 'text' : 'password'}
                        className="form-input"
                        style={{ paddingLeft: 42, paddingRight: 42 }}
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    id="worker-login-btn"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '13px', borderRadius: 12,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white', border: 'none', fontWeight: 700, fontSize: '0.95rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      marginTop: 4,
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign In as Worker'}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, fontSize: '0.85rem', color: '#fca5a5' }}>
                      <AlertCircle size={16} /> {error}
                    </motion.div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Admin Email</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                      <input
                        id="admin-email"
                        type="email"
                        className="form-input"
                        style={{ paddingLeft: 42 }}
                        placeholder="admin@samadhan.gov.in"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                      <input
                        id="admin-password"
                        type={showPass ? 'text' : 'password'}
                        className="form-input"
                        style={{ paddingLeft: 42, paddingRight: 42 }}
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    id="admin-login-btn"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '13px', borderRadius: 12,
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      color: 'white', border: 'none', fontWeight: 700, fontSize: '0.95rem',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.7 : 1,
                      marginTop: 4,
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign In as Admin'}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
