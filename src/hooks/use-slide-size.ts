import { useEffect, useState } from 'react';

/**
 * Универсальный хук для вычисления размеров с заданным процентом ширины и соотношением сторон.
 * Учитывает высоту видимой области экрана на мобильных устройствах (с поддержкой 100dvh).
 * @param widthRatio - доля ширины экрана от 0 до 1 (например, 0.75 = 75%)
 * @param aspectRatio - соотношение ширины к высоте (например, 2.7 для 2.7:1)
 */
export const useSlideSize = (
  widthRatio: number = 0.75,
  aspectRatio: number = 2.7,
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`,
      );
    };

    const updateSize = () => {
      const vw = window.innerWidth;
      const vhFromVar = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--app-height',
        ),
      );
      const vh = vhFromVar || window.innerHeight;

      let width = vw * widthRatio;
      let height = width / aspectRatio;

      // Если высота выходит за пределы видимой, уменьшаем
      if (height > vh) {
        height = vh;
        width = height * aspectRatio;
      }

      setSize({ width: Math.round(width), height: Math.round(height) });
    };

    setAppHeight();
    updateSize();

    window.addEventListener('resize', setAppHeight);
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', setAppHeight);
      window.removeEventListener('resize', updateSize);
    };
  }, [widthRatio, aspectRatio]);

  return size;
};

export default useSlideSize;
