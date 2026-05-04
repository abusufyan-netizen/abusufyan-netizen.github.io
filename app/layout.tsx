import React from 'react'
import './globals.css'

export const metadata = {
  title: 'WebToolkit Pro - Free Online Developer Tools',
  description: 'Free online web developer tools and utilities',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {children}
          <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-gray-400">
                &copy; 2024 WebToolkit Pro. Free online developer tools.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}