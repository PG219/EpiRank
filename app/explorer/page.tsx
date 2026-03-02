'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CubeIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowPathIcon,
    ChartBarIcon,
    BeakerIcon,
    ShareIcon,
    DocumentTextIcon,
    SparklesIcon,
    InformationCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'
import { mockExplorerData } from '../utils/mockExplorerData'
import StatusBadge from '../components/rankings/StatusBadge'

interface Gene {
    id: string
    name: string
    full_name: string
    description: string
    chromosome: string
    start: number
    end: number
    strand: '+' | '-'
    score: number
    status: 'known' | 'novel'
    evidence_level: 'high' | 'medium' | 'low'
    pathways: string[]
    diseases: string[]
    expression: {
        brain: number
        blood: number
        other: number
    }
    interactions: number
    methylation_delta: number
    histone_marks: {
        h3k4me3: number
        h3k27ac: number
        h3k9me3: number
    }
}

export default function ExplorerPage() {
    const [genes, setGenes] = useState<Gene[]>([])
    const [filteredGenes, setFilteredGenes] = useState<Gene[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedGene, setSelectedGene] = useState<Gene | null>(null)
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [filters, setFilters] = useState({
        status: 'all',
        evidence: 'all',
        chromosome: 'all',
        scoreRange: [0, 1],
        methylationRange: [0, 1]
    })
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState<'score' | 'name' | 'methylation'>('score')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    useEffect(() => {
        // Load mock data
        setTimeout(() => {
            setGenes(mockExplorerData.genes as Gene[])
            setFilteredGenes(mockExplorerData.genes as Gene[])
            setIsLoading(false)
        }, 1000)
    }, [])

    // Apply filters and search
    useEffect(() => {
        let filtered = [...genes]

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(gene =>
                gene.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gene.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gene.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Status filter
        if (filters.status !== 'all') {
            filtered = filtered.filter(gene => gene.status === filters.status)
        }

        // Evidence filter
        if (filters.evidence !== 'all') {
            filtered = filtered.filter(gene => gene.evidence_level === filters.evidence)
        }

        // Chromosome filter
        if (filters.chromosome !== 'all') {
            filtered = filtered.filter(gene => gene.chromosome === filters.chromosome)
        }

        // Score range filter
        filtered = filtered.filter(gene =>
            gene.score >= filters.scoreRange[0] && gene.score <= filters.scoreRange[1]
        )

        // Methylation range filter
        filtered = filtered.filter(gene =>
            Math.abs(gene.methylation_delta) >= filters.methylationRange[0] &&
            Math.abs(gene.methylation_delta) <= filters.methylationRange[1]
        )

        // Apply sorting
        filtered.sort((a, b) => {
            if (sortBy === 'score') return b.score - a.score
            if (sortBy === 'name') return a.name.localeCompare(b.name)
            return Math.abs(b.methylation_delta) - Math.abs(a.methylation_delta)
        })

        setFilteredGenes(filtered)
        setCurrentPage(1)
    }, [genes, searchQuery, filters, sortBy])

    // Pagination
    const totalPages = Math.ceil(filteredGenes.length / itemsPerPage)
    const paginatedGenes = filteredGenes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // Get unique chromosomes for filter
    const chromosomes = ['all', ...new Set(genes.map(g => g.chromosome))].sort()

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Gene Explorer
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Comprehensive gene browser with detailed annotations
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* View Toggle */}
                    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/20">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded-md transition-colors ${view === 'grid'
                                ? 'bg-indigo-500/20 text-indigo-400'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <CubeIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded-md transition-colors ${view === 'list'
                                ? 'bg-indigo-500/20 text-indigo-400'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <DocumentTextIcon className="w-4 h-4" />
                        </button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                    >
                        <AdjustmentsHorizontalIcon className="w-5 h-5 text-slate-300" />
                    </motion.button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search genes by name, description, or pathways..."
                        className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-slate-500"
                    />
                </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 overflow-hidden"
                    >
                        <div className="grid grid-cols-3 gap-6">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                >
                                    <option value="all">All Genes</option>
                                    <option value="known">Known Only</option>
                                    <option value="novel">Novel Only</option>
                                </select>
                            </div>

                            {/* Evidence Level */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Evidence Level</label>
                                <select
                                    value={filters.evidence}
                                    onChange={(e) => setFilters({ ...filters, evidence: e.target.value })}
                                    className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                >
                                    <option value="all">All Levels</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>

                            {/* Chromosome */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Chromosome</label>
                                <select
                                    value={filters.chromosome}
                                    onChange={(e) => setFilters({ ...filters, chromosome: e.target.value })}
                                    className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                >
                                    {chromosomes.map(chr => (
                                        <option key={chr} value={chr}>{chr === 'all' ? 'All' : chr}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Score Range */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">
                                    Score Range: {filters.scoreRange[0].toFixed(2)} - {filters.scoreRange[1].toFixed(2)}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={filters.scoreRange[0]}
                                        onChange={(e) => setFilters({
                                            ...filters,
                                            scoreRange: [parseFloat(e.target.value), filters.scoreRange[1]]
                                        })}
                                        className="w-full"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={filters.scoreRange[1]}
                                        onChange={(e) => setFilters({
                                            ...filters,
                                            scoreRange: [filters.scoreRange[0], parseFloat(e.target.value)]
                                        })}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Methylation Range */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">
                                    |Δβ| Range: {filters.methylationRange[0].toFixed(2)} - {filters.methylationRange[1].toFixed(2)}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={filters.methylationRange[0]}
                                        onChange={(e) => setFilters({
                                            ...filters,
                                            methylationRange: [parseFloat(e.target.value), filters.methylationRange[1]]
                                        })}
                                        className="w-full"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={filters.methylationRange[1]}
                                        onChange={(e) => setFilters({
                                            ...filters,
                                            methylationRange: [filters.methylationRange[0], parseFloat(e.target.value)]
                                        })}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Sort By */}
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white"
                                >
                                    <option value="score">Score</option>
                                    <option value="name">Name</option>
                                    <option value="methylation">Methylation</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Count */}
            <div className="flex justify-between items-center">
                <p className="text-sm text-slate-400">
                    Showing <span className="text-white font-medium">{paginatedGenes.length}</span> of{' '}
                    <span className="text-white font-medium">{filteredGenes.length}</span> genes
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="w-4 h-4 text-slate-300" />
                    </button>
                    <span className="text-sm text-slate-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-50"
                    >
                        <ChevronRightIcon className="w-4 h-4 text-slate-300" />
                    </button>
                </div>
            </div>

            {/* Gene Grid/List View */}
            {view === 'grid' ? (
                <div className="grid grid-cols-3 gap-4">
                    {paginatedGenes.map((gene, index) => (
                        <motion.div
                            key={gene.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            onClick={() => setSelectedGene(gene)}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                                        {gene.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">{gene.full_name}</p>
                                </div>
                                <StatusBadge status={gene.status} />
                            </div>

                            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                                {gene.description}
                            </p>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Score:</span>
                                    <span className="text-white font-mono">{gene.score.toFixed(3)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Chromosome:</span>
                                    <span className="text-white">{gene.chromosome}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Methylation Δβ:</span>
                                    <span className={gene.methylation_delta > 0 ? 'text-red-400' : 'text-blue-400'}>
                                        {gene.methylation_delta > 0 ? '+' : ''}{gene.methylation_delta.toFixed(3)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1">
                                {gene.pathways.slice(0, 2).map(pathway => (
                                    <span key={pathway} className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-slate-400">
                                        {pathway}
                                    </span>
                                ))}
                                {gene.pathways.length > 2 && (
                                    <span className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-slate-400">
                                        +{gene.pathways.length - 2}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-black/30">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Gene</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Status</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Score</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Chr</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Methylation</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Evidence</th>
                                <th className="px-4 py-3 text-left text-xs text-slate-400">Pathways</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedGenes.map((gene, index) => (
                                <motion.tr
                                    key={gene.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.02 }}
                                    onClick={() => setSelectedGene(gene)}
                                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                                >
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="text-sm font-medium text-white">{gene.name}</p>
                                            <p className="text-xs text-slate-500">{gene.full_name}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={gene.status} size="sm" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-sm font-mono text-white">{gene.score.toFixed(3)}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-300">{gene.chromosome}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-sm font-mono ${gene.methylation_delta > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                            {gene.methylation_delta > 0 ? '+' : ''}{gene.methylation_delta.toFixed(3)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${gene.evidence_level === 'high' ? 'bg-emerald-500/20 text-emerald-400' :
                                            gene.evidence_level === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                                'bg-slate-500/20 text-slate-400'
                                            }`}>
                                            {gene.evidence_level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-1">
                                            {gene.pathways.slice(0, 2).map(p => (
                                                <span key={p} className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-slate-400">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Gene Detail Modal */}
            <AnimatePresence>
                {selectedGene && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
                        onClick={() => setSelectedGene(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedGene.name}</h2>
                                    <p className="text-slate-400">{selectedGene.full_name}</p>
                                </div>
                                <StatusBadge status={selectedGene.status} />
                            </div>

                            <p className="text-sm text-slate-300 mb-4">{selectedGene.description}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-xs text-slate-400">Chromosome</p>
                                    <p className="text-sm text-white">{selectedGene.chromosome}:{selectedGene.start}-{selectedGene.end}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-xs text-slate-400">Strand</p>
                                    <p className="text-sm text-white">{selectedGene.strand}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-xs text-slate-400">Score</p>
                                    <p className="text-sm font-mono text-white">{selectedGene.score.toFixed(3)}</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <p className="text-xs text-slate-400">Evidence Level</p>
                                    <p className={`text-sm capitalize ${selectedGene.evidence_level === 'high' ? 'text-emerald-400' :
                                        selectedGene.evidence_level === 'medium' ? 'text-amber-400' :
                                            'text-slate-400'
                                        }`}>{selectedGene.evidence_level}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-white">Pathways</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedGene.pathways.map(p => (
                                        <span key={p} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-slate-300">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
                                    <p className="text-xs text-slate-400">Brain Expression</p>
                                    <p className="text-lg font-bold text-blue-400">{(selectedGene.expression.brain * 100).toFixed(0)}%</p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                                    <p className="text-xs text-slate-400">Blood Expression</p>
                                    <p className="text-lg font-bold text-purple-400">{(selectedGene.expression.blood * 100).toFixed(0)}%</p>
                                </div>
                                <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg">
                                    <p className="text-xs text-slate-400">Interactions</p>
                                    <p className="text-lg font-bold text-emerald-400">{selectedGene.interactions}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    onClick={() => setSelectedGene(null)}
                                    className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => window.location.href = `/gene/${selectedGene.name}`}
                                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white text-sm"
                                >
                                    View Full Profile
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}