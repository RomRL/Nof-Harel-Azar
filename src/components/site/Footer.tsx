export default function Footer() {
  return (
    <footer className="bg-gradient-soft border-t border-border/60">
      <div className="container-page py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-peach to-rose grid place-items-center text-primary-foreground font-bold shadow-soft">נ</span>
              <div>
                <div className="font-display font-semibold">נוף הראל־עזר</div>
                <div className="text-xs text-muted-foreground">פסיכולוגית חינוכית בהתמחות</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              ליווי רגשי לילדים, מתבגרים והורים — בקליניקה ואונליין.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-rose font-medium mb-4">ניווט</div>
            <ul className="space-y-2 text-sm">
              {[
                ["#about", "אודות"],
                ["#specializations", "תחומי התמחות"],
                ["#process", "התהליך"],
                ["#faq", "שאלות נפוצות"],
                ["#contact", "יצירת קשר"],
              ].map(([h, l]) => (
                <li key={h}><a href={h} className="text-foreground/70 hover:text-foreground transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-rose font-medium mb-4">פרטים</div>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>קריות · חיפה · אונליין</li>
              <li dir="ltr" className="text-right">+972 54 75 75 612</li>
              <li>
                <a
                  href={`mailto:romharel98@gmail.com?subject=${encodeURIComponent("פנייה דרך האתר")}&body=${encodeURIComponent("שלום נוף הראל,\n\nהגעתי דרך האתר ואשמח לשמוע פרטים נוספים על הליווי ולתאם שיחת היכרות.\n\nתודה,")}`}
                  className="hover:text-foreground transition"
                  dir="ltr"
                >
                  romharel98@gmail.com
                </a>
              </li>
              <li><a href="#" className="hover:text-foreground transition">הצהרת נגישות</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <div>© {new Date().getFullYear()} נוף הראל־עזר. כל הזכויות שמורות.</div>
          <div>עוצב באהבה, בתשומת לב לפרטים.</div>
        </div>
      </div>
    </footer>
  );
}
