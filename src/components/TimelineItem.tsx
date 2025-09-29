"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

const TimelineItem = ({ title, subtitle, date, description }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <div ref={itemRef} className="relative pl-8 sm:pl-32 py-6 group">
      <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-muted-foreground/20 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-primary after:border-4 after:box-content after:border-background after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
        <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-28 h-6 mb-3 sm:mb-0 text-secondary bg-primary rounded-full">
          {date}
        </time>
        <div className="text-xl font-bold text-primary-foreground">{title}</div>
      </div>
      <h3 className="font-semibold text-lg">{subtitle}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
};

export default TimelineItem;