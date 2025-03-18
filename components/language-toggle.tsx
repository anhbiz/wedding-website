"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function LanguageToggle({ onChange }: { onChange: (lang: "en" | "vi") => void }) {
  const [language, setLanguage] = useState<"en" | "vi">("vi")

  const toggleLanguage = () => {
    const newLang = language === "en" ? "vi" : "en"
    setLanguage(newLang)
    onChange(newLang)
  }

  return (
    <Button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-rose-500 hover:bg-rose-600 text-white text-sm px-3 py-1 h-auto rounded-full shadow-md"
    >
      {language === "en" ? "Tiếng Việt" : "English"}
    </Button>
  )
}

