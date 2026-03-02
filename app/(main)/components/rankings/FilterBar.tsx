'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
    FunnelIcon,
    ChevronDownIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

interface FilterBarProps {
    filters: {
        region: string
        status: string
        limit: number
    }
    onFilterChange: (filters: any) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
    const [showAdvanced, setShowAdvanced] = useState(false)

    const regions = [
        { value: 'all', label: 'All Regions', color: 'blue' },
        { value: 'stg', label: 'STG', color: 'purple' },
        { value: 'pfc', label: 'PFC', color: 'pink' },
    ]

    const statuses = [
        { value: 'all', label: 'All Genes', color: 'slate' },
        { value: 'known', label: 'Known Only', color: 'emerald' },
        { value: 'novel', label: 'Novel Only', color: 'amber' },
    ]

    const limits = [10, 25, 50, 100, 250]

    return (
        <div className="space-y-3">
            {/* Main filters */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Region filter */}
                <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1 border border-white/10">
                    {regions.map((region) => (
                        <motion.button
                            key={region.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onFilterChange({ ...filters, region: region.value })}
                            className={`
                relative px-3 py-1.5 text-xs font-medium rounded-md transition-all
                ${filters.region === region.value
                                    ? `text-white bg-gradient-to-r from-${region.color}-500 to-${region.color}-600`
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }
              `}
                        >
                            {filters.region === region.value && (
                                <motion.div
                                    layoutId="activeRegion"
                                    className="absolute inset-0 rounded-md"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{region.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Status filter */}
                <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1 border border-white/10">
                    {statuses.map((status) => (
                        <motion.button
                            key={status.value}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onFilterChange({ ...filters, status: status.value })}
                            className={`
                relative px-3 py-1.5 text-xs font-medium rounded-md transition-all
                ${filters.status === status.value
                                    ? `text-white bg-gradient-to-r from-${status.color}-500 to-${status.color}-600`
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }
              `}
                        >
                            {filters.status === status.value && (
                                <motion.div
                                    layoutId="activeStatus"
                                    className="absolute inset-0 rounded-md"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{status.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Limit selector */}
                <div className="relative group">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white transition-colors">
                        <span>Top {filters.limit}</span>
                        <ChevronDownIcon className="w-3 h-3" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-1 w-24 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
                            {limits.map((limit) => (
                                <motion.button
                                    key={limit}
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                    onClick={() => onFilterChange({ ...filters, limit })}
                                    className="w-full px-3 py-1.5 text-left text-xs text-slate-300 hover:text-white"
                                >
                                    {limit}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Advanced toggle */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 hover:text-white transition-colors"
                >
                    <AdjustmentsHorizontalIcon className="w-3 h-3" />
                    <span>Advanced</span>
                </motion.button>
            </div>

            {/* Advanced filters */}
            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <h4 className="text-xs font-medium text-slate-400 mb-3">Advanced Filters</h4>

                            <div className="grid grid-cols-3 gap-4">
                                {/* Chromosome filter */}
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Chromosome</label>
                                    <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
                                        <option>All</option>
                                        <option>Chr1</option>
                                        <option>Chr2</option>
                                        <option>Chr3</option>
                                    </select>
                                </div>

                                {/* Score range */}
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Min Score</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="1"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
                                        placeholder="0.0"
                                    />
                                </div>

                                {/* Network degree */}
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Min Degree</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FilterBar