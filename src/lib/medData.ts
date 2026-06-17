export type NavKey =
  | 'home' | 'card' | 'labs' | 'docs' | 'symptoms'
  | 'family' | 'cycle' | 'access' | 'settings';

export interface NavItem {
  key: NavKey;
  label: string;
  icon: string;
}

export const NAV: NavItem[] = [
  { key: 'home', label: 'Главная', icon: 'LayoutDashboard' },
  { key: 'card', label: 'Медицинская карта', icon: 'HeartPulse' },
  { key: 'labs', label: 'Анализы', icon: 'FlaskConical' },
  { key: 'docs', label: 'Документы', icon: 'Files' },
  { key: 'symptoms', label: 'Симптомы', icon: 'Activity' },
  { key: 'family', label: 'Семья', icon: 'Users' },
  { key: 'cycle', label: 'Женский календарь', icon: 'CalendarHeart' },
  { key: 'access', label: 'Доступ врачу', icon: 'QrCode' },
  { key: 'settings', label: 'Настройки', icon: 'Settings' },
];

export interface LabMarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: string;
  ref: string;
  status: 'normal' | 'high' | 'low';
  history: { date: string; value: number }[];
  ai: string;
}

export const LABS: LabMarker[] = [
  {
    id: 'hb', name: 'Гемоглобин', value: 142, unit: 'г/л', date: '12 июн 2026',
    ref: '130–160', status: 'normal',
    history: [
      { date: 'Янв', value: 128 }, { date: 'Фев', value: 131 },
      { date: 'Мар', value: 136 }, { date: 'Апр', value: 139 },
      { date: 'Май', value: 140 }, { date: 'Июн', value: 142 },
    ],
    ai: 'Гемоглобин в пределах нормы и стабильно растёт последние 5 месяцев. Уровень железа достаточный — продолжайте текущий рацион.',
  },
  {
    id: 'glu', name: 'Глюкоза', value: 5.9, unit: 'ммоль/л', date: '12 июн 2026',
    ref: '3.9–5.5', status: 'high',
    history: [
      { date: 'Янв', value: 5.1 }, { date: 'Фев', value: 5.3 },
      { date: 'Мар', value: 5.4 }, { date: 'Апр', value: 5.6 },
      { date: 'Май', value: 5.8 }, { date: 'Июн', value: 5.9 },
    ],
    ai: 'Глюкоза слегка превышает верхнюю границу нормы и медленно растёт. Рекомендуется снизить количество быстрых углеводов и пересдать анализ натощак через 1 месяц.',
  },
  {
    id: 'chol', name: 'Холестерин', value: 4.8, unit: 'ммоль/л', date: '12 июн 2026',
    ref: '3.0–5.2', status: 'normal',
    history: [
      { date: 'Янв', value: 5.4 }, { date: 'Фев', value: 5.2 },
      { date: 'Мар', value: 5.1 }, { date: 'Апр', value: 5.0 },
      { date: 'Май', value: 4.9 }, { date: 'Июн', value: 4.8 },
    ],
    ai: 'Отличная динамика — холестерин снизился до нормы. Профилактика сердечно-сосудистых рисков работает эффективно.',
  },
  {
    id: 'vitd', name: 'Витамин D', value: 21, unit: 'нг/мл', date: '12 июн 2026',
    ref: '30–100', status: 'low',
    history: [
      { date: 'Янв', value: 18 }, { date: 'Фев', value: 19 },
      { date: 'Мар', value: 20 }, { date: 'Апр', value: 20 },
      { date: 'Май', value: 21 }, { date: 'Июн', value: 21 },
    ],
    ai: 'Уровень витамина D ниже нормы. Рекомендуется приём 2000 МЕ в сутки и контроль через 3 месяца. Дефицит влияет на иммунитет и усталость.',
  },
  {
    id: 'tsh', name: 'ТТГ', value: 2.1, unit: 'мЕд/л', date: '12 июн 2026',
    ref: '0.4–4.0', status: 'normal',
    history: [
      { date: 'Янв', value: 2.4 }, { date: 'Фев', value: 2.3 },
      { date: 'Мар', value: 2.2 }, { date: 'Апр', value: 2.2 },
      { date: 'Май', value: 2.1 }, { date: 'Июн', value: 2.1 },
    ],
    ai: 'Щитовидная железа работает стабильно, показатель в середине нормы. Дополнительных обследований не требуется.',
  },
  {
    id: 'fer', name: 'Ферритин', value: 48, unit: 'нг/мл', date: '12 июн 2026',
    ref: '20–250', status: 'normal',
    history: [
      { date: 'Янв', value: 32 }, { date: 'Фев', value: 36 },
      { date: 'Мар', value: 40 }, { date: 'Апр', value: 43 },
      { date: 'Май', value: 46 }, { date: 'Июн', value: 48 },
    ],
    ai: 'Запасы железа восстанавливаются. Положительная динамика, продолжайте текущую схему.',
  },
];

export type DocCategory =
  | 'Анализы' | 'Заключения' | 'МРТ' | 'КТ' | 'УЗИ'
  | 'Рентген' | 'Выписки' | 'Рецепты' | 'Вакцинация';

export interface MedDoc {
  id: string;
  title: string;
  category: DocCategory;
  date: string;
  clinic: string;
  size: string;
  icon: string;
  color: string;
}

export const DOCS: MedDoc[] = [
  { id: 'd1', title: 'Общий анализ крови', category: 'Анализы', date: '12 июн 2026', clinic: 'Инвитро', size: '420 КБ', icon: 'FlaskConical', color: '175 70% 41%' },
  { id: 'd2', title: 'МРТ головного мозга', category: 'МРТ', date: '08 июн 2026', clinic: 'МЕДСИ', size: '14.2 МБ', icon: 'ScanLine', color: '250 80% 65%' },
  { id: 'd3', title: 'Заключение кардиолога', category: 'Заключения', date: '02 июн 2026', clinic: 'СМ-Клиника', size: '180 КБ', icon: 'Stethoscope', color: '350 75% 60%' },
  { id: 'd4', title: 'УЗИ щитовидной железы', category: 'УЗИ', date: '28 май 2026', clinic: 'Гемотест', size: '2.1 МБ', icon: 'Waves', color: '195 80% 52%' },
  { id: 'd5', title: 'Рентген грудной клетки', category: 'Рентген', date: '20 май 2026', clinic: 'МЕДСИ', size: '3.4 МБ', icon: 'Bone', color: '38 90% 55%' },
  { id: 'd6', title: 'Выписка из стационара', category: 'Выписки', date: '14 май 2026', clinic: 'ГКБ №1', size: '640 КБ', icon: 'FileText', color: '210 60% 50%' },
  { id: 'd7', title: 'Рецепт на витамин D', category: 'Рецепты', date: '12 май 2026', clinic: 'СМ-Клиника', size: '90 КБ', icon: 'Pill', color: '160 60% 45%' },
  { id: 'd8', title: 'Сертификат вакцинации', category: 'Вакцинация', date: '05 май 2026', clinic: 'Поликлиника №7', size: '210 КБ', icon: 'Syringe', color: '280 65% 60%' },
  { id: 'd9', title: 'КТ органов брюшной полости', category: 'КТ', date: '01 май 2026', clinic: 'МЕДСИ', size: '22.7 МБ', icon: 'ScanSearch', color: '250 80% 65%' },
];

export const DOC_CATEGORIES: DocCategory[] = ['Анализы', 'Заключения', 'МРТ', 'КТ', 'УЗИ', 'Рентген', 'Выписки', 'Рецепты', 'Вакцинация'];

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  birth: string;
  age: number;
  docs: number;
  labs: number;
  gradient: string;
  initials: string;
  highlight: string;
}

export const FAMILY: FamilyMember[] = [
  { id: 'f1', name: 'Анна Соколова', relation: 'Вы', birth: '14.03.1991', age: 35, docs: 24, labs: 6, gradient: 'from-teal-400 to-cyan-500', initials: 'АС', highlight: 'Все показатели стабильны' },
  { id: 'f2', name: 'Дмитрий Соколов', relation: 'Супруг', birth: '02.08.1988', age: 37, docs: 12, labs: 4, gradient: 'from-violet-400 to-indigo-500', initials: 'ДС', highlight: 'Плановый осмотр в июле' },
  { id: 'f3', name: 'Мария Соколова', relation: 'Дочь', birth: '19.06.2017', age: 8, docs: 9, labs: 3, gradient: 'from-pink-400 to-rose-500', initials: 'МС', highlight: 'Вакцинация по графику' },
  { id: 'f4', name: 'Елена Петрова', relation: 'Мама', birth: '23.11.1962', age: 63, docs: 18, labs: 5, gradient: 'from-amber-400 to-orange-500', initials: 'ЕП', highlight: 'Контроль давления' },
];

export const RECENT_DOCS = DOCS.slice(0, 4);

export const HEALTH_CHANGES = [
  { name: 'Холестерин', delta: '-0.6', trend: 'down', good: true, note: 'нормализовался' },
  { name: 'Глюкоза', delta: '+0.3', trend: 'up', good: false, note: 'выше нормы' },
  { name: 'Гемоглобин', delta: '+2', trend: 'up', good: true, note: 'стабильно' },
  { name: 'Витамин D', delta: '+1', trend: 'up', good: false, note: 'дефицит' },
];
