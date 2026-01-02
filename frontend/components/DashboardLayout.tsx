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
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-slate-900 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 border-b border-slate-200 flex items-center px-6">
                        <Link href={`/dashboard/${role}`} className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-slate-900">BrokenShell</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {getNavItems().map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 hover:text-slate-900 text-sm font-medium"
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Info */}
                    <div className="p-4 border-t border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-semibold text-slate-700">
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-40">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 -ml-2"
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
