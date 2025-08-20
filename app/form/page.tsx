"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Upload, User } from "lucide-react"
import Link from "next/link"

export default function FormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    qualification: [""],
    experience: "",
    skills: [""],
    jobPost: "",
    phoneNumber: "",
    email: "",
    projects: [""],
    achievements: [""],
    photo: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, photo: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addField = (fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName as keyof typeof prev] as string[]), ""],
    }))
  }

  const removeField = (fieldName: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: (prev[fieldName as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  const updateField = (fieldName: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: (prev[fieldName as keyof typeof prev] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store data in localStorage for now
    localStorage.setItem("resumeData", JSON.stringify(formData))
    router.push("/templates")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Tell us about yourself</h1>
          <p className="text-white/80">Fill in your details to create an amazing resume</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-white/20 border-2 border-dashed border-white/40 flex items-center justify-center overflow-hidden">
                  {formData.photo ? (
                    <img
                      src={formData.photo || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white/60" />
                  )}
                </div>
                <Label htmlFor="photo" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span className="text-white">Upload Photo</span>
                  </div>
                  <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </Label>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-white">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Enter your age"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-white">Education/Qualification *</Label>
                  {formData.qualification.map((qual, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={qual}
                        onChange={(e) => updateField("qualification", index, e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                        placeholder="e.g., Bachelor's in Computer Science"
                        required={index === 0}
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => removeField("qualification", index)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-white px-3"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => addField("qualification")}
                    className="bg-white/20 hover:bg-white/30 text-white text-sm py-1 px-3"
                  >
                    + Add Education
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobPost" className="text-white">
                    Desired Job Position *
                  </Label>
                  <Input
                    id="jobPost"
                    value={formData.jobPost}
                    onChange={(e) => handleInputChange("jobPost", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="e.g., Software Developer"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-white">
                  Work Experience *
                </Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[100px]"
                  placeholder="Describe your work experience..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Skills *</Label>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={skill}
                      onChange={(e) => updateField("skills", index, e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="e.g., JavaScript, React, Node.js"
                      required={index === 0}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeField("skills", index)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-white px-3"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addField("skills")}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm py-1 px-3"
                >
                  + Add Skill
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Projects</Label>
                {formData.projects.map((project, index) => (
                  <div key={index} className="flex space-x-2">
                    <Textarea
                      value={project}
                      onChange={(e) => updateField("projects", index, e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[60px]"
                      placeholder="Describe your project..."
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeField("projects", index)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-white px-3 h-fit"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addField("projects")}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm py-1 px-3"
                >
                  + Add Project
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Achievements</Label>
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateField("achievements", index, e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="e.g., Employee of the Month, Dean's List"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeField("achievements", index)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-white px-3"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => addField("achievements")}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm py-1 px-3"
                >
                  + Add Achievement
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold py-3 rounded-lg text-lg"
              >
                Continue to Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
