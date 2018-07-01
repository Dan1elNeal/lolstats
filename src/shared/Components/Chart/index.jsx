import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

import './index.css';

export default ({ className, data, headerText, graphicWidth = 400, graphicHeight = 180 }) => (
  <div className={className}>
    {headerText && (
      <div styleName="chart__header">
        <h2 styleName="chart__header-text">{headerText}</h2>
      </div>
    )}
    <LineChart
      width={graphicWidth}
      height={graphicHeight}
      data={data}
      margin={{ right: 10, top: 10, left: 10 }}
    >
      <XAxis
        dataKey="name"
        axisLine={false}
      />
      <YAxis
        type="number"
        domain={[dataMin => dataMin, dataMax => dataMax]}
        unit="%"
        axisLine={false}
      />
      <CartesianGrid strokeDasharray="5 5" stroke="#A7A1AE" />
      <Tooltip
        isAnimationActive={false}
        wrapperStyle={{
          backgroundColor: '#323C50',
          border: 'none'
        }}
      />
      <Line
        type="linear"
        dataKey="value"
        stroke="#4DC3FA"
        unit="%"
        dot={{ stroke: '#4DC3FA', strokeWidth: 7, r: 1 }}
        activeDot={{ stroke: '#4DC3FA', strokeWidth: 10, r: 1 }}
      />
    </LineChart>
  </div>);
