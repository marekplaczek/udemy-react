import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Funkcja kwadratowa — nauka i postępy",
  description: "Nauka funkcji kwadratowej z kontami uczniów i panelem nauczyciela",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="pl">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
