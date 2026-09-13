import { AnchorButton, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { buildWhatsAppUrl, productWhatsAppMessage } from "@/lib/utils";

/** Ícone de WhatsApp inline (sem dependência externa). */
export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.929.55 3.735 1.502 5.264L2 22l4.868-1.478A9.955 9.955 0 0 0 12.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 18.2a8.17 8.17 0 0 1-4.256-1.19l-.305-.181-3.076.934.94-2.996-.198-.313A8.163 8.163 0 0 1 3.8 12c0-4.526 3.674-8.2 8.201-8.2 4.526 0 8.2 3.674 8.2 8.2 0 4.527-3.674 8.2-8.2 8.2z" />
    </svg>
  );
}

export function WhatsAppBuyButton({
  phone,
  productName,
  variant = "whatsapp",
  size = "md",
  className,
  label = "Comprar pelo WhatsApp",
}: {
  phone: string;
  productName: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
}) {
  const url = buildWhatsAppUrl(phone, productWhatsAppMessage(productName));

  return (
    <AnchorButton
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      aria-label={`Comprar ${productName} pelo WhatsApp`}
    >
      <WhatsAppIcon />
      {label}
    </AnchorButton>
  );
}
