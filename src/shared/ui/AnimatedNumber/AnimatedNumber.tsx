import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedNumber =  (props: AnimatedNumberProps) => {
  const {value, duration = 1000, className} = props;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const nextValue = Math.floor(start + diff * Math.min(progress, 1));
      setDisplay(nextValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  return (
    <span className={`
      ${className}
    `}>
      {display}
    </span>
  )
};
