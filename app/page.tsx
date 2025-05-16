"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Heart, MapPin, Clock } from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { PhotoGallery } from "@/components/photo-gallery"
import { VideoGallery } from "@/components/video-gallery"
import { toast, Toaster } from "sonner" // Import cả toast và Toaster từ sonner
import { SocialShareButtons } from "@/components/social-share-buttons"
import { sendRsvpEmail } from "@/app/actions/rsvp-actions"
import { QRCode } from "@/components/qr-code"

export default function WeddingPage() {
  const [language, setLanguage] = useState<"en" | "vi">("vi")
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "",
    message: "",
  })

  // Chỉ render ở client side để tránh lỗi hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const content = {
    en: {
      title: "We're getting married",
      rsvpButton: "RSVP Now",
      ourStory: "Our Love Story",
      proposal:
        "That night on the bridge, with lights reflecting on the Han River, he suddenly stopped amidst the passing crowd. With a serious expression, he knelt down, holding a simple ring he had chosen long ago, his deep voice resonating with a brief but certain proposal. She stood there, heart pounding, unable to believe the moment was real. The sea breeze gently blew through her hair as she looked at him, the man who had been by his side for so long. No tears, just a smile, she nodded. Happiness silently flooded in, from now on they would be each other's forever.",
      journey:
        "For three years together, we've been captivated by our travels, journeys filled with memories. From the bustling Chatuchak market in Bangkok with its colorful stalls and laughter while shopping, to the glittering lights of The Bund in Shanghai at night, where we stood silently watching the Huangpu River. Each trip was a test of our compatibility, from choosing meals to planning itineraries. Though there were arguments due to fatigue, our love remained strong, growing through every street, every experience, binding us closer than ever.",
      weddingDetails: "Wedding Details",
      date: "The Date",
      venue: "International Conference Center",
      address: "37 Hung Vuong, Ba Dinh, Hanoi",
      schedule: "Schedule",
      photoGallery: "Photo Gallery",
      videoGallery: "Video Gallery",
      rsvp: "RSVP",
      rsvpMessage: "We would be honored to have you join us on our special day. Please RSVP by November 25, 2025.",
      giftRegistry: "Gift Registry",
      giftMessage:
        "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we've registered at the following places.",
      viewRegistry: "View Registry",
      footer: "Made with love",
      shareJoy: "Share Our Joy",
      useHashtag: "Use our wedding hashtag",
      welcomeBride: "9:00 AM - Welcome the Bride",
      weddingReception: "12:30 PM - Wedding Reception",
      giftRegistryInfo: "Gift Information",
      bankAccountInfo: "Bank Account Information:",
      hung: "Hoang Nguyen Hung",
      uyen: "Nguyen Hoang To Uyen",
      fullName: "Full Name",
      yourName: "Your name",
      yourEmail: "Your email",
      numberOfGuests: "Number of Guests",
      messageOptional: "Message (Optional)",
      messageOrDietary: "Your message or dietary restrictions",
      sendRSVP: "Send RSVP",
      thankYou: "Thank you for your response. We look forward to celebrating with you!",
      viewMap: "View Map",
      configError: "Email service is not configured. Please contact the administrator.",
      sendError: "Failed to send confirmation. Please try again later.",
    },
    vi: {
      title: "Chúng tôi sắp kết hôn",
      rsvpButton: "Xác nhận tham dự",
      ourStory: "Hành trình tình yêu của chúng mình",
      proposal:
        "Đêm ấy trên cầu, ánh đèn phản chiếu lung linh trên sông Hàn, anh bất ngờ dừng lại giữa dòng người qua lại. Với vẻ mặt nghiêm túc, anh quỳ xuống, tay cầm chiếc nhẫn giản dị mà anh đã chọn từ lâu, giọng trầm ấm vang lên lời cầu hôn ngắn gọn nhưng chắc chắn. Em đứng đó, tim đập thình thịch, không tin nổi khoảnh khắc ấy là thật. Gió biển thổi nhẹ qua tóc, em nhìn anh, người đàn ông đã đồng hành bao ngày. Không nước mắt, chỉ có nụ cười, em gật đầu. Hạnh phúc lặng lẽ tràn ngập, từ giờ chúng tôi mãi là của nhau.",
      journey:
        "Ba năm bên nhau, chúng tôi đã mê đắm những chuyến đi, những hành trình đầy ắp kỷ niệm. Từ khu chợ Chatuchak nhộn nhịp ở Bangkok với những gian hàng đầy màu sắc, tiếng cười đùa khi mua sắm, đến Bến Thượng Hải rực rỡ ánh đèn về đêm, nơi chúng tôi đứng lặng ngắm dòng sông Hoàng Phố. Mỗi chuyến đi là một lần thử thách sự hợp gu, từ chọn món ăn đến lên kế hoạch. Dù có lúc cãi vã vì mệt mỏi, tình yêu vẫn bền chặt, lớn dần qua từng con đường, từng trải nghiệm, gắn kết chúng tôi hơn bao giờ hết.",
      weddingDetails: "Chi tiết đám cưới",
      date: "Ngày cưới",
      venue: "Trung tâm Hội nghị Quốc tế",
      address: "37 Hùng Vương, Ba Đình, Hà Nội",
      schedule: "Lịch trình",
      photoGallery: "Thư viện ảnh",
      videoGallery: "Thư viện video",
      rsvp: "Xác nhận tham dự",
      rsvpMessage:
        "Chúng tôi rất vinh hạnh được đón tiếp bạn trong ngày trọng đại này. Vui lòng xác nhận tham dự trước ngày 15 tháng 12 năm 2025.",
      giftRegistry: "Đăng ký quà tặng",
      giftMessage:
        "Sự hiện diện của bạn trong đám cưới của chúng tôi là món quà lớn nhất. Tuy nhiên, nếu bạn muốn tặng chúng tôi một món quà, chúng tôi đã đăng ký tại các nơi sau.",
      viewRegistry: "Xem đăng ký",
      footer: "Được tạo với tình yêu",
      shareJoy: "Chia sẻ niềm vui của chúng tôi",
      useHashtag: "Sử dụng hashtag đám cưới của chúng tôi",
      welcomeBride: "9:00 - Đón Dâu",
      weddingReception: "12:30 - Tiệc Cưới",
      giftRegistryInfo: "Thông tin quà tặng",
      bankAccountInfo: "Thông tin tài khoản ngân hàng:",
      hung: "Hoàng Nguyễn Hưng",
      uyen: "Nguyễn Hoàng Tố Uyên",
      fullName: "Họ và tên",
      yourName: "Tên của bạn",
      yourEmail: "Email của bạn",
      numberOfGuests: "Số lượng khách",
      messageOptional: "Lời nhắn (Không bắt buộc)",
      messageOrDietary: "Lời nhắn hoặc yêu cầu ăn uống đặc biệt của bạn",
      sendRSVP: "Gửi xác nhận",
      thankYou: "Cảm ơn bạn đã phản hồi. Chúng tôi rất mong được chào đón bạn!",
      viewMap: "Xem bản đồ",
      configError: "Hệ thống email chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
      sendError: "Không thể gửi xác nhận. Vui lòng thử lại sau.",
    },
  }

  const t = content[language]

  // Sử dụng đường dẫn tuyệt đối cho ảnh
  const photos = [
    { src: "/images/gallery-1.jpg", alt: "Floral frame with pink and white flowers" },
    { src: "/images/gallery-2.jpg", alt: "Dried pink roses frame arrangement" },
    { src: "/images/gallery-3.jpg", alt: "Pink roses square frame" },
    { src: "/images/gallery-4.jpg", alt: "Wedding invitation with gold elements" },
    { src: "/images/gallery-5.jpg", alt: "Pink roses and chocolate arrangement" },
    { src: "/images/gallery-6.jpg", alt: "Blue leaves frame on pink" },
    { src: "/images/gallery-7.jpg", alt: "Marble texture with gold frame" },
    { src: "/images/gallery-8.jpg", alt: "White daisies frame" },
  ]

  const videos = [
    {
      url: "https://www.youtube.com/embed/acuU8BsM5BY",
      title: "Pre-wedding Video"
    },
    {
      url: "https://www.youtube.com/embed/your-video-id-2",
      title: "Love Story Video"
    }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendRsvpEmail(formData)
      toast.success(language === "en" ? t.thankYou : t.thankYou)

      // Reset form
      setFormData({
        name: "",
        email: "",
        guests: "",
        message: "",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ""

      // Check if it's a configuration error
      if (errorMessage.includes("not configured")) {
        toast.error(language === "en" ? t.configError : t.configError)
      } else {
        toast.error(language === "en" ? t.sendError : t.sendError)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=International+Conference+Center+Hanoi+37+Hung+Vuong"

  // Hiển thị loading state khi chưa mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-center" /> {/* Thêm Toaster vào layout */}
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <LanguageToggle onChange={setLanguage} />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gray-800">
            <img
              src="/images/hero-background.jpg"
              alt="Wedding background with purple roses"
              className="w-full h-full object-cover brightness-50"
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="mb-4 md:mb-6 flex justify-center">
              <Heart className="text-rose-200 h-8 w-8 md:h-12 md:w-12" />
            </div>
            <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl text-white mb-3 md:mb-4 tracking-wide">
              Hưng & Uyên
            </h1>
            <div className="w-16 md:w-24 h-1 bg-rose-300 mx-auto mb-4 md:mb-6"></div>
            <p className="text-lg md:text-2xl text-rose-100 mb-4 md:mb-8 font-light">{t.title}</p>
            <p className="text-xl md:text-3xl text-white font-serif mb-6 md:mb-8">25.11.2025</p>
            <Button
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 py-2 md:px-8 md:py-6 text-base md:text-lg"
              onClick={() => {
                const rsvpSection = document.getElementById("rsvp-section")
                if (rsvpSection) {
                  rsvpSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              {t.rsvpButton}
            </Button>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4">{t.ourStory}</h2>
              <div className="w-16 md:w-20 h-1 bg-rose-300 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              {/* Ảnh 1: The Proposal */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/our-story-1.jpg"
                  alt="Wedding rings on roses"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Nội dung The Proposal */}
              <div className="flex flex-col justify-center space-y-6 text-gray-700">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2 text-rose-600">
                    {language === "en" ? "The Proposal" : "Lời cầu hôn"}
                  </h3>
                  <p className="text-sm md:text-base">{t.proposal}</p>
                </div>
              </div>

              {/* Ảnh 2: Our Journey */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/our-story-2.jpg"
                  alt="Another wedding-related image"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Nội dung Our Journey */}
              <div className="flex flex-col justify-center space-y-6 text-gray-700">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl mb-2 text-rose-600">
                    {language === "en" ? "Our Journey" : "Hành trình của chúng mình"}
                  </h3>
                  <p className="text-sm md:text-base">{t.journey}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="py-12 md:py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4">{t.weddingDetails}</h2>
              <div className="w-16 md:w-20 h-1 bg-rose-300 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 md:p-8 rounded-lg text-center shadow-lg">
                <div className="flex justify-center mb-3 md:mb-4">
                  <Calendar className="h-8 w-8 md:h-12 md:w-12 text-rose-500" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-2 text-gray-800">{t.date}</h3>
                <p className="text-gray-600">25.11.2025</p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-lg text-center shadow-lg">
                <div className="flex justify-center mb-3 md:mb-4">
                  <MapPin className="h-8 w-8 md:h-12 md:w-12 text-rose-500" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-2 text-gray-800">{t.venue}</h3>
                <p className="text-gray-600">{t.address}</p>
                <Link
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 md:mt-4 text-rose-500 hover:text-rose-600 underline"
                >
                  {t.viewMap}
                </Link>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-lg text-center md:col-span-2 lg:col-span-1 shadow-lg">
                <div className="flex justify-center mb-3 md:mb-4">
                  <Clock className="h-8 w-8 md:h-12 md:w-12 text-rose-500" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-2 text-gray-800">{t.schedule}</h3>
                <div className="space-y-1 md:space-y-2 text-gray-600">
                  <p>{t.welcomeBride}</p>
                  <p>{t.weddingReception}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 md:py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4">{t.photoGallery}</h2>
              <div className="w-16 md:w-20 h-1 bg-rose-300 mx-auto"></div>
            </div>
            <PhotoGallery photos={photos} />
          </div>
        </section>

        {/* Video Gallery Section */}
        <section className="py-12 md:py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4">{t.videoGallery}</h2>
              <div className="w-16 md:w-20 h-1 bg-rose-300 mx-auto"></div>
            </div>
            <VideoGallery videos={videos} />
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-8 md:py-10 bg-rose-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">{t.shareJoy}</h2>
            <p className="text-lg md:text-xl mb-3 md:mb-4">{t.useHashtag}</p>
            <p className="text-2xl md:text-3xl font-bold text-rose-500 mb-4 md:mb-6">#HưngUyênWedding2025</p>
            <SocialShareButtons hashtag="#HưngUyênWedding2025" language={language} />
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp-section" className="py-12 md:py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4">{t.rsvp}</h2>
              <div className="w-16 md:w-20 h-1 bg-rose-300 mx-auto mb-3 md:mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">{t.rsvpMessage}</p>
            </div>
            <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <form className="space-y-4 md:space-y-6" onSubmit={handleRSVP}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t.fullName}
                    </label>
                    <Input id="name" placeholder={t.yourName} required value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.yourEmail}
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.numberOfGuests}
                  </label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="5"
                    placeholder={t.numberOfGuests}
                    required
                    value={formData.guests}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.messageOptional}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t.messageOrDietary}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-6 py-2 md:px-8 md:py-6 text-base md:text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (language === "en" ? "Sending..." : "Đang gửi...") : t.sendRSVP}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Registry Section */}
        <section className="py-12 md:py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="font-serif text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4">{t.giftRegistryInfo}</h2>
              <div className="w-16 md:w-20 h-1 bg-rose-300 mx-auto mb-3 md:mb-4"></div>
            </div>
            <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="font-serif text-xl md:text-2xl mb-3 md:mb-4 text-center text-gray-800">
                {t.bankAccountInfo}
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <QRCode
                  src="/images/qr-hung.jpg"
                  alt="QR Code Hoàng Nguyễn Hưng"
                  name={t.hung}
                  accountNumber="104866931745"
                />
                <QRCode
                  src="/images/qr-uyen.jpg"
                  alt="QR Code Nguyễn Hoàng Tố Uyên"
                  name={t.uyen}
                  accountNumber="19034131391016"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 md:py-10 bg-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-xl md:text-2xl mb-3 md:mb-4">Hưng & Uyên</h2>
            <p className="mb-4 md:mb-6">25.11.2025 • Hanoi, VN</p>
            <div className="flex justify-center space-x-4 mb-4 md:mb-6">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-rose-300" />
            </div>
            <p className="text-gray-400 text-xs md:text-sm">
              {t.footer} • {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

