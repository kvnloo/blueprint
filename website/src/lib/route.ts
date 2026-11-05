import { useEffect, useState } from 'react';

// Hash routes so deep links work on GitHub Pages without a 404 fallback.
// `#/work`, `#/research`, `#/about`, `#/oss`, `#/article/<id>`. Anything else is home.
export type Route =
  | { page: 'home' }
  | { page: 'work' }
  | { page: 'research' }
  | { page: 'about' }
  | { page: 'oss' }
  | { page: 'article'; id: string };

export const PAGES = ['work', 'research', 'about', 'oss'] as const;

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [head, arg] = parts;
  if (head === 'article' && arg) return { page: 'article', id: decodeURIComponent(arg) };
  if ((PAGES as readonly string[]).includes(head)) return { page: head as (typeof PAGES)[number] };
  return { page: 'home' };
}

export const href = (route: Route): string =>
  route.page === 'home' ? '#/' : route.page === 'article' ? `#/article/${encodeURIComponent(route.id)}` : `#/${route.page}`;

/** Current route; re-renders on hash change and scrolls new pages to the top. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute(window.location.hash));
      // A new page starts at its top immediately; html's smooth scroll is for in-page anchors.
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}
