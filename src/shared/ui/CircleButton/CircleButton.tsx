import React, {FC, memo} from 'react';
import {Icon, IconList} from '@shared/ui/Icon/Icon';
import styles from './circleButton.module.scss'

interface Props {
  size: 'small' | 'medium';
  style: 'transparent' | 'white';
  className?: string;
  icon: IconList
}

export const CircleButton: FC<Props> = memo((props) => {
  const {icon, size, style} = props;

  return (
    <button
      className={`
        ${styles.root}
        ${styles[style]}
        ${styles[size]}
      `}
    >
      <Icon name={icon} />
    </button>
  );
});