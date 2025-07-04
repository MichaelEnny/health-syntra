import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { name: 'Twitter', icon: Twitter, href: '#' },
        { name: 'LinkedIn', icon: Linkedin, href: '#' },
        { name: 'Facebook', icon: Facebook, href: '#' },
    ];

    const productLinks = [
        { name: 'Features', href: '/#features' },
        { name: 'How It Works', href: '/#how-it-works' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'Testimonials', href: '/#testimonials' },
    ];

    const legalLinks = [
        { name: 'Terms of Service', href: '#' }, // Placeholder link
        { name: 'Privacy Policy', href: '#' }, // Placeholder link
    ];

    const getStartedLinks = [
        { name: 'Login', href: '/login' },
        { name: 'Sign Up', href: '/register' },
        { name: 'Analyze Symptoms', href: '/analyze' },
    ];

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto py-12 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Logo and App Name */}
                    <div className="space-y-4 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/logo.png" alt="Healthsyntra Logo" width={80} height={80} />
                            <span className="font-bold text-xl">Health Syntra</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Your intelligent health companion.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary">
                                    <social.icon className="h-5 w-5" />
                                    <span className="sr-only">{social.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get Started Links */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold mb-4">Get Started</h3>
                        <ul className="space-y-3">
                            {getStartedLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Healthsyntra. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md">
                        Disclaimer: This tool is for informational purposes only and is not a substitute for professional medical advice.
                    </p>
                </div>
            </div>
        </footer>
    );
}