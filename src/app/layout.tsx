import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pediatric Clerkship Review - Dr. Sharma | Inova Hospital',
  description: 'High-yield pediatric concepts for medical students by Dr. Shiksha Sharma, Pediatric Hospitalist at Inova Children\'s Hospital',
  keywords: ['pediatrics', 'medical education', 'clerkship', 'USMLE Step 2', 'Inova Hospital'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦋</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  )
}
