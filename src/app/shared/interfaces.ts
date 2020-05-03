export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Task {
  name: string;
  // ru: string;
  specialist: string;
  defaultHour?: number;
  setHour?: number;
}

export interface Order {
  company: string;
  serviceType: string;
  hours_rate: Task[];
  date: string;
  price: number;
  id?: string;
  idCustomer?: string;
}

export interface Customer {
  company: string;
  contactPerson: string;
  telephone: string;
  email: string;
  checkingAccount: string;
  id?: string;
  count: number;
}

export const serviceTypes: {
  ru: string, en: string,
  employees: { specialist: string, rate: number }[]
}[] = [
  {
    ru: 'SEO', en: 'SEO',
    employees: [
      {specialist: 'SEO-специалист', rate: 1},
      {specialist: 'программист', rate: 1.1},
      {specialist: 'контент-менеджер', rate: 0.5},
      {specialist: 'верстальщик', rate: 0.56},
      {specialist: 'дизайнер', rate: 1},
    ]
  },
  {
    ru: 'SMM', en: 'SMM',
    employees: [
      {specialist: 'SMM-специалист', rate: 1},
      {specialist: 'верстальщик', rate: 0.56},
      {specialist: 'фотограф', rate: 1},
      {specialist: 'дизайнер', rate: 1},
      {specialist: 'редактор', rate: 1},
      {specialist: 'контент-менеджер', rate: 0.5},
    ]
  },
  {
    ru: 'Контекстная реклама', en: 'Контекстуальный',
    employees: [
      {specialist: 'специалист по контекстной рекламе', rate: 1},
      {specialist: 'верстальщик', rate: 0.56},
    ]
  }
];


export const LIST_SERVICE_TYPE: { [key: string]: Task[] } = {
  SEO: [
    {name: 'Составление ТЗ на тексты', specialist: 'SEO-специалист', defaultHour: 2},
    {name: 'Оптимизация url продвигаемых страниц сайта', specialist: 'программист', defaultHour: 0.75},
    {name: 'Корректировка метатегов', specialist: 'SEO-специалист', defaultHour: 1.5},
    {name: 'Наращивание ссылочной массы (количество ссылок)', specialist: 'контент-менеджер', defaultHour: 4},
    {name: 'Анализ главной страницы на наличие важных пунктов', specialist: 'SEO-специалист', defaultHour: 1.5},
    {name: 'Корректировка файла robots.txt', specialist: 'SEO-специалист', defaultHour: 0.5},
    {name: 'Переход сайта на HTTPS', specialist: 'программист', defaultHour: 1.5},
    {name: 'Оптимизация времени загрузки страниц сайта', specialist: 'программист', defaultHour: 1.5},
    {name: 'Уникализация контента сайта', specialist: 'SEO-специалист', defaultHour: 2},
    {name: 'Формарования «Хлебных крошек»', specialist: 'верстальщик', defaultHour: 1},
    {name: 'Обработка несуществующих страниц не настроена', specialist: 'программист', defaultHour: 1.5},
    {name: 'Настройка 404 страницы', specialist: 'верстальщик', defaultHour: 1.5},
    {name: 'Исправление ошибок в верстке сайта.', specialist: 'контент-менеджер', defaultHour: 2},
    {name: 'Устранение дублей страниц сайта', specialist: 'контент-менеджер', defaultHour: 0.5},
    {name: 'Создание карты sitemap.xml', specialist: 'программист', defaultHour: 0.5},
    {name: 'Устранение «битых» ссылок', specialist: 'контент-менеджер', defaultHour: 0.5},
    {name: 'Замена редиректных ссылок на прямые', specialist: 'контент-менеджер', defaultHour: 1},
    {name: 'Оптимизация изображений', specialist: 'контент-менеджер', defaultHour: 2},
    {name: 'Анализ карточек товаров на наличие важных элементов', specialist: 'SEO-специалист', defaultHour: 1.5},
    {
      name: 'Анализ "Корзины" на наличие важных элементов и корректность работы функционала',
      specialist: 'SEO-специалист',
      defaultHour: 1.5
    },
    {name: 'Анализ общих коммерческих факторов', specialist: 'SEO-специалист', defaultHour: 1.5},
    {name: 'Составление схемы внутренней перелинковки и создание рекомендаций', specialist: 'SEO-специалист', defaultHour: 4},
    {name: 'Регистарция организации на Яндекс и Google картах ', specialist: 'контент-менеджер', defaultHour: 0.5},
    {name: 'Настройка кодировки UTF-8', specialist: 'программист', defaultHour: 1},
    {name: 'Внедрение семантической разметки на сайт', specialist: 'верстальщик', defaultHour: 1},
    {name: 'Настройка базовых редиректов', specialist: 'верстальщик', defaultHour: 0.5},
  ],
  SMM: [
    {name: 'Разработка и согласование публикаций (фото, видео, gif)', specialist: 'SMM-специалист', defaultHour: 5},
    {name: 'Разработка и согласование Stories', specialist: 'SMM-специалист', defaultHour: 2},
    {name: 'Подбор и использование хештегов (тематические, брендовые, региональные и пр.)', specialist: 'SMM-специалист', defaultHour: 0.5},
    {name: 'Создание мудборда для фотографа (при необходимости)', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Разработка и внедрение архивов сохраненных историй в Instagram', specialist: 'SMM-специалист', defaultHour: 3},
    {name: 'Разработка и внедрение меню во ВКонтакте', specialist: 'SMM-специалист', defaultHour: 2},
    {name: 'Разработка и внедрение блока "Товары" во ВКонтакте', specialist: 'SMM-специалист', defaultHour: 2},
    {name: 'Подключение виджетов и приложений во ВКонтакте', specialist: 'верстальщик', defaultHour: 1.5},
    {name: 'Разработка и внедрение вкладки "Магазин" в Facebook', specialist: 'SMM-специалист', defaultHour: 2},
    {name: 'Разработка и внедрение вкладки "Услуги" в Facebook', specialist: 'SMM-специалист', defaultHour: 2},
    {name: 'Разработка и внедрение раздела "Витрина" в Одноклассниках', specialist: 'SMM-специалист', defaultHour: 2},
    {name: 'Размещение виджетов группы на сайт', specialist: 'верстальщик', defaultHour: 1},
    {name: 'Размещение кнопок социальных сетей на сайт', specialist: 'верстальщик', defaultHour: 1},
    {name: 'Подготовка новости для сайта об открытии представительств в социальных сетях', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Публикация согласованного контент-плана', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Разработка и согласование механик проведения конкурсов', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Разработка конкурсных публикаций', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Запуск конкурса', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Мониторинг конкурса (отслеживание обратной связи подписчиков)', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Определение победителя, видеозапись процесса', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Публикация итогов конкурса, связь с победителем', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Наладка системы сбора комментариев', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Мониторинг упоминаний сообщества', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Мониторинг реакции пользователей на размещаемый контент', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Удаление спама и флуда', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Ответы на вопросы (при поддержке заказчика)', specialist: 'SMM-специалист', defaultHour: 1},
    {name: 'Работа с негативными отзывами', specialist: 'SMM-специалист', defaultHour: 1},
  ],
  Контекстуальный: [
    {name: 'Ведение и корректировки РК в Яндекс/Google', specialist: 'специалист по контекстной рекламе', defaultHour: 4},
    {name: 'Аналитика стоимости кликов, управление ставками и бюджетов', specialist: 'специалист по контекстной рекламе', defaultHour: 1},
    {name: 'Оптимизация РК', specialist: 'специалист по контекстной рекламе', defaultHour: 2},
    {name: 'Добавление новых ключевых слов', specialist: 'специалист по контекстной рекламе', defaultHour: 0.5},
    {name: 'Проведение минусовки', specialist: 'специалист по контекстной рекламе', defaultHour: 2},
    {name: 'Анализ трафика', specialist: 'специалист по контекстной рекламе', defaultHour: 0.5},
    {name: 'Анализ конверсий/целей', specialist: 'специалист по контекстной рекламе', defaultHour: 0.5},
    {name: 'Рекомендации по посадочным страницам', specialist: 'специалист по контекстной рекламе', defaultHour: 2},
    {name: 'Анализ лидов (заявок на услуги/товары)', specialist: 'специалист по контекстной рекламе', defaultHour: 0.5},
    {name: 'Сквозная аналитика: показы-клики-конверси', specialist: 'специалист по контекстной рекламе', defaultHour: 1},
    {name: 'Составление отчета', specialist: 'специалист по контекстной рекламе', defaultHour: 1},
  ]
};

// export interface Post {
//   id?: string;
//   title: string;
//   content: string;
//   author: string;
//   date: Date;
// }

export class FbCreateResponse {
  name: string;
}
