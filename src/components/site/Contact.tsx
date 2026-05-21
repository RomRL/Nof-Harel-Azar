import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error(
        "[Contact] VITE_WEB3FORMS_ACCESS_KEY is not set. The contact form will not work until it is configured on Vercel.",
      );
      toast({
        variant: "destructive",
        title: "הטופס אינו מוגדר",
        description: "אנא צרי קשר בטלפון או בוואטסאפ.",
      });
      return;
    }

    const data = new FormData(form);
    data.set("access_key", accessKey);
    data.set("subject", "פנייה חדשה מהאתר");
    data.set("from_name", "אתר נוף הראל־עזר");

    setSending(true);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: data,
      });
      const json = (await res.json()) as { success?: boolean; message?: string };

      if (res.ok && json.success) {
        toast({ title: "ההודעה נשלחה", description: "אחזור אליך בהקדם האפשרי." });
        form.reset();
      } else {
        throw new Error(json.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("[Contact] submission failed", err);
      toast({
        variant: "destructive",
        title: "שליחת ההודעה נכשלה",
        description: "אנא נסי שוב, או צרי קשר בטלפון/וואטסאפ.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="blob bg-peach w-[500px] h-[500px] top-0 -left-40 animate-float-slow" />
      <div className="blob bg-rose w-[400px] h-[400px] bottom-0 -right-40 animate-float-slower" />

      <div className="container-page relative">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">יצירת קשר</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.15]">
            אפשר להתחיל
            <br />
            <span className="text-rose">בצעד קטן.</span>
          </h2>
          <p className="mt-6 text-muted-foreground md:text-lg">
            אם את/ה מרגיש/ה שזה הזמן לקבל ליווי רגשי — אני כאן. אשמח להכיר ולשמוע מה עובר עליך.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={onSubmit} className="reveal lg:col-span-3 glass rounded-3xl p-7 md:p-10 shadow-card space-y-4">
            {/* Honeypot — real users leave this empty; Web3Forms drops the message if it has a value */}
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />
            <div>
              <label className="block text-sm text-foreground/75 mb-2">שם מלא</label>
              <input required type="text" name="name" className="w-full rounded-2xl bg-white/70 border border-border px-5 py-3.5 outline-none focus:border-rose transition" placeholder="השם שלך" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-foreground/75 mb-2">טלפון</label>
                <input required type="tel" name="phone" dir="ltr" className="w-full text-right rounded-2xl bg-white/70 border border-border px-5 py-3.5 outline-none focus:border-rose transition" placeholder="050-0000000" />
              </div>
              <div>
                <label className="block text-sm text-foreground/75 mb-2">אימייל</label>
                <input type="email" name="email" dir="ltr" className="w-full text-right rounded-2xl bg-white/70 border border-border px-5 py-3.5 outline-none focus:border-rose transition" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-foreground/75 mb-2">איך אוכל לעזור?</label>
              <textarea rows={4} name="message" className="w-full rounded-2xl bg-white/70 border border-border px-5 py-3.5 outline-none focus:border-rose transition resize-none" placeholder="כמה מילים על מה שמביא אותך לפנות..." />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-foreground text-background py-4 font-medium hover:shadow-glow transition-all disabled:opacity-60"
            >
              {sending ? "שולחת..." : "שליחת הודעה"}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              הפנייה חסויה לחלוטין. אחזור אליך תוך 24 שעות.
            </p>
          </form>

          {/* Info */}
          <div className="reveal lg:col-span-2 space-y-4">
            <a href="tel:+972544623712" className="flex items-center gap-4 glass rounded-2xl p-5 shadow-soft hover:-translate-y-0.5 transition">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach to-rose grid place-items-center text-primary-foreground"><Phone size={18} /></div>
              <div>
                <div className="text-xs text-muted-foreground">חייגי/חייג</div>
                <div className="font-medium" dir="ltr">054-462-3712</div>
              </div>
            </a>
            <a href={`https://wa.me/972544623712?text=${encodeURIComponent("שלום נוף הראל, הגעתי דרך האתר ואשמח לשמוע פרטים נוספים על הליווי ולתאם שיחת היכרות.")}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 glass rounded-2xl p-5 shadow-soft hover:-translate-y-0.5 transition">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach to-rose grid place-items-center text-primary-foreground"><MessageCircle size={18} /></div>
              <div>
                <div className="text-xs text-muted-foreground">וואטסאפ</div>
                <div className="font-medium">להודעה מהירה</div>
              </div>
            </a>
            <a
              href={`mailto:romharel98@gmail.com?subject=${encodeURIComponent("פנייה דרך האתר")}&body=${encodeURIComponent("שלום נוף הראל,\n\nהגעתי דרך האתר ואשמח לשמוע פרטים נוספים על הליווי ולתאם שיחת היכרות.\n\nתודה,")}`}
              className="flex items-center gap-4 glass rounded-2xl p-5 shadow-soft hover:-translate-y-0.5 transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach to-rose grid place-items-center text-primary-foreground"><Mail size={18} /></div>
              <div>
                <div className="text-xs text-muted-foreground">אימייל</div>
                <div className="font-medium" dir="ltr">romharel98@gmail.com</div>
              </div>
            </a>
            <div className="glass rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-rose" />
                <div className="font-medium">אזורי שירות</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["קריות", "חיפה", "אונליין"].map((a) => (
                  <span key={a} className="bg-white/70 rounded-full px-3 py-1 text-xs text-foreground/75">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
