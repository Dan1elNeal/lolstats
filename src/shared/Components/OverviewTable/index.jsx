import React, { Component } from 'react';
import { translate } from 'react-i18next';
import toPercent from '../../utils/toPercent';

import './index.css';

@translate(['common'])
export default class OverviewTable extends Component {
  render() {
    const { className, headerText, t, data, parseHash, InfoComponent } = this.props;
    const { highestCount, highestWinrate } = data;

    const BodyTr = ({ itemsInfo, description }) => (
      <tr>
        <td styleName="overview-table__td overview-table__description-td">{description}</td>
        <td
          styleName="overview-table__td overview-table__images-td"
        >
          <InfoComponent
            data={parseHash(itemsInfo.hash)}
          />
        </td>
        <td styleName="overview-table__td">{toPercent(itemsInfo.winrate)}%</td>
        <td styleName="overview-table__td">{itemsInfo.count}</td>
      </tr>
    );

    return (
      <table className={className} styleName="overview-table">
        <thead styleName="overview-table__thead">
          <tr>
            <th colSpan="2" styleName="overview-table__th">
              <h3 styleName="overview-table__header-text">{headerText}</h3>
            </th>
            <th styleName="overview-table__th">{t('tableHeaders.winRate')}</th>
            <th styleName="overview-table__th">{t('other.gameCount')}</th>
          </tr>
        </thead>
        <tbody>
          {highestWinrate && (
            <BodyTr
              itemsInfo={highestWinrate}
              description={t('other.highestWinrate')}
            />
          )}
          {highestCount && (
            <BodyTr
              itemsInfo={highestCount}
              description={t('other.highestCount')}
            />
          )}
        </tbody>
      </table>
    );
  }
}
