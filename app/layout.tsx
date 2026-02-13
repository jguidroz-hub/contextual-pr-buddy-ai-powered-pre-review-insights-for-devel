import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Contextual PR Buddy - AI-powered pre-review insights for developers',
  description: 'Value Proposition: Provides developers with automated, context-aware suggestions and potential issues *before* submitting a pull request, ensuring higher code quality and faster review cycles for dev teams.

Target Customer: Software development teams, engineering managers, and individual developers in small to medium-sized tech companies.

---
Category: Developer Tools
Target Market: Software development teams, engineering managers, and individual developers in small to medium-sized tech companies.
Source Hypothesis ID: a6a274f0-962f-49d7-ac83-f9022f04c641
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">Contextual PR Buddy - AI-powered pre-review insights for developers</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
