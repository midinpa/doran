import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import router from './routes';
import console from './lib/console';
import { dburi } from './config';
import webpackConfig from '../webpack.config.dev';

const indexPath = path.resolve(__dirname, 'swagger.yaml');
const swaggerDocument = YAML.load(indexPath);

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

app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  explorer: true,
}));

app.use((req, res, next) => {
  next(createError(404));
});

export default app;
