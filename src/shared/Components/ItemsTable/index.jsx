import React, { Fragment } from 'react';
import OverviewTable from '../OverviewTable';

import './index.css';

export default ({ className, headerText, itemsObject, parseHash, imageBaseUrl }) => {
  const InfoComponent = ({ data }) => (
    <Fragment>
      {data.map(itemId => (
        <img
          styleName="items-table__img"
          src={`${imageBaseUrl}/${itemId}.png`}
        />
      ))}
    </Fragment>
  );

  return (
    <OverviewTable
      className={className}
      headerText={headerText}
      data={itemsObject}
      parseHash={parseHash}
      InfoComponent={InfoComponent}
    />
  );
};
