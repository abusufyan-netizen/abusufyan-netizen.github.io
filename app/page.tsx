import React from 'react'
import Link from 'next/link'
import { 
  FileJson, Key, FileText, Palette, Hash, Type, Clock, Binary, Shield, Code, 
  Ruler, Shuffle, FileCode, Globe, ArrowRight, Sparkles, Zap, Users, Star, Share2
} from 'lucide-react'
import Newsletter from '@/components/sections/Newsletter'

const featuredTools = [
  { name: 'JSON Formatter', icon: FileJson, href: '/tools/json-formatter', color: 'from-blue-500 to-blue-600' },
  { name: 'Password Generator', icon: Key, href: '/tools/password-generator', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Base64 Encoder', icon: FileText, href: '/tools/base64-encoder', color: 'from-purple-500 to-purple-600' },
  { name: 'Color Picker', icon: Palette, href: '/tools/color-picker', color: 'from-pink-500 to-pink-600' },
  { name: 'Hash Generator', icon: Shield, href: '/tools/hash-generator', color: 'from-slate-500 to-slate-600' },
  { name: 'UUID Generator', icon: Shuffle, href: '/tools/uuid-generator', color: 'from-lime-600 to-lime-700' },
  { name: 'Word Counter', icon: Hash, href: '/tools/word-counter', color: 'from-teal-500 to-teal-600' },
  { name: 'Social Preview Tester', icon: Share2, href: '/tools/social-preview-tester', color: 'from-blue-600 to-blue-800' },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-24 lg:py-32">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="hero-blob absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-30 dark:opacity-20" style={{animation: 'float 8s ease-in-out infinite'}} />
          <div className="hero-blob absolute top-40 right-10 w-96 h-96 bg-purple-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-30 dark:opacity-20" style={{animation: 'float 10s ease-in-out infinite reverse'}} />
          <div className="hero-blob absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-overlay opacity-30 dark:opacity-20" style={{animation: 'float 12s ease-in-out infinite'}} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-blue-100 dark:border-slate-800 rounded-full px-5 py-2 mb-8 text-sm font-medium text-blue-700 dark:text-blue-400 shadow-sm" style={{animation: 'fadeInDown 0.6s ease-out'}}>
            <Sparkles className="w-4 h-4" />
            26+ Free Developer Tools — No Login Required
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight" style={{animation: 'fadeInUp 0.8s ease-out'}}>
            Build Faster with<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              WebToolkit Pro
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed" style={{animation: 'fadeInUp 1s ease-out'}}>
            Premium online tools for web developers and designers. 
            Format JSON, generate passwords, encode data, pick colors — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{animation: 'fadeInUp 1.2s ease-out'}}>
            <Link 
              href="/tools"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-200 dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore All Tools <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-xl font-bold text-lg border border-gray-200 dark:border-slate-800 hover:shadow-lg dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Free Tools', value: '26+', icon: Zap },
            { label: 'Monthly Users', value: '5K+', icon: Users },
            { label: 'Star Rating', value: '4.9', icon: Star },
            { label: 'Lines of Code', value: '10K+', icon: Code },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="py-6 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto h-[90px]">{/* AdSense slot */}</div>
      </div>

      {/* Featured Tools */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Popular Tools</h2>
            <p className="text-lg text-gray-500 dark:text-slate-400 max-w-xl mx-auto">Hand-picked developer essentials used by thousands</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, i) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                <span className="text-sm text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try it free →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:gap-3 transition-all">
              View All 26+ Tools <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="py-6">
        <div className="max-w-3xl mx-auto h-[250px]">{/* AdSense slot */}</div>
      </div>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Why Professionals Choose WebToolkit Pro</h2>
          <p className="text-lg text-gray-500 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
            In an era of cluttered, ad-heavy tool sites, we provide a clean, high-performance environment designed specifically for the modern developer workflow.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lightning Fast Performance</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">
                Every tool in the WebToolkit Pro suite is engineered for speed. By running complex logic directly in your browser using the latest WebAssembly and Edge technologies, we eliminate server-side latency. Whether you're formatting a 10MB JSON file or generating thousands of UUIDs, your results are instant and uninterrupted.
              </p>
            </div>
            <div className="group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Uncompromising Privacy</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">
                Your data is your business. Unlike other platforms that capture your inputs for "analytics," we operate on a strictly zero-data-leakage policy. Your hashes, passwords, and code never leave your browser. We don't use server-side databases for your tool inputs, ensuring your intellectual property remains 100% secure.
              </p>
            </div>
            <div className="group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">🎁</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">100% Free & Open Access</h3>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">
                We believe the best tools should be accessible to everyone. No hidden paywalls, no aggressive sign-up popups, and no usage limits. Our goal is to empower the global developer community with a premium experience that rivals expensive enterprise software, but without the financial barrier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Tool Ecosystem Deep Dive */}
      <section className="py-24 bg-gray-50/50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">A Comprehensive Ecosystem for Modern Engineering</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm uppercase tracking-widest">Formatters & Beautifiers</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">Turn messy, minified data into human-readable masterpieces. Our JSON and JavaScript formatters use advanced AST parsing to ensure syntax integrity while providing multiple indentation styles.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm uppercase tracking-widest">Technical SEO Suite</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">Master the search engine results pages with our specialized SEO utilities. From Robots.txt templates to JSON-LD Schema generators, we provide the technical edge needed to outrank the competition.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm uppercase tracking-widest">Security & Cryptography</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">Generate high-entropy passwords and verify data integrity with industry-standard hashing algorithms including SHA-256 and MD5, all computed securely on your local machine.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 animate-pulse">26+</div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h4>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">Are my data inputs safe?</div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Yes. All processing happens locally in your browser. We never transmit your sensitive strings, passwords, or code snippets to any server.</p>
                </div>
                <div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">Do I need to create an account?</div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Never. WebToolkit Pro is built for speed and anonymity. Use any tool instantly without the friction of a sign-up process.</p>
                </div>
                <div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">Can I use these tools commercially?</div>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Absolutely. All tools and generated assets (passwords, sitemaps, schemas) are yours to use for personal or commercial projects without restriction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 dark:bg-black/20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to Boost Your Workflow?</h2>
          <p className="text-xl text-blue-50 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who use WebToolkit Pro every day to build better, faster, and more securely.
          </p>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-white text-blue-700 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-900/40 hover:-translate-y-1 transition-all duration-300">
            Get Started — It&apos;s Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Newsletter />
    </>
  )
}