'use client'

import { Save } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Acme Corporation',
    email: 'john@acme.com',
    fullName: 'John Doe',
    timezone: 'America/New_York',
    language: 'English',
    emailNotifications: true,
    slackNotifications: false,
    weeklyReports: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="heading-lg text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and security settings.</p>
      </div>

      {/* Profile Section */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Profile</h2>
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={settings.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-white mb-2">
              Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={settings.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Preferences</h2>
        <div className="space-y-6">
          {/* Timezone */}
          <div>
            <label htmlFor="timezone" className="block text-sm font-semibold text-white mb-2">
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label htmlFor="language" className="block text-sm font-semibold text-white mb-2">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Notifications</h2>
        <div className="space-y-4">
          {/* Email Notifications */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer"
            />
            <div>
              <p className="font-semibold text-white">Email Notifications</p>
              <p className="text-xs text-slate-400">Receive alerts about API usage and issues</p>
            </div>
          </label>

          {/* Slack Notifications */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="slackNotifications"
              checked={settings.slackNotifications}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer"
            />
            <div>
              <p className="font-semibold text-white">Slack Notifications</p>
              <p className="text-xs text-slate-400">Send alerts to Slack channel</p>
            </div>
          </label>

          {/* Weekly Reports */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="weeklyReports"
              checked={settings.weeklyReports}
              onChange={handleChange}
              className="w-4 h-4 rounded bg-white/10 border border-white/20 cursor-pointer"
            />
            <div>
              <p className="font-semibold text-white">Weekly Reports</p>
              <p className="text-xs text-slate-400">Get a weekly summary of your API usage</p>
            </div>
          </label>
        </div>
      </div>

      {/* Security Section */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-lg font-bold text-white mb-6">Security</h2>
        <div className="space-y-4">
          <button className="w-full px-4 py-3 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-white font-semibold text-left">
            Change Password
          </button>
          <button className="w-full px-4 py-3 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all text-white font-semibold text-left">
            Enable Two-Factor Authentication
          </button>
          <button className="w-full px-4 py-3 rounded-lg border border-red-500/30 hover:border-red-400 hover:bg-red-400/10 transition-all text-red-400 font-semibold text-left">
            Delete Account
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Changes are saved automatically</p>
        <button className="glow-button flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
