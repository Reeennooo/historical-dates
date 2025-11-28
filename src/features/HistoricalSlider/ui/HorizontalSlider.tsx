import {FC, memo, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ISlideEvent, slides} from '@features/HistoricalSlider/model/slider.model';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from '../styles/horizontalSlider.module.scss';
import {Swiper as SwiperType} from 'swiper';
import {CircleButton} from '@shared/ui/CircleButton';
import {useWindowWidth} from '@shared/hooks/useWindowWidth';
import {useBreakpoints} from '@shared/hooks/useBreakPoints';

interface HorizontalSliderProps {
  slideId: number
}

export const HorizontalSlider: FC<HorizontalSliderProps> = memo((props) => {
  const {slideId} = props;
  const [horizontalSlides, setHorizontalSlides] = useState<ISlideEvent[]>([]);
  const swiperRef = useRef<SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [hideNextButton, setHideNextButton] = useState(false);
  const breakpoints = useBreakpoints();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const data = slides.find(el => el.id === slideId)?.events;
    if (data) setHorizontalSlides(data);
  }, [slideId]);

  const onClickPrevButton = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const onClickNextButton = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    if (
      swiperRef.current?.isEnd
      && currentSlideIndex > 0
    ) {
      setHideNextButton(true)
    } else {
      setHideNextButton(false)
    }
  }, [
    swiperRef.current?.isEnd,
    currentSlideIndex
  ]);

  return (
    <div
      key={slideId}
      className={`
        ${styles.root}
        ${styles.animate}
      `}
    >
      <Swiper
        loop={false}
        modules={[Navigation, Pagination]}
        slidesPerView={'auto'}
        spaceBetween={windowWidth < breakpoints.tablet ? 25 : 80}
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => setCurrentSlideIndex(swiper.activeIndex)}
      >
        {horizontalSlides.map(el => (
          <SwiperSlide
            key={el.id}
            className={styles.slide}
          >
            <p className={styles.slideTitle}>{el.year}</p>
            <p className={styles.slideText}>{el.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <CircleButton
        size={'small'}
        style={'white'}
        icon={'chevron-left'}
        onClick={onClickPrevButton}
        className={`
          ${styles.button}
          ${styles.prevButton}
          ${swiperRef.current?.isBeginning ? styles.hide : ''}
        `}
      />
      <CircleButton
        size={'small'}
        style={'white'}
        icon={'chevron-right'}
        onClick={onClickNextButton}
        className={`
          ${styles.button}
          ${styles.nextButton}
          ${hideNextButton ? styles.hide : ''}
        `}
      />
    </div>
  );
});