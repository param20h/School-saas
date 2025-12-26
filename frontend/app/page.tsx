import Link from 'next/link'
import { GraduationCap, Users, BookOpen, Calendar, DollarSign, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">BrokenShell</h1>
                                <p className="text-xs text-gray-500">School Management</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                Sign In
                            </Link>
                            <Link href="/login?role=admin" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-200 transition-all">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-indigo-600">Trusted by 500+ Schools</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Manage Your School
                            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Effortlessly
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            A complete digital platform for educational institutions. Track attendance, manage fees, monitor performance, and keep parents informed—all in one place.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/login?role=admin" className="group px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-indigo-200 transition-all flex items-center gap-2">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all">
                                Watch Demo
                            </button>
                        </div>
                        <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-100">
                            <div>
                                <p className="text-3xl font-bold text-gray-900">1,234</p>
                                <p className="text-sm text-gray-600">Active Students</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">56</p>
                                <p className="text-sm text-gray-600">Teachers</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">98%</p>
                                <p className="text-sm text-gray-600">Satisfaction</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-3xl blur-3xl opacity-30"></div>
                        <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-indigo-100/50">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">1.2K</p>
                                    <p className="text-sm text-gray-600">Students</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-purple-100/50">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">94%</p>
                                    <p className="text-sm text-gray-600">Attendance</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-green-100/50">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">A+</p>
                                    <p className="text-sm text-gray-600">Avg Grade</p>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-yellow-100/50">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                                        <DollarSign className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">₹2.4L</p>
                                    <p className="text-sm text-gray-600">Collected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed specifically for educational institutions
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Users,
                                title: 'Student Management',
                                description: 'Complete student profiles with academic records, attendance history, and parent information',
                                color: 'from-blue-500 to-blue-600',
                            },
                            {
                                icon: Calendar,
                                title: 'Smart Attendance',
                                description: 'Real-time attendance tracking with automated notifications to parents',
                                color: 'from-green-500 to-green-600',
                            },
                            {
                                icon: DollarSign,
                                title: 'Fee Management',
                                description: 'Automated fee collection, receipts, and payment reminders',
                                color: 'from-yellow-500 to-yellow-600',
                            },
                            {
                                icon: BookOpen,
                                title: 'Academic Tracking',
                                description: 'Monitor homework, assignments, and exam results in one place',
                                color: 'from-purple-500 to-purple-600',
                            },
                            {
                                icon: BarChart3,
                                title: 'Analytics & Reports',
                                description: 'Detailed insights and reports for data-driven decisions',
                                color: 'from-indigo-500 to-indigo-600',
                            },
                            {
                                icon: Users,
                                title: 'Parent Portal',
                                description: 'Keep parents engaged with real-time updates and notifications',
                                color: 'from-pink-500 to-pink-600',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent">
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Role-Based Access Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Everyone</h2>
                    <p className="text-xl text-gray-600">Choose your role to get started</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { role: 'admin', name: 'Administrator', color: 'from-blue-500 to-blue-600', desc: 'Full system control' },
                        { role: 'teacher', name: 'Teacher', color: 'from-purple-500 to-purple-600', desc: 'Manage classes' },
                        { role: 'student', name: 'Student', color: 'from-green-500 to-green-600', desc: 'Track progress' },
                        { role: 'parent', name: 'Parent', color: 'from-yellow-500 to-yellow-600', desc: 'Monitor children' },
                    ].map((item) => (
                        <Link
                            key={item.role}
                            href={`/login?role=${item.role}`}
                            className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                            <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                            <p className="text-gray-600 mb-6">{item.desc}</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:gap-3 transition-all">
                                Sign In
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold">EduManage</p>
                                <p className="text-sm text-gray-400">School Management System</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            © 2024 EduManage. Built with Next.js, Express & MongoDB.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
