import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import AppInfo from './Components/AppInfo';
import Main from './Containers/Main';
import ChampionStatsModal from './Components/ChampionStatsModal';

import './App.css';

export default () => (
  <Fragment>
    <AppInfo />
    <Route path="/" component={Main} />
    <Route path="/champions/:championId/:role" component={ChampionStatsModal} />
  </Fragment>
);
