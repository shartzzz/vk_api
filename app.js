import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT;
const CONFIRMATION = process.env.CONFIRMATION;

console.log(CONFIRMATION, PORT)

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello ES6'));
app.post('/', (req, res) => {
  const { body } = req;
  switch (body.type) {
    case 'confirmation':
      res.end(CONFIRMATION);
      break;

    case 'message_new':
      console.log(body);
      res.end('ok');
      break;

    default:
      res.end('ok');
      break;
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));