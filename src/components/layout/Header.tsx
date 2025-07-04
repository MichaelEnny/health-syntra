
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { LogOut, LayoutDashboard, Activity, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


export default function Header() {
    const { isAuthenticated, logout, isLoading, currentUser } = useAuth();
    const pathname = usePathname();

    const isLandingPage = pathname === '/';

    const landingNavItems = [
        { href: '/#features', label: 'Features' },
        { href: '/#how-it-works', label: 'How It Works' },
        { href: '/#pricing', label: 'Pricing' },
        { href: '/#testimonials', label: 'Testimonials' },
    ];

    const appNavItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/analyze', label: 'Symptom Checker', icon: Activity, requiresAuth: true },
    ];

    const navItems = isLandingPage ? landingNavItems : appNavItems;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-auto flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/logo.png" alt="Healthsyntra Logo" width={100} height={100} />
                        <span className="font-bold text-lg">Health Syntra</span>
                    </Link>
                    <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                        {navItems.map((item) => {
                            // @ts-ignore
                            if (item.requiresAuth && !isAuthenticated) {
                                return null;
                            }

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "transition-colors hover:text-primary",
                                        isLandingPage ? "text-foreground/60" :
                                            (pathname === item.href ? "text-primary" : "text-foreground/60")
                                    )}
                                >
                                    {/* @ts-ignore */}
                                    {item.icon && <item.icon className="inline-block h-4 w-4 mr-1 mb-0.5" />}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center justify-end space-x-2">
                    {!isLoading && (
                        isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="rounded-full">
                                        <Avatar>
                                            <AvatarFallback>
                                                <User className="h-5 w-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">My Account</p>
                                            <p className="text-xs leading-none text-muted-foreground truncate">
                                                {currentUser?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="hidden items-center space-x-1 md:flex">
                                <Button asChild variant="ghost">
                                    <Link href="/login">
                                        Login
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">
                                        Sign Up
                                    </Link>
                                </Button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}
