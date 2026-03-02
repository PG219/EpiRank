'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    onSearch?: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search...",
    onSearch
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [recentSearches] = useState(['APOE', 'BIN1', 'ABCA7', 'CLU', 'PICALM'])

    const handleClear = () => {
        onChange('')
        inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(value)
        }
    }

    return (
        <div className="relative">
            <motion.div
                animate={{
                    scale: isFocused ? 1.02 : 1,
                    borderColor: isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                }}
                className="relative flex items-center"
            >
                <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-slate-400" />

                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />

                {value && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleClear}
                        className="absolute right-3 p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <XMarkIcon className="w-4 h-4 text-slate-400" />
                    </motion.button>
                )}
            </motion.div>

            {/* Recent searches dropdown - show when focused and no value */}
            {isFocused && !value && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50"
                >
                    <p className="text-xs text-slate-400 px-2 py-1">Recent searches</p>
                    {recentSearches.map((search) => (
                        <motion.button
                            key={search}
                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                            onClick={() => onChange(search)}
                            className="w-full px-2 py-1.5 text-left text-sm text-slate-300 hover:text-white rounded-lg transition-colors"
                        >
                            {search}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default SearchBar