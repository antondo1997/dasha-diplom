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
  name: string;
  serviceType: string;
  salary: {
    seo: number;
    layoutDesigner: number;
    programmer: number;
  };
  time: number;
  price: number;
  id?: string;
}

export interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
  date: Date;
}

export class FbCreateResponse {
  name: string;
}
