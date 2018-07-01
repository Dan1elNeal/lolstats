import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { translate } from 'react-i18next';
import { ELOS, STATIC_DATA_URL } from '../../../constants';
import Button from '../../Button';
import toPercent from '../../../utils/toPercent';
import ChampionMainInfo from '../../ChampionMainInfo';

import './index.css';

@translate(['common'])
@inject('championStats', 'championList')
@observer
export default class ChampionStatsHeader extends Component {
  render() {
    const { championId, championList, championStats, t, onEloButtonClick } = this.props;
    const { currentRoleStats, stats, currentElo, role } = championStats;
    const { name, image } = championList.getChampionById(championId);

    return (
      <section>
        <div styleName="stats-header__contollers-wrapper">
          <section styleName="stats-header__controllers stats-header__controllers_flex-start">
            {stats.map(roleStats => (
              <Link
                to={`/champions/${championId}/${roleStats.role}`}
                styleName={role === roleStats.role
                  ? 'stats-header__link stats-header__link_selected'
                  : 'stats-header__link'
                }
                key={roleStats.role}
              >
                <img
                  src={`${STATIC_DATA_URL}/images/roles/${roleStats.role}.png`}
                  alt=""
                  width="30px"
                />
                <span styleName="stats-header__link-text">
                  {t(`roles.${roleStats.role}`)} ({toPercent(roleStats.percentRolePlayed)}%)
                </span>
              </Link>
            ))
            }
          </section>
          <section styleName="stats-header__controllers stats-header__controllers_flex-end">
            {ELOS.map(elo => (
              <Button
                styleName="stats-header__button"
                onClick={() => onEloButtonClick(elo)}
                isSelected={currentElo === elo}
                key={elo}
              >
                {t(`elos.${elo}`)}
              </Button>
            ))}
          </section>
        </div>
        <ChampionMainInfo
          styleName="stats-header__champion-main-info"
          name={name}
          image={image}
          role={currentRoleStats.role}
          winRatePosition={currentRoleStats.positions.winRates}
          winRate={currentRoleStats.winRate}
          banRate={currentRoleStats.banRate}
          patch={currentRoleStats.patch}
        />
      </section>
    );
  }
}
