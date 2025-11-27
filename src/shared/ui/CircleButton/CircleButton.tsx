import React, {FC, memo} from 'react';
import {Icon, IconList} from '@shared/ui/Icon/Icon';
import styles from './circleButton.module.scss'

interface Props {
  size: 'small' | 'medium';
  style: 'transparent' | 'standard';
  className?: string;
  icon: IconList;
  onClick?: () => void;
  disabled?: boolean;
}

export const CircleButton: FC<Props> = memo((props) => {
  const {icon, size, style, onClick, disabled} = props;

  return (
    <button
      className={`
        ${styles.button}
        ${styles[style]}
        ${styles[size]}
        ${disabled ? styles.disabled : ''}
      `}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
});