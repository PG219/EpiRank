'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    EnvelopeIcon,
    ArrowLeftIcon,
    CheckCircleIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { firebaseAuth } from '@/lib/firebase/client'

const getResetErrorMessage = (error: unknown): string => {
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'Invalid email format.'
            case 'auth/user-not-found':
                return 'No account exists for this email.'
            default:
                return 'Failed to send reset email. Try again.'
        }
    }

    return 'Something went wrong. Please try again.'
}

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            setError('Email is required')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email format')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            await sendPasswordResetEmail(firebaseAuth, email)
            setIsSubmitted(true)
        } catch (err) {
            setError(getResetErrorMessage(err))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-indigo-950/30">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Back to login</span>
                </Link>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                    {!isSubmitted ? (
                        <>
                            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                            <p className="text-sm text-slate-400 mb-6">
                                Enter your email address and we&apos;ll send you instructions to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                                    <div className="relative">
                                        <EnvelopeIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className={`w-full pl-10 pr-4 py-2 bg-black/30 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors ${error ? 'border-red-500' : 'border-white/20'
                                                }`}
                                        />
                                    </div>
                                    {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium disabled:opacity-50 relative overflow-hidden"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                            <span>Sending...</span>
                                        </div>
                                    ) : (
                                        'Send Reset Instructions'
                                    )}
                                </motion.button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircleIcon className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
                            <p className="text-sm text-slate-400 mb-6">
                                We&apos;ve sent password reset instructions to:<br />
                                <span className="text-blue-400 font-medium">{email}</span>
                            </p>
                            <Link
                                href="/login"
                                className="inline-block px-6 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                            >
                                Return to Login
                            </Link>
                        </motion.div>
                    )}
                </div>

                <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500">For security reasons, reset links expire after 24 hours.</p>
                </div>
            </motion.div>
        </div>
    )
}
