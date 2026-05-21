import { useState } from "react";
import { Quote, ChevronRight, ChevronLeft } from "lucide-react";

const items = [
  {
    text: "אחרי תקופה ארוכה של חרדות אצל הבן שלי, מצאנו אצל נוף מרחב חם ומקצועי. הליווי שלה החזיר לנו את הילד שאנחנו מכירים.",
    author: "ש׳, אמא לבן 9",
  },
  {
    text: "נוף ידעה לדבר אליי בגובה העיניים, בלי להרגיש שאני 'בטיפול'. קיבלתי כלים אמיתיים להתמודד עם הלחץ של בית הספר.",
    author: "נ׳, נער בן 15",
  },
  {
    text: "כהורים, ההדרכה שקיבלנו שינתה את האווירה בבית. למדנו להקשיב אחרת, ולראות את הילדה שלנו באמת.",
    author: "א׳ ו־ר׳, הורים",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p - 1 + items.length) % items.length);
  const next = () => setI((p) => (p + 1) % items.length);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="blob bg-peach w-[400px] h-[400px] top-10 right-0 animate-float-slow" />
      <div className="container-page relative">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">המלצות</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-balance">
            מילים של מטופלים והורים
          </h2>
        </div>

        <div className="mt-14 max-w-3xl mx-auto reveal">
          <div className="glass rounded-[2rem] p-8 md:p-12 shadow-card relative">
            <Quote className="text-rose/70 absolute top-6 right-6" size={36} />
            <div className="min-h-[180px] flex flex-col justify-center">
              <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground/90 text-balance">
                "{items[i].text}"
              </p>
              <p className="mt-6 text-sm text-muted-foreground">— {items[i].author}</p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`המלצה ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-8 bg-rose" : "w-2 bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} aria-label="הקודם" className="w-10 h-10 rounded-full bg-white/80 hover:bg-white grid place-items-center shadow-soft transition">
                  <ChevronRight size={18} />
                </button>
                <button onClick={next} aria-label="הבא" className="w-10 h-10 rounded-full bg-foreground text-background grid place-items-center hover:shadow-glow transition">
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
