import { SUMMONERS_IMAGES } from '../constants';

export function parseItemHash(hash) {
  return hash.split('-').slice(1);
}

export function parseSummonersHash(hash) {
  return hash.split('-').map(summonerId => SUMMONERS_IMAGES[summonerId]);
}

export function parseRunesHash(hash) {
  return hash.split('-');
}
