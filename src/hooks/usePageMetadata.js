import { useEffect } from 'react';
import {
  DEFAULT_ROBOTS,
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
  absoluteUrl,
} from '../utils/seo';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function removeCanonical() {
  document.head.querySelector('link[rel="canonical"]')?.remove();
}

// Keeps the document head in sync during client-side route changes. Initial
// page loads receive the same tags from the static build (and per-project HTML).
export default function usePageMetadata({
  title,
  description,
  path = '/',
  image = OG_IMAGE_URL,
  imageAlt = OG_IMAGE_ALT,
  type = 'website',
  noindex = false,
}) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : DEFAULT_ROBOTS);

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:type', 'image/png');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', imageAlt);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', imageAlt);

    if (noindex) {
      removeCanonical();
    } else {
      setCanonical(canonicalUrl);
    }
  }, [title, description, path, image, imageAlt, type, noindex]);
}
