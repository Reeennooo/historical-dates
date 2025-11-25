import {memo} from 'react';
import {Container} from '@shared/ui/Container';
import styles from '../styles/historicalSlider.module.scss';
import {HistoricalSliderTitle} from '@features/HistoricalSlider/ui/HistoricalSliderTitle';
import {CircleSlider} from '@features/HistoricalSlider/ui/CircleSlider';

export const HistoricalSlider = memo(() => {
  return (
    <Container>
      <div className={styles.root}>
        <HistoricalSliderTitle title={'Исторические\nдаты'} />
        <CircleSlider />
      </div>
    </Container>
  );
});