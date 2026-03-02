'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon,
    EyeIcon,
    EyeSlashIcon,
    ArrowRightIcon,
    ArrowPathIcon,
    BeakerIcon,
    SparklesIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    browserLocalPersistence,
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { firebaseAuth } from '@/lib/firebase/client'

type PasswordStrength = 'weak' | 'medium' | 'strong' | null

type FormErrors = {
    email: string
    password: string
    confirmPassword: string
    name: string
    form: string
}

const initialErrors: FormErrors = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    form: '',
}

const getAuthErrorMessage = (error: unknown): string => {
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'Invalid email format.'
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Incorrect email or password.'
            case 'auth/email-already-in-use':
                return 'An account already exists with this email.'
            case 'auth/weak-password':
                return 'Use a stronger password (at least 6 characters).'
            case 'auth/popup-closed-by-user':
                return 'Sign-in popup was closed before completion.'
            case 'auth/account-exists-with-different-credential':
                return 'An account exists with a different sign-in method.'
            default:
                return 'Authentication failed. Please try again.'
        }
    }

    if (error instanceof Error && error.message) {
        return error.message
    }

    return 'Something went wrong. Please try again.'
}

export default function LoginPage() {
    const router = useRouter()

    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        institution: '',
    })

    const [errors, setErrors] = useState<FormErrors>(initialErrors)
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(null)

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const checkPasswordStrength = (password: string): PasswordStrength => {
        if (password.length < 6) return 'weak'
        if (password.length < 10) return 'medium'
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            return 'strong'
        }
        return 'medium'
    }

    const resetFormLevelErrors = () => {
        setErrors((prev) => ({ ...prev, form: '' }))
    }

    const createServerSession = async (idToken: string) => {
        const sessionResponse = await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, rememberMe }),
        })

        if (!sessionResponse.ok) {
            let errorMessage = 'Unable to establish authenticated session.'
            try {
                const data = (await sessionResponse.json()) as { error?: string }
                if (data.error) {
                    errorMessage = data.error
                }
            } catch {
                // Response may not be JSON (e.g. unexpected server error page).
            }
            throw new Error(errorMessage)
        }
    }

    const syncUserProfile = async (idToken: string) => {
        const syncResponse = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
                name: formData.name,
                institution: formData.institution,
            }),
        })

        if (!syncResponse.ok) {
            let errorMessage = 'Unable to save user profile.'
            try {
                const data = (await syncResponse.json()) as { error?: string }
                if (data.error) {
                    errorMessage = data.error
                }
            } catch {
                // Response may not be JSON (e.g. unexpected server error page).
            }
            throw new Error(errorMessage)
        }

        try {
            const data = (await syncResponse.json()) as { synced?: boolean; warning?: string }
            if (data.synced === false && data.warning) {
                console.warn(data.warning)
            }
        } catch {
            // Ignore non-JSON success response.
        }
    }

    const completeAuthFlow = async (idToken: string) => {
        await createServerSession(idToken)
        await syncUserProfile(idToken)
        router.push('/dashboard')
        router.refresh()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        resetFormLevelErrors()

        if (name === 'email') {
            setErrors((prev) => ({
                ...prev,
                email: value && !validateEmail(value) ? 'Invalid email format' : '',
            }))
        }

        if (name === 'password') {
            setPasswordStrength(checkPasswordStrength(value))
            setErrors((prev) => ({
                ...prev,
                password: value.length > 0 && value.length < 6 ? 'Password too short' : '',
                confirmPassword:
                    formData.confirmPassword && value !== formData.confirmPassword
                        ? 'Passwords do not match'
                        : '',
            }))
        }

        if (name === 'confirmPassword') {
            setErrors((prev) => ({
                ...prev,
                confirmPassword: value !== formData.password ? 'Passwords do not match' : '',
            }))
        }

        if (name === 'name') {
            setErrors((prev) => ({
                ...prev,
                name: value.trim().length === 0 ? 'Name is required' : '',
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors(initialErrors)

        if (!validateEmail(formData.email)) {
            setErrors((prev) => ({ ...prev, email: 'Invalid email format' }))
            return
        }

        if (formData.password.length < 6) {
            setErrors((prev) => ({ ...prev, password: 'Password too short' }))
            return
        }

        if (!isLogin) {
            if (!formData.name.trim()) {
                setErrors((prev) => ({ ...prev, name: 'Name is required' }))
                return
            }

            if (formData.password !== formData.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }))
                return
            }

            if (!acceptTerms) {
                setErrors((prev) => ({ ...prev, form: 'Please accept terms to continue.' }))
                return
            }
        }

        setIsLoading(true)

        try {
            await setPersistence(
                firebaseAuth,
                rememberMe ? browserLocalPersistence : browserSessionPersistence
            )

            let idToken = ''

            if (isLogin) {
                const credential = await signInWithEmailAndPassword(
                    firebaseAuth,
                    formData.email,
                    formData.password
                )
                idToken = await credential.user.getIdToken()
            } else {
                const credential = await createUserWithEmailAndPassword(
                    firebaseAuth,
                    formData.email,
                    formData.password
                )

                if (formData.name.trim()) {
                    await updateProfile(credential.user, { displayName: formData.name.trim() })
                }

                idToken = await credential.user.getIdToken(true)
            }

            await completeAuthFlow(idToken)
        } catch (error) {
            setErrors((prev) => ({ ...prev, form: getAuthErrorMessage(error) }))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialLogin = async (providerName: 'google' | 'github') => {
        setIsLoading(true)
        setErrors(initialErrors)

        try {
            await setPersistence(firebaseAuth, browserLocalPersistence)

            const provider =
                providerName === 'google'
                    ? new GoogleAuthProvider()
                    : new GithubAuthProvider()

            const credential = await signInWithPopup(firebaseAuth, provider)
            const idToken = await credential.user.getIdToken()

            await createServerSession(idToken)

            const syncResponse = await fetch('/api/auth/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    name: credential.user.displayName ?? '',
                    institution: '',
                }),
            })

            if (!syncResponse.ok) {
                let errorMessage = 'Unable to save social account profile.'
                try {
                    const data = (await syncResponse.json()) as { error?: string }
                    if (data.error) {
                        errorMessage = data.error
                    }
                } catch {
                    // Response may not be JSON (e.g. unexpected server error page).
                }
                throw new Error(errorMessage)
            }

            try {
                const data = (await syncResponse.json()) as { synced?: boolean; warning?: string }
                if (data.synced === false && data.warning) {
                    console.warn(data.warning)
                }
            } catch {
                // Ignore non-JSON success response.
            }

            router.push('/dashboard')
            router.refresh()
        } catch (error) {
            setErrors((prev) => ({ ...prev, form: getAuthErrorMessage(error) }))
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-6xl flex rounded-3xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-xl"
            >
                <div className="hidden lg:flex flex-col w-1/2 p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-r border-white/20">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <SparklesIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            EpiRank
                        </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Welcome Back to<br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Epigenetic Discovery
                            </span>
                        </h2>

                        <p className="text-slate-300 text-lg mb-8">
                            Uncover regulatory patterns in Alzheimer&apos;s disease with explainable AI.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: BeakerIcon, text: 'Regulatory-aware gene prioritization' },
                                { icon: SparklesIcon, text: 'SHAP-based explainability' },
                                { icon: ShieldCheckIcon, text: 'Validated against known targets' },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.3 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="p-2 rounded-lg bg-white/10 border border-white/20">
                                        <feature.icon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="text-slate-300">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 text-sm text-slate-500">© 2026 EpiRank. All rights reserved.</div>
                </div>

                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <button
                                onClick={() => {
                                    setIsLogin(true)
                                    setErrors(initialErrors)
                                }}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${isLogin
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => {
                                    setIsLogin(false)
                                    setErrors(initialErrors)
                                }}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${!isLogin
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Create Account
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? 'login' : 'signup'}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className={`w-full pl-10 pr-4 py-2 bg-black/30 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-white/20'
                                                    }`}
                                                required={!isLogin}
                                            />
                                        </div>
                                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                                    </div>
                                )}

                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Institution (Optional)</label>
                                        <input
                                            type="text"
                                            name="institution"
                                            value={formData.institution}
                                            onChange={handleInputChange}
                                            placeholder="University or Research Center"
                                            className="w-full px-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                                    <div className="relative">
                                        <EnvelopeIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="you@example.com"
                                            className={`w-full pl-10 pr-4 py-2 bg-black/30 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-white/20'
                                                }`}
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Password</label>
                                    <div className="relative">
                                        <LockClosedIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            className={`w-full pl-10 pr-12 py-2 bg-black/30 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-white/20'
                                                }`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-2.5"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="w-5 h-5 text-slate-400" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5 text-slate-400" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}

                                    {!isLogin && passwordStrength && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 h-1">
                                                {['weak', 'medium', 'strong'].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`flex-1 h-full rounded-full transition-colors ${passwordStrength === level
                                                            ? level === 'weak'
                                                                ? 'bg-red-500'
                                                                : level === 'medium'
                                                                    ? 'bg-amber-500'
                                                                    : 'bg-emerald-500'
                                                            : 'bg-slate-600'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p
                                                className={`text-xs mt-1 ${passwordStrength === 'weak'
                                                    ? 'text-red-400'
                                                    : passwordStrength === 'medium'
                                                        ? 'text-amber-400'
                                                        : 'text-emerald-400'
                                                    }`}
                                            >
                                                {passwordStrength === 'weak' && 'Weak password'}
                                                {passwordStrength === 'medium' && 'Medium strength'}
                                                {passwordStrength === 'strong' && 'Strong password'}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Confirm Password</label>
                                        <div className="relative">
                                            <LockClosedIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className={`w-full pl-10 pr-4 py-2 bg-black/30 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                                                    }`}
                                                required={!isLogin}
                                            />
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                )}

                                {isLogin && (
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="rounded bg-black/30 border-white/20"
                                            />
                                            <span className="text-sm text-slate-300">Remember me</span>
                                        </label>
                                        <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                                            Forgot password?
                                        </Link>
                                    </div>
                                )}

                                {!isLogin && (
                                    <label className="flex items-start gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={acceptTerms}
                                            onChange={(e) => setAcceptTerms(e.target.checked)}
                                            className="mt-1 rounded bg-black/30 border-white/20"
                                            required
                                        />
                                        <span className="text-sm text-slate-300">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                                                Terms of Service
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </label>
                                )}

                                {errors.form && (
                                    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
                                        {errors.form}
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isLoading || (!isLogin && !acceptTerms)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    )}
                                </motion.button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-2 text-slate-400">or continue with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin('google')}
                                        disabled={isLoading}
                                        className="flex items-center justify-center gap-2 py-2 bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20 transition-colors disabled:opacity-50"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        <span className="text-sm">Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin('github')}
                                        disabled={isLoading}
                                        className="flex items-center justify-center gap-2 py-2 bg-white/10 border border-white/20 rounded-lg text-slate-300 hover:bg-white/20 transition-colors disabled:opacity-50"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.699-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="text-sm">GitHub</span>
                                    </button>
                                </div>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
