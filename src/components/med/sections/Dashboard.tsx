import Icon from '@/components/ui/icon';
import Sparkline from '@/components/med/Sparkline';
import { LABS, RECENT_DOCS, HEALTH_CHANGES, NavKey } from '@/lib/medData';

const STATS = [
  { key: 'docs', label: 'Документов', value: '63', icon: 'Files', grad: 'from-teal-400 to-cyan-500', sub: '+4 за неделю' },
  { key: 'labs', label: 'Анализов', value: '18', icon: 'FlaskConical', grad: 'from-violet-400 to-indigo-500', sub: '6 показателей' },
  { key: 'family', label: 'Членов семьи', value: '4', icon: 'Users', grad: 'from-pink-400 to-rose-500', sub: 'все профили активны' },
  { key: 'storage', label: 'Хранилище', value: '6.4 ГБ', icon: 'HardDrive', grad: 'from-amber-400 to-orange-500', sub: 'из 15 ГБ' },
] as const;

const Dashboard = ({ onNavigate }: { onNavigate: (k: NavKey) => void }) => {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="animate-fade-in overflow-hidden rounded-3xl grad-primary p-6 text-white sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/80">Доброе утро,</p>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Анна Соколова</h2>
            <p className="mt-2 max-w-md text-sm text-white/85">
              Здоровье вашей семьи под контролем. Сегодня всё в порядке — 1 показатель требует внимания.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <svg viewBox="0 0 36 36" className="absolute h-16 w-16 -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="white" strokeWidth="3" strokeDasharray="100" strokeDashoffset="13" strokeLinecap="round" />
              </svg>
              <span className="font-display text-xl font-bold">87</span>
            </div>
            <div>
              <p className="text-xs text-white/80">Индекс здоровья</p>
              <p className="font-display text-lg font-bold">Отличный</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <button
            key={s.key}
            onClick={() => onNavigate(s.key === 'storage' ? 'settings' : (s.key as NavKey))}
            style={{ animationDelay: `${i * 70}ms` }}
            className="card-hover animate-fade-in rounded-2xl border border-border bg-card p-5 text-left"
          >
            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.grad} text-white`}>
              <Icon name={s.icon} size={20} />
            </div>
            <p className="font-display text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xs text-primary">{s.sub}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Последние документы</h3>
            <button onClick={() => onNavigate('docs')} className="text-sm font-medium text-primary hover:underline">
              Все
            </button>
          </div>
          <div className="space-y-2">
            {RECENT_DOCS.map((d) => (
              <button
                key={d.id}
                onClick={() => onNavigate('docs')}
                className="flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-secondary"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `hsl(${d.color} / 0.12)`, color: `hsl(${d.color})` }}>
                  <Icon name={d.icon} size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.clinic} · {d.category}</p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
          <h3 className="mb-5 font-display text-lg font-bold">Изменения показателей</h3>
          <div className="space-y-4">
            {HEALTH_CHANGES.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                </div>
                <div className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm font-semibold ${c.good ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                  <Icon name={c.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                  {c.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Динамика анализов</h3>
          <button onClick={() => onNavigate('labs')} className="text-sm font-medium text-primary hover:underline">
            Подробнее
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LABS.slice(0, 3).map((l) => (
            <div key={l.id} className="rounded-2xl border border-border p-4">
              <div className="mb-1 flex items-baseline justify-between">
                <p className="text-sm font-medium">{l.name}</p>
                <p className="font-display font-bold">{l.value}<span className="ml-1 text-xs font-normal text-muted-foreground">{l.unit}</span></p>
              </div>
              <Sparkline data={l.history} color={l.status === 'normal' ? '175 70% 41%' : '350 75% 60%'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
