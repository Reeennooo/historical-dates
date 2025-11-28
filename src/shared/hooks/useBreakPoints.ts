import { useState, useEffect } from 'react';

interface Breakpoints {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
  wide: number;
  desktopXl: number;
}

export const useBreakpoints = (): Breakpoints => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    mobile: 0,
    tablet: 0,
    laptop: 0,
    desktop: 0,
    wide: 0,
    desktopXl: 0,
  });

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    const parsePx = (value: string) => parseInt(value.replace('px', '').trim(), 10);

    const newBreakpoints: Partial<Breakpoints> = {};

    const keys: Array<keyof Breakpoints> = [
      'mobile',
      'tablet',
      'laptop',
      'desktop',
      'wide',
      'desktopXl',
    ];

    keys.forEach(key => {
      const cssVarName = `--${key === 'desktopXl' ? 'desktop-xl' : key}`;
      const value = styles.getPropertyValue(cssVarName);
      if (value) {
        newBreakpoints[key] = parsePx(value);
      }
    });

    setBreakpoints(prev => ({ ...prev, ...newBreakpoints }));
  }, []);

  return breakpoints;
};

