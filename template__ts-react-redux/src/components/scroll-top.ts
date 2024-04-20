import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      behavior: 'auto',
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null;
};
