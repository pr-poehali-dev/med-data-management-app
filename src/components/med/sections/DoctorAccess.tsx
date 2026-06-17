import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { DOCS } from '@/lib/medData';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const PERIODS = ['1 час', '24 часа', '7 дней', '30 дней'];

const DoctorAccess = () => {
  const [period, setPeriod] = useState('24 часа');
  const [selected, setSelected] = useState<string[]>(DOCS.slice(0, 3).map((d) => d.id));
  const [generated, setGenerated] = useState(false);

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Доступ врачу</h2>
        <p className="text-muted-foreground">Создайте защищённую ссылку или QR-код для просмотра документов</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-hover animate-scale-in space-y-5 rounded-3xl border border-border bg-card p-6">
          <div>
            <p className="mb-2 font-semibold">Срок действия</p>
            <div className="flex flex-wrap gap-2">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setGenerated(false); }}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    period === p ? 'grad-primary text-white' : 'border border-border hover:bg-secondary'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold">Доступные документы <span className="text-sm font-normal text-muted-foreground">({selected.length})</span></p>
            <div className="max-h-64 space-y-2 overflow-auto pr-1">
              {DOCS.map((d) => (
                <label key={d.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `hsl(${d.color} / 0.12)`, color: `hsl(${d.color})` }}>
                    <Icon name={d.icon} size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.category}</p>
                  </div>
                  <Switch checked={selected.includes(d.id)} onCheckedChange={() => { toggle(d.id); setGenerated(false); }} />
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setGenerated(true); toast.success('Доступ создан (демо)'); }}
            className="flex w-full items-center justify-center gap-2 rounded-xl grad-primary py-3.5 font-display font-bold text-white hover-scale"
          >
            <Icon name="Link" size={18} /> Создать доступ
          </button>
        </div>

        <div className="card-hover animate-scale-in flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 text-center">
          {generated ? (
            <div className="animate-scale-in space-y-4">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-white p-4 shadow-lg shadow-primary/10 ring-1 ring-border">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`h-3.5 w-3.5 rounded-[2px] ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-display font-bold">QR-код готов</p>
                <p className="text-sm text-muted-foreground">{selected.length} документов · действует {period}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-sm">
                <Icon name="Link2" size={15} className="text-primary" />
                <span className="truncate text-muted-foreground">vitae.health/d/a8f3x2</span>
                <button onClick={() => toast.success('Ссылка скопирована')} className="ml-auto text-primary">
                  <Icon name="Copy" size={15} />
                </button>
              </div>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Icon name="ShieldCheck" size={13} className="text-primary" /> Защищённый временный доступ
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-muted-foreground">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary">
                <Icon name="QrCode" size={36} className="text-primary" />
              </div>
              <p className="font-display font-bold text-foreground">Здесь появится QR-код</p>
              <p className="text-sm">Выберите документы и срок, затем создайте доступ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAccess;
