import React, {memo} from 'react';
import styles from './button.module.scss'

export const Button = memo(() => {
  return (
    <button className={styles.root}>
      Привет
    </button>
  );
});