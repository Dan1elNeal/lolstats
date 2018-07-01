import { observable, action, computed } from 'mobx';
import { fromPromise, FULFILLED } from 'mobx-utils';
import { getChampStatsById } from '../Api';
import { DEFAULT_ELO } from '../constants';

export default class ChampionStats {
  @observable fetchedStats;
  @observable role = '';
  @observable _currentElo = DEFAULT_ELO;

  @action.bound
  fetchStatsById(elo, id) {
    this._currentElo = elo;
    this.fetchedStats = fromPromise(getChampStatsById(elo, id));
  }

  get currentElo() {
    return this._currentElo;
  }

  @computed
  get currentRoleStats() {
    if (!this.fetchedStats || this.fetchedStats.state !== FULFILLED) {
      return undefined;
    }

    return this.fetchedStats.value.find(stats => stats.role.includes(this.role));
  }

  @computed
  get stats() {
    if (!this.fetchedStats || this.fetchedStats.state !== FULFILLED) {
      return undefined;
    }

    return this.fetchedStats.value;
  }

  static fromJS(championStatsJS) {
    const championStats = new ChampionStats();
    championStats.fetchedStats = championStatsJS.fetchedStats;
    championStats.role = championStatsJS.role;
    return championStats;
  }
}
