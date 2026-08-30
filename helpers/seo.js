export const SITE_URL = 'https://kenneth.io';
export const PERSON_ID = `${SITE_URL}/#kenneth-auchenberg`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PROFILE_URLS = {
  innovationEndeavors:
    'https://www.innovationendeavors.com/team/kenneth-auchenberg',
  linkedin: 'https://www.linkedin.com/in/auchenberg',
  github: 'https://github.com/auchenberg',
  x: 'https://x.com/auchenberg',
  instagram: 'https://www.instagram.com/auchenberg',
};

export const DEFAULT_DESCRIPTION =
  'Kenneth Auchenberg is a partner at Innovation Endeavors focused on AI, developer tools, and software infrastructure.';

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const socialImageUrl = (title, image) => {
  if (image) return absoluteUrl(image);
  return `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;
};

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Kenneth Auchenberg',
  alternateName: '@auchenberg',
  url: `${SITE_URL}/`,
  description: DEFAULT_DESCRIPTION,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/headshots/kenneth_color.jpg`,
    width: 1734,
    height: 2600,
  },
  jobTitle: 'Partner',
  worksFor: {
    '@type': 'Organization',
    name: 'Innovation Endeavors',
    url: 'https://www.innovationendeavors.com/',
  },
  birthPlace: {
    '@type': 'Place',
    name: 'Copenhagen, Denmark',
  },
  homeLocation: {
    '@type': 'Place',
    name: 'New York City, New York, United States',
  },
  knowsAbout: [
    'Artificial intelligence',
    'Developer tools',
    'Developer experience',
    'Software infrastructure',
    'Venture capital',
  ],
  sameAs: Object.values(PROFILE_URLS),
  subjectOf: [
    {
      '@type': 'ProfilePage',
      name: 'Kenneth Auchenberg — AI Engineer',
      url: 'https://ai.engineer/speakers/kenneth-auchenberg',
    },
    {
      '@type': 'PodcastEpisode',
      name: 'AI Agents vs SaaS: The Future of Software with Kenneth Auchenberg',
      url: 'https://www.listennotes.com/podcasts/ai-in-nyc-show/ep30-ai-agents-vs-saas-the-cmAv75TJXuz/',
    },
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/press#press-page`,
      name: 'Kenneth Auchenberg — Press, Interviews, and Podcasts',
      url: `${SITE_URL}/press`,
    },
  ],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'Kenneth Auchenberg',
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@id': PERSON_ID },
});

export const homeStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [personSchema(), websiteSchema()],
});

export const profileStructuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    personSchema(),
    websiteSchema(),
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/about#profile-page`,
      url: `${SITE_URL}/about`,
      name: 'About Kenneth Auchenberg',
      description: DEFAULT_DESCRIPTION,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
    },
  ],
});

const pressSchemaType = (type) => {
  if (type === 'Podcast') return 'PodcastEpisode';
  if (type === 'Video') return 'VideoObject';
  if (type === 'News') return 'NewsArticle';
  return 'Article';
};

export const pressStructuredData = (pressItems) => {
  const url = `${SITE_URL}/press`;
  const itemListId = `${url}#press-list`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      {
        '@type': 'CollectionPage',
        '@id': `${url}#press-page`,
        url,
        name: 'Kenneth Auchenberg — Press, Interviews, and Podcasts',
        description:
          'Selected press, interviews, podcasts, and news featuring Kenneth Auchenberg.',
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        mainEntity: { '@id': itemListId },
      },
      {
        '@type': 'ItemList',
        '@id': itemListId,
        numberOfItems: pressItems.length,
        itemListElement: pressItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': pressSchemaType(item.type),
            '@id': item.url,
            url: item.url,
            name: item.title,
            headline: item.title,
            description: item.description,
            datePublished: item.date,
            inLanguage: item.language,
            ...(item.duration ? { duration: item.duration } : {}),
            ...(item.type === 'Podcast'
              ? {
                  partOfSeries: {
                    '@type': 'PodcastSeries',
                    name: item.outlet,
                  },
                }
              : {}),
            ...(item.type === 'Video' ? { uploadDate: item.date } : {}),
            publisher: {
              '@type': 'Organization',
              name: item.outlet,
            },
            about: { '@id': PERSON_ID },
          },
        })),
      },
    ],
  };
};

export const blogPostStructuredData = (post) => {
  const url = `${SITE_URL}/post/${post.slug}`;
  const image = socialImageUrl(post.title, post.og_image);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      websiteSchema(),
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        url,
        headline: post.title,
        description: post.description || post.title,
        image,
        datePublished: post.originalDate,
        dateModified: post.modifiedDate || post.originalDate,
        inLanguage: 'en-US',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
      },
    ],
  };
};
