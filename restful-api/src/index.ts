import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
/**
 * App configurations
 */
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI as string,
    { useNewUrlParser: true, useUnifiedTopology: true });
  // eslint-disable-next-line no-console
  console.log('Express server is running on port:', port);
});
