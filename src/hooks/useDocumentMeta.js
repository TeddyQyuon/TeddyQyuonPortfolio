import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from '../config/site';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// Per-route title, description and canonical URL. Search engines that run
// JavaScript pick these up; static link-preview scrapers still read the
// defaults in index.html.
export default function useDocumentMeta({ title, description, path } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Wai Yan Hpone Lat` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = SITE_URL + (path ?? window.location.pathname);

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', desc);
  }, [title, description, path]);
}
