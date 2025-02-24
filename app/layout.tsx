import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "New Year's Card Generator",
  description: "モダンでカスタマイズ可能な年賀状カードを簡単に作成",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body style={{ backgroundImage: "url('/background.webp')" }}>{children}</body>
    </html>
  )
}