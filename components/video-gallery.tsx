import React from "react"

interface Video {
  url: string
  title: string
}

interface VideoGalleryProps {
  videos: Video[]
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
      {videos.map((video, index) => (
        <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-lg bg-white">
          <iframe
            src={video.url}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  )
} 