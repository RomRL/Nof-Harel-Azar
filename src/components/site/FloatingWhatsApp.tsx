import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/972544623712?text=${encodeURIComponent("שלום נוף הראל, הגעתי דרך האתר ואשמח לשמוע פרטים נוספים על הליווי ולתאם שיחת היכרות.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="שלח/י הודעת וואטסאפ"
      className="fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-peach to-rose grid place-items-center text-primary-foreground shadow-glow hover:scale-110 transition-transform"
    >
      <MessageCircle size={24} />
      <span className="absolute inset-0 rounded-full animate-ping bg-rose/40 -z-10" />
    </a>
  );
}
