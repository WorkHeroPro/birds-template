import express from 'express';
import { open } from 'lmdb';

const app = express();
const port = 3200;

const db = open({ path: './data' });
const KEY = 'message';

if (db.get(KEY) === undefined) {
  db.put(KEY, 'hello world');
}

app.use(express.json());

app.get('/', (req, res) => {
  const text = db.get(KEY) as string;
  res.send(text);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

