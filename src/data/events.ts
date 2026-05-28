import type { TFunction } from 'i18next';

export interface EventItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface FallbackSpec {
  id: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
}

const fallbackSpecs: FallbackSpec[] = [
  {
    id: 'fallback-community',
    image: '/community1_lq.jpg',
    titleKey: 'events.items.community.title',
    descriptionKey: 'events.items.community.description',
  },
  {
    id: 'fallback-applications',
    image: '/call_for_applications.png',
    titleKey: 'events.items.applications.title',
    descriptionKey: 'events.items.applications.description',
  },
  {
    id: 'fallback-election',
    image: '/tu_dortmunder.jpg',
    titleKey: 'events.items.election.title',
    descriptionKey: 'events.items.election.description',
  },
];

export function getFallbackEvents(t: TFunction): EventItem[] {
  return fallbackSpecs.map((spec) => ({
    id: spec.id,
    image: spec.image,
    title: t(spec.titleKey),
    description: t(spec.descriptionKey),
  }));
}
