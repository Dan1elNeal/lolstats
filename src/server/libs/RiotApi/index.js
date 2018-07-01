// import nodeFetch from 'node-fetch';
import fetchResult from './champions.json';

const champions = {};

export function fetchAllChampionsInfo() {
  return Promise.resolve(fetchChampionData()); /* nodeFetch('https://ru.api.riotgames.com/lol/static-data/v3/champions?locale=ru_RU&champListData=image&dataById=false&api_key=**')
    .then(data => data.json()); */
}

function fetchChampionData() {
  const fetchedChampions = fetchResult.data;
  Object.keys(fetchedChampions).forEach((key) => {
    const { id, name, image } = fetchedChampions[key];
    champions[id] = { name, image };
  });

  return champions;
}
