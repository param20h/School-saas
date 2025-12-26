'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    GraduationCap,
    LogOut,
    Menu,
    X,
    Home,
    Users,
    Calendar,
    DollarSign,
    BookOpen,
    BarChart3,
    Settings
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'admin' | 'teacher' | 'student' | 'parent';
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login');
            return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Verify role matches
        if (parsedUser.role.toLowerCase() !== role) {
            router.push(`/dashboard/${parsedUser.role.toLowerCase()}`);
        }
    }, [role, router]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.push('/');
    };

    const getRoleColor = () => {
        switch (role) {
            case 'admin':
                return 'bg-blue-600';
            case 'teacher':
                return 'bg-purple-600';
            case 'student':
                return 'bg-green-600';
            case 'parent':
                return 'bg-yellow-600';
            default:
                return 'bg-primary-600';
        }
    };

    const getNavItems = () => {
        const baseItems = [
            { name: 'Dashboard', href: `/dashboard/${role}`, icon: Home },
        ];

        switch (role) {
            case 'admin':
                return [
                    ...baseItems,
                    { name: 'Students', href: `/dashboard/${role}/students`, icon: Users },
                    { name: 'Teachers', href: `/dashboard/${role}/teachers`, icon: Users },
                    { name: 'Classes', href: `/dashboard/${role}/classes`, icon: BookOpen },
                    { name: 'Attendance', href: `/dashboard/${role}/attendance`, icon: Calendar },
                    { name: 'Fees', href: `/dashboard/${role}/fees`, icon: DollarSign },
                    { name: 'Reports', href: `/dashboard/${role}/reports`, icon: BarChart3 },
                    { name: 'Settings', href: `/dashboard/${role}/settings`, icon: Settings },
                ];
            case 'teacher':
                return [
                    ...baseItems,
                    { name: 'My Classes', href: `/dashboard/${role}/classes`, icon: BookOpen },
                    { name: 'Attendance', href: `/dashboard/${role}/attendance`, icon: Calendar },
                    { name: 'Homework', href: `/dashboard/${role}/homework`, icon: BookOpen },
                    { name: 'Results', href: `/dashboard/${role}/results`, icon: BarChart3 },
                ];
            case 'student':
                return [
                    ...baseItems,
                    { name: 'My Attendance', href: `/dashboard/${role}/attendance`, icon: Calendar },
                    { name: 'Homework', href: `/dashboard/${role}/homework`, icon: BookOpen },
                    { name: 'Results', href: `/dashboard/${role}/results`, icon: BarChart3 },
                    { name: 'Fees', href: `/dashboard/${role}/fees`, icon: DollarSign },
                ];
            case 'parent':
                return [
                    ...baseItems,
                    { name: 'Children', href: `/dashboard/${role}/children`, icon: Users },
                    { name: 'Attendance', href: `/dashboard/${role}/attendance`, icon: Calendar },
                    { name: 'Results', href: `/dashboard/${role}/results`, icon: BarChart3 },
                    { name: 'Fees', href: `/dashboard/${role}/fees`, icon: DollarSign },
                ];
            default:
                return baseItems;
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className={`${getRoleColor()} text-white shadow-lg`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden p-2 rounded-md hover:bg-white/10"
                            >
                                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                            <Link href={`/dashboard/${role}`} className="flex items-center gap-2 ml-2 md:ml-0">
                                <GraduationCap className="h-8 w-8" />
                                <span className="font-bold text-xl hidden sm:block">School MS</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs opacity-90 capitalize">{user.role}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out mt-16 md:mt-0`}
                >
                    <nav className="p-4 space-y-2">
                        {getNavItems().map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30 mt-16"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
