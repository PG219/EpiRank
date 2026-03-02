'use client'

import { motion } from 'framer-motion'

interface StatusBadgeProps {
    status: 'known' | 'novel'
    size?: 'sm' | 'md'
    animated?: boolean
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    size = 'md',
    animated = true
}) => {
    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm'
    }

    const config = {
        known: {
            bg: 'from-emerald-500/20 to-teal-500/20',
            border: 'border-emerald-500/30',
            text: 'text-emerald-300',
            dot: 'bg-emerald-400',
            pulseColor: 'emerald-400'
        },
        novel: {
            bg: 'from-purple-500/20 to-pink-500/20',
            border: 'border-purple-500/30',
            text: 'text-purple-300',
            dot: 'bg-purple-400',
            pulseColor: 'purple-400'
        }
    }

    const badge = (
        <motion.span
            whileHover={{ scale: 1.05 }}
            className={`
        inline-flex items-center space-x-1.5 rounded-full
        bg-gradient-to-r ${config[status].bg}
        border ${config[status].border}
        ${sizeClasses[size]}
        font-medium backdrop-blur-sm
      `}
        >
            {animated && (
                <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-1.5 h-1.5 rounded-full ${config[status].dot}`}
                />
            )}
            <span className={config[status].text}>
                {status === 'known' ? 'Known' : 'Novel'}
            </span>
        </motion.span>
    )

    return badge
}

export default StatusBadge