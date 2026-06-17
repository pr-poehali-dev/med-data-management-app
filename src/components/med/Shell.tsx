import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { NAV, NavKey } from '@/lib/medData';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface ShellProps {
  active: NavKey;
  onNavigate: (k: NavKey) => void;
  children: React.ReactNode;
}

const Shell = ({ active, onNavigate, children }: ShellProps) => {
  const [open, setOpen] = useState(false);
  const activeLabel = NAV.find((n) => n.key === active)?.label ?? '';

  const Sidebar = (
    <aside className="flex h-full w-[260px] flex-col gap-1 border-r border-sidebar-border bg-sidebar p-4">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl grad-primary text-white shadow-lg shadow-primary/30">
          <Icon name="HeartPulse" size={22} />
        </div>
        <div>
          <p className="font-display text-lg font-extrabold leading-none">Vitae</p>
          <p className="text-[11px] text-muted-foreground">здоровье семьи</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV.map((n) => {
          const isActive = n.key === active;
          return (
            <button
              key={n.key}
              onClick={() => { onNavigate(n.key); setOpen(false); }}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'grad-primary text-white shadow-md shadow-primary/25'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon name={n.icon} size={18} />
              <span>{n.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-teal-500/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Icon name="Crown" size={16} className="text-amber-500" />
          Vitae Premium
        </div>
        <p className="mb-3 text-xs text-muted-foreground">Безлимит хранилища и расширенный ИИ-анализ</p>
        <button
          onClick={() => toast.success('Это демо — подписка не оформляется')}
          className="w-full rounded-lg grad-accent py-2 text-xs font-semibold text-white hover-scale"
        >
          Оформить
        </button>
      </div>
    </aside>
  );

  return (
    <div className="mesh-bg min-h-screen">
      <div className="flex">
        <div className="sticky top-0 hidden h-screen lg:block">{Sidebar}</div>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <div className="absolute left-0 top-0 h-full animate-slide-in-right bg-sidebar">{Sidebar}</div>
          </div>
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-40 glass border-b border-border">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <button onClick={() => setOpen(true)} className="lg:hidden">
                <Icon name="Menu" size={22} />
              </button>

              <div className="relative hidden flex-1 max-w-md sm:block">
                <Icon name="Search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  onFocus={() => toast('Поиск по документам, анализам и показателям — демо')}
                  placeholder="Поиск по документам, анализам, показателям…"
                  className="w-full rounded-xl border border-border bg-card/80 py-2.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <h1 className="font-display text-base font-bold sm:hidden">{activeLabel}</h1>
              <div className="flex-1 sm:hidden" />

              <button
                onClick={() => toast('Нет новых уведомлений')}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-card hover:bg-secondary"
              >
                <Icon name="Bell" size={19} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl p-1 outline-none hover:bg-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 font-display text-sm font-bold text-white">
                    АС
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-semibold leading-none">Анна Соколова</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Premium</p>
                  </div>
                  <Icon name="ChevronDown" size={16} className="hidden text-muted-foreground md:block" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast('Профиль — демо')}>
                    <Icon name="User" size={16} className="mr-2" /> Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast('Подписка — демо')}>
                    <Icon name="CreditCard" size={16} className="mr-2" /> Подписка
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('settings')}>
                    <Icon name="Settings" size={16} className="mr-2" /> Настройки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast('Выход — демо')} className="text-destructive">
                    <Icon name="LogOut" size={16} className="mr-2" /> Выход
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Shell;
