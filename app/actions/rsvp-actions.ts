"use server"

import { Resend } from "resend"

// Check if API key exists before initializing
const resendApiKey = process.env.RESEND_API_KEY
let resend: Resend | null = null

// Only initialize if API key exists
if (resendApiKey) {
  resend = new Resend(resendApiKey)
}

interface RsvpFormData {
  name: string
  email: string
  guests: string
  message: string
}

export async function sendRsvpEmail(formData: RsvpFormData) {
  const { name, email, guests, message } = formData

  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("Resend API key is missing. Please add RESEND_API_KEY to your environment variables.")
      throw new Error("Email service not configured")
    }

    console.log("Attempting to send email with data:", {
      from: "RSVP <onboarding@resend.dev>",
      to: "hunghnz199x@gmail.com",
      subject: `RSVP: ${name} đã xác nhận tham dự đám cưới`,
    })

    // Gửi email thông báo đến địa chỉ của bạn
    const { data, error } = await resend.emails.send({
      from: "RSVP <onboarding@resend.dev>",
      to: "hunghnz199x@gmail.com",
      subject: `RSVP: ${name} đã xác nhận tham dự đám cưới`,
      html: `
        <h2>Thông báo xác nhận tham dự đám cưới</h2>
        <p><strong>Họ và tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số lượng khách:</strong> ${guests}</p>
        <p><strong>Lời nhắn:</strong> ${message || "Không có"}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("Email sent successfully:", data)
    return { success: true }
  } catch (error) {
    console.error("Error in sendRsvpEmail:", error)
    if (error instanceof Error) {
      throw new Error(`Failed to process RSVP: ${error.message}`)
    }
    throw new Error("Failed to process RSVP")
  }
}

