'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    QuestionMarkCircleIcon,
    BookOpenIcon,
    AcademicCapIcon,
    CommandLineIcon,
    BeakerIcon,
    ShareIcon,
    ChartBarIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    EnvelopeIcon,
    ChatBubbleLeftIcon,
    DocumentDuplicateIcon,
    RocketLaunchIcon,
    CpuChipIcon,
    ShieldCheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ClipboardDocumentIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

interface FAQ {
    id: string
    question: string
    answer: string
    category: 'getting-started' | 'features' | 'data' | 'technical'
}

interface Guide {
    id: string
    title: string
    description: string
    icon: any
    color: string
    duration: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'guides' | 'faq' | 'contact'>('guides')
    const [copied, setCopied] = useState<string | null>(null)

    const faqs: FAQ[] = [
        {
            id: '1',
            question: 'What is EpiRank?',
            answer: 'EpiRank is a regulatory-aware gene prioritization platform for Alzheimer\'s disease. It integrates epigenetic data (methylation, histone marks) with gene interaction networks to rank genes by disease relevance, providing explainable AI-driven insights.',
            category: 'getting-started'
        },
        {
            id: '2',
            question: 'How are genes ranked?',
            answer: 'Genes are ranked using a Graph Attention Network (GAT) that processes regulatory signatures learned by an autoencoder. The model considers methylation patterns, histone modifications, chromatin accessibility, and network topology to compute a relevance score.',
            category: 'features'
        },
        {
            id: '3',
            question: 'What does the SHAP explanation show?',
            answer: 'SHAP (SHapley Additive exPlanations) shows how each feature contributes to a gene\'s ranking. Positive values (red) push the gene higher, negative values (blue) lower it. This provides transparency into why specific genes are prioritized.',
            category: 'features'
        },
        {
            id: '4',
            question: 'What data sources are used?',
            answer: 'EpiRank uses methylation data from GEO (GSE80970), histone marks from ENCODE, protein interactions from STRING DB, and known Alzheimer\'s genes from AlzGene database.',
            category: 'data'
        },
        {
            id: '5',
            question: 'How do I interpret the methylation delta?',
            answer: 'Methylation delta (Δβ) represents the difference in methylation levels between Alzheimer\'s cases and controls. Positive values indicate hypermethylation in AD, negative values indicate hypomethylation. |Δβ| > 0.2 is generally considered biologically significant.',
            category: 'data'
        },
        {
            id: '6',
            question: 'What do "known" and "novel" status mean?',
            answer: '"Known" genes are those with established evidence in Alzheimer\'s literature (from AlzGene database). "Novel" genes are high-scoring predictions from EpiRank that lack prior AD associations - these represent potential new discoveries.',
            category: 'getting-started'
        },
        {
            id: '7',
            question: 'How often is the model retrained?',
            answer: 'The model is retrained monthly with new data from public repositories. You can check the last update date in the Model Metrics page.',
            category: 'technical'
        },
        {
            id: '8',
            question: 'Can I export the data?',
            answer: 'Yes, all tables and visualizations can be exported as CSV, JSON, or PNG. Look for the export icon (↓) in the top-right corner of each data panel.',
            category: 'features'
        },
        {
            id: '9',
            question: 'What is SHAP coherence?',
            answer: 'SHAP coherence measures how well the model\'s explanations align with known biological pathways. Higher coherence (0.7+) indicates that top features are biologically meaningful.',
            category: 'technical'
        },
        {
            id: '10',
            question: 'How do I cite EpiRank in my research?',
            answer: 'Please cite: "EpiRank: A Regulatory-Aware Gene Prioritization Platform for Alzheimer\'s Disease" (DOI: 10.1101/2024.01.01.123456)',
            category: 'getting-started'
        }
    ]

    const guides: Guide[] = [
        {
            id: '1',
            title: 'Quick Start Guide',
            description: 'Get up and running with EpiRank in 5 minutes',
            icon: RocketLaunchIcon,
            color: 'blue',
            duration: '5 min',
            level: 'Beginner'
        },
        {
            id: '2',
            title: 'Understanding Rankings',
            description: 'How to interpret the gene leaderboard and scores',
            icon: ChartBarIcon,
            color: 'purple',
            duration: '10 min',
            level: 'Beginner'
        },
        {
            id: '3',
            title: 'Working with SHAP Explanations',
            description: 'Deep dive into feature importance and model transparency',
            icon: AcademicCapIcon,
            color: 'emerald',
            duration: '15 min',
            level: 'Intermediate'
        },
        {
            id: '4',
            title: 'Network Analysis Guide',
            description: 'Exploring gene interactions and network properties',
            icon: ShareIcon,
            color: 'amber',
            duration: '12 min',
            level: 'Intermediate'
        },
        {
            id: '5',
            title: 'Epigenetics Deep Dive',
            description: 'Understanding methylation and histone modifications',
            icon: BeakerIcon,
            color: 'pink',
            duration: '20 min',
            level: 'Advanced'
        },
        {
            id: '6',
            title: 'API Integration',
            description: 'Using EpiRank API in your own applications',
            icon: CommandLineIcon,
            color: 'indigo',
            duration: '15 min',
            level: 'Advanced'
        }
    ]

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Help & Support
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Guides, FAQs, and resources to help you get the most from EpiRank
                    </p>
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
                        placeholder="Search help articles, FAQs, or guides..."
                        className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-slate-500"
                    />
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                {[
                    { id: 'guides', label: 'Guides', icon: BookOpenIcon },
                    { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon },
                    { id: 'contact', label: 'Contact', icon: EnvelopeIcon }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Guides Tab */}
            <AnimatePresence mode="wait">
                {activeTab === 'guides' && (
                    <motion.div
                        key="guides"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {guides.map((guide, index) => {
                                const Icon = guide.icon
                                return (
                                    <motion.div
                                        key={guide.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 cursor-pointer group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-xl bg-${guide.color}-500/20 border border-${guide.color}-500/30`}>
                                                <Icon className={`w-6 h-6 text-${guide.color}-400`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                        {guide.title}
                                                    </h3>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${guide.level === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        guide.level === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                                                            'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {guide.level}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 mb-3">{guide.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">{guide.duration}</span>
                                                    <button className="text-xs text-blue-400 hover:text-blue-300">
                                                        Read Guide →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Video Tutorials */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <DocumentTextIcon className="w-5 h-5 text-purple-400" />
                                Video Tutorials
                            </h2>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="relative group cursor-pointer">
                                        <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/50 transition-colors">
                                                <span className="text-white text-2xl">▶</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-white mt-2">Tutorial Video {i}</p>
                                        <p className="text-xs text-slate-500">5:3{i} min</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                    <motion.div
                        key="faq"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                    >
                        {filteredFAQs.map((faq) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${faq.category === 'getting-started' ? 'bg-blue-500/20 text-blue-400' :
                                            faq.category === 'features' ? 'bg-purple-500/20 text-purple-400' :
                                                faq.category === 'data' ? 'bg-emerald-500/20 text-emerald-400' :
                                                    'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {faq.category}
                                        </span>
                                        <span className="text-white font-medium">{faq.question}</span>
                                    </div>
                                    {expandedFAQ === faq.id ? (
                                        <ChevronUpIcon className="w-5 h-5 text-slate-400" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5 text-slate-400" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {expandedFAQ === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-4"
                                        >
                                            <div className="pt-2 border-t border-white/10">
                                                <p className="text-sm text-slate-300 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                                <button
                                                    onClick={() => copyToClipboard(faq.answer, faq.id)}
                                                    className="mt-3 flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition-colors"
                                                >
                                                    {copied === faq.id ? (
                                                        <>
                                                            <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                                                            <span className="text-emerald-400">Copied!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ClipboardDocumentIcon className="w-4 h-4" />
                                                            <span>Copy answer</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                    <motion.div
                        key="contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {/* Contact Form */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                                Send us a message
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white placeholder-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white placeholder-slate-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Subject</label>
                                    <select className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white">
                                        <option>Technical Support</option>
                                        <option>Feature Request</option>
                                        <option>Bug Report</option>
                                        <option>Collaboration Inquiry</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full bg-black/30 border border-white/20 rounded-lg p-2 text-white placeholder-slate-500"
                                    />
                                </div>

                                <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <ChatBubbleLeftIcon className="w-5 h-5 text-emerald-400" />
                                    Live Chat
                                </h2>
                                <p className="text-sm text-slate-300 mb-4">
                                    Our support team is available Monday-Friday, 9am-5pm EST.
                                </p>
                                <button className="w-full py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                                    Start Live Chat
                                </button>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <DocumentDuplicateIcon className="w-5 h-5 text-purple-400" />
                                    Documentation
                                </h2>
                                <p className="text-sm text-slate-300 mb-4">
                                    Check our comprehensive documentation for detailed guides and API reference.
                                </p>
                                <button className="w-full py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors">
                                    View Documentation
                                </button>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <AcademicCapIcon className="w-5 h-5 text-amber-400" />
                                    Research Collaboration
                                </h2>
                                <p className="text-sm text-slate-300 mb-4">
                                    Interested in collaborating? We're open to research partnerships.
                                </p>
                                <button className="w-full py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 hover:bg-amber-500/30 transition-colors">
                                    Contact Research Team
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Links */}
            <div className="grid grid-cols-4 gap-4 pt-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <CpuChipIcon className="w-5 h-5 text-blue-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">System Status</h3>
                    <p className="text-xs text-slate-500 mt-1">All systems operational</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <RocketLaunchIcon className="w-5 h-5 text-purple-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">What's New</h3>
                    <p className="text-xs text-slate-500 mt-1">v1.2.0 released</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <ShieldCheckIcon className="w-5 h-5 text-emerald-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">Security</h3>
                    <p className="text-xs text-slate-500 mt-1">Privacy & Terms</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <ArrowPathIcon className="w-5 h-5 text-amber-400 mb-2" />
                    <h3 className="text-sm font-medium text-white">Updates</h3>
                    <p className="text-xs text-slate-500 mt-1">Last updated: Mar 2, 2026</p>
                </div>
            </div>
        </div>
    )
}