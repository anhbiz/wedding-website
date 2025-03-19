"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareButtonsProps {
  hashtag: string
  language: "en" | "vi"
  url?: string
}

export function SocialShareButtons({ hashtag, language, url }: SocialShareButtonsProps) {
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
    alert(
      language === "en"
        ? "Hashtag copied to clipboard. Please paste it into your Instagram post!"
        : "Hashtag đã được sao chép. Hãy dán vào bài đăng Instagram của bạn!",
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      <Button variant="outline" className="rounded-full text-sm md:text-base" onClick={shareToFacebook}>
        <Share2 className="mr-2 h-3 w-3 md:h-4 md:w-4" />
        {language === "en" ? "Share on Facebook" : "Chia sẻ trên Facebook"}
      </Button>
      <Button variant="outline" className="rounded-full text-sm md:text-base" onClick={shareToInstagram}>
        <Share2 className="mr-2 h-3 w-3 md:h-4 md:w-4" />
        {language === "en" ? "Share on Instagram" : "Chia sẻ trên Instagram"}
      </Button>
    </div>
  )
}

