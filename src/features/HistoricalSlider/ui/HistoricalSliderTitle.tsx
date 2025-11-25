import {FC, memo} from 'react';
import styles from '../styles/historicalSliderTitle.module.scss';

interface HistoricalSliderTitleProps {
  title: string;
}

export const HistoricalSliderTitle: FC<HistoricalSliderTitleProps> = memo((props) => {
  const {title} = props;
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
});