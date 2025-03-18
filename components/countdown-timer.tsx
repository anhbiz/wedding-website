"use client"

import { useState, useEffect } from "react"

export function CountdownTimer({ targetDate, language }: { targetDate: string; language: "en" | "vi" }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft: { [key: string]: number } = {}

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
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      title: "Countdown to Our Big Day",
    },
    vi: {
      days: "ngày",
      hours: "giờ",
      minutes: "phút",
      seconds: "giây",
      title: "Đếm ngược đến Ngày Trọng Đại",
    },
  }

  const t = translations[language]

  const timerComponents = []
  for (const [interval, value] of Object.entries(timeLeft)) {
    if (value > 0) {
      timerComponents.push(
        <span className="text-2xl md:text-4xl font-bold" key={interval}>
          {value} {t[interval as keyof typeof t]}{" "}
        </span>,
      )
    }
  }

  return (
    <div className="text-center p-4 bg-rose-100 rounded-lg shadow-md">
      <h3 className="text-xl md:text-2xl font-serif mb-2">{t.title}</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span>{language === "en" ? "The big day is here!" : "Ngày trọng đại đã đến!"}</span>
        )}
      </div>
    </div>
  )
}

