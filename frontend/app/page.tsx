import Link from 'next/link'
import { GraduationCap, Users, BookOpen, Calendar, DollarSign, BarChart3, ArrowRight, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-slate-200/60 bg-white sticky top-0 z-50">
                <div className="container mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-slate-900 tracking-tight">BrokenShell</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                Sign In
                            </Link>
                            <Link href="/login?role=admin" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Asymmetric Layout */}
            <section className="relative container mx-auto px-6 pt-24 pb-16">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 rounded-full mb-8">
                            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                            <span className="text-sm text-slate-700">Modern School Management</span>
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                            Run your school with precision
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                            Complete administrative control. Real-time insights. Automated workflows that actually work.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mb-16">
                            <Link href="/login?role=admin" className="group px-7 py-3.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 flex items-center gap-2.5">
                                Get Started Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link href="#demo" className="px-7 py-3.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
                                View Demo
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                            <div>
                                <p className="text-3xl font-bold text-slate-900 mb-1">1,234</p>
                                <p className="text-sm text-slate-600">Students Managed</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900 mb-1">500+</p>
                                <p className="text-sm text-slate-600">Schools Trust Us</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-slate-900 mb-1">99.9%</p>
                                <p className="text-sm text-slate-600">Uptime</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-5">
                        <div className="relative">
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-4">
                                <div className="bg-white border border-slate-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-slate-600">Today's Attendance</span>
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Live</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-slate-900">94.2%</span>
                                        <span className="text-sm text-emerald-600">+2.1%</span>
                                    </div>
                                    <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{width: '94.2%'}}></div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <Users className="w-5 h-5 text-slate-400 mb-2" />
                                        <p className="text-2xl font-bold text-slate-900">1,156</p>
                                        <p className="text-xs text-slate-600">Present</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                                        <Calendar className="w-5 h-5 text-slate-400 mb-2" />
                                        <p className="text-2xl font-bold text-slate-900">78</p>
                                        <p className="text-xs text-slate-600">Absent</p>
                                    </div>
                                </div>
                                
                                <div className="bg-white border border-slate-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium text-slate-600">Fee Collection</span>
                                        <DollarSign className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-3xl font-bold text-slate-900">₹24.8L</span>
                                        <span className="text-sm text-slate-500">/ ₹27.2L</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-900 rounded-full" style={{width: '91%'}}></div>
                                        </div>
                                        <span>91%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Everything you need</h2>
                        <p className="text-lg text-slate-600">
                            Powerful features designed for modern educational institutions
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: 'Student Management',
                                description: 'Complete student profiles with academic records and parent information',
                            },
                            {
                                icon: Calendar,
                                title: 'Smart Attendance',
                                description: 'Real-time tracking with automated notifications',
                            },
                            {
                                icon: DollarSign,
                                title: 'Fee Management',
                                description: 'Automated collection, receipts, and payment reminders',
                            },
                            {
                                icon: BookOpen,
                                title: 'Academic Tracking',
                                description: 'Monitor homework, assignments, and exam results',
                            },
                            {
                                icon: BarChart3,
                                title: 'Analytics & Reports',
                                description: 'Detailed insights for data-driven decisions',
                            },
                            {
                                icon: Shield,
                                title: 'Secure & Reliable',
                                description: 'Enterprise-grade security with 99.9% uptime',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="group bg-white border border-slate-200 rounded-xl p-7 hover:shadow-lg hover:border-slate-300 transition-all">
                                <feature.icon className="w-6 h-6 text-slate-700 mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Role-Based Access Section */}
            <section className="container mx-auto px-6 py-24">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Access for everyone</h2>
                    <p className="text-lg text-slate-600">Tailored portals for each user type</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { role: 'admin', name: 'Administrator', desc: 'Full system control' },
                        { role: 'teacher', name: 'Teacher', desc: 'Manage classes' },
                        { role: 'student', name: 'Student', desc: 'Track progress' },
                        { role: 'parent', name: 'Parent', desc: 'Monitor children' },
                    ].map((item) => (
                        <Link
                            key={item.role}
                            href={`/login?role=${item.role}`}
                            className="group bg-white border-2 border-slate-200 rounded-xl p-7 hover:border-slate-900 hover:shadow-lg transition-all"
                        >
                            <GraduationCap className="w-8 h-8 text-slate-700 mb-5" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-1.5">{item.name}</h3>
                            <p className="text-slate-600 text-sm mb-6">{item.desc}</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                Sign In
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-slate-900" />
                                </div>
                                <span className="text-lg font-semibold">BrokenShell</span>
                            </div>
                            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                                Modern school management platform trusted by educational institutions worldwide.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm">Product</h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm">Company</h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400">© 2026 BrokenShell. All rights reserved.</p>
                        <div className="flex gap-6 text-sm text-slate-400">
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
