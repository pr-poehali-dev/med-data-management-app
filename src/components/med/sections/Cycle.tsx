import Icon from '@/components/ui/icon';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
// June 2026 starts on Monday
const PERIOD = [3, 4, 5, 6, 7];
const FERTILE = [15, 16, 17, 18, 19];
const OVULATION = 17;
const TODAY = 17;

const Cycle = () => {
  const cells = Array.from({ length: 30 }, (_, i) => i + 1);

  const cellStyle = (d: number) => {
    if (d === OVULATION) return 'grad-accent text-white shadow-md';
    if (PERIOD.includes(d)) return 'bg-rose-400 text-white';
    if (FERTILE.includes(d)) return 'bg-violet-200/70 text-violet-700';
    return 'hover:bg-secondary';
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Женский календарь</h2>
        <p className="text-muted-foreground">Цикл, прогноз событий и история симптомов</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-hover animate-scale-in rounded-3xl border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Июнь 2026</h3>
            <div className="flex gap-1">
              <button className="rounded-lg p-1.5 hover:bg-secondary"><Icon name="ChevronLeft" size={18} /></button>
              <button className="rounded-lg p-1.5 hover:bg-secondary"><Icon name="ChevronRight" size={18} /></button>
            </div>
          </div>
          <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-xs font-medium text-muted-foreground">
            {DAYS.map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((d) => (
              <div key={d} className="relative">
                <div className={`flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-colors ${cellStyle(d)}`}>
                  {d}
                </div>
                {d === TODAY && <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white" />}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-rose-400" /> Менструация</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-violet-200" /> Фертильное окно</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded grad-accent" /> Овуляция</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-hover animate-fade-in rounded-3xl grad-accent p-6 text-white">
            <Icon name="CalendarHeart" size={24} className="mb-2" />
            <p className="text-sm text-white/85">До следующего цикла</p>
            <p className="font-display text-3xl font-extrabold">14 дней</p>
            <p className="mt-1 text-sm text-white/85">Прогноз: 1 июля 2026</p>
          </div>
          <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
            <p className="mb-3 font-semibold">Прогноз событий</p>
            {[
              { icon: 'Egg', t: 'Овуляция', d: 'Сегодня, 17 июня' },
              { icon: 'Droplets', t: 'Менструация', d: '1 июля' },
              { icon: 'Sparkles', t: 'Фертильность', d: 'высокая' },
            ].map((e) => (
              <div key={e.t} className="flex items-center gap-3 border-t border-border py-2.5 first:border-0 first:pt-0">
                <Icon name={e.icon} size={16} className="text-accent" />
                <span className="text-sm">{e.t}</span>
                <span className="ml-auto text-sm text-muted-foreground">{e.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
          <p className="mb-3 font-semibold">Настроение и симптомы</p>
          {[
            { d: '16 июня', mood: '😊 Бодрость', s: 'без симптомов' },
            { d: '14 июня', mood: '😐 Усталость', s: 'лёгкая головная боль' },
            { d: '12 июня', mood: '🙂 Спокойствие', s: 'без симптомов' },
          ].map((r) => (
            <div key={r.d} className="flex items-center justify-between border-t border-border py-2.5 text-sm first:border-0 first:pt-0">
              <span className="text-muted-foreground">{r.d}</span>
              <span>{r.mood}</span>
              <span className="text-muted-foreground">{r.s}</span>
            </div>
          ))}
        </div>
        <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
          <p className="mb-3 font-semibold">Заметки</p>
          <textarea
            rows={5}
            placeholder="Добавьте заметку о самочувствии…"
            className="w-full resize-none rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Cycle;
