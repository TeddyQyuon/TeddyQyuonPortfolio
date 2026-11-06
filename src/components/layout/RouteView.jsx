import { useState } from 'react';

let hasMounted = false;

export default function RouteView({ children }) {
  const [enter] = useState(() => {
    const shouldEnter = hasMounted;
    hasMounted = true;
    return shouldEnter;
  });

  return <div className={`route-view${enter ? ' route-enter' : ''}`}>{children}</div>;
}
