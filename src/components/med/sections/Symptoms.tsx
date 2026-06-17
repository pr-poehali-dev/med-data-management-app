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

const Symptoms = () => {
  const [vals, setVals] = useState<Record<string, number>>({ energy: 7, mood: 8, sleep: 6, stress: 4 });
  const [weight, setWeight] = useState('64');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const set = (k: string, v: number) => setVals((p) => ({ ...p, [k]: v }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Дневник самочувствия</h2>
        <p className="text-muted-foreground">Отметьте состояние — ИИ даст интерпретацию и рекомендации</p>
      </div>

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
            onClick={() => setAnalyzing(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl grad-primary py-3.5 font-display font-bold text-white hover-scale"
          >
            <Icon name="Sparkles" size={18} /> Сохранить и проанализировать
          </button>
        </div>
      ) : (
        <div className="card-hover rounded-3xl border border-border bg-card p-6">
          <AiScan
            title="ИИ анализирует ваше состояние"
            steps={[
              'Сбор данных дневника',
              'Сопоставление с историей',
              'Формирование рекомендаций',
            ]}
            onReset={() => setAnalyzing(false)}
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
    </div>
  );
};

export default Symptoms;
