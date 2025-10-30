import type { Metadata } from 'next'
import { Ubuntu} from 'next/font/google'
import './globals.css'
import {Toaster} from 'react-hot-toast';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
})


export const metadata: Metadata = {
  title: 'NaotY - Gestion des Notes Internes | Youth Computing',
  description: 'Solution de gestion des notes internes pour Youth Computing. Workflow collaboratif, validation hiérarchique et diffusion optimisée.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable}`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
