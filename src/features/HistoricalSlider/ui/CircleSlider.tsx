import {memo, useCallback, useRef, useState, MouseEvent, useEffect, FC} from 'react';
import styles from '../styles/circleSlider.module.scss'
import {Slide} from '@features/HistoricalSlider/model/slider.model';
import { Swiper as SwiperType } from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import {getRotationDuration} from '@features/HistoricalSlider/lib/getRotationDuration';
import {AnimatedNumber} from '@features/HistoricalSlider/ui/AnimatedNumber';
import { Navigation, Pagination } from 'swiper/modules';

interface Props {
  slides: Slide[]
}

export const CircleSlider: FC<Props> = memo((props) => {
  const {slides} = props;
  const swiperRef = useRef<SwiperType>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const duration = getRotationDuration();

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

  const onClickCirclePoint = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setShowPointText(false);
    setShakeDate(true);
    const dataId = Number(event.currentTarget.dataset.id);
    const index = slides.findIndex(el => el.id === dataId);
    swiperRef.current?.slideTo(index);
    const anglePoint = angleStart + index * angleStep;
    const targetRotation = angleStart - anglePoint;
    setRotation(targetRotation);

    setTimeout(() => {
      setShowPointText(true);
      setShakeDate(false);
    }, duration)

  }, [
    slides,
    duration,
    angleStart,
    angleStep
  ])

  useEffect(() => {
    if (circleRef.current) {
      const rect = circleRef.current.getBoundingClientRect();
      const r = Math.min(rect.width, rect.height) / 2;
      setCenter({ x: rect.width / 2, y: rect.height / 2 });
      setRadius(r);
    }
  }, []);
  
  return (
    <div className={styles.root}>
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={swiper => (swiperRef.current = swiper)}
        allowTouchMove={false}
        slidesPerView={1}
        className={styles.hiddenSwiper}
        onSlideChange={swiper => setCurrentSlideIndex(swiper.activeIndex)}
        // navigation={}
      >
        {slides.map(el => <SwiperSlide/>)}
      </Swiper>


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

          console.log(angle);

          return (
            <div
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
              ${styles.firstDate}
            `}
        />
        <AnimatedNumber
          value={slides[currentSlideIndex].endDate}
          duration={duration}
          className={`
              ${shakeDate ? styles.shake : ''}
              ${styles.secondDate}
            `}
        />
      <div className={styles.navigation}>

      </div>
    </div>
  );
});