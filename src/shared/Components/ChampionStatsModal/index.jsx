import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ChampionStats from '../ChampionStats';

import './styles.css';

@withRouter
export default class ChampionStatsModal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction.bind, false);
  }

  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.history.push('/');
    }
  }

  render() {
    const { match } = this.props;
    const { championId, role } = match.params;

    return (
      <section
        styleName="modal"
      >
        <Link to="/" styleName="modal__link" />
        <ChampionStats
          championId={championId}
          role={role}
        />
      </section>
    );
  }
}
