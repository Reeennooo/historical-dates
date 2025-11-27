import {FC, memo, useCallback, useState} from 'react';
import {Container} from '@shared/ui/Container';
import styles from '../styles/historicalSlider.module.scss';
import {HistoricalSliderTitle} from '@features/HistoricalSlider/ui/HistoricalSliderTitle';
import {CircleSlider} from '@features/HistoricalSlider/ui/CircleSlider';
import {Slide} from '@features/HistoricalSlider/model/slider.model';
import {HorizontalSlider} from '@features/HistoricalSlider/ui/HorizontalSlider';

interface Props {
  slides: Slide[]
}

export const HistoricalSlider: FC<Props> = memo((props) => {
  const {slides} = props;
  const [activeSlideId, setActiveSlideId] = useState(slides[0].id);
  const onChangeMainSlide = useCallback((id: number) => {
    setActiveSlideId(id);
  }, [])

  return (
    <Container>
      <div className={styles.root}>
        <div className={styles.decorVertical} />
        <div className={styles.decorHorizontal} />
        <HistoricalSliderTitle title={'Исторические\nдаты'} />
        <CircleSlider slides={slides} onChangeSlideCallback={onChangeMainSlide} />
        <HorizontalSlider slideId={activeSlideId} />
      </div>
    </Container>
  );
});