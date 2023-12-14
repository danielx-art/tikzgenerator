import { useState, useEffect, useRef } from 'react';

function useDimensions<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T|null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function updateSize() {
            if(ref.current) {

                
                setDimensions({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight
                });
            }
        }

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, [ref]);

    return [ref, dimensions] as const;
}

export default useDimensions;