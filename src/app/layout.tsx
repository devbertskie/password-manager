import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContextProvider from "@/context/auth-context";
import PasswordContextProvider from "@/context/password-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Manager",
  description: "Secured vault for everybody!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <PasswordContextProvider>{children}</PasswordContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
