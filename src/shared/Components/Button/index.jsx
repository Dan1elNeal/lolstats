import React from 'react';

import './index.css';

export default ({ className, isSelected, children, onClick }) => (
  <button
    className={className}
    styleName={isSelected
      ? 'button selected-button'
      : 'button'
    }
    onClick={onClick}
  >
    {children}
  </button>
);
