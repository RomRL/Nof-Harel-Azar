import { Heart, Users, LifeBuoy, Baby, Brain, Sparkles, Wind, Compass } from "lucide-react";

const items = [
  { icon: Wind, title: "חרדה ופוביה", desc: "כלים לוויסות, חשיפה הדרגתית והפחתת עצימות החרדה." },
  { icon: Users, title: "הדרכת הורים", desc: "מרחב הורי לחיזוק הקשר, הצבת גבולות ושיח רגשי בבית." },
  { icon: LifeBuoy, title: "משברי חיים", desc: "ליווי בתקופות שינוי, אובדן, גירושין ומעברים מורכבים." },
  { icon: Baby, title: "ילדים ונוער", desc: "טיפול רגיש לגיל, דרך משחק, שיח וטכניקות יצירתיות." },
  { icon: Brain, title: "טיפול CBT", desc: "כלים קוגניטיביים-התנהגותיים מעודכנים ומבוססי מחקר." },
  { icon: Sparkles, title: "ביטחון עצמי", desc: "בנייה הדרגתית של דימוי עצמי בריא וקשר חומל עם עצמי." },
  { icon: Heart, title: "וויסות רגשי", desc: "זיהוי, הכלה ועיבוד של רגשות עוצמתיים בגיל הילדות והנעורים." },
  { icon: Compass, title: "תקופות מעבר", desc: "ליווי במעברי חיים — בית ספר, משפחה, התבגרות והעצמה." },
];

export default function Specializations() {
  return (
    <section id="specializations" className="relative py-24 md:py-36 bg-gradient-soft">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">תחומי התמחות</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-balance">
            ליווי מקצועי המותאם לצרכים שלך
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            כל אדם הוא עולם ומלואו. אני מתאימה את התהליך הטיפולי בקפידה לכל פנייה, מתוך הבנה עמוקה של עולם הרגש והתפתחות הילד.
          </p>
        </div>

        <div data-stagger="90" className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal group relative rounded-3xl bg-white/70 backdrop-blur-md border border-white p-6 md:p-7 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-500"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach to-rose/80 grid place-items-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform">
                <it.icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-peach/0 to-rose/0 group-hover:from-peach/10 group-hover:to-rose/5 transition-all pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
