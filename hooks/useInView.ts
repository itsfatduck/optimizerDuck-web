import { useEffect, useState, useRef, RefObject } from 'react';

export function useInView(options?: IntersectionObserverInit): [RefObject<any>, boolean] {
    const ref = useRef<any>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                // Once in view, we can stop observing if we only want one-time animation
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, inView];
}
