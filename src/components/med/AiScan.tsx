import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface AiScanProps {
  steps: string[];
  result: React.ReactNode;
  onReset?: () => void;
  title?: string;
}

const AiScan = ({ steps, result, onReset, title = 'ИИ анализирует документ' }: AiScanProps) => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 500);
    return () => clearTimeout(t);
  }, [step, steps.length]);

  if (done) {
    return (
      <div className="animate-scale-in space-y-4">
        <div className="flex items-center gap-3 rounded-2xl grad-primary px-5 py-4 text-white">
          <Icon name="Sparkles" size={22} />
          <span className="font-display font-bold">Анализ завершён</span>
        </div>
        {result}
        {onReset && (
          <button onClick={onReset} className="text-sm font-medium text-primary hover:underline">
            Загрузить ещё
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5 py-2">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl grad-accent animate-pulse-ring" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl grad-accent text-white">
            <Icon name="BrainCircuit" size={26} className="animate-float" />
          </div>
        </div>
        <div>
          <p className="font-display font-bold">{title}</p>
          <p className="text-sm text-muted-foreground">Искусственный интеллект обрабатывает данные…</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                i < step
                  ? 'bg-primary text-white'
                  : i === step
                  ? 'grad-accent text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {i < step ? (
                <Icon name="Check" size={14} />
              ) : i === step ? (
                <Icon name="Loader" size={14} className="animate-spin" />
              ) : (
                <span className="text-[10px]">{i + 1}</span>
              )}
            </div>
            <span className={i <= step ? 'text-foreground' : 'text-muted-foreground'}>{s}</span>
          </div>
        ))}
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full grad-primary transition-all duration-700"
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AiScan;
