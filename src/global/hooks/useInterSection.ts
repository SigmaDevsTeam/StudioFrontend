import { useEffect, useRef, useState } from "react";

type IntersectionOptions = IntersectionObserverInit;

const useIntersection = (options?: IntersectionOptions) => {
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(([entry]) => {
         setIsVisible(entry.isIntersecting);
      }, options);

      observer.observe(ref.current);

      return () => observer.disconnect();
   }, [options]);

   return { ref, isVisible };
};

export { useIntersection };
