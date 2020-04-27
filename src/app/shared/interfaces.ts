export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Order {
  company: string;
  serviceType: string;
  hours_rate: {};
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

export type serviceTypes = [
  { ru: 'SEO', en: 'SEO' },
  { ru: 'SMM', en: 'SMM' },
  { ru: 'Контекстная реклама', en: 'contextual' }
];

export const LIST_SERVICE_TYPE = {
  SEO: [
    {en: 'seo_specialist', ru: 'Часы SEO-специалиста', rate: 1},
    {en: 'seo_helper', ru: 'Часы помощника SEO-специалсита', rate: 0.5},
    {en: 'content_manager', ru: 'Часы контент-менеджера', rate:  0.65},
    {en: 'layout_designer', ru: 'Часы верстальщика', rate: 0.56},
    {en: 'designer', ru: 'Часы дизайнер', rate: 1},
    {en: 'programmer', ru: 'Часы программиста', rate: 1.1},
    {en: 'copywriting', ru: 'Услуга копирайтинга - 1 тыс. ЗСП', rate: 0.42},
    {en: 'rewriting', ru: 'Услуга рерайтинг - 1 тыс ЗСП', rate: 0.21},
    {en: 'num_articles', ru: 'Количество статей для наращивания ссылочной массы', rate: 1},
    // {en: '', ru: ''},
  ],
  SMM: [
    {en: 'smm_specialist', ru: 'Часы SMM-специалиста', rate: 1},
    {en: 'smm_helper', ru: 'Часы помощника SMM-специалсита', rate: 0.5},
    {en: 'designer', ru: 'Часы дизайнер', rate: 1},
    {en: 'photograph', ru: 'Часы фотографа', rate: 1},
    {en: 'editor', ru: 'Часы редактора текстов', rate: 0.7},
    {en: 'copywriting', ru: 'Услуга копирайтинга - 1 тыс. ЗСП', rate: 0.42},
    {en: 'rewriting', ru: 'Услуга рерайтинг - 1 тыс ЗСП', rate: 0.21}
  ],
  Контекстуальный: [
    {en: 'specialist', ru: 'Часы специалиста по контексной рекламе', rate: 1},
    {en: 'helper', ru: 'Часы помощника специалсита по контексной рекламе', rate: 0.5},
    {en: 'content_manager', ru: 'Часы контент-менеджера', rate: 0.56},
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
