import React, { Component } from 'react';
import { translate } from 'react-i18next';

import './index.css';

const SUPPOERTED_LANGUAGES = ['en', 'ru'];

@translate(['common'])
export default class AppInfo extends Component {
  onSelectChange = (event) => {
    this.props.i18n.changeLanguage(event.target.value);
  }

  render() {
    const { className, t, i18n } = this.props;

    return (
      <div
        className={className}
        styleName="app-info"
      >
        <aside styleName="app-info__aside">
          {t('other.thisAppUse')}
          <a href="http://api.champion.gg" styleName="app-info__link"> Champion.gg API</a>
        </aside>
        <label htmlFor="lang-select">
          <span styleName="app-info__language">{t('other.language')}:</span>
          <select
            id="lang-select"
            styleName="app-info__select"
            onChange={this.onSelectChange}
          >
            <option disabled selected>{i18n.language}</option>
            {SUPPOERTED_LANGUAGES.map(lang => <option>{lang}</option>)}
          </select>
        </label>
      </div>
    );
  }
}