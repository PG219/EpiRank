'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    HomeIcon,
    ChartBarIcon,
    ShareIcon,
    BeakerIcon,
    DocumentChartBarIcon,
    CubeIcon,
    SparklesIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

interface NavItem {
    name: string
    href: string
    icon: React.ForwardRefExoticComponent<any>
    badge?: string
    gradient: string
}

const navItems: NavItem[] = [
    {
        name: 'Dashboard',
        href: '/',
        icon: HomeIcon,
        gradient: 'from-blue-400 to-cyan-400',
        badge: 'Live'
    },
    {
        name: 'Gene Rankings',
        href: '/rankings',
        icon: ChartBarIcon,
        gradient: 'from-purple-400 to-pink-400'
    },
    {
        name: 'Network View',
        href: '/network',
        icon: ShareIcon,
        gradient: 'from-emerald-400 to-teal-400',
        badge: '3D'
    },
    {
        name: 'Epigenetics',
        href: '/epigenetics',
        icon: BeakerIcon,
        gradient: 'from-amber-400 to-orange-400'
    },
    {
        name: 'Model Metrics',
        href: '/metrics',
        icon: DocumentChartBarIcon,
        gradient: 'from-rose-400 to-red-400'
    },
    {
        name: 'Gene Explorer',
        href: '/explorer',
        icon: CubeIcon,
        gradient: 'from-indigo-400 to-purple-400',
        badge: 'New'
    },
]

const bottomNavItems: NavItem[] = [
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, gradient: 'from-slate-400 to-gray-400' },
    { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon, gradient: 'from-slate-400 to-gray-400' },
]

const Sidebar = () => {
    const pathname = usePathname()
    const [expanded, setExpanded] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
            className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ${expanded ? 'w-64' : 'w-20'
                }`}
        >
            {/* Background with glass effect */}
            <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl border-r border-white/10" />

            {/* Gradient orbs */}
            <div className="absolute -inset-20 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-20" />

            {/* Content */}
            <div className="relative h-full flex flex-col py-6">
                {/* Logo */}
                <Link href="/" className="px-4 mb-8">
                    <motion.div
                        className="flex items-center space-x-3"
                        animate={{ justifyContent: expanded ? 'flex-start' : 'center' }}
                    >
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <SparklesIcon className="w-6 h-6 text-white" />
                            </div>
                            <motion.div
                                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 blur"
                                animate={{ opacity: hoveredItem ? 0.5 : 0 }}
                            />
                        </div>
                        {expanded && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                            >
                                EpiRank
                            </motion.span>
                        )}
                    </motion.div>
                </Link>

                {/* Navigation */}
                <nav className="flex-1 px-3">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            const isHovered = hoveredItem === item.name

                            return (
                                <li key={item.name}>
                                    <Link href={item.href}>
                                        <motion.div
                                            onHoverStart={() => setHoveredItem(item.name)}
                                            onHoverEnd={() => setHoveredItem(null)}
                                            className={`relative group flex items-center ${expanded ? 'px-3' : 'px-0 justify-center'
                                                } py-3 rounded-xl transition-all duration-200 cursor-pointer`}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {/* Active/Background glow */}
                                            {(isActive || isHovered) && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-xl`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.15 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}

                                            {/* Icon with gradient */}
                                            <div className={`relative flex items-center justify-center ${expanded ? 'mr-3' : ''
                                                }`}>
                                                <div className={`w-5 h-5 transition-all duration-300 ${isActive
                                                    ? `text-white bg-gradient-to-r ${item.gradient} bg-clip-text`
                                                    : 'text-slate-400 group-hover:text-white'
                                                    }`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>

                                                {/* Icon glow on hover */}
                                                <motion.div
                                                    className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-lg opacity-0 blur`}
                                                    animate={{ opacity: isHovered ? 0.5 : 0 }}
                                                />
                                            </div>

                                            {/* Label */}
                                            {expanded && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`text-sm font-medium ${isActive
                                                        ? `text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text`
                                                        : 'text-slate-300 group-hover:text-white'
                                                        }`}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}

                                            {/* Badge */}
                                            {item.badge && expanded && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className={`ml-auto text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${item.gradient} text-white`}
                                                >
                                                    {item.badge}
                                                </motion.span>
                                            )}
                                        </motion.div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Bottom navigation */}
                <div className="px-3 mt-auto">
                    <div className="border-t border-white/10 pt-4">
                        <ul className="space-y-2">
                            {bottomNavItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href}>
                                        <motion.div
                                            className={`relative group flex items-center ${expanded ? 'px-3' : 'px-0 justify-center'
                                                } py-3 rounded-xl transition-all duration-200 cursor-pointer`}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className={`flex items-center justify-center ${expanded ? 'mr-3' : ''
                                                }`}>
                                                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                            </div>
                                            {expanded && (
                                                <span className="text-sm text-slate-400 group-hover:text-white">
                                                    {item.name}
                                                </span>
                                            )}
                                        </motion.div>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* User info mini card */}
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">RS</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-white">Research Lab</p>
                                        <p className="text-xs text-slate-400">Pro Access</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Collapse indicator */}
                <motion.div
                    className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center cursor-pointer"
                    animate={{ rotate: expanded ? 0 : 180 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <svg
                        className="w-3 h-3 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.div>
            </div>
        </motion.aside>
    )
}

export default Sidebar