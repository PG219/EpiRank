'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cog6ToothIcon,
    BellIcon,
    PaintBrushIcon,
    GlobeAltIcon,
    CloudArrowUpIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    KeyIcon,
    ServerStackIcon,
    ChartBarIcon,
    BeakerIcon,
    ShareIcon,
    DocumentTextIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    MoonIcon,
    SunIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid'

interface SettingsSection {
    id: string
    name: string
    icon: any
    color: string
}

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile')
    const [isLoading, setIsLoading] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
    const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')

    // Form states
    const [settings, setSettings] = useState({
        profile: {
            name: 'Research Lab',
            email: 'lab@epirank.org',
            institution: 'Neuroscience Institute',
            role: 'Principal Investigator'
        },
        appearance: {
            theme: 'dark',
            density: 'comfortable',
            animations: true,
            fontSize: 'medium',
            colorScheme: 'purple'
        },
        notifications: {
            emailAlerts: true,
            pushNotifications: false,
            dailyDigest: true,
            modelUpdates: true,
            newFindings: true,
            systemAnnouncements: false
        },
        api: {
            apiKey: 'epi_sk_live_xxxxxxxxxxxxxx',
            rateLimit: 1000,
            endpoints: ['rankings', 'explain', 'network', 'methylation'],
            accessLevel: 'full'
        },
        data: {
            autoRefresh: true,
            refreshInterval: 30,
            cacheEnabled: true,
            cacheDuration: 24,
            defaultRegion: 'both',
            defaultLimit: 50
        },
        visualization: {
            defaultView: 'table',
            nodeSize: 'score',
            edgeWeight: true,
            showLabels: true,
            colorBlindMode: false,
            networkLayout: 'force'
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: 60,
            ipWhitelist: [],
            auditLogging: true
        }
    })

    const sections: SettingsSection[] = [
        { id: 'profile', name: 'Profile', icon: UserCircleIcon, color: 'blue' },
        { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon, color: 'purple' },
        { id: 'notifications', name: 'Notifications', icon: BellIcon, color: 'amber' },
        { id: 'api', name: 'API & Access', icon: KeyIcon, color: 'emerald' },
        { id: 'data', name: 'Data Settings', icon: ServerStackIcon, color: 'indigo' },
        { id: 'visualization', name: 'Visualization', icon: ChartBarIcon, color: 'pink' },
        { id: 'security', name: 'Security', icon: ShieldCheckIcon, color: 'red' },
    ]

    const handleSave = () => {
        setSaveStatus('saving')
        setTimeout(() => {
            setSaveStatus('saved')
            setTimeout(() => setSaveStatus('idle'), 2000)
        }, 1000)
    }

    const handleReset = () => {
        // Reset to defaults
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent">
                        Settings
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Configure your EpiRank preferences
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Save Status */}
                    <AnimatePresence mode="wait">
                        {saveStatus === 'saving' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-lg"
                            >
                                <ArrowPathIcon className="w-4 h-4 text-blue-400 animate-spin" />
                                <span className="text-sm text-blue-400">Saving...</span>
                            </motion.div>
                        )}
                        {saveStatus === 'saved' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-lg"
                            >
                                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">Saved!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReset}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20"
                    >
                        Reset
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white text-sm"
                    >
                        Save Changes
                    </motion.button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <div className="w-64 space-y-1">
                    {sections.map((section) => {
                        const Icon = section.icon
                        const isActive = activeSection === section.id
                        return (
                            <motion.button
                                key={section.id}
                                whileHover={{ x: 4 }}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${isActive
                                    ? `bg-${section.color}-500/20 text-${section.color}-400 border border-${section.color}-500/30`
                                    : 'text-slate-400 hover:bg-white/5'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className={`absolute left-0 w-1 h-8 bg-${section.color}-400 rounded-full`}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon className={`w-5 h-5 ${isActive ? `text-${section.color}-400` : ''}`} />
                                <span className="text-sm">{section.name}</span>
                            </motion.button>
                        )
                    })}
                </div>

                {/* Settings Panel */}
                <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                    <AnimatePresence mode="wait">
                        {/* Profile Settings */}
                        {activeSection === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <UserCircleIcon className="w-6 h-6 text-blue-400" />
                                    Profile Settings
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={settings.profile.name}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                profile: { ...settings.profile, name: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={settings.profile.email}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                profile: { ...settings.profile, email: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Institution</label>
                                        <input
                                            type="text"
                                            value={settings.profile.institution}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                profile: { ...settings.profile, institution: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Role</label>
                                        <input
                                            type="text"
                                            value={settings.profile.role}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                profile: { ...settings.profile, role: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <button className="text-sm text-red-400 hover:text-red-300">
                                        Delete Account
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Appearance Settings */}
                        {activeSection === 'appearance' && (
                            <motion.div
                                key="appearance"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <PaintBrushIcon className="w-6 h-6 text-purple-400" />
                                    Appearance
                                </h2>

                                {/* Theme Selector */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Theme</label>
                                    <div className="flex gap-2">
                                        {[
                                            { value: 'dark', icon: MoonIcon, label: 'Dark' },
                                            { value: 'light', icon: SunIcon, label: 'Light' },
                                            { value: 'system', icon: ComputerDesktopIcon, label: 'System' }
                                        ].map((t) => (
                                            <button
                                                key={t.value}
                                                onClick={() => {
                                                    setTheme(t.value as any)
                                                    setSettings({
                                                        ...settings,
                                                        appearance: { ...settings.appearance, theme: t.value }
                                                    })
                                                }}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${settings.appearance.theme === t.value
                                                    ? 'bg-purple-500/20 border-purple-500/30 text-purple-400'
                                                    : 'bg-black/30 border-white/20 text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                <t.icon className="w-4 h-4" />
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Scheme */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Color Scheme</label>
                                    <div className="flex gap-2">
                                        {['purple', 'blue', 'emerald', 'amber', 'red'].map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSettings({
                                                    ...settings,
                                                    appearance: { ...settings.appearance, colorScheme: color }
                                                })}
                                                className={`w-8 h-8 rounded-full bg-${color}-500 border-2 transition-all ${settings.appearance.colorScheme === color
                                                    ? 'border-white scale-110'
                                                    : 'border-transparent'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Density */}
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Density</label>
                                    <select
                                        value={settings.appearance.density}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            appearance: { ...settings.appearance, density: e.target.value }
                                        })}
                                        className="bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                    >
                                        <option value="compact">Compact</option>
                                        <option value="comfortable">Comfortable</option>
                                        <option value="spacious">Spacious</option>
                                    </select>
                                </div>

                                {/* Animations Toggle */}
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.appearance.animations}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            appearance: { ...settings.appearance, animations: e.target.checked }
                                        })}
                                        className="sr-only"
                                    />
                                    <div className={`w-10 h-5 rounded-full transition-colors ${settings.appearance.animations ? 'bg-purple-500' : 'bg-slate-600'
                                        }`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.appearance.animations ? 'translate-x-5' : 'translate-x-1'
                                            }`} />
                                    </div>
                                    <span className="text-sm text-slate-300">Enable Animations</span>
                                </label>
                            </motion.div>
                        )}

                        {/* Notifications Settings */}
                        {activeSection === 'notifications' && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <BellIcon className="w-6 h-6 text-amber-400" />
                                    Notifications
                                </h2>

                                <div className="space-y-3">
                                    {[
                                        { id: 'emailAlerts', label: 'Email Alerts', description: 'Receive important updates via email' },
                                        { id: 'pushNotifications', label: 'Push Notifications', description: 'Browser notifications for real-time updates' },
                                        { id: 'dailyDigest', label: 'Daily Digest', description: 'Daily summary of new findings' },
                                        { id: 'modelUpdates', label: 'Model Updates', description: 'Notifications when models are retrained' },
                                        { id: 'newFindings', label: 'New Findings', description: 'Alerts for novel gene discoveries' },
                                        { id: 'systemAnnouncements', label: 'System Announcements', description: 'Platform maintenance and updates' }
                                    ].map((item) => (
                                        <label key={item.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                            <div>
                                                <p className="text-sm text-white">{item.label}</p>
                                                <p className="text-xs text-slate-500">{item.description}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={settings.notifications[item.id as keyof typeof settings.notifications]}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    notifications: { ...settings.notifications, [item.id]: e.target.checked }
                                                })}
                                                className="ml-4"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* API Settings */}
                        {activeSection === 'api' && (
                            <motion.div
                                key="api"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <KeyIcon className="w-6 h-6 text-emerald-400" />
                                    API & Access
                                </h2>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">API Key</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="password"
                                            value={settings.api.apiKey}
                                            readOnly
                                            className="flex-1 bg-black/30 border border-white/20 rounded-lg p-2 text-white font-mono"
                                        />
                                        <button className="px-3 py-2 bg-white/10 rounded-lg text-sm text-white">
                                            Regenerate
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">Keep this key secure. It grants access to your account.</p>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Rate Limit (requests/hour)</label>
                                    <input
                                        type="number"
                                        value={settings.api.rateLimit}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            api: { ...settings.api, rateLimit: parseInt(e.target.value) }
                                        })}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Access Level</label>
                                    <select
                                        value={settings.api.accessLevel}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            api: { ...settings.api, accessLevel: e.target.value }
                                        })}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                    >
                                        <option value="full">Full Access</option>
                                        <option value="readonly">Read Only</option>
                                        <option value="restricted">Restricted</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Enabled Endpoints</label>
                                    <div className="space-y-2">
                                        {['rankings', 'explain', 'network', 'methylation', 'metrics'].map((endpoint) => (
                                            <label key={endpoint} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={settings.api.endpoints.includes(endpoint)}
                                                    onChange={(e) => {
                                                        const newEndpoints = e.target.checked
                                                            ? [...settings.api.endpoints, endpoint]
                                                            : settings.api.endpoints.filter(e => e !== endpoint)
                                                        setSettings({
                                                            ...settings,
                                                            api: { ...settings.api, endpoints: newEndpoints }
                                                        })
                                                    }}
                                                    className="rounded"
                                                />
                                                <span className="text-sm text-slate-300 capitalize">{endpoint}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Data Settings */}
                        {activeSection === 'data' && (
                            <motion.div
                                key="data"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <ServerStackIcon className="w-6 h-6 text-indigo-400" />
                                    Data Settings
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Default Region</label>
                                        <select
                                            value={settings.data.defaultRegion}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                data: { ...settings.data, defaultRegion: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        >
                                            <option value="both">Both Regions</option>
                                            <option value="STG">STG</option>
                                            <option value="PFC">PFC</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Default Limit</label>
                                        <select
                                            value={settings.data.defaultLimit}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                data: { ...settings.data, defaultLimit: parseInt(e.target.value) }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Auto-refresh Data</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.data.autoRefresh}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                data: { ...settings.data, autoRefresh: e.target.checked }
                                            })}
                                        />
                                    </label>

                                    {settings.data.autoRefresh && (
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Refresh Interval (minutes)</label>
                                            <input
                                                type="number"
                                                value={settings.data.refreshInterval}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    data: { ...settings.data, refreshInterval: parseInt(e.target.value) }
                                                })}
                                                min="1"
                                                max="1440"
                                                className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                            />
                                        </div>
                                    )}

                                    <label className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Enable Caching</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.data.cacheEnabled}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                data: { ...settings.data, cacheEnabled: e.target.checked }
                                            })}
                                        />
                                    </label>

                                    {settings.data.cacheEnabled && (
                                        <div>
                                            <label className="block text-sm text-slate-400 mb-1">Cache Duration (hours)</label>
                                            <input
                                                type="number"
                                                value={settings.data.cacheDuration}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    data: { ...settings.data, cacheDuration: parseInt(e.target.value) }
                                                })}
                                                min="1"
                                                max="168"
                                                className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Visualization Settings */}
                        {activeSection === 'visualization' && (
                            <motion.div
                                key="visualization"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <ChartBarIcon className="w-6 h-6 text-pink-400" />
                                    Visualization
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Default View</label>
                                        <select
                                            value={settings.visualization.defaultView}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                visualization: { ...settings.visualization, defaultView: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        >
                                            <option value="table">Table</option>
                                            <option value="grid">Grid</option>
                                            <option value="network">Network</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Network Layout</label>
                                        <select
                                            value={settings.visualization.networkLayout}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                visualization: { ...settings.visualization, networkLayout: e.target.value }
                                            })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        >
                                            <option value="force">Force-Directed</option>
                                            <option value="circular">Circular</option>
                                            <option value="grid">Grid</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Show Labels</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.visualization.showLabels}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                visualization: { ...settings.visualization, showLabels: e.target.checked }
                                            })}
                                        />
                                    </label>

                                    <label className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Show Edge Weights</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.visualization.edgeWeight}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                visualization: { ...settings.visualization, edgeWeight: e.target.checked }
                                            })}
                                        />
                                    </label>

                                    <label className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Color Blind Mode</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.visualization.colorBlindMode}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                visualization: { ...settings.visualization, colorBlindMode: e.target.checked }
                                            })}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Node Size Metric</label>
                                    <div className="flex gap-2">
                                        {['score', 'degree', 'methylation', 'uniform'].map((metric) => (
                                            <button
                                                key={metric}
                                                onClick={() => setSettings({
                                                    ...settings,
                                                    visualization: { ...settings.visualization, nodeSize: metric }
                                                })}
                                                className={`px-3 py-1 rounded-lg text-xs capitalize ${settings.visualization.nodeSize === metric
                                                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                                                    : 'bg-black/30 text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                {metric}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Security Settings */}
                        {activeSection === 'security' && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <ShieldCheckIcon className="w-6 h-6 text-red-400" />
                                    Security
                                </h2>

                                <div className="space-y-4">
                                    <label className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                                        <div>
                                            <p className="text-sm text-white">Two-Factor Authentication</p>
                                            <p className="text-xs text-slate-500">Add an extra layer of security</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={settings.security.twoFactorAuth}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                security: { ...settings.security, twoFactorAuth: e.target.checked }
                                            })}
                                        />
                                    </label>

                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Session Timeout (minutes)</label>
                                        <input
                                            type="number"
                                            value={settings.security.sessionTimeout}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                                            })}
                                            min="5"
                                            max="480"
                                            className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                        />
                                    </div>

                                    <label className="flex items-center justify-between">
                                        <span className="text-sm text-slate-300">Audit Logging</span>
                                        <input
                                            type="checkbox"
                                            checked={settings.security.auditLogging}
                                            onChange={(e) => setSettings({
                                                ...settings,
                                                security: { ...settings.security, auditLogging: e.target.checked }
                                            })}
                                        />
                                    </label>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <h3 className="text-sm font-medium text-white mb-2">Active Sessions</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center p-2 bg-black/20 rounded-lg">
                                            <div>
                                                <p className="text-sm text-white">Chrome on macOS</p>
                                                <p className="text-xs text-slate-500">Last active: 2 minutes ago</p>
                                            </div>
                                            <span className="text-xs text-emerald-400">Current</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-black/20 rounded-lg">
                                            <div>
                                                <p className="text-sm text-white">Firefox on Windows</p>
                                                <p className="text-xs text-slate-500">Last active: 2 days ago</p>
                                            </div>
                                            <button className="text-xs text-red-400">Revoke</button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-600 pt-4">
                <p>EpiRank v1.0.0 • All settings are stored locally</p>
            </div>
        </div>
    )
}