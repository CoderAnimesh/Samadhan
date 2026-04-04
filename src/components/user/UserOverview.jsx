import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertCircle, MapPin, TrendingUp } from 'lucide-react';
import api from '../../api';

export default function UserOverview({ onNavigate }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/complaints/my').then(r => {
      setComplaints(r.data.complaints || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const counts = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    assigned: complaints.filter(c => c.status === 'assigned').length,
    reverification: complaints.filter(c => c.status === 'reverification').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const stats = [
    { label: 'Total Complaints', value: counts.total, icon: FileText, color: '#6366f1', bg: 'blue' },
    { label: 'Pending', value: counts.pending, icon: Clock, color: '#f59e0b', bg: 'amber' },
    { label: 'In Progress', value: counts.assigned + counts.reverification, icon: TrendingUp, color: '#818cf8', bg: 'blue' },
    { label: 'Resolved', value: counts.resolved, icon: CheckCircle, color: '#10b981', bg: 'green' },
  ];

  const recent = complaints.slice(0, 4);

  const statusInfo = {
    pending: { label: 'Pending', color: '#f59e0b' },
    assigned: { label: 'Assigned', color: '#6366f1' },
    reverification: { label: 'Reverification', color: '#f97316' },
    resolved: { label: 'Resolved', color: '#10b981' },
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
      <div className="spinner" />
    </div>
  );

  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`stat-card ${stat.bg}`}
          >
            <div className="stat-icon"><stat.icon size={24} color={stat.color} /></div>
            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        onClick={() => onNavigate('raise')}
        style={{
          padding: '24px', borderRadius: 16, marginBottom: 28,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.08))',
          border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', transition: 'all 0.2s',
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
            <MapPin size={22} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.05rem' }}>Raise a New Complaint</div>
            <div style={{ color: '#94a3b8', fontSize: '0.83rem', marginTop: 3 }}>Report an issue in your area with live location</div>
          </div>
        </div>
        <div style={{ color: '#818cf8', fontSize: '1.5rem' }}>→</div>
      </motion.div>

      {/* Recent Complaints */}
      {recent.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 className="section-title">Recent Complaints</h3>
            <button onClick={() => onNavigate('complaints')} style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.83rem', fontWeight: 600 }}>
              View All →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recent.map((c) => {
              const st = statusInfo[c.status] || statusInfo.pending;
              return (
                <motion.div key={c.id} whileHover={{ x: 4 }} className="complaint-card" onClick={() => onNavigate('complaints')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{c.category}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <MapPin size={12} /> {c.area || c.address?.slice(0, 50) || 'Location not available'}
                      </div>
                    </div>
                    <span style={{ background: `${st.color}20`, color: st.color, border: `1px solid ${st.color}40`, padding: '3px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {st.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {counts.total === 0 && (
        <div className="empty-state">
          <AlertCircle size={56} />
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700 }}>No Complaints Yet</h3>
          <p style={{ fontSize: '0.88rem' }}>Click "Raise Complaint" to report an issue in your area.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('raise')}>Raise First Complaint</button>
        </div>
      )}
    </div>
  );
}
