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
app.use(express.static('public'));
app.use(passport.initialize());
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

app.use(
  '*',
  (req, res, next) => {
    try {
      res.sendFile(path.join(__dirname, 'public/index.html'));
    } catch (error) {
      next(error);
    }
  }
);

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

app.listen(config.port, () =>
  console.log('Server listening on port ' + config.port)
);