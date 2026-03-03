'use client'

import { motion } from 'framer-motion'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface TopFeaturesProps {
    features: string[]
    maxDisplay?: number
}

const TopFeatures: React.FC<TopFeaturesProps> = ({ features = [], maxDisplay = 3 }) => {
    const [showAll, setShowAll] = useState(false)
    const safeFeatures = features || []
    const displayFeatures = showAll ? safeFeatures : safeFeatures.slice(0, maxDisplay)
    const hasMore = safeFeatures.length > maxDisplay

    const getFeatureColor = (feature: string) => {
        if (feature.includes('Methylation')) return 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300'
        if (feature.includes('Histone')) return 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300'
        if (feature.includes('Network')) return 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300'
        if (feature.includes('Chromatin')) return 'from-amber-500/20 to-amber-600/20 border-amber-500/30 text-amber-300'
        return 'from-slate-500/20 to-slate-600/20 border-slate-500/30 text-slate-300'
    }

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            {displayFeatures.map((feature, index) => (
                <motion.span
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className={`
            inline-flex items-center px-2 py-0.5 rounded-md text-xs
            bg-gradient-to-r ${getFeatureColor(feature)}
            border cursor-default
          `}
                >
                    <SparklesIcon className="w-3 h-3 mr-1 opacity-70" />
                    {feature}
                </motion.span>
            ))}

            {hasMore && !showAll && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAll(true)}
                    className="px-2 py-0.5 rounded-md text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                    +{features.length - maxDisplay} more
                </motion.button>
            )}
        </div>
    )
}

export default TopFeatures