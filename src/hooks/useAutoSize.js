import { useEffect } from 'react';

export default function useAutoSize(element) {
  const autosize = () => {
    if (element.current) {
      setTimeout(() => {
        element.current.style.cssText = 'height: auto; padding: 0';
        element.current.style.cssText = `height: ${
          element.current.scrollHeight
        }px`;
      }, 0);
    }
  };
  useEffect(() => {
    element.current.addEventListener('mouseover', autosize);
    element.current.addEventListener('keydown', autosize);
    return () => {
      element.current.removeEventListener('mouseover', autosize);
      element.current.removeEventListener('keydown', autosize);
    };
  });
}
