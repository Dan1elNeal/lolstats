const origin = process.env.BROWSER ? location.origin : 'http://localhost:3000';

export function getChampStatsById(elo, id) {
  return fetch(`${origin}/stats/${elo}/${id}`)
    .then(res => res.json());
}

export function getShortEloStats(elo) {
  return fetch(`${origin}/stats/${elo}`)
    .then(res => res.json());
}
