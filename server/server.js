import express from 'express';
import morgan from 'morgan';
import path from 'path';
import router from './routes';
import config from './config';
import passport from 'passport';
import cors from 'cors';
import './middleware/bearerstrategy';
import './middleware/localstrategy';

const app = express();

app.use(cors());
app.use(express.static(process.env.PUBLIC_DIR));
app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')));
app.use(passport.initialize());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(morgan('dev'));

app.use(router);

app.use((
  err,
  req,
  res,
  next
) => {
  if (err) {
    console.error(err);
    res.status(500).json({ name: err.name, msg: err.message });

    return Promise.reject(err);
  }
});

const server = app.listen(config.port, () =>
  console.log('Server listening on port ' + config.port)
);

server.setTimeout(0);