import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  author: {
    type: String,
  },
  publishedAt: String,
});

const Book = model('Book', bookSchema);

export default Book;
