import { ThemeSwitcher } from "@/components/theme-switcher";
import NavBar from "../components/navbar";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Steam Analytics",
  description: "Unlock the Insights Behind the Games You Love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <NavBar />
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>
              <footer
                className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <div className="font-bold text-sm">Switch modes:</div>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
