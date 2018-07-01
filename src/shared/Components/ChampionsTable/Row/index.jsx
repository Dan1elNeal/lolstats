import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import { RIOT_STATIC_API_URL } from '../../../constants';

import toPercent from '../../../utils/toPercent';

import './index.css';

@translate(['common'])
export default class ChampionRow extends Component {
  static propTypes = {
    champion: PropTypes.shape({
      image: PropTypes.object,
      name: PropTypes.string,
      title: PropTypes.string
    }).isRequired,
    position: PropTypes.number.isRequired,
    t: PropTypes.fn
  };

  static defaultProps = {
    t: text => text
  }

  render() {
    const { champion, position } = this.props;
    const { t } = this.props;

    const Td = ({ children, className }) => (
      <td className={className} styleName="table-cell">
        <Link
          to={`/champions/${champion.championId}/${champion.role}`}
          styleName="td-link"
        >
          <div styleName="link-content">{children}</div>
        </Link>
      </td>
    );

    return (
      <tr
        styleName="table-row"
      >
        <Td>{position}</Td>
        <Td styleName="champion-preview-cell">
          <div
            styleName="champion-sprite"
            style={{
              backgroundImage: `url("${RIOT_STATIC_API_URL}/${champion.patch}.1/img/sprite/${champion.image.sprite}")`,
              backgroundPosition: `-${champion.image.x}px -${champion.image.y}px`
            }}
          />
          <div styleName="champion-name">{champion.name}</div>
        </Td>
        <Td>{t(`roles.${champion.role}`)}</Td>
        <Td>{toPercent(champion.winRate)}%</Td>
        <Media
          query="(min-width: 632px)"
          render={() => <Td>{toPercent(champion.banRate)}%</Td>}
        />
        <Media
          query="(min-width: 726px)"
          render={() => <Td>{toPercent(champion.playRate)}%</Td>}
        />
        <Media
          query="(min-width: 829px)"
          render={() => <Td>{champion.kills.toFixed(2)}</Td>}
        />
        <Media
          query="(min-width: 915px)"
          render={() => <Td>{champion.deaths.toFixed(2)}</Td>}
        />
        <Media
          query="(min-width: 1038px)"
          render={() => <Td>{champion.assists.toFixed(2)}</Td>}
        />
        <Media
          query="(min-width: 1166px)"
          render={() => <Td>{champion.damageComposition.total.toFixed(2)}</Td>}
        />
        <Media
          query="(min-width: 1296px)"
          render={() => <Td>{champion.totalDamageTaken.toFixed(2)}</Td>}
        />
        <Media
          query="(min-width: 1405px)"
          render={() => <Td>{champion.minionsKilled.toFixed(2)}</Td>}
        />
      </tr>);
  }
}
