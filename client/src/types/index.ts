export interface Book{
    _id: string,
    title: string,
    description: string,
    price: number,
    author?: string,
    publishedAt?: string
  }

export interface User {
    _id: string,
    username: string,
    password?: string,
    email: string,
    isAdmin: boolean,
    books: Array<Book>
  }
