(function () {
  const COUNTRY_DOMAINS = {
    'AE': 'amazon.ae',
    'AU': 'amazon.com.au',
    'BE': 'amazon.com.be',
    'BR': 'amazon.com.br',
    'CA': 'amazon.ca',
    'CN': 'amazon.cn',
    'DE': 'amazon.de',
    'EG': 'amazon.eg',
    'ES': 'amazon.es',
    'FR': 'amazon.fr',
    'GB': 'amazon.co.uk',
    'IE': 'amazon.ie',
    'IN': 'amazon.in',
    'IT': 'amazon.it',
    'JP': 'amazon.co.jp',
    'MX': 'amazon.com.mx',
    'NL': 'amazon.nl',
    'PL': 'amazon.pl',
    'SA': 'amazon.sa',
    'SE': 'amazon.se',
    'SG': 'amazon.sg',
    'TR': 'amazon.com.tr',
    'ZA': 'amazon.co.za',
    'US': 'amazon.com'
  };
  const AFFILIATE_TAGS = {
    'amazon.in': 'bukluv-21'
  };
  const TIMEZONE_CITIES = {
    'CA': ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Halifax', 'Edmonton', 'Calgary', 'Winnipeg', 'Regina', 'St_Johns', 'Yellowknife'],
    'BR': ['Sao_Paulo', 'Rio_de_Janeiro', 'Manaus', 'Recife', 'Bahia', 'Fortaleza', 'Belem'],
    'MX': ['Mexico_City', 'Monterrey', 'Tijuana', 'Cancun', 'Merida']
  };
  const LANG_TO_COUNTRY = {
    'ja': 'JP', 'pl': 'PL', 'nl': 'NL', 'tr': 'TR', 'sv': 'SE'
  };
  const TIMEZONE_PREFIXES = {
    'Australia/': 'AU',
    'Europe/London': 'GB',
    'Europe/Dublin': 'IE',
    'Europe/Paris': 'FR',
    'Europe/Berlin': 'DE',
    'Europe/Rome': 'IT',
    'Europe/Madrid': 'ES',
    'Europe/Amsterdam': 'NL',
    'Europe/Stockholm': 'SE',
    'Europe/Warsaw': 'PL',
    'Europe/Brussels': 'BE',
    'Asia/Tokyo': 'JP',
    'Asia/Kolkata': 'IN',
    'Asia/Calcutta': 'IN',
    'Asia/Dubai': 'AE',
    'Asia/Riyadh': 'SA',
    'Asia/Singapore': 'SG',
    'Africa/Cairo': 'EG',
    'Africa/Johannesburg': 'ZA',
    'Europe/Istanbul': 'TR'
  };

  function getAmazonDomain() {
    const { timeZone, locale } = Intl.DateTimeFormat().resolvedOptions();
    const languages = navigator.languages || [navigator.language];

    const getCountryCode = () => {
      let fallbackRegion = null;

      try {
        const l = new Intl.Locale(locale);
        if (l.region) {
          const region = l.region.toUpperCase();
          if (region !== 'US') return region;
          fallbackRegion = 'US';
        }
      } catch (e) { }

      const localeParts = locale.split('-');
      if (localeParts.length > 1) {
        const region = localeParts[localeParts.length - 1].toUpperCase();
        if (region.length === 2) {
          if (region !== 'US') return region;
          fallbackRegion = 'US';
        }
      }

      for (const lang of languages) {
        const parts = lang.split('-');
        if (parts.length > 1) {
          const region = parts[1].toUpperCase();
          if (region.length === 2 && COUNTRY_DOMAINS[region]) {
            if (region !== 'US') return region;
            fallbackRegion = 'US';
          }
        }
      }

      if (['Pacific/Norfolk', 'Indian/Christmas', 'Indian/Cocos'].includes(timeZone)) return 'AU';

      for (const [prefix, country] of Object.entries(TIMEZONE_PREFIXES)) {
        if (timeZone.startsWith(prefix)) return country;
      }

      if (timeZone.startsWith('America/')) {
        for (const [country, cities] of Object.entries(TIMEZONE_CITIES)) {
          if (cities.some(city => timeZone.includes(city))) return country;
        }
      }

      const lang = languages[0].split('-')[0].toLowerCase();
      if (LANG_TO_COUNTRY[lang]) return LANG_TO_COUNTRY[lang];

      if (fallbackRegion) return fallbackRegion;
      return 'US';
    };

    const country = getCountryCode();
    const normalizedCountry = country === 'UK' ? 'GB' : country;
    return COUNTRY_DOMAINS[normalizedCountry] || 'amazon.com';
  }

  function localizeAmazonLinks() {
    const domain = getAmazonDomain();
    if (domain === 'amazon.com') return;

    const links = document.querySelectorAll('a[href*="amazon.com"]');
    links.forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.hostname === 'www.amazon.com' || url.hostname === 'amazon.com') {
          url.hostname = domain.startsWith('amazon') ? (domain.includes('www') ? domain : `www.${domain}`) : domain;
          if (AFFILIATE_TAGS[domain]) {
            url.searchParams.set('tag', AFFILIATE_TAGS[domain]);
          }
          link.href = url.toString();
        }
      } catch (e) { }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', localizeAmazonLinks);
  } else {
    localizeAmazonLinks();
  }
})();
