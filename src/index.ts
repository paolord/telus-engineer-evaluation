
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

const port = process.env.port || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}!`);
});

export default app;