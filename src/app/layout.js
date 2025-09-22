// import { Geist, Geist_Mono } from "next/font/google";
import { commonDetails } from "@/content/main";
import "./globals.css";
import ThemeProvider from "../../components/Context/ThemeProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "HoliDesk",
  description: commonDetails.description,
}

export default function RootLayout({ children }) {
  return (
    <html className="light" lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
