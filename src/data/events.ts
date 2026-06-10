export interface EventItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

const eventImageModules = import.meta.glob('/src/assets/events/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function stripExtension(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, '').replace('at', '@');
}

export function getFallbackEvents(): EventItem[] {
  return Object.entries(eventImageModules).map(([path, image]) => {
    const fileName = path.split('/').pop() ?? 'event';
    const title = stripExtension(fileName);

    return {
      id: `event-${fileName}`,
      image,
      title,
      description: '',
    };
  });
}
