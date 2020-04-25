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
  salary: {
    seo: number;
    layoutDesigner: number;
    programmer: number;
  };
  time: number;
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
}

export type serviceTypes = [
  {ru: 'SEO', en: 'SEO'},
  {ru: 'SMM', en: 'SMM'},
  {ru: 'Контекстная реклама', en: 'contextual'}
];

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
