import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'HEVE',
  description: 'あらゆる病院に対応した次世代型通院システム。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel='icon' href='/logo.svg' />
        {/* <link rel="apple-touch-icon" href="/logo-apple-icon.svg" /> */}
      </head>
      <body>{children}</body>
    </html>
  )
}
