import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { toJS } from 'mobx';
import { Provider, useStaticRendering } from 'mobx-react';
import config from 'config';
import bodyParser from 'body-parser';
import i18nMiddleware from 'i18next-express-middleware';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter, matchPath } from 'react-router-dom';

import App from '../shared/App';
import { getDetailedStatsById, getShortEloStats } from './libs/Stats';
import template from './template';
import i18n from './../i18n/i18n-server';
import routes from '../shared/routes';
import ChampionStats from '../shared/Components/ChampionStats';

const app = express();

useStaticRendering(true);
app.use(bodyParser.json());

const { port } = config.get('host');

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../webpack/webpack.dev.js');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, { noInfo: true,
    publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(i18nMiddleware.handle(i18n));

app.use('/static', express.static('public/static'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/stats/:elo/:id', (req, res) => {
  const { elo, id } = req.params;
  getDetailedStatsById(elo.toUpperCase(), id)
    .then(stats => res.status(200).json(stats));
});

app.get('/stats/:elo', (req, res) => {
  const { elo } = req.params;
  getShortEloStats(elo.toUpperCase())
    .then(stats => res.status(200).json(stats));
});

app.get('*', (req, res) => {
  const activeRoutes = routes.filter(route => matchPath(req.url, route));

  const promises = [];
  activeRoutes.forEach((route) => {
    promises.push(route.loadData && route.loadData(req.url));
  });

  Promise.all(promises)
    .then((results) => {
      const initialI18nStore = {};
      req.i18n.languages.forEach((lang) => {
        initialI18nStore[lang] = req.i18n.services.resourceStore.data[lang];
      });

      let initialState = {
        championStats: new ChampionStats()
      };

      results.forEach((data) => {
        initialState = { ...initialState, ...data };
      });

      const markup = renderToString(
        <I18nextProvider i18n={req.i18n}>
          <Provider {...initialState}>
            <StaticRouter location={req.url}>
              <App />
            </StaticRouter>
          </Provider>
        </I18nextProvider>
      );

      const initialData = toJS(initialState);

      const html = template(markup, initialData, isProduction, initialI18nStore,
        req.language);

      res.status(200).send(html);
    });
});

app.listen(port, () => console.info(`Running on port ${port}`));
