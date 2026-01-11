// Global Layout
import { Inter } from 'next/font/google';
import "@/styles/globals.css";
import styles from '@/styles/Layout.module.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'Blog App',
    description: 'A Next.js Blog App',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <div className={styles.layout}>
                    <main className={styles.main}>{children}</main>
                </div>
            </body>
        </html>
    )
}
