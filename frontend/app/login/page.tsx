'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Mail, Lock, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { authAPI } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(formData);
            const { user, accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));

            const role = user.role.toLowerCase();
            router.push(`/dashboard/${role}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getRoleConfig = () => {
        const configs = {
            admin: {
                title: 'Administrator Portal',
                subtitle: 'Complete system management',
            },
            teacher: {
                title: 'Teacher Portal',
                subtitle: 'Manage your classes',
            },
            student: {
                title: 'Student Portal',
                subtitle: 'Track your progress',
            },
            parent: {
                title: 'Parent Portal',
                subtitle: 'Monitor your children',
            },
        };
        return configs[roleParam?.toLowerCase() as keyof typeof configs] || configs.admin;
    };

    const config = getRoleConfig();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 animate-fade-in">
                <div className="w-full max-w-md">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-12 transition-colors hover:gap-3">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="mb-10 animate-slide-down">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-slate-900">BrokenShell</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">{config.title}</h1>
                        <p className="text-slate-600">{config.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up">{/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-shake">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="label">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input pl-11"
                                    placeholder="you@school.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="input pl-11 pr-12"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-2 focus:ring-slate-900 cursor-pointer"
                                />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                            </label>
                            <button type="button" className="font-medium text-slate-900 hover:text-slate-700 transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-5 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 mb-1.5">Demo Credentials</p>
                                <p className="text-xs text-slate-600 mb-1">
                                    <span className="font-medium">Admin:</span> admin@school.com / admin123
                                </p>
                                <p className="text-xs text-slate-500">
                                    Try other roles: teacher, student, parent
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 to-slate-800 items-center justify-center p-12 animate-slide-in-right">
                <div className="max-w-md">
                    <div className="mb-10">
                        <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 shadow-xl">
                            <GraduationCap className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                            School management made simple
                        </h2>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Everything you need to run your educational institution efficiently and effectively.
                        </p>
                    </div>
                    
                    <div className="space-y-5">
                        <div className="flex items-start gap-4 text-white group">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/20 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold mb-1">Real-time tracking</p>
                                <p className="text-sm text-slate-400">Monitor attendance and performance instantly</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-white group">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/20 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold mb-1">Automated workflows</p>
                                <p className="text-sm text-slate-400">Reduce manual work with smart automation</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-white group">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/20 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold mb-1">Secure & reliable</p>
                                <p className="text-sm text-slate-400">Enterprise-grade security for your data</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
