// import { Geist, Geist_Mono } from "next/font/google";
import { commonDetails } from "@/content/main";
import "./globals.css";
import ThemeProvider from "../../Context/ThemeProvider";
import SelectUserProvider from "../../Context/selectUser/SelectUserProvider";
import ConfirmDialogProvider from "../../Context/ConfirmDialog/ConfirmDialogProvider";

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
    <html lang="en">
      <body>
        <ConfirmDialogProvider>
          <SelectUserProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </SelectUserProvider>
        </ConfirmDialogProvider>
      </body>
    </html>
  );
}
