import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Media from 'react-media';

import './index.css';

const HEADERS = [
  { name: 'position', query: '(min-width: 538px)' },
  { name: 'name' },
  { name: 'role' },
  { name: 'winRate' },
  { name: 'banRate', query: '(min-width: 632px)' },
  { name: 'playRate', query: '(min-width: 726px)' },
  { name: 'kills', query: '(min-width: 829px)' },
  { name: 'deaths', query: '(min-width: 915px)' },
  { name: 'assists', query: '(min-width: 1038px)' },
  { name: 'totalDamage', query: '(min-width: 1166px)' },
  { name: 'totalDamageTaken', query: '(min-width: 1296px)' },
  { name: 'minionsKilled', query: '(min-width: 1405px)' }
];

@translate(['common'])
@inject('championList')
@observer
export default class Header extends Component {
  static propTypes = {
    championList: PropTypes.shape({
      orderBy: PropTypes.string.isRequired,
      sortBy: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.fn
  }

  static defaultProps = {
    t: text => text
  }

  sortBy = (header) => {
    const { championList } = this.props;

    if (championList.sortBy === header) {
      championList.toggleOrderBy();

      return;
    }

    championList.setSortingBy(header, 'asc');
  }

  render() {
    const { t, championList } = this.props;
    const { orderBy, sortBy } = championList;
    const orderByMarkup = orderBy === 'asc'
      ? <div styleName="champion-table__triange">&#9650;</div>
      : <div styleName="champion-table__triange">&#9660;</div>;

    const Th = ({ className, headerName }) => (
      <th
        className={className}
        styleName="champion-table__th"
        onClick={() => this.sortBy(headerName)}
      >
        {headerName && t(`tableHeaders.${headerName}`)}
        {sortBy === headerName && orderByMarkup}
      </th>
    );

    return (
      <thead
        ref={(thead) => { this.thead = thead; }}
      >
        <tr>
          <Media query={HEADERS[0].query}>
            {matches => (
              matches
                ? <Th headerName={HEADERS[0].name} styleName="champion-table__position" />
                : <Th styleName="champion-table__position" />)}
          </Media>
          {HEADERS.slice(1).map(header => (
            header.query
              ? <Media
                key={header.name}
                query={header.query}
                render={() => <Th key={header.name} headerName={header.name} />}
              />
              : <Th key={header.name} headerName={header.name} />
          ))
          }
        </tr>
      </thead>);
  }
}
