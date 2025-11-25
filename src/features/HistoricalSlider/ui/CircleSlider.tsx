import {memo} from 'react';
import styles from '../styles/circleSlider.module.scss'

export const CircleSlider = memo(() => {
  return (
    <div className={styles.root}>
      <div className={styles.circle}>

      </div>
      <span
        className={`
        ${styles.date}
        ${styles.firstDate}
      `}
      >
        2015
      </span>
      <span
        className={`
        ${styles.date}
        ${styles.secondDate}
      `}
      >
        2022
      </span>
    </div>
  );
});