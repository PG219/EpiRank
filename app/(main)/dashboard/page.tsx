'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChartBarIcon,
  BeakerIcon,
  ShareIcon,
  SparklesIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import RankTable from '../components/rankings/RankTable'
import FilterBar from '../components/rankings/FilterBar'
import SearchBar from '../components/rankings/SearchBar'
import StatusBadge from '../components/rankings/StatusBadge'
import ShapChart from '../components/explain/ShapChart'
import { useRankings } from '../hooks/useRankings'
import { Gene } from '../types/ranking'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  inactive: { y: 20, opacity: 0 },
  active: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
}

export default function HomePage() {
  const [selectedGene, setSelectedGene] = useState<Gene | null>(null)
  const [showExplainModal, setShowExplainModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    region: 'all',
    status: 'all',
    limit: 50
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { data: rankings, isLoading, error, refetch } = useRankings(filters)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleGeneClick = (gene: Gene) => {
    setSelectedGene(gene)
    setShowExplainModal(true)
  }

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Genes',
      value: '12,847',
      change: '+12%',
      icon: DocumentChartBarIcon,
      gradient: 'from-blue-600/20 to-cyan-600/20',
      borderGlow: 'group-hover:shadow-blue-500/20'
    },
    {
      title: 'Known Targets',
      value: '234',
      change: '+3',
      icon: StarIconSolid,
      gradient: 'from-emerald-600/20 to-teal-600/20',
      borderGlow: 'group-hover:shadow-emerald-500/20'
    },
    {
      title: 'Novel Candidates',
      value: '1,247',
      change: '+28',
      icon: SparklesIcon,
      gradient: 'from-purple-600/20 to-pink-600/20',
      borderGlow: 'group-hover:shadow-purple-500/20'
    },
    {
      title: 'SHAP Coherence',
      value: '0.89',
      change: '+0.02',
      icon: ChartBarIcon,
      gradient: 'from-amber-600/20 to-orange-600/20',
      borderGlow: 'group-hover:shadow-amber-500/20'
    }
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section with Stats */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-space"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Gene Prioritization Dashboard
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-slate-400 mt-2 flex items-center gap-2"
          >
            <BeakerIcon className="w-4 h-4 text-purple-400 animate-pulse" />
            Regulatory-aware ranking with full explainability
          </motion.p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden"
        >
          <ArrowPathIcon className={`w-5 h-5 text-slate-400 group-hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`} />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-4 gap-4"
      >
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 hover:border-white/20 transition-all"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Animated border glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 blur transition-all duration-700 group-hover:duration-200 ${card.borderGlow}`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <card.icon className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {card.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors">
                {card.value}
              </h3>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 mt-1">
                {card.title}
              </p>
            </div>

            {/* Animated particles */}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        variants={itemVariants}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by gene name, chromosome, or feature..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium flex items-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10">Analyze</span>
              <ShareIcon className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          <div className="mt-4">
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Active filters tags */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {filters.region !== 'all' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300 flex items-center gap-1"
              >
                Region: {filters.region}
                <button className="hover:text-white transition-colors">×</button>
              </motion.span>
            )}
            {filters.status !== 'all' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 flex items-center gap-1"
              >
                Status: {filters.status}
                <button className="hover:text-white transition-colors">×</button>
              </motion.span>
            )}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-slate-500/20 border border-slate-500/30 rounded-full text-xs text-slate-300"
            >
              Top {filters.limit} results
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-12 gap-6"
      >
        {/* Rankings Table */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-blue-400" />
                  Gene Leaderboard
                </h2>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FunnelIcon className="w-4 h-4 text-slate-400" />
                  </motion.button>
                </div>
              </div>

              <RankTable
                data={rankings || []}
                isLoading={isLoading}
                onGeneClick={handleGeneClick}
              />
            </div>
          </div>
        </div>

        {/* Side Panel - Quick Insights */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Top Features Preview */}
          <motion.div
            whileHover={{ y: -2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-purple-400" />
                Top Contributing Features
              </h3>
              <div className="space-y-3">
                {['Methylation Delta', 'Histone H3K4me3', 'Network Degree', 'Chromatin Accessibility'].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between group/feature"
                  >
                    <span className="text-sm text-slate-400 group-hover/feature:text-white transition-colors">
                      {feature}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${85 - i * 15}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>
                      <span className="text-xs font-mono text-slate-300">
                        {0.85 - i * 0.15}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            whileHover={{ y: -2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <ArrowPathIcon className="w-4 h-4 text-emerald-400" />
                Recent Analyses
              </h3>
              <div className="space-y-2">
                {[
                  { gene: 'APOE', time: '2 min ago', status: 'known' },
                  { gene: 'BIN1', time: '15 min ago', status: 'known' },
                  { gene: 'ABCA7', time: '1 hour ago', status: 'novel' },
                ].map((item, i) => (
                  <motion.div
                    key={item.gene}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white">{item.gene}</span>
                      <StatusBadge status={item.status as 'known' | 'novel'} />
                    </div>
                    <span className="text-xs text-slate-200">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            whileHover={{ y: -2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4 text-amber-400" />
                Model Performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-lg font-bold text-white">0.92</div>
                  <div className="text-xs text-slate-300">Precision@20</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-lg font-bold text-white">0.87</div>
                  <div className="text-xs text-slate-300">AUC-ROC</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplainModal && selectedGene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowExplainModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[80vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-30" />
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      {selectedGene.gene}
                      <StatusBadge status={selectedGene.status} />
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      Rank #{selectedGene.rank} • Score {selectedGene.score}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => setShowExplainModal(false)}
                  >
                    ×
                  </motion.button>
                </div>

                <ShapChart geneId={selectedGene.gene} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}