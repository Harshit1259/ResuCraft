import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, FileText, Download } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Company Name */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            Resume
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Craft</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">Build stunning resumes that get you hired</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <FileText className="w-8 h-8 text-yellow-300 mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Professional Templates</h3>
            <p className="text-white/80 text-sm">Choose from 6 stunning templates</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Sparkles className="w-8 h-8 text-pink-300 mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Easy to Use</h3>
            <p className="text-white/80 text-sm">Simple form-based interface</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Download className="w-8 h-8 text-blue-300 mb-3 mx-auto" />
            <h3 className="text-white font-semibold mb-2">Instant Download</h3>
            <p className="text-white/80 text-sm">Get your PDF resume instantly</p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/form">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Building Resume
          </Button>
        </Link>

        {/* Stats */}
        <div className="mt-16 flex items-center space-x-8 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-sm">Resumes Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">95%</div>
            <div className="text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm">Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}
