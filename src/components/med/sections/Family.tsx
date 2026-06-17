import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { FAMILY } from '@/lib/medData';
import { toast } from 'sonner';

const Family = () => {
  const [active, setActive] = useState(FAMILY[0].id);
  const member = FAMILY.find((f) => f.id === active)!;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 animate-fade-in">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Семья</h2>
          <p className="text-muted-foreground">Здоровье близких в одном пространстве</p>
        </div>
        <button
          onClick={() => toast.success('Создание профиля родственника (демо)')}
          className="flex items-center gap-2 rounded-xl grad-primary px-4 py-2.5 text-sm font-semibold text-white hover-scale"
        >
          <Icon name="UserPlus" size={17} /> Добавить
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FAMILY.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`card-hover animate-fade-in rounded-3xl border p-5 text-left transition-all ${
              active === f.id ? 'border-primary ring-2 ring-primary/20' : 'border-border bg-card'
            }`}
          >
            <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} font-display text-lg font-bold text-white`}>
              {f.initials}
            </div>
            <p className="font-display font-bold">{f.name}</p>
            <p className="text-sm text-muted-foreground">{f.relation} · {f.age} лет</p>
          </button>
        ))}
      </div>

      <div className="card-hover animate-scale-in overflow-hidden rounded-3xl border border-border bg-card">
        <div className={`bg-gradient-to-br ${member.gradient} p-6 text-white sm:p-8`}>
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 font-display text-2xl font-extrabold backdrop-blur">
              {member.initials}
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold">{member.name}</h3>
              <p className="text-white/85">{member.relation} · родился(ась) {member.birth}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">
                <Icon name="CircleCheck" size={14} /> {member.highlight}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {[
            { icon: 'Files', label: 'Документы', value: member.docs },
            { icon: 'FlaskConical', label: 'Анализы', value: member.labs },
            { icon: 'Calendar', label: 'Возраст', value: `${member.age} лет` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-secondary/50 p-5">
              <Icon name={s.icon} size={20} className="mb-2 text-primary" />
              <p className="font-display text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-6">
          <p className="mb-3 font-semibold">История здоровья</p>
          <div className="space-y-2">
            {['Плановый осмотр терапевта', 'Сдан общий анализ крови', 'Обновлён сертификат вакцинации'].map((h, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary/40 px-4 py-3 text-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg grad-primary text-white">
                  <Icon name="Check" size={14} />
                </div>
                <span>{h}</span>
                <span className="ml-auto text-xs text-muted-foreground">июн 2026</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family;
