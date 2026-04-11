import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { StarBackground } from "@/components/StarBackground";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "MindType - AI驱动的MBTI性格测试",
  description: "探索你的性格密码，AI智能解读，专业的MBTI性格分析平台",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen antialiased overflow-x-hidden">
        <AuthProvider>
          <StarBackground />
          <NavBar />
          <main className="relative z-10 pb-tab-bar md:pb-0 pt-0 md:pt-0">
            {children}
          </main>
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
