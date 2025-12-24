import Link from 'next/link'
import { GraduationCap, Users, BookOpen, Calendar, DollarSign, BarChart3 } from 'lucide-react'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary-600 p-4 rounded-2xl shadow-lg">
                            <GraduationCap className="w-16 h-16 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        School Management System
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A digital nervous system for educational institutions - Manage students, teachers, attendance, fees, and more
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <FeatureCard
                        icon={<Users className="w-8 h-8" />}
                        title="Student Management"
                        description="Comprehensive student profiles with attendance, grades, and parent information"
                        color="bg-blue-500"
                    />
                    <FeatureCard
                        icon={<BookOpen className="w-8 h-8" />}
                        title="Academic Tracking"
                        description="Track homework, assignments, exams, and results efficiently"
                        color="bg-purple-500"
                    />
                    <FeatureCard
                        icon={<Calendar className="w-8 h-8" />}
                        title="Attendance System"
                        description="Real-time attendance marking and monitoring for all classes"
                        color="bg-green-500"
                    />
                    <FeatureCard
                        icon={<DollarSign className="w-8 h-8" />}
                        title="Fee Management"
                        description="Automated fee collection, receipts, and payment tracking"
                        color="bg-yellow-500"
                    />
                    <FeatureCard
                        icon={<Users className="w-8 h-8" />}
                        title="Parent Portal"
                        description="Keep parents informed with real-time updates and notifications"
                        color="bg-pink-500"
                    />
                    <FeatureCard
                        icon={<BarChart3 className="w-8 h-8" />}
                        title="Analytics Dashboard"
                        description="Powerful insights and reports for data-driven decisions"
                        color="bg-indigo-500"
                    />
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Choose your role to access the system
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/login?role=admin" className="btn-primary">
                                Admin Login
                            </Link>
                            <Link href="/login?role=teacher" className="btn-secondary">
                                Teacher Login
                            </Link>
                            <Link href="/login?role=student" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                Student Login
                            </Link>
                            <Link href="/login?role=parent" className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                Parent Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 text-center text-gray-500 text-sm">
                    <p>© 2024 School Management System. Built with Next.js, Express, and PostgreSQL.</p>
                </footer>
            </div>
        </main>
    )
}

function FeatureCard({
    icon,
    title,
    description,
    color
}: {
    icon: React.ReactNode
    title: string
    description: string
    color: string
}) {
    return (
        <div className="card hover:shadow-xl transition-shadow duration-300">
            <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}
