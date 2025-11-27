import React, {FC, memo} from 'react';
import {Icon, IconList} from '@shared/ui/Icon/Icon';
import styles from './circleButton.module.scss'

interface CircleButtonProps {
  size: 'small' | 'medium';
  style: 'transparent' | 'white';
  className?: string;
  icon: IconList;
  onClick?: () => void;
  disabled?: boolean;
}

export const CircleButton: FC<CircleButtonProps> = memo((props) => {
  const {icon, size, style, onClick, disabled, className} = props;

  return (
    <button
      className={`
        ${styles.button}
        ${styles[style]}
        ${styles[size]}
        ${disabled ? styles.disabled : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
});