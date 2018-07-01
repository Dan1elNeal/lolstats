import { fetchElosStats } from '../ChampionGgApi';
import { fetchAllChampionsInfo } from '../RiotApi';

const CHAMP_DATA = {
  short: 'kda,damage,averageGames,totalHeal,killingSpree,minions,gold',
  detailed: 'damage,minions,wins,wards,positions,averageGames,overallPerformanceScore,goldEarned,sprees,hashes,maxMins,matchups'
};

const ONE_HOUR = 3600000;

let shortStats = {};
let detailedStats = {};


export function getShortEloStats(elo) {
  return shortStats.then(stats => JSON.parse(JSON.stringify(stats[elo])));
}

export function getDetailedEloStats(elo) {
  return detailedStats.then(stats => JSON.parse(JSON.stringify(stats[elo])));
}

export async function getDetailedStatsById(elo, id) {
  const numberId = Number(id);
  if (!numberId) {
    return [];
  }

  const filteredStats = await detailedStats.then(stats =>
    stats[elo].filter(championStats => championStats.championId === numberId));

  return JSON.parse(JSON.stringify(filteredStats));
}

async function fetchDetailedStats() {
  return fetchStats(CHAMP_DATA.detailed);
}

async function fetchShortStats() {
  return fetchStats(CHAMP_DATA.short);
}

async function fetchStats(champData) {
  const [championsInfo, championStats] = await Promise.all([
    fetchAllChampionsInfo(),
    fetchElosStats(champData)
  ]);

  Object.keys(championStats).forEach((elo) => {
    championStats[elo] = championStats[elo].map((stats) => {
      const championInfo = championsInfo[stats.championId];
      return Object.assign(stats, championInfo);
    });
  });

  return championStats;
}

async function updateStats() {
  console.info('\n', new Date().toLocaleString(), 'updating stats started');

  const newShortStats = await fetchShortStats();
  const newDetailedStats = await fetchDetailedStats();

  shortStats = Promise.resolve(newShortStats);
  detailedStats = Promise.resolve(newDetailedStats);

  setTimeout(updateStats, ONE_HOUR);

  console.info(new Date().toLocaleString(), 'stats updated');
}

shortStats = fetchShortStats();
detailedStats = fetchDetailedStats();

setTimeout(updateStats, ONE_HOUR);

