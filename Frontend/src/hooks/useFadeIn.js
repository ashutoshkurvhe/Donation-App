import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useFadeIn = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 2,
        ease: options.ease || "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%", // starts when section enters viewport
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [ref, options]);
};
