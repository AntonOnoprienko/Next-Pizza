import { useEffect, useState } from 'react';

/**
 * Универсальный хук для вычисления размеров с заданным процентом ширины и соотношением сторон.
 * @param widthRatio - доля ширины экрана от 0 до 1 (например, 0.75 = 75%)
 * @param aspectRatio - соотношение ширины к высоте (например, 2.7 для 2.7:1)
 */
export const useSlideSize = (
  widthRatio: number = 0.75,
  aspectRatio: number = 2.7,
) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const width = screenWidth * widthRatio;
      const height = width / aspectRatio;

      setSize({ width: Math.round(width), height: Math.round(height) });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [widthRatio, aspectRatio]);

  return size;
};

export default useSlideSize;
