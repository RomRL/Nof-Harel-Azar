import portrait from "@/assets/therapist-portrait.jpg";
import { ArrowLeft } from "lucide-react";

const chips = ["חרדה", "מתבגרים", "הדרכת הורים", "CBT", "משברי חיים"];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] pt-24 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-gradient-hero">
      {/* Floating blobs */}
      <div className="blob bg-peach w-[420px] h-[420px] -top-20 -right-32 animate-float-slow" />
      <div className="blob bg-rose w-[380px] h-[380px] top-1/3 -left-32 animate-float-slower" />
      <div className="blob bg-peach-soft w-[300px] h-[300px] bottom-0 right-1/3 animate-float-slow" />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Portrait first on mobile */}
          <div className="relative order-1 lg:order-2 animate-fade-in">
            <div className="relative mx-auto w-[58%] max-w-[260px] sm:w-auto sm:max-w-[360px] lg:max-w-[440px]">
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-peach/60 to-rose/40 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] blur-2xl" />
              <div className="relative aspect-[4/5] rounded-[40%_60%_55%_45%/55%_45%_60%_40%] overflow-hidden shadow-glow">
                <img
                  src={portrait}
                  alt="נוף הראל־עזר, פסיכולוגית חינוכית"
                  width={896}
                  height={1152}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="hidden md:block absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 shadow-card text-xs">
                <div className="font-semibold text-foreground">+10 שנות ניסיון</div>
                <div className="text-muted-foreground">קליני וחינוכי</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1 text-center lg:text-right animate-fade-up">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-foreground/75 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-rose" />
              פסיכולוגית חינוכית בהתמחות
            </span>
            <h1 className="font-display text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.12] text-foreground text-balance">
              מרחב בטוח
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-rose to-foreground">לצמיחה רגשית</span>
              <br />
              והתפתחות
            </h1>
            <p className="mt-5 md:mt-7 text-[15px] md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
              שמי נוף הראל־עזר, פסיכולוגית חינוכית בהתמחות. אני מלווה ילדים, מתבגרים והורים בתהליכים רגשיים מתוך הקשבה, רגישות וכלים טיפוליים עדכניים.
            </p>

            <div className="mt-7 md:mt-9 flex flex-col sm:flex-row gap-3 sm:items-center justify-center lg:justify-start">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 md:px-7 py-3.5 md:py-4 font-medium hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                לקביעת שיחת היכרות
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full glass px-6 md:px-7 py-3.5 md:py-4 font-medium text-foreground hover:bg-white/80 transition-all"
              >
                קצת עליי
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2 justify-center lg:justify-start">
              {chips.map((c) => (
                <span
                  key={c}
                  className="glass rounded-full px-4 py-1.5 text-xs text-foreground/75 hover:scale-105 transition-transform"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] tracking-[0.3em] uppercase">scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-rose to-transparent animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
