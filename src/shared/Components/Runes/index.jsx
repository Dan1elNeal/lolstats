import React, { Component } from 'react';
import { translate } from 'react-i18next';
import toPercent from '../../utils/toPercent';

import './index.css';

@translate(['common'])
export default class Runes extends Component {
  render() {
    const { className, runesObject, parseHash, baseImgUrl, t } = this.props;
    const { highestCount, highestWinrate } = runesObject;
    const highestWinrateRunes = highestWinrate ? parseHash(highestWinrate.hash) : undefined;
    const highestCountRunes = highestCount ? parseHash(highestCount.hash) : undefined;

    const RunesAsset = ({ headerText, runes, winrate, count }) => (
      <section styleName="runes__runes-asset">
        <h2 styleName="runes__runes-asset-header">{ headerText }</h2>
        <div styleName="runes__runes-wrapper">
          <div styleName="runes__runes-main-asset">
            <div styleName="runes__runes-asset-preview runes__runes-asset-img-wrapper">
              <img src={`${baseImgUrl}/${runes[0]}.png`} />
            </div>
            {runes.slice(1, 5).map(rune => (
              <div styleName="runes__runes-asset-img-wrapper">
                <img
                  src={`${baseImgUrl}/${rune}.png`}
                  styleName="runes__img"
                />
              </div>
            ))}
          </div>
          <div styleName="runes__runes-secondary-asset">
            <div styleName="runes__runes-asset-preview runes__runes-asset-img-wrapper">
              <img
                src={`${baseImgUrl}/${runes[5]}.png`}
                styleName="runes__img"
              />
            </div>
            {runes.slice(6, 8).map(rune => (
              <div styleName="runes__runes-asset-img-wrapper">
                <img
                  src={`${baseImgUrl}/${rune}.png`}
                  styleName="runes__img"
                />
              </div>
            ))}
          </div>
        </div>
        <div styleName="runes__stats">
          <div styleName="runes__stats-text">{t('tableHeaders.winRate')}: {toPercent(winrate)}%</div>
          <div styleName="runes__stats-text">{t('other.gameCount')}: {count}</div>
        </div>
      </section>
    );

    return (
      <section
        className={className}
        styleName="runes"
      >
        {highestWinrateRunes && (
          <RunesAsset
            headerText="Наибольший процент побед"
            runes={highestWinrateRunes}
            count={highestWinrate.count}
            winrate={highestWinrate.winrate}
          />
        )}
        {highestCountRunes && (
          <RunesAsset
            headerText="Наибольшее количество игр"
            runes={highestCountRunes}
            count={highestWinrate.count}
            winrate={highestWinrate.winrate}
          />
        )}
      </section>
    );
  }
}
