import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@/theme'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})
import './globals.css'

export const metadata: Metadata = {
  title: 'Task 1 - 2',
  description: 'Built by Quốc Nam'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={roboto.variable} suppressHydrationWarning>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  )
}
