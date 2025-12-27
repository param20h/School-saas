'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Settings,
    School,
    Bell,
    Lock,
    Users,
    Mail,
    Globe,
    Palette,
    Database,
    Shield,
    Calendar,
    DollarSign,
    Save,
    RefreshCw
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        schoolName: 'School Management System',
        schoolEmail: 'admin@school.com',
        schoolPhone: '+1 234 567 8900',
        schoolAddress: '123 Education Street, City, State 12345',
        schoolWebsite: 'www.school.com',
        academicYear: '2025-2026',
        currency: 'INR',
        dateFormat: 'DD/MM/YYYY',
        timezone: 'Asia/Kolkata',
        language: 'English',
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        attendanceReminders: true,
        feeReminders: true,
        examNotifications: true,
        themeColor: 'blue',
        darkMode: false,
    });

    const tabs = [
        { id: 'general', name: 'General', icon: Settings },
        { id: 'school', name: 'School Info', icon: School },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Lock },
        { id: 'appearance', name: 'Appearance', icon: Palette },
        { id: 'system', name: 'System', icon: Database },
    ];

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            alert('Settings reset to default');
        }
    };

    return (
        <DashboardLayout role="admin">
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your school system configuration</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            {/* General Settings */}
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">General Settings</h2>
                                        <p className="text-sm text-gray-600">Configure basic system settings</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                                            <input
                                                type="text"
                                                value={settings.academicYear}
                                                onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                                            <select
                                                value={settings.currency}
                                                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            >
                                                <option value="INR">INR - Indian Rupee (₹)</option>
                                                <option value="USD">USD - US Dollar ($)</option>
                                                <option value="EUR">EUR - Euro (€)</option>
                                                <option value="GBP">GBP - British Pound (£)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                                            <select
                                                value={settings.dateFormat}
                                                onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            >
                                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                            <select
                                                value={settings.timezone}
                                                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            >
                                                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                                <option value="America/New_York">America/New_York (EST)</option>
                                                <option value="Europe/London">Europe/London (GMT)</option>
                                                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                            <select
                                                value={settings.language}
                                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            >
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Spanish">Spanish</option>
                                                <option value="French">French</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* School Info */}
                            {activeTab === 'school' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">School Information</h2>
                                        <p className="text-sm text-gray-600">Update your school details</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                                            <input
                                                type="text"
                                                value={settings.schoolName}
                                                onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={settings.schoolEmail}
                                                    onChange={(e) => setSettings({ ...settings, schoolEmail: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={settings.schoolPhone}
                                                    onChange={(e) => setSettings({ ...settings, schoolPhone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <textarea
                                                value={settings.schoolAddress}
                                                onChange={(e) => setSettings({ ...settings, schoolAddress: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                rows={3}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                            <input
                                                type="url"
                                                value={settings.schoolWebsite}
                                                onChange={(e) => setSettings({ ...settings, schoolWebsite: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notifications */}
                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">Notification Settings</h2>
                                        <p className="text-sm text-gray-600">Manage notification preferences</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Mail className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Email Notifications</p>
                                                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.emailNotifications}
                                                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <Bell className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Push Notifications</p>
                                                    <p className="text-sm text-gray-500">Receive push notifications</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.pushNotifications}
                                                    onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-purple-100 rounded-lg">
                                                    <Calendar className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Attendance Reminders</p>
                                                    <p className="text-sm text-gray-500">Daily attendance reminders</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.attendanceReminders}
                                                    onChange={(e) => setSettings({ ...settings, attendanceReminders: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-yellow-100 rounded-lg">
                                                    <DollarSign className="w-5 h-5 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Fee Reminders</p>
                                                    <p className="text-sm text-gray-500">Payment due reminders</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.feeReminders}
                                                    onChange={(e) => setSettings({ ...settings, feeReminders: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">Security Settings</h2>
                                        <p className="text-sm text-gray-600">Manage security and privacy options</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-6 border border-gray-200 rounded-xl">
                                            <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="password"
                                                    placeholder="Current Password"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="New Password"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Confirm New Password"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6 border border-gray-200 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security</p>
                                                </div>
                                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                                    Enable
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6 border border-gray-200 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">Session Timeout</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Auto logout after inactivity</p>
                                                </div>
                                                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                                    <option value="15">15 minutes</option>
                                                    <option value="30">30 minutes</option>
                                                    <option value="60">1 hour</option>
                                                    <option value="120">2 hours</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Appearance */}
                            {activeTab === 'appearance' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">Appearance Settings</h2>
                                        <p className="text-sm text-gray-600">Customize the look and feel</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Theme Color</label>
                                            <div className="grid grid-cols-6 gap-3">
                                                {['blue', 'purple', 'green', 'red', 'yellow', 'pink'].map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSettings({ ...settings, themeColor: color })}
                                                        className={`h-12 rounded-xl border-2 ${
                                                            settings.themeColor === color ? 'border-gray-900' : 'border-gray-200'
                                                        } bg-${color}-500 hover:scale-105 transition-transform`}
                                                    ></button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div>
                                                <p className="font-medium text-gray-900">Dark Mode</p>
                                                <p className="text-sm text-gray-500">Switch to dark theme</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.darkMode}
                                                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* System */}
                            {activeTab === 'system' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">System Information</h2>
                                        <p className="text-sm text-gray-600">System details and maintenance</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-600 mb-1">Version</p>
                                            <p className="font-semibold text-gray-900">1.0.0</p>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-600 mb-1">Database</p>
                                            <p className="font-semibold text-gray-900">MongoDB 6.0</p>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                                            <p className="font-semibold text-gray-900">2.4 GB / 10 GB</p>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-600 mb-1">Last Backup</p>
                                            <p className="font-semibold text-gray-900">Dec 27, 2025</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                            <Database className="w-5 h-5" />
                                            Backup Database
                                        </button>
                                        <button className="w-full px-4 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2">
                                            <RefreshCw className="w-5 h-5" />
                                            Clear Cache
                                        </button>
                                        <button className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                                            <Shield className="w-5 h-5" />
                                            Reset System
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
