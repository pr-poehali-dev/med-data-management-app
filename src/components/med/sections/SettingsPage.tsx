import Icon from '@/components/ui/icon';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const SettingsPage = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Настройки</h2>
        <p className="text-muted-foreground">Профиль, хранилище и приватность</p>
      </div>

      <div className="card-hover animate-scale-in rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 font-display text-xl font-bold text-white">
            АС
          </div>
          <div className="flex-1">
            <p className="font-display text-lg font-bold">Анна Соколова</p>
            <p className="text-sm text-muted-foreground">anna.sokolova@mail.ru</p>
          </div>
          <button onClick={() => toast('Редактирование профиля (демо)')} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
            Изменить
          </button>
        </div>
      </div>

      <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="HardDrive" size={18} className="text-primary" />
            <p className="font-semibold">Хранилище</p>
          </div>
          <span className="text-sm text-muted-foreground">6.4 ГБ из 15 ГБ</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full grad-primary" style={{ width: '43%' }} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Документы', size: '3.1 ГБ', icon: 'FileText', color: 'text-teal-500' },
            { label: 'Снимки', size: '2.8 ГБ', icon: 'ScanLine', color: 'text-violet-500' },
            { label: 'Прочее', size: '0.5 ГБ', icon: 'Folder', color: 'text-amber-500' },
          ].map((f) => (
            <div key={f.label} className="rounded-xl bg-secondary/60 p-3 text-center">
              <Icon name={f.icon} size={18} className={`mx-auto mb-1 ${f.color}`} />
              <p className="text-sm font-semibold">{f.size}</p>
              <p className="text-xs text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
        <button onClick={() => toast.success('Переход на Premium (демо)')} className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <Icon name="Crown" size={15} /> Расширить до безлимита
        </button>
      </div>

      <div className="card-hover animate-fade-in rounded-3xl border border-border bg-card p-6">
        <p className="mb-4 font-semibold">Приватность и уведомления</p>
        {[
          { icon: 'Bell', t: 'Push-уведомления', d: 'Напоминания об анализах', on: true },
          { icon: 'Fingerprint', t: 'Вход по биометрии', d: 'Face ID / отпечаток', on: true },
          { icon: 'Mail', t: 'Email-отчёты', d: 'Еженедельная сводка', on: false },
          { icon: 'ShieldCheck', t: 'Двухфакторная защита', d: 'Дополнительная безопасность', on: true },
        ].map((s, i) => (
          <div key={s.t} className={`flex items-center gap-3 py-3 ${i > 0 ? 'border-t border-border' : ''}`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
              <Icon name={s.icon} size={17} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{s.t}</p>
              <p className="text-xs text-muted-foreground">{s.d}</p>
            </div>
            <Switch defaultChecked={s.on} onCheckedChange={() => toast('Настройка сохранена (демо)')} />
          </div>
        ))}
      </div>

      <button
        onClick={() => toast('Выход из аккаунта (демо)')}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 py-3 font-medium text-destructive hover:bg-destructive/5"
      >
        <Icon name="LogOut" size={17} /> Выйти из аккаунта
      </button>
    </div>
  );
};

export default SettingsPage;