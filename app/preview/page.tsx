"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Mail, Phone, Award, Briefcase, GraduationCap, Code, Star } from "lucide-react"
import Link from "next/link"

export default function PreviewPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const data = localStorage.getItem("resumeData")
    const template = localStorage.getItem("selectedTemplate")

    if (!data || !template) {
      router.push("/form")
      return
    }

    setResumeData(JSON.parse(data))
    setSelectedTemplate(Number.parseInt(template))
  }, [router])

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      const { jsPDF } = await import("jspdf")
      const html2canvas = await import("html2canvas")

      const canvas = await html2canvas.default(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${resumeData?.name || "resume"}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    }
  }

  // Template 1: Modern Professional - Left Sidebar
  const Template1 = () => (
    <div className="flex min-h-[800px] bg-white">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
        <div className="text-center mb-6">
          {resumeData.photo && (
            <img
              src={resumeData.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
            />
          )}
          <h1 className="text-2xl font-bold mb-2">{resumeData.name}</h1>
          <p className="text-purple-200">{resumeData.jobPost}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Mail className="w-3 h-3 mr-2" />
                {resumeData.email}
              </p>
              <p className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                {resumeData.phoneNumber}
              </p>
              <p>Age: {resumeData.age}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Skills
            </h3>
            <ul className="space-y-1 text-sm">
              {resumeData.skills
                ?.filter((skill: string) => skill.trim())
                .map((skill: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-purple-300 rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
            </ul>
          </div>

          {resumeData.achievements?.some((achievement: string) => achievement.trim()) && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </h3>
              <ul className="space-y-1 text-sm">
                {resumeData.achievements
                  ?.filter((achievement: string) => achievement.trim())
                  .map((achievement: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <Star className="w-3 h-3 mr-2 text-yellow-300" />
                      {achievement}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b-2 border-purple-200 pb-2">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
              Education
            </h3>
            <ul className="space-y-2">
              {resumeData.qualification
                ?.filter((qual: string) => qual.trim())
                .map((qual: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-700">{qual}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b-2 border-purple-200 pb-2">
              <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
              Experience
            </h3>
            <p className="text-gray-700 leading-relaxed">{resumeData.experience}</p>
          </div>

          {resumeData.projects?.some((project: string) => project.trim()) && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b-2 border-purple-200 pb-2">
                <Code className="w-5 h-5 mr-2 text-purple-600" />
                Projects
              </h3>
              <ul className="space-y-3">
                {resumeData.projects
                  ?.filter((project: string) => project.trim())
                  .map((project: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-2"></span>
                      <span className="text-gray-700">{project}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Template 2: Creative Designer - Asymmetric Layout
  const Template2 = () => (
    <div className="bg-gradient-to-br from-pink-50 to-violet-50 min-h-[800px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-violet-600 text-white p-8">
        <div className="flex items-center space-x-6">
          {resumeData.photo && (
            <img
              src={resumeData.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-lg object-cover border-4 border-white shadow-lg"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{resumeData.name}</h1>
            <p className="text-xl text-pink-100 mb-2">{resumeData.jobPost}</p>
            <div className="flex space-x-4 text-sm">
              <span className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {resumeData.email}
              </span>
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {resumeData.phoneNumber}
              </span>
              <span>Age: {resumeData.age}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-pink-600">Experience</h3>
            <p className="text-gray-700 leading-relaxed">{resumeData.experience}</p>
          </div>

          {resumeData.projects?.some((project: string) => project.trim()) && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-violet-600">Projects</h3>
              <ul className="space-y-3">
                {resumeData.projects
                  ?.filter((project: string) => project.trim())
                  .map((project: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full mr-3 mt-1"></div>
                      <span className="text-gray-700">{project}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-500 to-violet-600 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <ul className="space-y-2">
              {resumeData.skills
                ?.filter((skill: string) => skill.trim())
                .map((skill: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></div>
                    <span className="text-sm">{skill}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-pink-600">Education</h3>
            <ul className="space-y-2">
              {resumeData.qualification
                ?.filter((qual: string) => qual.trim())
                .map((qual: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <GraduationCap className="w-4 h-4 text-pink-500 mr-2 mt-1" />
                    <span className="text-gray-700 text-sm">{qual}</span>
                  </li>
                ))}
            </ul>
          </div>

          {resumeData.achievements?.some((achievement: string) => achievement.trim()) && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-violet-600">Achievements</h3>
              <ul className="space-y-2">
                {resumeData.achievements
                  ?.filter((achievement: string) => achievement.trim())
                  .map((achievement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Award className="w-4 h-4 text-yellow-500 mr-2 mt-1" />
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Template 3: Executive Elite - Traditional Formal
  const Template3 = () => (
    <div className="bg-white min-h-[800px] p-8">
      {/* Header */}
      <div className="text-center border-b-4 border-violet-600 pb-6 mb-8">
        {resumeData.photo && (
          <img
            src={resumeData.photo || "/placeholder.svg"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-violet-200"
          />
        )}
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">{resumeData.name}</h1>
        <h2 className="text-2xl text-violet-600 font-light mb-4">{resumeData.jobPost}</h2>
        <div className="flex justify-center space-x-6 text-gray-600">
          <span className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            {resumeData.email}
          </span>
          <span className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            {resumeData.phoneNumber}
          </span>
          <span>Age: {resumeData.age}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-violet-700 mb-4 uppercase tracking-wide">
              Professional Experience
            </h3>
            <div className="bg-violet-50 p-4 rounded border-l-4 border-violet-600">
              <p className="text-gray-700 leading-relaxed">{resumeData.experience}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-violet-700 mb-4 uppercase tracking-wide">Education</h3>
            <ul className="space-y-3">
              {resumeData.qualification
                ?.filter((qual: string) => qual.trim())
                .map((qual: string, index: number) => (
                  <li key={index} className="flex items-start bg-blue-50 p-3 rounded">
                    <GraduationCap className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <span className="text-gray-700 font-medium">{qual}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-violet-700 mb-4 uppercase tracking-wide">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {resumeData.skills
                ?.filter((skill: string) => skill.trim())
                .map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-violet-100 to-blue-100 p-2 rounded flex items-center"
                  >
                    <div className="w-2 h-2 bg-violet-600 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
            </div>
          </div>

          {resumeData.projects?.some((project: string) => project.trim()) && (
            <div>
              <h3 className="text-xl font-serif font-bold text-violet-700 mb-4 uppercase tracking-wide">
                Key Projects
              </h3>
              <ul className="space-y-3">
                {resumeData.projects
                  ?.filter((project: string) => project.trim())
                  .map((project: string, index: number) => (
                    <li key={index} className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                      <span className="text-gray-700">{project}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {resumeData.achievements?.some((achievement: string) => achievement.trim()) && (
            <div>
              <h3 className="text-xl font-serif font-bold text-violet-700 mb-4 uppercase tracking-wide">
                Achievements
              </h3>
              <ul className="space-y-2">
                {resumeData.achievements
                  ?.filter((achievement: string) => achievement.trim())
                  .map((achievement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Award className="w-4 h-4 text-yellow-600 mr-2 mt-1" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Template 4: Minimalist Pro - Ultra Clean
  const Template4 = () => (
    <div className="bg-white min-h-[800px] p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center space-x-8">
          {resumeData.photo && (
            <img
              src={resumeData.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover grayscale"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-light text-gray-900 mb-2">{resumeData.name}</h1>
            <p className="text-xl text-blue-600 font-light mb-4">{resumeData.jobPost}</p>
            <div className="flex space-x-8 text-gray-600 text-sm">
              <span>{resumeData.email}</span>
              <span>{resumeData.phoneNumber}</span>
              <span>Age {resumeData.age}</span>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-6 border-b border-gray-200 pb-2">Experience</h2>
          <p className="text-gray-700 leading-loose text-lg">{resumeData.experience}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-6 border-b border-gray-200 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills
              ?.filter((skill: string) => skill.trim())
              .map((skill: string, index: number) => (
                <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-6 border-b border-gray-200 pb-2">Education</h2>
          <ul className="space-y-4">
            {resumeData.qualification
              ?.filter((qual: string) => qual.trim())
              .map((qual: string, index: number) => (
                <li key={index} className="text-gray-700 text-lg">
                  • {qual}
                </li>
              ))}
          </ul>
        </div>

        {resumeData.projects?.some((project: string) => project.trim()) && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 border-b border-gray-200 pb-2">Projects</h2>
            <ul className="space-y-4">
              {resumeData.projects
                ?.filter((project: string) => project.trim())
                .map((project: string, index: number) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    • {project}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {resumeData.achievements?.some((achievement: string) => achievement.trim()) && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-6 border-b border-gray-200 pb-2">Achievements</h2>
            <ul className="space-y-3">
              {resumeData.achievements
                ?.filter((achievement: string) => achievement.trim())
                .map((achievement: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    • {achievement}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )

  // Template 5: Dynamic Impact - Timeline Layout
  const Template5 = () => (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-[800px] p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center space-x-6">
          {resumeData.photo && (
            <div className="relative">
              <img
                src={resumeData.photo || "/placeholder.svg"}
                alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {resumeData.name}
            </h1>
            <p className="text-2xl text-gray-700 mb-4">{resumeData.jobPost}</p>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <span className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
                <Mail className="w-4 h-4 mr-2" />
                {resumeData.email}
              </span>
              <span className="flex items-center bg-pink-50 px-3 py-1 rounded-full">
                <Phone className="w-4 h-4 mr-2" />
                {resumeData.phoneNumber}
              </span>
              <span className="bg-violet-50 px-3 py-1 rounded-full">Age: {resumeData.age}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Skills
            </h3>
            <div className="space-y-2">
              {resumeData.skills
                ?.filter((skill: string) => skill.trim())
                .map((skill: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h3>
            <ul className="space-y-3">
              {resumeData.qualification
                ?.filter((qual: string) => qual.trim())
                .map((qual: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">{qual}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Middle & Right Columns */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-violet-600 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Experience
            </h3>
            <div className="border-l-4 border-gradient-to-b from-purple-400 to-pink-400 pl-6">
              <p className="text-gray-700 leading-relaxed">{resumeData.experience}</p>
            </div>
          </div>

          {resumeData.projects?.some((project: string) => project.trim()) && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Projects</h3>
              <div className="space-y-4">
                {resumeData.projects
                  ?.filter((project: string) => project.trim())
                  .map((project: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 flex-1">{project}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {resumeData.achievements?.some((achievement: string) => achievement.trim()) && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements
              </h3>
              <ul className="space-y-2">
                {resumeData.achievements
                  ?.filter((achievement: string) => achievement.trim())
                  .map((achievement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 mt-1" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Template 6: Corporate Classic - Two Column Professional
  const Template6 = () => (
    <div className="bg-white min-h-[800px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {resumeData.photo && (
              <img
                src={resumeData.photo || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-1">{resumeData.name}</h1>
              <p className="text-xl text-blue-100">{resumeData.jobPost}</p>
            </div>
          </div>
          <div className="text-right text-sm space-y-1">
            <p className="flex items-center justify-end">
              <Mail className="w-4 h-4 mr-2" />
              {resumeData.email}
            </p>
            <p className="flex items-center justify-end">
              <Phone className="w-4 h-4 mr-2" />
              {resumeData.phoneNumber}
            </p>
            <p>Age: {resumeData.age}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-0">
        {/* Left Sidebar */}
        <div className="col-span-2 bg-gray-50 p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-4 uppercase border-b-2 border-blue-200 pb-2">
              Professional Skills
            </h3>
            <ul className="space-y-2">
              {resumeData.skills
                ?.filter((skill: string) => skill.trim())
                .map((skill: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700 text-sm">{skill}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-purple-700 mb-4 uppercase border-b-2 border-purple-200 pb-2">
              Education
            </h3>
            <ul className="space-y-3">
              {resumeData.qualification
                ?.filter((qual: string) => qual.trim())
                .map((qual: string, index: number) => (
                  <li key={index} className="text-gray-700 text-sm">
                    <div className="flex items-start">
                      <GraduationCap className="w-4 h-4 text-purple-600 mr-2 mt-1" />
                      {qual}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {resumeData.achievements?.some((achievement: string) => achievement.trim()) && (
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4 uppercase border-b-2 border-green-200 pb-2">
                Achievements
              </h3>
              <ul className="space-y-2">
                {resumeData.achievements
                  ?.filter((achievement: string) => achievement.trim())
                  .map((achievement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Award className="w-4 h-4 text-green-600 mr-2 mt-1" />
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-3 p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Professional Experience
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed">{resumeData.experience}</p>
            </div>
          </div>

          {resumeData.projects?.some((project: string) => project.trim()) && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-purple-600" />
                Key Projects
              </h3>
              <div className="space-y-4">
                {resumeData.projects
                  ?.filter((project: string) => project.trim())
                  .map((project: string, index: number) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                      <div className="flex items-start">
                        <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 flex-1">{project}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <Template1 />
      case 2:
        return <Template2 />
      case 3:
        return <Template3 />
      case 4:
        return <Template4 />
      case 5:
        return <Template5 />
      case 6:
        return <Template6 />
      default:
        return <Template1 />
    }
  }

  if (!resumeData || !selectedTemplate) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/templates"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Your Resume Preview</h1>
          <p className="text-white/80">Review your resume and download when ready</p>
        </div>

        {/* Resume Preview */}
        <Card className="bg-white shadow-2xl mb-8">
          <CardContent className="p-0">
            <div ref={resumeRef}>{renderTemplate()}</div>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="text-center">
          <Button
            onClick={downloadPDF}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
