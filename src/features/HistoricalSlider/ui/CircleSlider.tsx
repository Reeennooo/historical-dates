import {memo, useCallback, useRef, useState, MouseEvent, useEffect, FC, useMemo} from 'react';
import styles from '../styles/circleSlider.module.scss'
import {Slide} from '@features/HistoricalSlider/model/slider.model';
import { Swiper as SwiperType } from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import {getRotationDuration} from '@features/HistoricalSlider/lib/getRotationDuration';
import {AnimatedNumber} from '@shared/ui/AnimatedNumber';
import { Navigation, Pagination } from 'swiper/modules';
import {CircleButton} from '@shared/ui/CircleButton';
import {useWindowWidth} from '@shared/hooks/useWindowWidth';
import {useBreakpoints} from '@shared/hooks/useBreakPoints';

interface Props {
  slides: Slide[];
  onChangeSlideCallback: (slideId: number) => void;
}

export const CircleSlider: FC<Props> = memo((props) => {
  const {slides, onChangeSlideCallback} = props;
  const swiperRef = useRef<SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const duration = getRotationDuration();
  const disablePrevButton = currentSlideIndex === 0;
  const disableNextButton = currentSlideIndex === slides.length - 1;
  const windowWidth = useWindowWidth();
  const breakpoints = useBreakpoints();
  const device = useMemo(() => {
    if (windowWidth <= breakpoints.desktop) {
      return 'desktop'
    }
    return 'desktop-xl'
  }, [
    windowWidth
  ])

  // Circle
  const circleRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const angleStart = -60;
  const angleStep = 360 / slides.length;
  const [rotation, setRotation] = useState(0);

  // Animate states
  const [showPointText, setShowPointText] = useState<boolean>(true);
  const [shakeDate, setShakeDate] = useState<boolean>(false);

  const handleSlideChangeByIndex = useCallback((index: number) => {
    setShowPointText(false);
    setShakeDate(true);
    const anglePoint = angleStart + index * angleStep;
    const targetRotation = angleStart - anglePoint;
    setRotation(targetRotation);

    setTimeout(() => {
      setShowPointText(true);
      setShakeDate(false);
    }, duration);

  }, [angleStart, angleStep, duration]);

  const onClickCirclePoint = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const dataId = Number(event.currentTarget.dataset.id);
    const index = slides.findIndex(el => el.id === dataId);
    swiperRef.current?.slideTo(index)
  }, [slides, handleSlideChangeByIndex]);


  const onClickPrevButton = useCallback(() => {
    if (!swiperRef.current) return;
    const prevIndex = Math.max(currentSlideIndex - 1, 0);
    swiperRef.current.slideTo(prevIndex);
  }, [currentSlideIndex]);

  const onClickNextButton = useCallback(() => {
    if (!swiperRef.current) return;
    const nextIndex = Math.min(currentSlideIndex + 1, slides.length - 1);
    swiperRef.current.slideTo(nextIndex);
  }, [currentSlideIndex, slides.length]);

  useEffect(() => {
    handleSlideChangeByIndex(currentSlideIndex);
    onChangeSlideCallback(slides[currentSlideIndex].id);
  }, [
    currentSlideIndex,
    onChangeSlideCallback,
    handleSlideChangeByIndex
  ]);

  useEffect(() => {
    if (circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      const r = Math.min(rect.width, rect.height) / 2;
      setCenter({ x: rect.width / 2, y: rect.height / 2 });
      setRadius(r);
    }
  }, [
    device
  ]);
  
  return (
    <div className={styles.root}>
      <Swiper
        loop={false}
        modules={[Navigation, Pagination]}
        onSwiper={swiper => (swiperRef.current = swiper)}
        allowTouchMove={false}
        slidesPerView={1}
        className={styles.hiddenSwiper}
        onSlideChange={swiper => setCurrentSlideIndex(swiper.activeIndex)}
      >
        {slides.map(el => <SwiperSlide key={el.id} />)}
      </Swiper>
      <div className={styles.control}>
        <div className={styles.counter}>
          {`0${currentSlideIndex + 1}`}/{`0${slides.length}`}
        </div>
        <div className={styles.navigation}>
          <CircleButton
            size={'medium'}
            style={'transparent'}
            icon={'chevron-left'}
            onClick={onClickPrevButton}
            disabled={disablePrevButton}
          />
          <CircleButton
            size={'medium'}
            style={'transparent'}
            icon={'chevron-right'}
            onClick={onClickNextButton}
            disabled={disableNextButton}
          />
        </div>
      </div>

      <div className={styles.circle} ref={circleRef}>
        <div
          className={styles.pointsWrapper}
          style={{
            transform: `rotate(${rotation}deg)`,
            '--rotation': `-${rotation}deg` } as any
          }
        >
        {slides.map((el, i) => {
          const angle = angleStart + i * angleStep;
          const rad = (angle * Math.PI) / 180;
          const x = center.x + radius * Math.cos(rad);
          const y = center.y + radius * Math.sin(rad);

          return (
            <div
              key={el.id}
              data-id={el.id}
              onClick={onClickCirclePoint}
              className={`
                ${styles.circlePoint}
                ${currentSlideIndex === i ? styles.active : ''}
                ${showPointText && currentSlideIndex === i ? styles.showText : ''}
              `
            }
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
            }}
            >
              <span className={styles.pointNumber}>{i+1}</span>
              <span
                className={styles.pointName}
                style={{
                  transition: showPointText
                    ? "opacity 0.3s ease"
                    : "none"
                }}
              >{el.category}</span>
            </div>
          )
        })}
        </div>
      </div>
        <AnimatedNumber
          value={slides[currentSlideIndex].startDate}
          duration={duration}
          className={`
              ${shakeDate ? styles.shake : ''}
              ${styles.date}
              ${styles.firstDate}
            `}
        />
        <AnimatedNumber
          value={slides[currentSlideIndex].endDate}
          duration={duration}
          className={`
              ${shakeDate ? styles.shake : ''}
              ${styles.date}
              ${styles.secondDate}
            `}
        />
      <div className={styles.tabulation}>
        {slides.map((el, i) => (
          <div
            key={el.id}
            data-id={el.id}
            className={`
              ${styles.tab}
              ${i === currentSlideIndex ? styles.active : ''}
            `}
            onClick={onClickCirclePoint}
          />
        ))}
      </div>
    </div>
  );
});