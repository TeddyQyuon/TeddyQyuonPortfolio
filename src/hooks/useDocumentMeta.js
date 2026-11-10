import { useEffect } from 'react';
import { documentMeta } from '../utils/seo';

function setMeta(attribute, key, value) {
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

// Static project entries and client navigation use the same metadata values.
export default function useDocumentMeta({ title, description, path, image, imageAlt, type, noindex } = {}) {
  useEffect(() => {
    const meta = documentMeta({ title, description, path: path ?? window.location.pathname, image, imageAlt, type, noindex });
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.robots);

    for (const [key, value] of Object.entries({ title: meta.title, description: meta.description, type: meta.type, url: meta.canonical, image: meta.image, 'image:type': 'image/png', 'image:width': '1200', 'image:height': '630', 'image:alt': meta.imageAlt, site_name: meta.siteName })) {
      setMeta('property', `og:${key}`, value);
    }
    for (const [key, value] of Object.entries({ card: 'summary_large_image', title: meta.title, description: meta.description, image: meta.image, 'image:alt': meta.imageAlt })) {
      setMeta('name', `twitter:${key}`, value);
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (meta.noindex) canonical?.remove();
    else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', meta.canonical);
    }
  }, [title, description, path, image, imageAlt, type, noindex]);
}
