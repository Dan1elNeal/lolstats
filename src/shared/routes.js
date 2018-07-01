import URL from 'url-parse';
import querystring from 'querystring';

import Main from './Containers/Main';
import ChampionStatsModal from './Components/ChampionStatsModal';
import ChampionList from './stores/ChampionList';
import ChampionStats from './stores/ChampionStats';

const DEFAULT_ELO = 'PLATINUM,DIAMOND,MASTER,CHALLENGER';

const routes = [
  {
    path: '/',
    component: Main,
    loadData: async (url) => {
      const { query } = new URL(url);
      const { elo, role } = querystring.parse(query.slice(1));

      const championList = new ChampionList();

      championList.fetchChampionStats(elo || DEFAULT_ELO);
      await championList.fetchedChampions;

      championList.roleFilter = role || 'ALL';

      return { championList };
    }
  },
  {
    path: '/champions/:championId/:role',
    component: ChampionStatsModal,
    loadData: async (url) => {
      const { pathname, query } = new URL(url);
      const { elo } = querystring.parse(query.slice(1));

      const pathChunks = pathname.split('/');
      const role = pathChunks.pop();
      const championId = pathChunks.pop();

      const championStats = new ChampionStats();

      championStats.fetchStatsById(elo || DEFAULT_ELO, championId);
      await championStats.fetchedStats;

      championStats.role = role;

      return { championStats };
    }
  }
];

export default routes;
