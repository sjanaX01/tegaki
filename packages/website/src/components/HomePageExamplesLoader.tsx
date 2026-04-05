import { useEffect, useState } from 'react';

export function HomePageExamplesLoader() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    import('./HomePageExamples.tsx')
      .then((mod) => setComponent(() => mod.HomePageExamples))
      .catch((err) => setError((err as Error).message));
  }, []);

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, fontFamily: 'system-ui', color: 'red' }}>
        {error}
      </div>
    );
  }

  if (!Component) {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, fontFamily: 'system-ui', color: '#9ca3af' }}
      >
        Loading examples...
      </div>
    );
  }

  return <Component />;
}
