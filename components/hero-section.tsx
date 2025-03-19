"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface HeroSectionProps {
  coupleNames: string
  weddingDate: string
  backgroundImage?: string
}

export function HeroSection({
  coupleNames,
  weddingDate,
  backgroundImage = "/placeholder.svg?height=800&width=1200",
}: HeroSectionProps) {
  const scrollToRsvp = () => {
    const rsvpSection = document.getElementById("rsvp-section")
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-pink-900/40"></div>

      <div className="relative z-10 text-center text-white space-y-6">
        <Heart className="mx-auto h-12 w-12 text-white" />
        <h1 className="text-5xl md:text-7xl font-serif">{coupleNames}</h1>
        <p className="text-xl">Chúng tôi sắp kết hôn</p>
        <p className="text-3xl font-light">{weddingDate}</p>

        <Button
          onClick={scrollToRsvp}
          className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-full"
        >
          Xác nhận tham dự
        </Button>
      </div>
    </div>
  )
}

