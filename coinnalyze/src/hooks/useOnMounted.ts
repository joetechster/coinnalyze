import {useEffect, useState} from 'react';

export function useOnMounted() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  return {mounted: !isLoading};
}
