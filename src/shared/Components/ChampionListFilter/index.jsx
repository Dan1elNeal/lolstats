import React, { Component } from 'react';
import { inject, observer, PropTypes as ObservablePropTypes } from 'mobx-react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Button from '../Button';
import RoleButton from '../RoleButton';
import { ELOS } from '../../constants';

import './styles.css';

const ROLES = ['ALL', 'DUO_CARRY', 'DUO_SUPPORT', 'JUNGLE', 'MIDDLE', 'TOP'];

@translate(['common'])
@inject('championList')
@observer
export default class ChampionListFilter extends Component {
  onInputChange = (event) => {
    this.props.championList.nameFilter = event.target.value;
  }

  onRoleButtonClick = (roleName) => {
    this.props.championList.roleFilter = roleName;
  }

  onEloButtonClick = (elo) => {
    this.props.championList.fetchChampionStats(elo);
  }

  render() {
    const { t, championList } = this.props;
    return (
      <section
        styleName="champion-filter"
      >
        <section styleName="button-section">
          {ROLES.map(role => (
            <RoleButton
              styleName="champion-filter__button"
              onClick={() => this.onRoleButtonClick(role)}
              isSelected={championList.roleFilter === role}
              role={role}
              key={role}
              t={t}
            />
          ))
          }
        </section>
        <section styleName="button-section">
          {
            ELOS.map(elo => (
              <Button
                isSelected={championList.elo === elo}
                key={elo}
                onClick={() => this.onEloButtonClick(elo)}
                styleName="champion-filter__button"
              >
                {t((`elos.${elo}`))}
              </Button>
            ))
          }
        </section>
        <label
          htmlFor="champion-search-input"
          styleName="champion-filter__label"
        >
          <div styleName="champion-filter__prompt">
            {t('prompts.championSearch')}
          </div>
          <input
            styleName="champion-filter__input"
            type="text"
            onChange={this.onInputChange}
            id="champion-search-input"
          />
        </label>
      </section>
    );
  }
}

ChampionListFilter.wrappedComponent.propTypes = {
  championList: ObservablePropTypes.observableObject.isRequired,
  t: PropTypes.func.isRequired
};
