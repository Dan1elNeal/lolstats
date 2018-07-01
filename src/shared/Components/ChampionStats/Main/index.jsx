import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ItemsTable from '../../ItemsTable';
import Chart from '../../Chart';
import SkillOrderTable from '../../SkillOrderTable';
import Runes from '../../Runes';
import { parseItemHash, parseSummonersHash, parseRunesHash } from '../../../utils/hashParsers';
import { convertWinsByMatchLength, convertWinsByMatchesPlayed } from '../../../utils/dataConverters';
import { RIOT_STATIC_API_URL, RUNES_IMAGE_URL } from '../../../constants';

import './index.css';

@translate(['common'])
export default class ChampionStatsMain extends Component {
  render() {
    const { currentRoleStats, t } = this.props;
    const baseItemImageUrl = `${RIOT_STATIC_API_URL}/${currentRoleStats.patch}.1/img/item`;
    const baseSummonersItemUrl = `${RIOT_STATIC_API_URL}/${currentRoleStats.patch}.1/img/spell`

    return (
      <section styleName="stats-main">
        <div styleName="stats-main__stats-asset">
          {currentRoleStats.hashes.summonershash && (
            <ItemsTable
              styleName="stats-main__element"
              headerText={t('other.summoners')}
              itemsObject={currentRoleStats.hashes.summonershash}
              parseHash={parseSummonersHash}
              imageBaseUrl={baseSummonersItemUrl}
            />
          )}
          {currentRoleStats.hashes.firstitemshash && (
            <ItemsTable
              styleName="stats-main__element"
              headerText={t('other.firstItems')}
              itemsObject={currentRoleStats.hashes.firstitemshash}
              parseHash={parseItemHash}
              imageBaseUrl={baseItemImageUrl}
            />
          )}
          {currentRoleStats.hashes.finalitemshashfixed && (
            <ItemsTable
              styleName="stats-main__element"
              headerText={t('other.finalItems')}
              itemsObject={currentRoleStats.hashes.finalitemshashfixed}
              parseHash={parseItemHash}
              imageBaseUrl={baseItemImageUrl}
            />
          )}
          {currentRoleStats.hashes.trinkethash && (
            <ItemsTable
              styleName="stats-main__element"
              headerText={t('other.trinkets')}
              itemsObject={currentRoleStats.hashes.trinkethash}
              parseHash={hash => [hash]}
              imageBaseUrl={baseItemImageUrl}
            />
          )}
        </div>
        <div styleName="stats-main__stats-asset">
          {currentRoleStats.hashes.skillorderhash && (
            <SkillOrderTable
              styleName="stats-main__element"
              headerText={t('other.skillOrder')}
              skillOrderObject={currentRoleStats.hashes.skillorderhash}
              parseHash={parseItemHash}
            />
          )}
          {currentRoleStats.hashes.runehash && (
            <Runes
              styleName="stats-main__element"
              runesObject={currentRoleStats.hashes.runehash}
              parseHash={parseRunesHash}
              baseImgUrl={RUNES_IMAGE_URL}
            />
          )}
        </div>
        <div styleName="stats-main__stats-asset">
          {currentRoleStats.winsByMatchLength && (
            <Chart
              styleName="stats-main__element"
              data={convertWinsByMatchLength(currentRoleStats.winsByMatchLength)}
              headerText={t('other.winsByMatchLength')}
            />
          )}
          {currentRoleStats.winsByMatchesPlayed && (
            <Chart
              styleName="stats-main__element"
              data={convertWinsByMatchesPlayed(currentRoleStats.winsByMatchesPlayed)}
              headerText={t('other.winsByMatchesPlayed')}
            />
          )}
        </div>
      </section>
    );
  }
}
