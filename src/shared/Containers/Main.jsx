import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FULFILLED } from 'mobx-utils';

import ChampionsTable from '../Components/ChampionsTable';
import ChampionListFilter from '../Components/ChampionListFilter';
import LoadingSpinner from '../Components/LoadingSpinner';

@inject('championList')
@observer
export default class Main extends Component {
  render() {
    return (
      <Fragment>
        <ChampionListFilter />
        { this.props.championList.fetchedChampions.state !== FULFILLED
          ? <LoadingSpinner
            wrapperStyle={{
              marginTop: '120px'
            }}
          />
          : <ChampionsTable />
        }
      </Fragment>
    );
  }
}
