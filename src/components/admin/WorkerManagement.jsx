import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Phone, MapPin, Wrench, X, AlertCircle } from 'lucide-react';
import api from '../../api';
import toast from 'react-hot-toast';

function AddWorkerModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ name: '', phone: '', area: '', specialization: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name is required');
    setLoading(true);
    try {
      const r = await api.post('/workers', form);
      onAdded(r.data.worker);
      toast.success('Worker added!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add worker');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="modal"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 440 }}
      >
        <div className="modal-header">
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>Add New Worker</h2>
          <button onClick={onClose} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#94a3b8' }}><X size={16} /></button>
        </div>
        <form onSubmit={handle} className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Worker's full name" required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input type="email" className="form-input" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="worker@samadhan.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input type="text" className="form-input" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min 6 chars" required minLength={6} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label className="form-label">Area / Zone</label>
            <input className="form-input" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} placeholder="e.g. Raipur North" />
          </div>
          <div className="form-group">
            <label className="form-label">Specialization</label>
            <select className="form-select" value={form.specialization} onChange={e => setForm(p => ({ ...p, specialization: e.target.value }))}>
              <option value="">General</option>
              {['Road/Pothole', 'Water Supply', 'Electricity', 'Sanitation', 'Drainage', 'Street Lights', 'General'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="modal-footer" style={{ padding: 0, border: 'none', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}>
              {loading ? 'Adding…' : 'Add Worker'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function WorkerManagement() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get('/workers')
      .then(r => setWorkers(r.data.workers || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Remove this worker?')) return;
    try {
      await api.delete(`/workers/${id}`);
      setWorkers(prev => prev.filter(w => w.id !== id));
      toast.success('Worker removed');
    } catch {
      toast.error('Failed to remove worker');
    }
  };

  const toggleAvailable = async (worker) => {
    try {
      const r = await api.patch(`/workers/${worker.id}`, { ...worker, isAvailable: !worker.isAvailable });
      setWorkers(prev => prev.map(w => w.id === worker.id ? r.data.worker : w));
    } catch {
      toast.error('Failed to update');
    }
  };

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}><div className="spinner" /></div>;

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.4rem' }}>Manage Workers</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.83rem', marginTop: 2 }}>{workers.length} workers · {workers.filter(w => w.isAvailable).length} available</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> Add Worker
        </button>
      </div>

      {workers.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700 }}>No Workers Yet</h3>
          <p style={{ fontSize: '0.85rem' }}>Add workers to start assigning complaints.</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">Add First Worker</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {workers.map((worker, i) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                padding: '20px', borderRadius: 16, border: '1px solid',
                borderColor: worker.isAvailable ? 'rgba(245,158,11,0.2)' : 'var(--border)',
                background: worker.isAvailable ? 'rgba(245,158,11,0.04)' : 'var(--bg-card)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: worker.isAvailable ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${worker.isAvailable ? 'rgba(245,158,11,0.3)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Outfit,sans-serif', fontWeight: 700, color: worker.isAvailable ? '#f59e0b' : '#64748b',
                  }}>
                    {worker.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{worker.name}</div>
                    <div style={{ fontSize: '0.72rem', color: worker.isAvailable ? '#f59e0b' : '#64748b', fontWeight: 600 }}>
                      {worker.isAvailable ? '● Available' : '○ Unavailable'}
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDelete(worker.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: 4, borderRadius: 6, transition: 'all 0.2s' }} className="btn-danger">
                  <Trash2 size={15} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.8rem', color: '#94a3b8', marginBottom: 14 }}>
                {worker.phone && <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Phone size={12} /> {worker.phone}</div>}
                {worker.area && <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><MapPin size={12} /> {worker.area}</div>}
                {worker.specialization && <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Wrench size={12} /> {worker.specialization}</div>}
              </div>

              <button
                onClick={() => toggleAvailable(worker)}
                style={{
                  width: '100%', padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.2s',
                  background: worker.isAvailable ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                  color: worker.isAvailable ? '#f87171' : '#6ee7b7',
                }}
              >
                {worker.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && <AddWorkerModal onClose={() => setShowModal(false)} onAdded={w => setWorkers(prev => [...prev, w])} />}
      </AnimatePresence>
    </div>
  );
}
