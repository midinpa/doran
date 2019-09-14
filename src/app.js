import mongoose from 'mongoose';
import router from './routes';
import console from './lib/console';
import { dburi } from './config';
import webpackConfig from '../webpack.config.dev';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const compiler = webpack(webpackConfig);
const app = express();

app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
}));

try {
  mongoose.connect(dburi, { useNewUrlParser: true });
} catch (e) {
  console.error(e);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use((req, res, next) => {
  next(createError(404));
});

export default app;
