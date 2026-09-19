import React, { useEffect, useState, useRef } from 'react';

/**
 * Modern Invert-Color Precision Cursor
 * Compact, refined size using mix-blend-mode: difference
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Suppress on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsPointerDown(true);
    const handleMouseUp = () => setIsPointerDown(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth inertial spring loop
    const render = () => {
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ mixBlendMode: 'difference' }}
    >
      <div
        className={`rounded-full bg-white transition-all duration-150 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-8 h-8 scale-100 opacity-90'
            : isPointerDown
            ? 'w-2 h-2 scale-75 opacity-100'
            : 'w-3.5 h-3.5 opacity-95'
        }`}
      >
        {isHovered && (
          <div className="w-1 h-1 rounded-full bg-black" />
        )}
      </div>
    </div>
  );
}
