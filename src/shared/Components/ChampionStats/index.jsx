
import React, { Component, Fragment } from 'react';
import { inject, observer, PropTypes as ObservablePropTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import { FULFILLED } from 'mobx-utils';
import { Redirect } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner';
import ChampionStatsHeader from './Header';
import ChampionStatsMain from './Main';

import './styles.css';

@inject('championStats', 'championList')
@observer
export default class ChampionStats extends Component {
  static propTypes = {
    championStats: PropTypes.shape({
      fetchStatsById: PropTypes.func,
      fetchedStats: ObservablePropTypes.observableObject,
      role: PropTypes.string
    }).isRequired,
    championId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    elo: PropTypes.string,
    role: PropTypes.string.isRequired
  }

  static defaultProps = {
    elo: 'PLATINUM,DIAMOND,MASTER,CHALLENGER'
  }

  componentDidMount() {
    const { fetchStatsById, fetchedStats } = this.props.championStats;
    if (!fetchedStats) {
      fetchStatsById(this.props.elo, this.props.championId);
    }
  }

  componentDidUpdate() {
    this.props.championStats.role = this.props.role;
  }

  componentWillUnmount() {
    this.props.championStats.fetchedStats = null;
  }

  onEloButtonClick = (elo) => {
    const { fetchStatsById } = this.props.championStats;
    fetchStatsById(elo, this.props.championId);
  }

  render() {
    const { championStats, championId, t } = this.props;
    const { currentRoleStats, fetchedStats, stats } = championStats;

    return (
      <article styleName="champion-stats" >
        { fetchedStats && fetchedStats.state === FULFILLED
          ? (
            <section>
              {!currentRoleStats
                ? <Redirect to={`/champions/${championId}/${stats[0].role}`} />
                : (
                  <Fragment>
                    <ChampionStatsHeader
                      championId={championId}
                      onEloButtonClick={this.onEloButtonClick}
                      t={t}
                    />
                    <ChampionStatsMain
                      currentRoleStats={currentRoleStats}
                    />
                  </Fragment>
                )
              }
            </section>
          )
          : <LoadingSpinner
            wrapperStyle={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        }
      </article>
    );
  }
}
