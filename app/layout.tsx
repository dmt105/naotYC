import type { Metadata } from 'next'
import { Ubuntu} from 'next/font/google'
import './globals.css'
import {Toaster} from 'react-hot-toast';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
})


export const metadata: Metadata = {
  title: 'NaotY - Gestion des Documents Internes | Youth Computing',
  description: 'Solution de gestion des documents internes pour Youth Computing. Workflow collaboratif, validation hiérarchique et diffusion optimisée.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-storage');
                  if (theme) {
                    const parsed = JSON.parse(theme);
                    const currentTheme = parsed.state?.theme || 'light';
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(currentTheme);
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${ubuntu.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
