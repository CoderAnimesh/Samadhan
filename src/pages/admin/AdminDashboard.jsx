import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminOverview from '../../components/admin/AdminOverview';
import AllComplaints from '../../components/admin/AllComplaints';
import WorkerManagement from '../../components/admin/WorkerManagement';
import { Shield, Settings } from 'lucide-react';
import { getAvatarUrl } from '../../utils/avatar';
const tabTitles = {
  overview: 'Admin Overview',
  complaints: 'All Complaints',
  workers: 'Manage Workers',
  notifications: 'Activity Feed',
  settings: 'Settings',
};

function AdminSettings() {
  const { currentUser, dbUser } = useAuth();
  return (
    <div className="page-enter">
      <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.4rem', marginBottom: 24 }}>Admin Settings</h2>
      <div style={{ maxWidth: 500 }}>
        <div style={{ padding: 24, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 600, marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}><Shield size={18} color="#f59e0b" /> Admin Information</h3>
          <div style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 2 }}>
            <div><span style={{ color: '#64748b' }}>Email: </span>{currentUser?.email}</div>
            <div><span style={{ color: '#64748b' }}>Role: </span><span style={{ color: '#f59e0b', fontWeight: 600 }}>Administrator</span></div>
            <div><span style={{ color: '#64748b' }}>DB ID: </span><code style={{ fontSize: '0.75rem', color: '#64748b' }}>{dbUser?.id}</code></div>
          </div>
        </div>
        <div style={{ padding: 16, borderRadius: 12, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.82rem', color: '#fbbf24', lineHeight: 1.6 }}>
          💡 Admin accounts are managed via Firebase Authentication. To change your password, use the Firebase console or the "Forgot Password" flow on the login page.
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="page-enter empty-state">
      <div style={{ fontSize: '3rem' }}>📋</div>
      <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700 }}>Activity Feed</h3>
      <p style={{ fontSize: '0.85rem', maxWidth: 300 }}>Admin activity log coming soon. All complaint actions are tracked.</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AdminOverview key="overview" onNavigate={setActiveTab} />;
      case 'complaints': return <AllComplaints key="complaints" />;
      case 'workers': return <WorkerManagement key="workers" />;
      case 'notifications': return <ActivityFeed key="notifications" />;
      case 'settings': return <AdminSettings key="settings" />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
          background: 'rgba(7,8,15,0.85)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(245,158,11,0.1)',
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600, marginBottom: 2 }}>
              🛡️ Administrator
            </div>
            <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>
              {tabTitles[activeTab]}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ padding: '6px 14px', borderRadius: 10, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
              {currentUser?.email}
            </div>
            <img
              src={getAvatarUrl(currentUser, 36)}
              alt="Admin Avatar"
              style={{ width: 36, height: 36, borderRadius: '50%', background: '#1e1b4b', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '32px', maxWidth: 1200, width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
