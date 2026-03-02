'use client'

import { motion } from 'framer-motion'
import {
    BellIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    CommandLineIcon,
    ArrowPathIcon,
    WifiIcon
} from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'

import { firebaseAuth } from '@/lib/firebase/client'

interface HeaderProps {
    className?: string
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
    const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'offline'>('connected')
    const [isSigningOut, setIsSigningOut] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const notifications = [
        { id: 1, message: 'New gene ranking complete', time: '2 min ago', unread: true },
        { id: 2, message: 'Model retraining finished', time: '1 hour ago', unread: false },
        { id: 3, message: 'SHAP explanations updated', time: '3 hours ago', unread: false },
    ]

    const handleLogout = async () => {
        if (isSigningOut) {
            return
        }

        setIsSigningOut(true)

        try {
            await fetch('/api/auth/session', { method: 'DELETE' })
            await signOut(firebaseAuth)
        } finally {
            router.push('/login')
            router.refresh()
            setIsSigningOut(false)
        }
    }

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
                ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10'
                : 'bg-transparent'
                } ${className}`}
        >
            <div className="px-6 py-4 flex items-center justify-between">
                {/* Left section - Breadcrumb and status */}
                <div className="flex items-center space-x-4">
                    <motion.div
                        className="flex items-center space-x-2 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-slate-400">Dashboard</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-white font-medium">Gene Prioritization</span>
                    </motion.div>

                    {/* Live status indicator */}
                    <motion.div
                        className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        animate={{
                            borderColor: connectionStatus === 'connected'
                                ? 'rgba(34, 197, 94, 0.3)'
                                : 'rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: connectionStatus === 'connected' ? [1, 1.2, 1] : 1,
                                backgroundColor: connectionStatus === 'connected'
                                    ? '#22c55e'
                                    : connectionStatus === 'connecting'
                                        ? '#eab308'
                                        : '#ef4444'
                            }}
                            transition={{
                                duration: 2,
                                repeat: connectionStatus === 'connected' ? Infinity : 0,
                                ease: "easeInOut"
                            }}
                            className="w-2 h-2 rounded-full"
                        />
                        <span className="text-xs text-slate-300">
                            {connectionStatus === 'connected' ? 'Live' : connectionStatus === 'connecting' ? 'Connecting' : 'Offline'}
                        </span>
                    </motion.div>
                </div>

                {/* Right section - Actions and profile */}
                <div className="flex items-center space-x-3">
                    {/* Quick actions with tooltips */}
                    <div className="flex items-center space-x-2 mr-4">
                        {[
                            { icon: CommandLineIcon, label: 'Quick command (⌘K)', shortcut: '⌘K' },
                            { icon: ArrowPathIcon, label: 'Refresh data', shortcut: '⌘R' },
                        ].map((action, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group"
                            >
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all">
                                    <action.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </button>

                                {/* Tooltip */}
                                <div className="absolute top-full mt-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <div className="bg-slate-800 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap border border-white/10">
                                        {action.label}
                                        <span className="ml-2 text-slate-400 font-mono">{action.shortcut}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Last updated */}
                    <motion.div
                        className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                        <WifiIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-xs text-slate-400">
                            Updated {lastUpdated.toLocaleTimeString()}
                        </span>
                    </motion.div>

                    {/* Notifications dropdown */}
                    <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                    >
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all relative">
                            <BellIcon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                                {notifications.filter(n => n.unread).length}
                            </span>
                        </button>

                        {/* Dropdown menu */}
                        <div className="absolute right-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                            <div className="bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-3 border-b border-white/10">
                                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <motion.div
                                            key={notif.id}
                                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                            className={`p-3 cursor-pointer ${notif.unread ? 'bg-blue-500/10' : ''}`}
                                        >
                                            <p className="text-sm text-white">{notif.message}</p>
                                            <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Settings button */}
                    <motion.button
                        whileHover={{ rotate: 90, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                    >
                        <Cog6ToothIcon className="w-5 h-5 text-slate-400 hover:text-white" />
                    </motion.button>

                    {/* User profile */}
                    <motion.div
                        className="relative group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <button className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 hover:border-white/20 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <UserCircleIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-white">Researcher</p>
                                <p className="text-xs text-slate-400">Lab Access</p>
                            </div>
                        </button>

                        {/* Profile dropdown */}
                        <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                            <div className="bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                {['Profile', 'Settings', 'API Keys'].map((item) => (
                                    <motion.div
                                        key={item}
                                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        className="px-4 py-2 cursor-pointer text-sm text-slate-300 hover:text-white"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                                <motion.button
                                    type="button"
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    className="w-full text-left px-4 py-2 cursor-pointer text-sm text-slate-300 hover:text-white disabled:opacity-60"
                                    onClick={handleLogout}
                                    disabled={isSigningOut}
                                >
                                    {isSigningOut ? 'Logging out...' : 'Logout'}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    )
}

export default Header
