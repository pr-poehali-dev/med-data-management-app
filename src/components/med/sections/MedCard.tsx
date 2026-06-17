import { useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import AiScan from '@/components/med/AiScan';

interface Uploaded {
  name: string;
  category: string;
  icon: string;
}

const DETECT = [
  { match: ['кров', 'анализ', 'lab'], category: 'Анализы крови', icon: 'FlaskConical' },
  { match: ['мрт', 'mri'], category: 'МРТ', icon: 'ScanLine' },
  { match: ['кт', 'ct'], category: 'КТ', icon: 'ScanSearch' },
  { match: ['узи'], category: 'УЗИ', icon: 'Waves' },
  { match: ['рецепт'], category: 'Рецепты', icon: 'Pill' },
];

const MedCard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scanning, setScanning] = useState(false);
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState<Uploaded | null>(null);

  const handleFile = (name: string) => {
    setFileName(name);
    setResult(null);
    setScanning(true);
    const lower = name.toLowerCase();
    const found = DETECT.find((d) => d.match.some((m) => lower.includes(m)));
    setResult({
      name,
      category: found?.category ?? 'Заключение врача',
      icon: found?.icon ?? 'Stethoscope',
    });
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f.name);
  };

  const reset = () => {
    setScanning(false);
    setResult(null);
    setFileName('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="animate-fade-in">
        <h2 className="font-display text-2xl font-extrabold">Медицинская карта</h2>
        <p className="text-muted-foreground">Загрузите документ — искусственный интеллект определит тип и категорию автоматически</p>
      </div>

      <div className="card-hover animate-scale-in rounded-3xl border border-border bg-card p-6 sm:p-8">
        {!scanning ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f.name); }}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-14 text-center transition-all hover:border-primary hover:bg-primary/5"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl grad-primary text-white shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
              <Icon name="Upload" size={28} />
            </div>
            <p className="font-display text-lg font-bold">Перетащите файл сюда</p>
            <p className="mt-1 text-sm text-muted-foreground">или нажмите для выбора · PDF, JPG, PNG до 25 МБ</p>
            <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onPick} className="hidden" />
          </div>
        ) : (
          <div>
            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-secondary p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{fileName}</p>
                <p className="text-xs text-muted-foreground">Документ загружен</p>
              </div>
            </div>
            <AiScan
              steps={[
                'Сканирование и распознавание текста',
                'Определение типа документа',
                'Извлечение медицинских показателей',
                'Категоризация и сохранение в карту',
              ]}
              onReset={reset}
              result={
                result && (
                  <div className="rounded-2xl border border-border p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl grad-accent text-white">
                        <Icon name={result.icon} size={22} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Тип определён автоматически</p>
                        <p className="font-display text-lg font-bold">{result.category}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                        <Icon name="Calendar" size={15} className="text-primary" /> Дата: 17 июн 2026
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                        <Icon name="ShieldCheck" size={15} className="text-primary" /> Сохранён в карту
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Сводка ИИ:</span> Документ успешно обработан и добавлен в раздел «{result.category}». Ключевые показатели извлечены и доступны в разделе «Анализы».
                    </p>
                  </div>
                )
              }
            />
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: 'ScanText', t: 'Распознавание', d: 'OCR любых сканов и фото' },
          { icon: 'FolderTree', t: 'Авто-категории', d: '9 типов документов' },
          { icon: 'Lock', t: 'Шифрование', d: 'Данные защищены' },
        ].map((f, i) => (
          <div key={f.t} style={{ animationDelay: `${i * 80}ms` }} className="animate-fade-in rounded-2xl border border-border bg-card p-5">
            <Icon name={f.icon} size={22} className="mb-2 text-primary" />
            <p className="font-semibold">{f.t}</p>
            <p className="text-sm text-muted-foreground">{f.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedCard;
