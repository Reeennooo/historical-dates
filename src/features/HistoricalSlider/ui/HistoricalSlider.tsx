import {FC, memo} from 'react';
import {Container} from '@shared/ui/Container';
import styles from '../styles/historicalSlider.module.scss';
import {HistoricalSliderTitle} from '@features/HistoricalSlider/ui/HistoricalSliderTitle';
import {CircleSlider} from '@features/HistoricalSlider/ui/CircleSlider';
import {Slide} from '@features/HistoricalSlider/model/slider.model';
import {Icon} from '@shared/ui/Icon/Icon';

interface Props {
  slides: Slide[]
}

export const HistoricalSlider: FC<Props> = memo((props) => {
  const {slides} = props;
  return (
    <Container>
      <div className={styles.root}>
        <div className={styles.decorVertical} />
        <div className={styles.decorHorizontal} />
        <HistoricalSliderTitle title={'Исторические\nдаты'} />
        <CircleSlider slides={slides} />
      </div>
    </Container>
  );
});