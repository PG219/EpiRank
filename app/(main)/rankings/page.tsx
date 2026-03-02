'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    FunnelIcon,
    ArrowPathIcon,
    ChartBarIcon,
    SparklesIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline'
import RankTable from '../components/rankings/RankTable'
import FilterBar from '../components/rankings/FilterBar'
import SearchBar from '../components/rankings/SearchBar'
import StatusBadge from '../components/rankings/StatusBadge'
import { useRankings } from '../hooks/useRankings'
import { Gene } from '../types/ranking'

export default function RankingsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGene, setSelectedGene] = useState<Gene | null>(null)
    const [filters, setFilters] = useState({
        region: 'all',
        status: 'all',
        limit: 50
    })

    const { data: rankings, isLoading, refetch } = useRankings(filters)

    // Filter based on search
    const filteredData = rankings?.filter(gene =>
        gene.gene.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gene.chromosome.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Gene Rankings
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Comprehensive leaderboard of epigenetically regulated genes
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => refetch()}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                >
                    <ArrowPathIcon className="w-5 h-5 text-slate-300" />
                </motion.button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <p className="text-slate-400 text-sm">Total Genes</p>
                    <p className="text-2xl font-bold text-white">12,847</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <p className="text-slate-400 text-sm">Known Targets</p>
                    <p className="text-2xl font-bold text-emerald-400">234</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <p className="text-slate-400 text-sm">Novel Candidates</p>
                    <p className="text-2xl font-bold text-purple-400">1,247</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <p className="text-slate-400 text-sm">Avg SHAP Coherence</p>
                    <p className="text-2xl font-bold text-blue-400">0.89</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search by gene name or chromosome..."
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center gap-2"
                    >
                        <SparklesIcon className="w-4 h-4" />
                        Analyze
                    </motion.button>
                </div>

                <div className="mt-4">
                    <FilterBar filters={filters} onFilterChange={setFilters} />
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ChartBarIcon className="w-5 h-5 text-blue-400" />
                        <h2 className="text-white font-medium">Gene Leaderboard</h2>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-slate-300">
                            Top {filters.limit} results
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/20 transition-colors">
                            <DocumentTextIcon className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/20 transition-colors">
                            <FunnelIcon className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                </div>

                <RankTable
                    data={filteredData || []}
                    isLoading={isLoading}
                    onGeneClick={setSelectedGene}
                />
            </div>

            {/* Selected Gene Preview */}
            {selectedGene && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-6 right-6 w-80 bg-slate-800 border border-white/20 rounded-xl p-4 shadow-2xl"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-white font-bold">{selectedGene.gene}</h3>
                            <p className="text-xs text-slate-400">Rank #{selectedGene.rank}</p>
                        </div>
                        <StatusBadge status={selectedGene.status} />
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Score:</span>
                            <span className="text-white font-mono">{selectedGene.score.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Chromosome:</span>
                            <span className="text-white">{selectedGene.chromosome}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Network Degree:</span>
                            <span className="text-white">{selectedGene.network_degree}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = `/gene/${selectedGene.gene}`}
                        className="mt-4 w-full py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm hover:bg-blue-500/30 transition-colors"
                    >
                        View Full Profile →
                    </button>
                </motion.div>
            )}
        </div>
    )
}