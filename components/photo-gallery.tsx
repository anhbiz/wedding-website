"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type Photo = {
  src: string
  alt: string
}

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [mounted, setMounted] = useState(false)

  // Chỉ render ở client side để tránh lỗi hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-[300px] bg-gray-100 animate-pulse rounded-lg"></div>
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer relative"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative w-full h-full">
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-3xl p-2 md:p-6">
          {selectedPhoto && (
            <div className="relative w-full h-[70vh] md:h-auto">
              <img
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

