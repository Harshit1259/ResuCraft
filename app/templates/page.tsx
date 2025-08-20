"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and modern design perfect for tech roles",
    color: "from-purple-500 to-pink-500",
    preview: "bg-gradient-to-br from-purple-100 to-pink-100",
  },
  {
    id: 2,
    name: "Creative Designer",
    description: "Bold and creative layout for design professionals",
    color: "from-pink-500 to-violet-500",
    preview: "bg-gradient-to-br from-pink-100 to-violet-100",
  },
  {
    id: 3,
    name: "Executive Elite",
    description: "Sophisticated template for senior positions",
    color: "from-violet-500 to-blue-500",
    preview: "bg-gradient-to-br from-violet-100 to-blue-100",
  },
  {
    id: 4,
    name: "Minimalist Pro",
    description: "Simple and elegant design that stands out",
    color: "from-blue-500 to-purple-500",
    preview: "bg-gradient-to-br from-blue-100 to-purple-100",
  },
  {
    id: 5,
    name: "Dynamic Impact",
    description: "Eye-catching template for creative industries",
    color: "from-purple-500 to-violet-500",
    preview: "bg-gradient-to-br from-purple-100 to-violet-100",
  },
  {
    id: 6,
    name: "Corporate Classic",
    description: "Traditional yet modern for corporate roles",
    color: "from-pink-500 to-blue-500",
    preview: "bg-gradient-to-br from-pink-100 to-blue-100",
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [resumeData, setResumeData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("resumeData")
    if (!data) {
      router.push("/form")
      return
    }
    setResumeData(JSON.parse(data))
  }, [router])

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId)
  }

  const handleSubmit = () => {
    if (selectedTemplate) {
      localStorage.setItem("selectedTemplate", selectedTemplate.toString())
      router.push("/preview")
    }
  }

  if (!resumeData) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/form" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Choose from below templates</h1>
          <p className="text-white/80">Select a template that best represents your style</p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedTemplate === template.id
                  ? "ring-4 ring-yellow-300 bg-white/20"
                  : "bg-white/10 hover:bg-white/20"
              } backdrop-blur-lg border-white/20`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-6">
                {/* Template Preview */}
                <div
                  className={`w-full h-48 rounded-lg mb-4 ${template.preview} border border-white/20 relative overflow-hidden`}
                >
                  <div className="absolute inset-4 bg-white/80 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="w-20 h-2 bg-gray-400 rounded mb-1"></div>
                        <div className="w-16 h-1 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-gray-300 rounded"></div>
                      <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                      <div className="w-1/2 h-1 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-yellow-300 rounded-full p-1">
                      <Check className="w-4 h-4 text-yellow-800" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                <p className="text-white/80 text-sm">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedTemplate}
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold py-3 px-8 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Resume Preview
          </Button>
        </div>
      </div>
    </div>
  )
}
