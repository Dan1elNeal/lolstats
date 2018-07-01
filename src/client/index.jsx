import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import 'isomorphic-fetch';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/App';
import ChampionList from '../shared/stores/ChampionList';
import ChampionStats from '../shared/stores/ChampionStats';
import i18n from '../i18n/i18n-client';

const { championList, championStats } = window.initialState || {};
const initialState = {
  championList: ChampionList.fromJS(championList),
  championStats: championStats ? ChampionStats.fromJS(championStats) : new ChampionStats()
};

const hydrateAppComponent = (AppComponent) => {
  ReactDOM.hydrate(
    <I18nextProvider
      i18n={i18n}
      initialI18nStore={window.initialI18nStore}
      initialLanguage={window.initialLanguage}
    >
      <Provider {...initialState}>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>,
    document.getElementById('app'),
  );
};

hydrateAppComponent(App);

if (module.hot) {
  module.hot.accept('../shared/App', () => {
    const NewApp = require('../shared/App').default;
    hydrateAppComponent(NewApp);
  });
}
