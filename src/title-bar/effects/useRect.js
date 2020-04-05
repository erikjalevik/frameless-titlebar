import { useLayoutEffect, useCallback, useState } from 'react';

const getRect = (element) => {
  let rect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  };
  if (element) rect = element.getBoundingClientRect();
  return rect;
};

export default (ref) => {
  const [rect, setRect] = useState(
    ref && ref.current ? getRect(ref.current) : getRect()
  );

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    setRect(getRect(ref.current)); // Update client rect
  }, [ref.current]);

  useLayoutEffect(() => {
    const element = ref && ref.current;
    if (!element) return;

    handleResize();

    // @ts-ignore
    if (typeof ResizeObserver === 'function') {
      // eslint-disable-next-line no-undef
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);
      return () => {
        if (!resizeObserver) return;
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }
    window.addEventListener('resize', handleResize); // Browser support, remove freely
    return () => window.removeEventListener('resize', handleResize);
  }, [ref.current]);

  return rect;
};
