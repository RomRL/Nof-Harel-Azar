import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "למי מתאים הטיפול?", a: "אני מטפלת בילדים ונוער (גילאי 6+), במתבגרים, ובהורים המעוניינים בהדרכה. הגישה מתאימה למי שמתמודד עם חרדה, קשיים רגשיים, מעברי חיים, או פשוט רוצה מרחב להתבונן בעצמו." },
  { q: "כמה זמן נמשך תהליך טיפולי?", a: "כל תהליך הוא ייחודי. ישנם תהליכים קצרים וממוקדים של מספר חודשים, ויש תהליכים ארוכים יותר. בשיחת ההיכרות נשרטט יחד את המסגרת המתאימה." },
  { q: "האם ניתן לקיים מפגשים אונליין?", a: "בהחלט. אני מקיימת מפגשים גם פנים אל פנים בקליניקה באזור הקריות וחיפה, וגם אונליין דרך פלטפורמה מאובטחת." },
  { q: "איך מתחילים?", a: "פשוט מאוד — שולחים הודעה בוואטסאפ או דרך הטופס, ואני חוזרת תוך 24 שעות לקביעת שיחת היכרות קצרה (ללא עלות וללא מחויבות)." },
  { q: "האם יש הדרכת הורים?", a: "כן. הדרכת הורים היא חלק מרכזי בעבודתי. לעיתים זה תהליך עצמאי, ולעיתים זה משולב כחלק מהטיפול בילד." },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-36 bg-gradient-soft">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <span className="text-xs tracking-[0.3em] uppercase text-rose font-medium">שאלות נפוצות</span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold text-balance">
              כל מה שחשוב לדעת לפני שמתחילים.
            </h2>
            <p className="mt-5 text-muted-foreground">
              לא מצאת תשובה? אפשר תמיד לכתוב לי ישירות.
            </p>
          </div>

          <div className="lg:col-span-8 reveal">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-none glass rounded-2xl px-6 shadow-soft"
                >
                  <AccordionTrigger className="text-right hover:no-underline py-5 font-display text-base md:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/75 leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
