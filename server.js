import express from 'express'
import { handleError } from './src/common/helpers/error.helper';
import rootRouter from './src/routers/root.router';

const app = express();
const port = 3000;

//middleware
app.use(express.json());




app.use(rootRouter);
app.use(handleError);



app.listen(port, () => `server online on PORT 3000`);
  