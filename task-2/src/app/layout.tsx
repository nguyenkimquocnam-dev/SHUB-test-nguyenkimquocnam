import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task 2',
  description: 'Built by Quốc Nam'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
