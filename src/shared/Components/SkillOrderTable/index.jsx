import React from 'react';
import OverviewTable from '../OverviewTable';

import './index.css';

export default ({ className, headerText, skillOrderObject, parseHash }) => {
  const InfoComponent = ({ data }) => (
    <table>
      <thead>
        <tr styleName="skill-order-table__tr">
          {data.map((skill, index) => <th styleName="skill-order-table__th">{index + 1}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map(skill => <td styleName="skill-order-table__td">{skill}</td>)}
        </tr>
      </tbody>
    </table>
  );

  return (
    <OverviewTable
      className={className}
      headerText={headerText}
      data={skillOrderObject}
      parseHash={parseHash}
      InfoComponent={InfoComponent}
    />
  );
};
