// app/layout.tsx
import './globals.css';
import { GeistSans } from 'geist/font/sans'; // this loads the font the correct way

export const metadata = {
  title: 'My Portfolio',
  description: 'Built with Next.js and TailwindCSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
