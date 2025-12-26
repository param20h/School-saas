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
                gradient: 'from-blue-500 to-blue-600',
                lightBg: 'bg-blue-50',
                lightBorder: 'border-blue-100',
                title: 'Administrator Portal',
                subtitle: 'Manage your institution',
            },
            teacher: {
                gradient: 'from-purple-500 to-purple-600',
                lightBg: 'bg-purple-50',
                lightBorder: 'border-purple-100',
                title: 'Teacher Portal',
                subtitle: 'Manage your classes',
            },
            student: {
                gradient: 'from-green-500 to-green-600',
                lightBg: 'bg-green-50',
                lightBorder: 'border-green-100',
                title: 'Student Portal',
                subtitle: 'Track your progress',
            },
            parent: {
                gradient: 'from-yellow-500 to-yellow-600',
                lightBg: 'bg-yellow-50',
                lightBorder: 'border-yellow-100',
                title: 'Parent Portal',
                subtitle: 'Monitor your children',
            },
        };
        return configs[roleParam?.toLowerCase() as keyof typeof configs] || configs.admin;
    };

    const config = getRoleConfig();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-20 right-20 w-72 h-72 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-10`}></div>
                <div className={`absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-10`}></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${config.gradient} p-8 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/5"></div>
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">EduManage</h1>
                                    <p className="text-white/80 text-sm">School Management</p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold mb-2">{config.title}</h2>
                            <p className="text-white/90">{config.subtitle}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-shake">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-800 font-medium">{error}</p>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                        placeholder="your.email@school.com"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                                </label>
                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r ${config.gradient} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none relative overflow-hidden group`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In to Dashboard'
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className={`mt-6 p-4 ${config.lightBg} border ${config.lightBorder} rounded-xl`}>
                            <div className="flex items-start gap-3">
                                <div className={`bg-gradient-to-br ${config.gradient} p-2 rounded-lg`}>
                                    <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-gray-700 mb-2">Demo Credentials</p>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-gray-500">Email:</span>
                                            <p className="font-mono font-medium text-gray-900">{roleParam}@school.com</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Password:</span>
                                            <p className="font-mono font-medium text-gray-900">{roleParam}123</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Need help?{' '}
                    <button className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                        Contact Support
                    </button>
                </p>
            </div>
        </div>
    );
}
