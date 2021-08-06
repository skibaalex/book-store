import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Express server is running on port:', port);
});
