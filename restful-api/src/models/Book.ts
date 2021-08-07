import { Schema, model } from 'mongoose';

export interface BookType{
  title: string,
  description: string,
  price: number,
  author?: string,
  publishedAt?: string
}

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
});

const Book = model('Book', bookSchema);

export default Book;
