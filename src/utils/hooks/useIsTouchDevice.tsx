import { useState, useEffect } from 'react';

const useIsTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchSupport = () => {
      const touchSupported = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsTouchDevice(touchSupported);
    };

    window.addEventListener('resize', checkTouchSupport);

    checkTouchSupport();

    return () => window.removeEventListener('resize', checkTouchSupport);
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;
