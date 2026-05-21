import portrait from "@/assets/therapist-portrait.jpg";
import { Quote } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      <div className="blob bg-peach-soft w-[400px] h-[400px] top-20 -right-40 animate-float-slow" />
      <div className="container-page relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="absolute -inset-5 bg-gradient-to-br from-peach/50 to-beige/60 rounded-[55%_45%_40%_60%/50%_60%_40%_50%] blur-xl" />
              <div className="relative aspect-square rounded-[55%_45%_40%_60%/50%_60%_40%_50%] overflow-hidden shadow-card">
                <img src={portrait} alt="נוף הראל־עזר" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 right-6 glass rounded-2xl p-5 shadow-card max-w-[220px]">
                <Quote className="text-rose mb-2" size={22} />
                <p className="text-xs leading-relaxed text-foreground/80">
                  טיפול מתחיל בקשר אנושי בטוח ומכיל.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">קצת עליי</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-[1.15] text-balance">
              ליווי רגשי שמתחיל
              <br />
              <span className="text-rose">בהקשבה אמיתית</span>
            </h2>
            <div className="mt-7 space-y-5 text-foreground/75 leading-relaxed md:text-lg">
              <p>
                אני פסיכולוגית חינוכית בהתמחות, מלווה ילדים, מתבגרים והורים מתוך אמונה עמוקה בכוחו של תהליך טיפולי אישי, רגיש ומכיל. בשנים האחרונות צברתי ניסיון בעבודה במערכת החינוך, במרפאות פסיכולוגיות ובמסגרות פרטיות.
              </p>
              <p>
                בעבודתי אני משלבת גישה פסיכודינמית עמוקה יחד עם כלים פרקטיים מעולם ה־CBT, תוך התאמה מדויקת לכל מטופל ולשלב בו הוא נמצא בחייו. אני מאמינה שכל אחד יכול לצמוח כשהוא מרגיש שיש לו מרחב בטוח להיות בו הוא באמת.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 md:gap-5">
              {[
                { n: "+10", l: "שנות ניסיון" },
                { n: "500+", l: "מטופלים" },
                { n: "100%", l: "סודיות מלאה" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-2xl p-4 md:p-5 text-center shadow-soft">
                  <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{s.n}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
