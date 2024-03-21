import { useState, useEffect } from 'react';

function useWindowSize (){
    const [size, setSize] = useState<{width: number, height: number}|null>(null);

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};

export default useWindowSize;