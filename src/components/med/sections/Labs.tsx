import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Sparkline from '@/components/med/Sparkline';
import { LABS, LabMarker } from '@/lib/medData';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const STATUS = {
  normal: { label: 'Норма', color: '175 70% 41%', badge: 'bg-primary/10 text-primary' },
  high: { label: 'Выше нормы', color: '350 75% 60%', badge: 'bg-destructive/10 text-destructive' },
  low: { label: 'Ниже нормы', color: '38 90% 50%', badge: 'bg-amber-500/10 text-amber-600' },
};

const Labs = () => {
  const [open, setOpen] = useState<LabMarker | null>(null);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Анализы</h2>
        <p className="text-muted-foreground">Динамика лабораторных показателей с ИИ-интерпретацией</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LABS.map((l, i) => {
          const st = STATUS[l.status];
          return (
            <button
              key={l.id}
              onClick={() => setOpen(l)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-5 text-left"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.date}</p>
                </div>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${st.badge}`}>{st.label}</span>
              </div>
              <div className="mb-3 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold">{l.value}</span>
                <span className="text-sm text-muted-foreground">{l.unit}</span>
              </div>
              <Sparkline data={l.history} color={st.color} />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Норма: {l.ref}</span>
                <span className="flex items-center gap-1 text-primary">Подробнее <Icon name="ArrowRight" size={12} /></span>
              </div>
            </button>
          );
        })}
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-lg">
          {open && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xl font-extrabold">{open.name}</h3>
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${STATUS[open.status].badge}`}>{STATUS[open.status].label}</span>
                </div>
                <p className="text-sm text-muted-foreground">Норма: {open.ref} {open.unit}</p>
              </div>

              <div className="rounded-2xl border border-border p-4">
                <Sparkline data={open.history} color={STATUS[open.status].color} height={90} />
                <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                  {open.history.map((h) => <span key={h.date}>{h.date}</span>)}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">История изменений</p>
                <div className="max-h-40 space-y-1 overflow-auto">
                  {[...open.history].reverse().map((h) => (
                    <div key={h.date} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm">
                      <span className="text-muted-foreground">2026, {h.date}</span>
                      <span className="font-semibold">{h.value} {open.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl grad-accent p-0.5">
                <div className="rounded-[14px] bg-card p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon name="Sparkles" size={16} className="text-accent" />
                    <span className="font-semibold">Комментарий ИИ</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{open.ai}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Labs;
