import React from 'react';
import Button from '../Button';
import { STATIC_DATA_URL } from '../../constants';

export default ({ className, isSelected, onClick, role, t }) => (
  <Button
    isSelected={isSelected}
    className={className}
    onClick={onClick}
  >
    <img
      src={`${STATIC_DATA_URL}/images/roles/${role}.png`}
      alt=""
      width="30px"
    />
    <div>{t(`roles.${role}`)}</div>
  </Button>
);
