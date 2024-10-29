'use client';
import { useEffect } from 'react';

const RandomizeDomain = () => {
  const domains = [
    'https://cartoon-cloudflare-repo2-brs.pages.dev/',
    'https://cartoon-cloudflare-repo3.pages.dev/',
    'https://cartoon-cloudflare-repo4.pages.dev/',
    'https://cartoon-cloudflare-repo5.pages.dev/',
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * domains.length);
    const randomDomain = domains[randomIndex];
    if (window.location.origin !== randomDomain) {
      window.location.href = randomDomain;
    }
  }, []);

  return null;
};

export default RandomizeDomain;
