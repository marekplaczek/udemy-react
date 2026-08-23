import type { Metadata } from "next";
import "@neondatabase/auth-ui/css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Funkcja kwadratowa — nauka i postępy",
  description: "Nauka funkcji kwadratowej z kontami uczniów i panelem nauczyciela",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
