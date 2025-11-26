import "./styles/index.scss";
import 'swiper/css';
import {HistoricalSlider} from '@features/HistoricalSlider';
import {slides} from '@features/HistoricalSlider/model/slider.model';

export default function App() {
  return (
    <HistoricalSlider slides={slides} />
  );
}