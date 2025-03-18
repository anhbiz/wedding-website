"use client"

import { useState, useEffect } from "react"

export function CalendarCountdown({ targetDate, language }: { targetDate: string; language: "en" | "vi" }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const translations = {
    en: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      title: "Countdown to Our Big Day",
    },
    vi: {
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      seconds: "Giây",
      title: "Đếm ngược đến Ngày Trọng Đại",
    },
  }

  const t = translations[language]

  return (
    <div className="text-center p-4 md:p-6 bg-rose-100 rounded-lg shadow-md">
      <h3 className="text-xl md:text-2xl font-serif mb-2 md:mb-4">{t.title}</h3>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="bg-white p-2 md:p-3 rounded-lg shadow">
            <div className="text-xl md:text-3xl font-bold text-rose-500">{value}</div>
            <div className="text-xs md:text-sm uppercase text-gray-600">{t[key as keyof typeof t]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

