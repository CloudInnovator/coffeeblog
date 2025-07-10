import React from 'react';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

export type UserRole = 'subscriber' | 'publisher' | 'admin' | 'donor';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  created_at: string;
}

interface DashboardProps {
  isDarkMode: boolean;
  currentUser: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, currentUser, onLogout }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {currentUser.username}</span>
            <span className="user-role">{currentUser.role}</span>
            <button onClick={handleSignOut} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>Your Profile</h2>
            <div className="profile-card">
              <div className="profile-field">
                <label>Username:</label>
                <span>{currentUser.username}</span>
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <span>{currentUser.email}</span>
              </div>
              <div className="profile-field">
                <label>Role:</label>
                <span className={`role-badge ${currentUser.role}`}>
                  {currentUser.role}
                </span>
              </div>
              <div className="profile-field">
                <label>Member since:</label>
                <span>{new Date(currentUser.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <div className="action-card">
                <h3>📚 Saved Articles</h3>
                <p>View and manage your saved articles</p>
                <button className="action-btn">View Saved</button>
              </div>
              <div className="action-card">
                <h3>📝 My Comments</h3>
                <p>See all your comments and interactions</p>
                <button className="action-btn">View Comments</button>
              </div>
              <div className="action-card">
                <h3>❤️ Liked Articles</h3>
                <p>Articles you've liked</p>
                <button className="action-btn">View Likes</button>
              </div>
              {(currentUser.role === 'publisher' || currentUser.role === 'admin') && (
                <div className="action-card">
                  <h3>✍️ Create Article</h3>
                  <p>Write and publish new content</p>
                  <button className="action-btn">Create Article</button>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Account Settings</h2>
            <div className="settings-card">
              <p>More dashboard features coming soon...</p>
              <ul>
                <li>Edit profile information</li>
                <li>Manage notification preferences</li>
                <li>View reading statistics</li>
                <li>Export your data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
