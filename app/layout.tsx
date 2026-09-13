import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { DEFAULT_SETTINGS, SITE_URL } from "@/lib/config";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${DEFAULT_SETTINGS.store_name} | Moda Feminina com Essência`,
    template: `%s | ${DEFAULT_SETTINGS.store_name}`,
  },
  description:
    "Vitrine digital da Sandra Rodovalho Concept: vestidos, conjuntos, blusas e acessórios com elegância e sofisticação. Confira novidades e ofertas e compre pelo WhatsApp.",
  keywords: [
    "moda feminina",
    "loja de roupas femininas",
    "vestidos",
    "conjuntos femininos",
    "moda elegante",
    "Sandra Rodovalho Concept",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: DEFAULT_SETTINGS.store_name,
    title: `${DEFAULT_SETTINGS.store_name} | Moda Feminina com Essência`,
    description: "Elegância, propósito e estilo. Descubra a coleção completa e compre pelo WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
