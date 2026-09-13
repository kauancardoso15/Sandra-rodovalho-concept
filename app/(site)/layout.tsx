import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloatingButton phone={settings.whatsapp_number} />
    </>
  );
}
