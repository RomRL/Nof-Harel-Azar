const steps = [
  { n: "01", title: "שיחת היכרות", desc: "מפגש ראשון, ללא מחויבות, בו נכיר וננסה להבין מה הביא אותך לפנות." },
  { n: "02", title: "הבנת הצרכים", desc: "נמפה יחד את הקושי, ההיסטוריה הרגשית והכוחות הקיימים." },
  { n: "03", title: "בניית תהליך אישי", desc: "אבנה עבורך תוכנית טיפולית המותאמת בדיוק לשלב, לגיל ולמטרות." },
  { n: "04", title: "ליווי וצמיחה", desc: "מפגשים שבועיים של עיבוד, התנסות וצמיחה — בקצב שלך." },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-36">
      <div className="container-page">
        <div className="max-w-2xl reveal">
          <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">איך נראה התהליך</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-balance">
            תהליך עדין, ברור ומותאם
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            ארבעה שלבים פשוטים שמלווים אותך מהפנייה הראשונה ועד לצמיחה הרגשית.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-9 right-0 left-0 h-px bg-gradient-to-l from-transparent via-rose/40 to-transparent" />

          <div data-stagger="120" className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="reveal relative"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 w-[72px] h-[72px] mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-peach to-rose grid place-items-center shadow-glow">
                  <span className="font-display font-bold text-primary-foreground">{s.n}</span>
                </div>
                <div className="mt-6 text-center lg:text-right">
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
