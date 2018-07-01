import config from 'config';
import { ELOS } from '../../../shared/constants';

const { championGgApiKey } = config.get('api');

const API_URL = 'http://api.champion.gg/v2/champions';


// 'http://api.champion.gg/v2/champions?elo=SILVER&champData=damage,minions,wins,wards,positions,averageGames,overallPerformanceScore,goldEarned,sprees,hashes,maxMins,matchups&limit=200&api_key='


export async function fetchStatsByElo(champData, elo) {
  let eloParam = '';
  if (elo && elo !== 'PLATINUM,DIAMOND,MASTER,CHALLENGER') {
    eloParam = `elo=${elo}`;
  }

  const stats = await fetch(`${API_URL}?${eloParam}&champData=${champData}&limit=300&api_key=${championGgApiKey}`)
    .then(res => res.json());

  console.info(new Date().toLocaleString(), ` fetched: (${elo}) ${champData}`);

  return stats;
}

export async function fetchElosStats(champData) {
  const stats = {};
  await Promise.all(
    ELOS.map(elo =>
      fetchStatsByElo(champData, elo)
        .then((eloStats) => { stats[elo] = eloStats; }))
  );

  return stats;
}
