import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ to, suffix = '', duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
