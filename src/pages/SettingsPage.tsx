import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Moon, 
  Sun, 
  Camera, 
  Save,
  Shield,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';

const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || ''
  });
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyDigest: false,
    marketingEmails: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      updateProfile(profileData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setProfileData({ ...profileData, profilePicture: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
    localStorage.setItem('notifications', JSON.stringify({ ...notifications, [key]: value }));
  };

  const exportData = () => {
    const data = {
      profile: profileData,
      notifications,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'startupnest-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'data', label: 'Data & Privacy', icon: <Download className="w-5 h-5" /> }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-poppins text-white mb-2">
            Account <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-blue-100">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glassmorphism p-6 rounded-2xl">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white'
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glassmorphism p-6 rounded-2xl">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center overflow-hidden">
                          {profileData.profilePicture ? (
                            <img
                              src={profileData.profilePicture}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 text-white" />
                          )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                          <Camera className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Profile Picture</h3>
                        <p className="text-blue-100 text-sm">Upload a new profile picture</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        {isDarkMode ? <Moon className="w-5 h-5 text-blue-300" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                        <div>
                          <p className="text-white font-semibold">Theme Preference</p>
                          <p className="text-blue-100 text-sm">Choose your preferred theme</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isDarkMode ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isDarkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {message && (
                      <div className={`p-3 rounded-lg ${
                        message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      <Save className="w-5 h-5" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {[
                      {
                        key: 'emailAlerts',
                        title: 'Email Alerts',
                        description: 'Receive email notifications for important updates'
                      },
                      {
                        key: 'pushNotifications',
                        title: 'Push Notifications',
                        description: 'Get browser notifications for real-time updates'
                      },
                      {
                        key: 'weeklyDigest',
                        title: 'Weekly Digest',
                        description: 'Receive a weekly summary of your activity'
                      },
                      {
                        key: 'marketingEmails',
                        title: 'Marketing Emails',
                        description: 'Receive promotional emails and product updates'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{item.title}</p>
                          <p className="text-blue-100 text-sm">{item.description}</p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(item.key, !notifications[item.key as keyof typeof notifications])}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-blue-500' : 'bg-gray-400'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-semibold">Change Password</p>
                          <p className="text-blue-100 text-sm">Update your account password</p>
                        </div>
                        <Lock className="w-5 h-5 text-blue-300" />
                      </div>
                      <button className="px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity">
                        Change Password
                      </button>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-semibold">Two-Factor Authentication</p>
                          <p className="text-blue-100 text-sm">Add an extra layer of security</p>
                        </div>
                        <Shield className="w-5 h-5 text-blue-300" />
                      </div>
                      <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-semibold">Active Sessions</p>
                          <p className="text-blue-100 text-sm">Manage your active login sessions</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                          <div>
                            <p className="text-white text-sm">Current Session</p>
                            <p className="text-blue-100 text-xs">Chrome on Windows • Active now</p>
                          </div>
                          <span className="text-green-400 text-xs">Current</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Data & Privacy Tab */}
              {activeTab === 'data' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Data & Privacy</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-semibold">Export Data</p>
                          <p className="text-blue-100 text-sm">Download a copy of your data</p>
                        </div>
                        <Download className="w-5 h-5 text-blue-300" />
                      </div>
                      <button
                        onClick={exportData}
                        className="px-4 py-2 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Export Data
                      </button>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-white font-semibold">Data Usage</p>
                          <p className="text-blue-100 text-sm">See how your data is being used</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-100">Profile Data</span>
                          <span className="text-white">2.3 KB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-100">Startup Ideas</span>
                          <span className="text-white">45.7 KB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-100">Analytics Data</span>
                          <span className="text-white">12.1 KB</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-red-400 font-semibold">Delete Account</p>
                          <p className="text-red-300 text-sm">Permanently delete your account and all data</p>
                        </div>
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </div>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;