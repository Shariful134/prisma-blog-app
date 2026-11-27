import express from 'express';
import { postRouter } from './post/post.routes';
const app = express();
import cors from 'cors';

import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

app.use(
  cors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());

app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', (req, res) => {
  res.send('Hello Shariful islam, Your server is working perfectly');
});

app.use('/post', postRouter);
export default app;
