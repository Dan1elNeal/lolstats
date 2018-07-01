import React from 'react';
import toPercent from '../../utils/toPercent';

import './index.css';

const DEFAULT_WIDTH_PX = 200;
const DEFAULT_HEIGHT_PX = 22;

export default ({ className, rate, widthPx, heightPx, caption, showMarkers = true }) => {
  const width = widthPx || DEFAULT_WIDTH_PX;
  const height = heightPx || DEFAULT_HEIGHT_PX;
  const spanWidth = width * rate;

  return (
    <div
      className={className}
      styleName="bar"
    >
      {showMarkers && (
        <div
          styleName="markers"
          style={{ width: `${width}px` }}
        >
          <div>0%</div>
          <div styleName="center-marker">50%</div>
          <div>100%</div>
        </div>)}
      <div
        styleName="bar-div"
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        <span
          styleName="bar-span"
          style={{
            width: `${spanWidth}px`,
            height: `${height}px`
          }}
        />
        <span styleName="rate">
          <b>{toPercent(rate)}%</b>
        </span>
      </div>
      {caption && (
        <small
          styleName="caption"
          style={{
            height: `${height}px`,
            lineHeight: `${height}px`
          }}
        >
          {caption}
        </small>
      )}
    </div>
  );
};
