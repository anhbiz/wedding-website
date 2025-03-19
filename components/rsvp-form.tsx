"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendRsvpEmail } from "@/app/actions/rsvp-actions"
import { useToast } from "@/hooks/use-toast"

export function RsvpForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendRsvpEmail(formData)
      toast({
        title: "Xác nhận thành công!",
        description: "Cảm ơn bạn đã xác nhận tham dự đám cưới của chúng tôi.",
        className: "bg-green-500 text-white",
      })
      // Reset form
      setFormData({
        name: "",
        email: "",
        guests: "",
        message: "",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Vui lòng thử lại sau."

      // Check if it's a configuration error
      if (errorMessage.includes("not configured")) {
        toast({
          title: "Lỗi cấu hình",
          description: "Hệ thống email chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
          className: "bg-red-500 text-white",
        })
      } else {
        toast({
          title: "Có lỗi xảy ra",
          description: "Không thể gửi xác nhận. Vui lòng thử lại sau.",
          className: "bg-red-500 text-white",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-pink-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Xác nhận tham dự</h2>
      <p className="text-center mb-6">
        Chúng tôi rất vinh hạnh được đón tiếp bạn trong ngày trọng đại này. Vui lòng xác nhận tham dự trước ngày 15
        tháng 8 năm 2025.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Họ và tên</Label>
          <Input
            id="name"
            name="name"
            placeholder="Tên của bạn"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email của bạn"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Số lượng khách</Label>
          <Input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="5"
            placeholder="Số lượng khách"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Lời nhắn (Không bắt buộc)</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Lời nhắn hoặc yêu cầu ăn uống đặc biệt của bạn"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}
        </Button>
      </form>
    </div>
  )
}

