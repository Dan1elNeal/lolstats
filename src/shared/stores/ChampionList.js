import { observable, computed, action } from 'mobx';
import { fromPromise, FULFILLED } from 'mobx-utils';
import { getShortEloStats } from '../Api';

const SORT_CONDITIONS = {
  winRate: (a, b) => a.winRate > b.winRate,
  banRate: (a, b) => a.banRate > b.banRate,
  playRate: (a, b) => a.playRate > b.playRate,
  kills: (a, b) => a.kills > b.kills,
  deaths: (a, b) => a.deaths > b.deaths,
  assists: (a, b) => a.assists > b.assists,
  totalDamage: (a, b) => a.damageComposition.total > b.damageComposition.total,
  totalDamageTaken: (a, b) => a.totalDamageTaken > b.totalDamageTaken,
  minionsKilled: (a, b) => a.minionsKilled > b.minionsKilled,
  name: (a, b) => a.name > b.name,
  role: (a, b) => a.role > b.role
};

const ORDER_BY_VALUES = {
  asc: [-1, 1],
  desc: [1, -1]
};

const DATA_AMOUNT_INCREMENT = 30;
const DEFAULT_AMOUNT = 20;

export default class ChampionList {
  @observable fetchedChampions;
  @observable _elo;
  @observable nameFilter = ''
  @observable _roleFilter = ''
  @observable _sortBy = 'winRate'
  @observable _orderBy = 'asc'
  @observable _amount = DEFAULT_AMOUNT;

  @action
  fetchChampionStats(elo) {
    this._elo = elo.toUpperCase();
    this.fetchedChampions = fromPromise(getShortEloStats(elo));
  }

  @action
  setSortingBy(sortBy, orderBy) {
    if (Object.keys(SORT_CONDITIONS).includes(sortBy)) {
      this._sortBy = sortBy;
    }

    if (Object.keys(ORDER_BY_VALUES).includes(orderBy)) {
      this._orderBy = orderBy;
    }
  }

  @action
  loadMore() {
    this._amount += DATA_AMOUNT_INCREMENT;
  }

  set roleFilter(role) {
    if (role === 'ALL') {
      this._roleFilter = '';

      return;
    }

    this._roleFilter = role;
  }

  @computed
  get isAllDataLoaded() {
    return this._amount >= this.fetchedChampions.value.length;
  }

  @computed
  get sortBy() {
    return this._sortBy;
  }

  @computed
  get orderBy() {
    return this._orderBy;
  }

  @computed
  get roleFilter() {
    return this._roleFilter === '' ? 'ALL' : this._roleFilter;
  }

  @computed
  get elo() {
    return this._elo;
  }

  @action
  toggleOrderBy() {
    this._orderBy = this._orderBy === 'asc' ? 'desc' : 'asc';
  }

  @computed
  get filteredChamps() {
    if (!this.fetchedChampions || this.fetchedChampions.state !== FULFILLED) {
      return [];
    }

    const regexp = new RegExp(this.nameFilter, 'i');

    const filterCondition = champ =>
      regexp.test(champ.name) && champ.role.includes(this._roleFilter);
    const filtered = this.fetchedChampions.value.filter(filterCondition);

    const sortCondition = SORT_CONDITIONS[this._sortBy];
    const orderByValues = ORDER_BY_VALUES[this._orderBy];
    filtered.sort((a, b) => (sortCondition(a, b) ? orderByValues[0] : orderByValues[1]));

    return filtered.slice(0, this._amount);
  }

  getChampionById(championId) {
    if (!this.fetchedChampions || this.fetchedChampions.state !== FULFILLED) {
      return undefined;
    }

    const parsedChampionId = Number(championId);
    return this.fetchedChampions.value.find(champion => champion.championId === parsedChampionId);
  }

  static fromJS(championListJS) {
    const championList = new ChampionList();
    championList.fetchedChampions = championListJS.fetchedChampions;
    championList._elo = championListJS._elo;
    championList.nameFilter = championListJS.nameFilter;
    championList._roleFilter = championListJS._roleFilter;
    return championList;
  }
}
