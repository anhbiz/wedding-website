"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareProps {
  hashtag: string
  url?: string
}

export function SocialShare({ hashtag, url }: SocialShareProps) {
  // Sử dụng window.location.href khi component được render ở client
  const getUrl = () => url || window.location.href

  const shareToFacebook = () => {
    const encodedHashtag = encodeURIComponent(hashtag)
    const encodedUrl = encodeURIComponent(getUrl())
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&hashtag=${encodedHashtag}`
    window.open(facebookShareUrl, "_blank", "width=600,height=400")
  }

  const shareToInstagram = () => {
    // Instagram doesn't have a direct share URL like Facebook
    // We'll copy the hashtag to clipboard and open Instagram
    navigator.clipboard.writeText(hashtag)

    // Open Instagram website
    window.open("https://www.instagram.com", "_blank")

    // Show a small notification
    alert("Hashtag đã được sao chép. Hãy dán vào bài đăng Instagram của bạn!")
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold text-center">Chia sẻ niềm vui của chúng tôi</h2>
      <p className="text-center">Sử dụng hashtag đám cưới của chúng tôi</p>
      <p className="text-2xl font-bold text-pink-500">{hashtag}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={shareToFacebook} className="bg-pink-500 hover:bg-pink-600 text-white">
          <Share2 className="mr-2 h-4 w-4" /> Chia sẻ trên Facebook
        </Button>
        <Button onClick={shareToInstagram} className="bg-pink-500 hover:bg-pink-600 text-white">
          <Share2 className="mr-2 h-4 w-4" /> Chia sẻ trên Instagram
        </Button>
      </div>
    </div>
  )
}

