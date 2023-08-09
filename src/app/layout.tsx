import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'THE-saurus',
  description: 'A dinosaur themed thesaurus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="justify-center items-center flex">{children}</body>
    </html>
  )
}
