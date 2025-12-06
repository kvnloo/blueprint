import { useEffect } from 'react';

interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const BASE_URL = 'https://zer0.ai';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = 'zer0';

/**
 * Custom hook for managing SEO meta tags dynamically.
 * Updates document title and meta tags based on the current page/article.
 */
export function useSEO(config: SEOConfig) {
  useEffect(() => {
    const {
      title,
      description,
      image = DEFAULT_IMAGE,
      url = window.location.href,
      type = 'website',
      article,
    } = config;

    // Update document title
    if (title) {
      document.title = `${title} | ${SITE_NAME}`;
    }

    // Helper to update or create meta tag
    const setMeta = (property: string, content: string, isName = false) => {
      const attr = isName ? 'name' : 'property';
      let meta = document.querySelector(`meta[${attr}="${property}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Primary meta tags
    if (description) {
      setMeta('description', description, true);
    }

    // Open Graph tags
    if (title) {
      setMeta('og:title', `${title} | ${SITE_NAME}`);
    }
    if (description) {
      setMeta('og:description', description);
    }
    setMeta('og:image', image);
    setMeta('og:url', url);
    setMeta('og:type', type);

    // Twitter Card tags
    if (title) {
      setMeta('twitter:title', `${title} | ${SITE_NAME}`);
    }
    if (description) {
      setMeta('twitter:description', description);
    }
    setMeta('twitter:image', image);
    setMeta('twitter:url', url);

    // Article-specific tags
    if (type === 'article' && article) {
      if (article.publishedTime) {
        setMeta('article:published_time', article.publishedTime);
      }
      if (article.author) {
        setMeta('article:author', article.author);
      }
      if (article.section) {
        setMeta('article:section', article.section);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          setMeta('article:tag', tag);
        });
      }
    }

    // Cleanup function to reset to defaults when navigating away
    return () => {
      document.title = `${SITE_NAME} | Building Autonomous Futures`;

      // Reset meta tags to defaults
      const defaultDescription = 'zer0 specializes in autonomous AI agent systems, digital twin technologies for controlled environment agriculture, and multi-agent orchestration frameworks.';

      setMeta('description', defaultDescription, true);
      setMeta('og:title', `${SITE_NAME} | Building Autonomous Futures`);
      setMeta('og:description', 'Pioneering autonomous AI systems, digital twins for agriculture, and multi-agent orchestration.');
      setMeta('og:image', DEFAULT_IMAGE);
      setMeta('og:url', BASE_URL);
      setMeta('og:type', 'website');
      setMeta('twitter:title', `${SITE_NAME} | Building Autonomous Futures`);
      setMeta('twitter:description', 'Pioneering autonomous AI systems, digital twins for agriculture, and multi-agent orchestration.');
      setMeta('twitter:image', DEFAULT_IMAGE);
      setMeta('twitter:url', BASE_URL);
    };
  }, [config.title, config.description, config.image, config.url, config.type]);
}

/**
 * Generate Schema.org Article structured data
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  track: string | string[];
  readTime: string;
  wordCount: number;
}) {
  const tracks = Array.isArray(article.track) ? article.track : [article.track];

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'zer0 LLC',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'zer0 LLC',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    articleSection: tracks.join(', '),
    wordCount: article.wordCount,
    timeRequired: `PT${parseInt(article.readTime)}M`,
    keywords: tracks.join(', '),
    isAccessibleForFree: true,
  };
}
