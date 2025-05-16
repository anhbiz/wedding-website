"use client"

import Image from "next/image"

interface QRCodeProps {
  src: string
  alt: string
  name: string
  accountNumber: string
}

export function QRCode({ src, alt, name, accountNumber }: QRCodeProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-48 h-48">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
        />
      </div>
      <div className="text-center">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{accountNumber}</p>
      </div>
    </div>
  )
} 