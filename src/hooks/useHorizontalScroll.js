import { useEffect } from 'react';

/**
 * Converts vertical mouse-wheel events into horizontal scroll
 * on the element referenced by `scrollRef`.
 * Prevents the default vertical page scroll while the pointer
 * is over the container so the wheel feels natural.
 */
export default function useHorizontalScroll(scrollRef) {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onWheel(e) {
      // Only hijack when the container actually overflows horizontally
      if (el.scrollWidth <= el.clientWidth) return;

      // If the user is already scrolling horizontally (shift+wheel or
      // trackpad sideways gesture), let it pass through untouched
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [scrollRef]);
}
