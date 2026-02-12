import { Save, Loader2, Camera, Trash2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/providers/auth-provider'
import { api } from '@/lib/api'

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [settings, setSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    username: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (user) {
      setSettings({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        username: user.username || '',
        company: (user as any).meta?.company || '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await api.put('/user', {
        first_name: settings.firstName,
        last_name: settings.lastName,
        email: settings.email,
        username: settings.username,
        meta: { company: settings.company }
      })

      if (response.status === 'success') {
        setMessage({ type: 'success', text: 'Profile updated successfully' })
        await updateUser()
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const response = await api.post('/user/avatar', formData)
      if (response.status === 'success') {
        setMessage({ type: 'success', text: 'Avatar uploaded successfully' })
        await updateUser()
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to upload avatar' })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="heading-lg text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and security settings.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border ${message.type === 'success'
            ? 'bg-lime-500/10 border-lime-500/20 text-lime-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
          {message.text}
        </div>
      )}

      {/* Profile Section */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-effect p-8 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-6">Profile</h2>

          {/* Avatar Upload */}
          <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/10">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-400/20 to-purple-600/20 text-slate-400">
                    <Camera size={32} />
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="animate-spin text-cyan-400" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-obsidian-dark flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              >
                <Camera size={16} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Profile Photo</h3>
              <p className="text-sm text-slate-400 mb-3">Update your avatar to personalize your dashboard.</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-colors"
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="md:col-span-2">
              <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={settings.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
              />
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={settings.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={settings.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email Address
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
            <div className="md:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={settings.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">Manage your profile details and identity.</p>
          <button
            type="submit"
            disabled={isLoading}
            className="glow-button flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Profile
          </button>
        </div>
      </form>

      {/* Security Section (Mock for now) */}
      <div className="glass-effect p-8 rounded-xl opacity-60">
        <h2 className="text-lg font-bold text-white mb-6">Security & Account</h2>
        <div className="space-y-4">
          <button disabled className="w-full px-4 py-3 rounded-lg border border-white/5 bg-white/5 text-slate-400 font-semibold text-left cursor-not-allowed">
            Update Password
          </button>
          <button disabled className="w-full px-4 py-3 rounded-lg border border-red-500/30 hover:bg-red-500/5 text-red-500/50 font-semibold text-left cursor-not-allowed">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
