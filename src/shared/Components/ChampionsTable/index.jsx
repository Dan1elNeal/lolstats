import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Media from 'react-media';
import InfiniteScroll from 'react-infinite-scroller';
import Row from './Row';
import Header from './Header';

import './styles.css';

@inject('championList', 'championStats')
@observer
export default class ChampionsTable extends Component {
  static propTypes = {
    championList: PropTypes.shape({
      filteredChamps: PropTypes.array.isRequired,
      elo: PropTypes.string.isRequired
    }).isRequired
  }

  render() {
    const { filteredChamps, elo } = this.props.championList;
    return (
      <table styleName="champion-table">
        <Media
          query="(min-width: 400px)"
          render={() => <Header />}
        />
        <InfiniteScroll
          pageStart={0}
          loadMore={() => { this.props.championList.loadMore(); }}
          hasMore={!this.props.championList.isAllDataLoaded}
          element="tbody"
          threshold={0}
          initialLoad={false}
        >
          {filteredChamps.map((champion, index) => (
            <Row
              champion={champion}
              position={index + 1}
              elo={elo}
              key={`${champion.championId}_${champion.role}`}
            />
          ))}
        </InfiniteScroll>
      </table>
    );
  }
}
