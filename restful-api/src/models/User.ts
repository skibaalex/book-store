import { Schema, model, Types } from 'mongoose';
import validator from 'validator';

export interface UserType {
  _id: Types.ObjectId,
  username: string,
  password: string,
  email: string,
  isAdmin: boolean
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'invalid email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: {
    type: [Types.ObjectId],
    ref: 'Book',
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
});

// TODO: Pre save event hash the password

const User = model('User', userSchema);
export default User;
