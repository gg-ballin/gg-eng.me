import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const maskControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      maskControls.start('reveal');
    }
  }, [isInView, maskControls]);

  useEffect(() => {
    // Listen for theme changes and retrigger animation
    const handleThemeChange = () => {
      maskControls.start('hidden');
      setTimeout(() => {
        maskControls.start('reveal');
      }, 50);
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, [maskControls]);

  return (
    <span 
      ref={ref} 
      style={{ 
        position: 'relative', 
        overflow: 'visible',
        display: 'inline-block',
        lineHeight: 0,
        verticalAlign: 'baseline',
        isolation: 'isolate',
      }}
    >
      <span style={{ 
        display: 'inline-block',
        lineHeight: 'normal',
        verticalAlign: 'baseline',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {children}
        <motion.div
          initial="hidden"
          animate={maskControls}
          variants={{
            hidden: { x: '0%', opacity: 1 },
            reveal: { x: '-100%', opacity: 0 },
          }}
          transition={{ 
            x: { duration: 0.8, delay, ease: 'easeInOut' },
            opacity: { duration: 0.1, delay: delay + 0.75 }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color-text)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </span>
    </span>
  );
}
