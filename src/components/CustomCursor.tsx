import React, { useEffect, useRef } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const lastCursorPosition = useRef({ x: 0, y: 0 });
  const lastCursorOuterPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const innerEasing = 0.35; // Increased from 0.15 for faster movement
      const outerEasing = 0.25; // Increased from 0.1 for faster movement
      
      // Smooth interpolation with velocity
      const dx = lastMousePosition.current.x - lastCursorPosition.current.x;
      const dy = lastMousePosition.current.y - lastCursorPosition.current.y;
      
      lastCursorPosition.current.x += dx * innerEasing;
      lastCursorPosition.current.y += dy * innerEasing;
      
      lastCursorOuterPosition.current.x += (lastMousePosition.current.x - lastCursorOuterPosition.current.x) * outerEasing;
      lastCursorOuterPosition.current.y += (lastMousePosition.current.y - lastCursorOuterPosition.current.y) * outerEasing;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${lastCursorPosition.current.x}px, ${lastCursorPosition.current.y}px, 0)`;
      }
      
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate3d(${lastCursorOuterPosition.current.x}px, ${lastCursorOuterPosition.current.y}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Initialize positions if they're zero
      if (lastCursorPosition.current.x === 0) {
        lastCursorPosition.current.x = e.clientX;
        lastCursorPosition.current.y = e.clientY;
        lastCursorOuterPosition.current.x = e.clientX;
        lastCursorOuterPosition.current.y = e.clientY;
      }
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => {
      if (cursorRef.current) cursorRef.current.classList.add('cursor-clicking');
      if (cursorOuterRef.current) cursorOuterRef.current.classList.add('cursor-outer-clicking');
    };

    const onMouseUp = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('cursor-clicking');
      if (cursorOuterRef.current) cursorOuterRef.current.classList.remove('cursor-outer-clicking');
    };

    // Add hover effect to all interactive elements
    const addHoverEffect = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, [role="button"], [data-interactive]');
      
      interactiveElements.forEach((el) => {
        // Ensure default cursor is hidden on interactive elements
        (el as HTMLElement).style.cursor = 'none';
        
        el.addEventListener('mouseenter', () => {
          if (cursorRef.current) {
            cursorRef.current.classList.add('cursor-hover');
            
            // Add text effect for elements with data-cursor-text
            const text = el.getAttribute('data-cursor-text');
            if (text) {
              cursorRef.current.classList.add('cursor-text');
              cursorRef.current.setAttribute('data-text', text);
            }
          }
          if (cursorOuterRef.current) cursorOuterRef.current.classList.add('cursor-outer-hover');
        });
        
        el.addEventListener('mouseleave', () => {
          if (cursorRef.current) {
            cursorRef.current.classList.remove('cursor-hover', 'cursor-text');
            cursorRef.current.removeAttribute('data-text');
          }
          if (cursorOuterRef.current) cursorOuterRef.current.classList.remove('cursor-outer-hover');
        });

        // Add magnetic effect
        if (el.hasAttribute('data-magnetic')) {
          el.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = (el as HTMLElement).getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            (el as HTMLElement).style.setProperty('--magnetic-x', `${x * 0.5}px`);
            (el as HTMLElement).style.setProperty('--magnetic-y', `${y * 0.5}px`);
            (el as HTMLElement).style.animation = 'magnetic 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          });
          
          el.addEventListener('mouseleave', () => {
            (el as HTMLElement).style.animation = 'none';
          });
        }
      });
    };

    // Hide default cursor globally
    const hideDefaultCursor = () => {
      document.body.style.cursor = 'none';
      const allElements = document.querySelectorAll('*');
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.cursor !== 'none') {
          element.style.cursor = 'none';
        }
      });
    };

    // Initialize
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    raf = requestAnimationFrame(animate);
    addHoverEffect();
    hideDefaultCursor();

    // Reapply cursor:none when new elements are added to the DOM
    const observer = new MutationObserver(() => {
      hideDefaultCursor();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorOuterRef} className="custom-cursor-outer"></div>
    </>
  );
};

export default CustomCursor; 