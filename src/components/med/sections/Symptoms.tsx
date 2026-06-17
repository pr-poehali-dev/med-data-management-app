import { useState } from 'react';
import Icon from '@/components/ui/icon';
import AiScan from '@/components/med/AiScan';
import { Slider } from '@/components/ui/slider';

const SLIDERS = [
  { key: 'energy', label: 'Энергия', icon: 'Zap', color: '38 90% 55%' },
  { key: 'mood', label: 'Настроение', icon: 'Smile', color: '175 70% 41%' },
  { key: 'sleep', label: 'Качество сна', icon: 'Moon', color: '250 80% 65%' },
  { key: 'stress', label: 'Уровень стресса', icon: 'Activity', color: '350 75% 60%' },
] as const;

interface HistoryEntry {
  id: number;
  date: string;
  energy: number;
  mood: number;
  sleep: number;
  stress: number;
  weight: string;
  symptoms: string;
  notes: string;
  aiSummary: string;
}

const DEMO_HISTORY: HistoryEntry[] = [
  {
    id: 1, date: '16 июня 2026', energy: 8, mood: 9, sleep: 7, stress: 3,
    weight: '64', symptoms: '', notes: 'Отличный день, много гуляла',
    aiSummary: 'Состояние отличное. Высокая энергия и позитивный настрой. Сон в норме.',
  },
  {
    id: 2, date: '15 июня 2026', energy: 5, mood: 6, sleep: 5, stress: 7,
    weight: '64.2', symptoms: 'лёгкая головная боль', notes: 'Много работы, устала',
    aiSummary: 'Повышенный стресс влияет на сон и энергию. Рекомендуется отдых и прогулка.',
  },
  {
    id: 3, date: '14 июня 2026', energy: 7, mood: 7, sleep: 8, stress: 4,
    weight: '64.1', symptoms: '', notes: 'Хороший сон, чувствую себя бодро',
    aiSummary: 'Хорошее восстановление после предыдущего дня. Сон улучшился.',
  },
  {
    id: 4, date: '13 июня 2026', energy: 6, mood: 7, sleep: 6, stress: 5,
    weight: '64.3', symptoms: 'насморк', notes: 'Начинается лёгкая простуда',
    aiSummary: 'Возможно начало ОРВИ. Рекомендуется тёплое питьё и отдых.',
  },
  {
    id: 5, date: '12 июня 2026', energy: 9, mood: 9, sleep: 8, stress: 2,
    weight: '64', symptoms: '', notes: 'Выходной, отлично отдохнула',
    aiSummary: 'Прекрасное самочувствие. Отдых позитивно сказался на всех показателях.',
  },
];

const MOOD_EMOJI: Record<number, string> = {
  1: '😣', 2: '😟', 3: '😕', 4: '😐', 5: '🙂',
  6: '😊', 7: '😄', 8: '🤩', 9: '🥳', 10: '🌟',
};

const barColor = (val: number, inverted = false) => {
  const good = inverted ? val <= 4 : val >= 7;
  const mid = inverted ? val <= 6 : val >= 5;
  if (good) return 'bg-primary';
  if (mid) return 'bg-amber-400';
  return 'bg-destructive';
};

const Symptoms = () => {
  const [vals, setVals] = useState<Record<string, number>>({ energy: 7, mood: 8, sleep: 6, stress: 4 });
  const [weight, setWeight] = useState('64');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(DEMO_HISTORY);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [tab, setTab] = useState<'new' | 'history'>('new');

  const set = (k: string, v: number) => setVals((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setAnalyzing(true);
  };

  const handleReset = () => {
    const newEntry: HistoryEntry = {
      id: Date.now(),
      date: '17 июня 2026',
      energy: vals.energy,
      mood: vals.mood,
      sleep: vals.sleep,
      stress: vals.stress,
      weight,
      symptoms,
      notes,
      aiSummary: 'Хорошее общее самочувствие. Настроение и энергия выше среднего, уровень стресса низкий.',
    };
    setHistory((p) => [newEntry, ...p]);
    setAnalyzing(false);
    setSymptoms('');
    setNotes('');
    setTab('history');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Дневник самочувствия</h2>
        <p className="text-muted-foreground">Отметьте состояние — ИИ даст интерпретацию и рекомендации</p>
      </div>

      <div className="flex gap-1 rounded-2xl bg-secondary p-1 animate-fade-in">
        {([['new', 'Новая запись', 'PenLine'], ['history', 'История', 'CalendarDays']] as const).map(([k, l, ic]) => (
          <button
            key={k}
            onClick={() => { setTab(k); setAnalyzing(false); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              tab === k ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={ic} size={16} /> {l}
          </button>
        ))}
      </div>

      {tab === 'new' && (
        <>
          {!analyzing ? (
            <div className="card-hover animate-scale-in space-y-6 rounded-3xl border border-border bg-card p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {SLIDERS.map((s) => (
                  <div key={s.key} className="rounded-2xl bg-secondary/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <Icon name={s.icon} size={16} style={{ color: `hsl(${s.color})` }} /> {s.label}
                      </span>
                      <span className="font-display text-lg font-bold" style={{ color: `hsl(${s.color})` }}>{vals[s.key]}</span>
                    </div>
                    <Slider value={[vals[s.key]]} min={1} max={10} step={1} onValueChange={(v) => set(s.key, v[0])} />
                  </div>
                ))}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Вес, кг</label>
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-32 rounded-xl border border-border bg-card px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Симптомы</label>
                <input
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Например: головная боль, усталость…"
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Заметки</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Как прошёл день…"
                  className="w-full resize-none rounded-xl border border-border bg-card px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                onClick={handleSave}
                className="flex w-full items-center justify-center gap-2 rounded-xl grad-primary py-3.5 font-display font-bold text-white hover-scale"
              >
                <Icon name="Sparkles" size={18} /> Сохранить и проанализировать
              </button>
            </div>
          ) : (
            <div className="card-hover rounded-3xl border border-border bg-card p-6">
              <AiScan
                title="ИИ анализирует ваше состояние"
                steps={['Сбор данных дневника', 'Сопоставление с историей', 'Формирование рекомендаций']}
                onReset={handleReset}
                result={
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-primary/5 p-4">
                      <p className="mb-1 font-semibold">Интерпретация состояния</p>
                      <p className="text-sm text-muted-foreground">
                        Хорошее общее самочувствие. Настроение и энергия выше среднего, уровень стресса низкий. Сон слегка ниже оптимального — это может влиять на восстановление.
                      </p>
                    </div>
                    {[
                      { icon: 'Moon', t: 'Сон', d: 'Старайтесь ложиться на 30–40 минут раньше для повышения качества сна' },
                      { icon: 'Droplet', t: 'Гидратация', d: 'Поддерживайте 1.8–2 л воды в день — это повысит уровень энергии' },
                      { icon: 'Wind', t: 'Стресс', d: 'Текущий уровень стресса в норме, продолжайте практики отдыха' },
                    ].map((r) => (
                      <div key={r.t} className="flex gap-3 rounded-2xl border border-border p-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl grad-primary text-white">
                          <Icon name={r.icon} size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{r.t}</p>
                          <p className="text-sm text-muted-foreground">{r.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>
          )}
        </>
      )}

      {tab === 'history' && (
        <div className="space-y-3 animate-fade-in">
          {history.map((entry, i) => {
            const isOpen = expanded === entry.id;
            return (
              <div
                key={entry.id}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-fade-in overflow-hidden rounded-3xl border border-border bg-card transition-all"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : entry.id)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-2xl">
                    {MOOD_EMOJI[entry.mood] ?? '🙂'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold">{entry.date}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {entry.symptoms || entry.notes || 'Без симптомов'}
                    </p>
                  </div>
                  <div className="hidden items-center gap-3 sm:flex">
                    {[
                      { label: 'Энергия', val: entry.energy, inv: false },
                      { label: 'Сон', val: entry.sleep, inv: false },
                      { label: 'Стресс', val: entry.stress, inv: true },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="mb-1 flex h-8 w-8 items-center justify-end justify-center gap-0.5 flex-col">
                          <div className={`w-1.5 rounded-full ${barColor(m.val, m.inv)} transition-all`} style={{ height: `${m.val * 3}px` }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={18} className="shrink-0 text-muted-foreground" />
                </button>

                {isOpen && (
                  <div className="animate-fade-in space-y-4 border-t border-border px-5 pb-5 pt-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        { label: 'Энергия', val: entry.energy, icon: 'Zap', color: '38 90% 55%' },
                        { label: 'Настроение', val: entry.mood, icon: 'Smile', color: '175 70% 41%' },
                        { label: 'Сон', val: entry.sleep, icon: 'Moon', color: '250 80% 65%' },
                        { label: 'Стресс', val: entry.stress, icon: 'Activity', color: '350 75% 60%' },
                      ].map((m) => (
                        <div key={m.label} className="rounded-2xl bg-secondary/60 p-3 text-center">
                          <Icon name={m.icon} size={16} className="mx-auto mb-1" style={{ color: `hsl(${m.color})` }} />
                          <p className="font-display text-xl font-extrabold">{m.val}</p>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {(entry.weight || entry.symptoms || entry.notes) && (
                      <div className="space-y-2 text-sm">
                        {entry.weight && (
                          <div className="flex items-center gap-2">
                            <Icon name="Weight" size={15} className="text-muted-foreground" fallback="Scale" />
                            <span className="text-muted-foreground">Вес:</span>
                            <span className="font-medium">{entry.weight} кг</span>
                          </div>
                        )}
                        {entry.symptoms && (
                          <div className="flex items-center gap-2">
                            <Icon name="AlertCircle" size={15} className="text-destructive" />
                            <span className="text-muted-foreground">Симптомы:</span>
                            <span className="font-medium">{entry.symptoms}</span>
                          </div>
                        )}
                        {entry.notes && (
                          <div className="flex items-start gap-2">
                            <Icon name="MessageSquare" size={15} className="mt-0.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Заметка:</span>
                            <span className="font-medium">{entry.notes}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 p-4">
                      <div className="mb-1.5 flex items-center gap-2">
                        <Icon name="Sparkles" size={14} className="text-primary" />
                        <span className="text-xs font-semibold text-primary">Сводка ИИ</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.aiSummary}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Symptoms;
