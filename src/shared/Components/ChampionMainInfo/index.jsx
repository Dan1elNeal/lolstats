import React, { Component } from 'react';
import { translate } from 'react-i18next';
import RateBar from '../RateBar';
import { RIOT_STATIC_API_URL } from '../../constants';

import './index.css';

@translate(['common'])
export default class ChampionMainInfo extends Component {
  render() {
    const { className, name, image, role, winRatePosition, winRate, banRate, patch, t }
      = this.props;

    return (
      <div
        className={className}
        styleName="champion-main-info"
      >
        <div styleName="champion-main-info__image-wrapper">
          <img
            src={`${RIOT_STATIC_API_URL}/${patch}.1/img/champion/${image.full}`}
            alt={name}
          />
        </div>
        <div>
          <div styleName="champion-main-info__name">{name}</div>
          <div>{t(`roles.${role}`)}</div>
          <div>
            {t('positions.winRates')}: #{winRatePosition}
          </div>
          <RateBar
            rate={winRate}
            caption="Win Rate"
          />
          <RateBar
            rate={banRate}
            caption="Ban Rate"
            showMarkers={false}
            heightPx={14}
          />
        </div>
      </div>
    );
  }
}
