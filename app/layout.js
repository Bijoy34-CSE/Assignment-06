import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FitLog | Workout Library",
  description: "Pick a lift, lock it into today's plan, and log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}