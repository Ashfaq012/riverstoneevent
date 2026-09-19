// Real photos for hire items, where an existing event photo happens to
// show that category of piece clearly. Only 3 of the 4 hire items have a
// match right now — the other one (Flower Arches)
// keep the placeholder thumbnail in HireCard/hire/[slug] until real photos
// of that specific piece exist. Never invent a photo for an item that
// doesn't have one.
import underTheSeaBirthday from '../assets/gallery/under-the-sea-birthday.jpg';
import seventiethBirthday from '../assets/gallery/seventieth-birthday-celebration.jpg';
import dessertTable from '../assets/gallery/dessert-table-setup.jpg';

export const hireImages: Record<string, { src: ImageMetadata; alt: string }> = {
  'luxury-backdrops': {
    src: underTheSeaBirthday,
    alt: 'Blue and white balloon garland arch backdrop styled for an under-the-sea themed birthday',
  },
  'dessert-table-setup': {
    src: dessertTable,
    alt: 'Dessert table styled with white display boxes tied with black ribbon bows, cream and gold floral arrangements, lanterns and candles on a velvet tablecloth',
  },
  'cake-plinths': {
    src: seventiethBirthday,
    alt: 'Navy plinth displaying a birthday cake, styled alongside a matching balloon backdrop',
  },
};
