
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'), // Replace with your actual domain in Vercel/Netlify
  title: {
    default: 'Healthsyntra - Your Intelligent Health Companion',
    template: '%s | Healthsyntra',
  },
  description: 'Get AI-powered symptom analysis, track your health journey, and schedule appointments seamlessly with Healthsyntra.',
  keywords: ['health AI', 'symptom checker', 'medical assistant', 'AI diagnosis', 'health tracking', 'appointment scheduling', 'pricing'],
  openGraph: {
    title: 'Healthsyntra - Your Intelligent Health Companion',
    description: 'AI-powered symptom analysis, health tracking, and appointment scheduling.',
    url: '/', // Or specific URL for the page
    siteName: 'Healthsyntra',
    images: [
      {
        url: '/Healthsyntra.jpg', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Healthsyntra',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthsyntra - Your Intelligent Health Companion',
    description: 'AI-powered symptom analysis, health tracking, and appointment scheduling.',
    // site: '@yourtwitterhandle', // Optional: your Twitter handle
    // creator: '@creatorhandle', // Optional: content creator's Twitter handle
    images: ['/Healthsyntra.jpg'], // Replace with your actual Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

