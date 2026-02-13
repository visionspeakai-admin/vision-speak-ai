'use client'

import { Copy, Eye, EyeOff, Trash2, Plus, Loader2, Key } from 'lucide-react'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isCreatingKey, setIsCreatingKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)

  const apiKeys = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'vs_prod_abc123xyz789...',
      fullKey: 'vs_prod_abc123xyz789abcdefghijklmnopqrstuvwxyz',
      created: '2024-01-15',
      lastUsed: '2024-02-12',
      calls: '2.4M',
      status: 'active',
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'vs_dev_xyz789abc123...',
      fullKey: 'vs_dev_xyz789abc123abcdefghijklmnopqrstuvwxyz',
      created: '2024-02-01',
      lastUsed: '2024-02-10',
      calls: '45K',
      status: 'active',
    },
    {
      id: '3',
      name: 'Testing Key (Rotated)',
      key: 'vs_test_old123xyz789...',
      fullKey: 'vs_test_old123xyz789abcdefghijklmnopqrstuvwxyz',
      created: '2023-12-01',
      lastUsed: '2024-02-05',
      calls: '12K',
      status: 'inactive',
    },
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateKey = () => {
    setIsCreatingKey(true)
    setTimeout(() => {
      setIsCreatingKey(false)
      setIsCreateModalOpen(false)
      setNewKeyName('')
    }, 1500)
  }

  const handleDeleteKey = () => {
    setIsDeleteModalOpen(false)
    setKeyToDelete(null)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="heading-lg text-white mb-2">API Keys</h1>
          <p className="text-slate-400">Manage your API authentication credentials.</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <button className="glow-button flex items-center gap-2">
              <Plus size={18} />
              Create New Key
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] glass-effect-strong border-white/10 bg-obsidian-dark text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Key className="text-cyan-electric" size={20} /> Create New API Key
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Give your key a name to identify it easily. You'll only see the full key once.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-semibold tracking-widest text-slate-500 uppercase">Key Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Production Mobile App"
                  className="bg-white/5 border-white/10 focus:border-cyan-electric transition-all text-white placeholder:text-slate-600"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <button
                disabled={!newKeyName || isCreatingKey}
                onClick={handleCreateKey}
                className="glow-button w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCreatingKey ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                Generate Secure Key
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Info Alert */}
      <div className="glass-effect p-4 rounded-lg border-l-2 border-cyan-400 flex gap-3">
        <div className="text-cyan-400 text-lg">ℹ️</div>
        <div>
          <p className="font-semibold text-white text-sm">Keep your keys secure</p>
          <p className="text-xs text-slate-400 mt-1">Never share your API keys. If compromised, rotate immediately.</p>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Key</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Created</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Last Used</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Usage (30d)</th>
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((keyItem) => (
                <tr key={keyItem.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{keyItem.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-xs text-cyan-300 bg-black/30 px-2 py-1 rounded">
                        {showKey ? keyItem.fullKey : keyItem.key}
                      </code>
                      <button
                        onClick={() => handleCopy(keyItem.fullKey)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? (
                          <span className="text-xs text-green-400">Copied!</span>
                        ) : (
                          <Copy size={16} className="text-slate-400" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{keyItem.created}</td>
                  <td className="px-6 py-4 text-slate-400">{keyItem.lastUsed}</td>
                  <td className="px-6 py-4 text-slate-400">{keyItem.calls}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${keyItem.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-slate-500/20 text-slate-400'
                        }`}
                    >
                      {keyItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2 text-right">
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="p-2 hover:bg-white/10 rounded transition-colors"
                      title="Show/hide key"
                    >
                      {showKey ? (
                        <EyeOff size={16} className="text-slate-400" />
                      ) : (
                        <Eye size={16} className="text-slate-400" />
                      )}
                    </button>
                    {keyItem.status === 'active' && (
                      <button
                        onClick={() => {
                          setKeyToDelete(keyItem.id)
                          setIsDeleteModalOpen(true)
                        }}
                        className="p-2 hover:bg-red-500/10 rounded transition-colors text-red-500"
                        title="Delete key"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[400px] glass-effect-strong border-red-500/20 bg-obsidian-dark text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-500">Revoke API Key?</DialogTitle>
            <DialogDescription className="text-slate-400">
              This action cannot be undone. Any applications using this key will immediately lose access to the VisionSpeak AI services.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Key ID: {keyToDelete}</p>
          </div>
          <DialogFooter className="gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-black uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteKey}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              Confirm Revocation
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Key Management Tips */}
      <div className="glass-effect p-8 rounded-xl">
        <h3 className="font-bold text-white mb-4">Best Practices</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex gap-3">
            <span className="text-cyan-400">→</span>
            <span>Rotate your API keys every 90 days</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">→</span>
            <span>Use separate keys for development, staging, and production</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">→</span>
            <span>Never commit API keys to version control</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">→</span>
            <span>Monitor API key usage in the analytics dashboard</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">→</span>
            <span>Delete keys that are no longer in use</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
