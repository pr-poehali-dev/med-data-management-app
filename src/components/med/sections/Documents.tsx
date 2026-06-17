import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { DOCS, DOC_CATEGORIES, MedDoc } from '@/lib/medData';
import { toast } from 'sonner';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Documents = () => {
  const [filter, setFilter] = useState<string>('Все');
  const [docs, setDocs] = useState<MedDoc[]>(DOCS);

  const list = filter === 'Все' ? docs : docs.filter((d) => d.category === filter);

  const remove = (id: string) => {
    setDocs((p) => p.filter((d) => d.id !== id));
    toast.success('Документ удалён (демо)');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Документы</h2>
        <p className="text-muted-foreground">{list.length} документов · фильтр по категориям</p>
      </div>

      <div className="flex flex-wrap gap-2 animate-fade-in">
        {['Все', ...DOC_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === c ? 'grad-primary text-white shadow-md shadow-primary/25' : 'border border-border bg-card hover:bg-secondary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d, i) => (
          <div
            key={d.id}
            style={{ animationDelay: `${i * 50}ms` }}
            className="card-hover animate-fade-in flex flex-col rounded-3xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `hsl(${d.color} / 0.12)`, color: `hsl(${d.color})` }}>
                <Icon name={d.icon} size={22} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-lg p-1.5 text-muted-foreground outline-none hover:bg-secondary">
                  <Icon name="MoreVertical" size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast('Просмотр документа (демо)')}>
                    <Icon name="Eye" size={15} className="mr-2" /> Просмотр
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.success('Скачивание начато (демо)')}>
                    <Icon name="Download" size={15} className="mr-2" /> Скачать
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.success('Ссылка скопирована (демо)')}>
                    <Icon name="Share2" size={15} className="mr-2" /> Поделиться
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => remove(d.id)} className="text-destructive">
                    <Icon name="Trash2" size={15} className="mr-2" /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="font-display font-bold leading-snug">{d.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{d.clinic}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="rounded-md bg-secondary px-2 py-0.5">{d.category}</span>
              <span>{d.date} · {d.size}</span>
            </div>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border py-16 text-center text-muted-foreground">
          <Icon name="FolderOpen" size={40} className="mx-auto mb-2 opacity-50" />
          Нет документов в этой категории
        </div>
      )}
    </div>
  );
};

export default Documents;
