import { ShieldCheck, HeartHandshake, Lightbulb, Users } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "ביטחון רגשי", desc: "מרחב מכיל, ללא שיפוטיות, בו כל רגש לגיטימי." },
  { icon: HeartHandshake, title: "התאמה אישית", desc: "כל תהליך נבנה במיוחד עבורך — לא יש פתרון אחד לכולם." },
  { icon: Lightbulb, title: "כלים מעשיים", desc: "שילוב CBT וגישות עכשוויות שמייצרים שינוי בר־קיימא." },
  { icon: Users, title: "שותפות הורים", desc: "כשנדרש — אני מלווה גם את ההורים כחלק מהתהליך." },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-24 md:py-36 bg-gradient-warm overflow-hidden">
      <div className="blob bg-white w-[400px] h-[400px] -top-20 left-1/4 opacity-40 animate-float-slower" />
      <div className="blob bg-rose w-[350px] h-[350px] bottom-0 right-0 opacity-30 animate-float-slow" />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 reveal">
            <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">הגישה הטיפולית</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-[1.15] text-balance">
              טיפול שמכבד את הקצב שלך,
              <br />
              <span className="text-rose">ואת הסיפור שלך.</span>
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg leading-relaxed">
              אני מאמינה שכוחו של הטיפול נמצא בקשר. בעבודה משותפת שבה את/ה מרגיש/ה ראוי/ה לרכות, להבנה ולכלים אמיתיים שעוזרים להתמודד עם החיים — לא רק בקליניקה.
            </p>
          </div>

          <div data-stagger="100" className="lg:col-span-7 grid sm:grid-cols-2 gap-4 md:gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="reveal glass rounded-3xl p-6 md:p-8 shadow-card hover:-translate-y-1 transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-white grid place-items-center text-rose mb-5 shadow-soft">
                  <p.icon size={20} />
                </div>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm md:text-base text-foreground/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
