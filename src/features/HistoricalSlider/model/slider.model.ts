interface ISlideEvent {
  id: number;
  year: number;
  text: string;
}

export interface Slide {
  id: number;
  category: string;
  startDate: number;
  endDate: number;
  events: ISlideEvent[];
}

export const slides: Slide[] = [
  {
    id: 1,
    category: 'Период 1',
    startDate: 2000,
    endDate: 2004,
    events: [
      { id: 1, year: 2000, text: 'Создана первая версия продукта' },
      { id: 2, year: 2001, text: 'Поставлена цель выйти на международный рынок' },
      { id: 3, year: 2002, text: 'Достигнут первый миллион пользователей' },
      { id: 4, year: 2003, text: 'Получена награда за инновации' },
      { id: 5, year: 2004, text: 'Расширение команды до 50 человек' },
    ],
  },
  {
    id: 2,
    category: 'Период 2',
    startDate: 2005,
    endDate: 2008,
    events: [
      { id: 1, year: 2005, text: 'Запуск мобильного приложения' },
      { id: 2, year: 2006, text: 'Открытие первого зарубежного офиса' },
      { id: 3, year: 2007, text: 'Увеличение выручки вдвое' },
      { id: 4, year: 2008, text: 'Внедрение новых технологий в продукт' },
    ],
  },
  {
    id: 3,
    category: 'Период 3',
    startDate: 2009,
    endDate: 2011,
    events: [
      { id: 1, year: 2009, text: 'Ребрендинг компании' },
      { id: 2, year: 2010, text: 'Выход на рынок Европы' },
      { id: 3, year: 2011, text: 'Достигнут рубеж в 5 миллионов пользователей' },
    ],
  },
  {
    id: 4,
    category: 'Период 4',
    startDate: 2012,
    endDate: 2015,
    events: [
      { id: 1, year: 2012, text: 'Внедрение платной подписки' },
      { id: 2, year: 2013, text: 'Получение отраслевой премии за инновации' },
      { id: 3, year: 2014, text: 'Экспансия в три новые страны' },
      { id: 4, year: 2015, text: 'Достигнут рубеж в 10 миллионов пользователей' },
    ],
  },
  {
    id: 5,
    category: 'Период 5',
    startDate: 2016,
    endDate: 2019,
    events: [
      { id: 1, year: 2016, text: 'Запуск премиум-функций' },
      { id: 2, year: 2017, text: 'Интеграция с ведущими социальными платформами' },
      { id: 3, year: 2018, text: 'Открытие пяти новых офисов по миру' },
      { id: 4, year: 2019, text: 'Выручка превысила 50 млн' },
    ],
  },
  {
    id: 6,
    category: 'Период 6',
    startDate: 2020,
    endDate: 2025,
    events: [
      { id: 1, year: 2020, text: 'Адаптация работы компании во время пандемии' },
      { id: 2, year: 2021, text: 'Запуск образовательной онлайн-платформы' },
      { id: 3, year: 2022, text: 'Достигнут рубеж в 20 миллионов пользователей' },
      { id: 4, year: 2023, text: 'Внедрение AI-рекомендаций для продукта' },
      { id: 5, year: 2024, text: 'Получена международная бизнес-премия' },
      { id: 6, year: 2025, text: 'Планируемое IPO компании' },
    ],
  },
];
