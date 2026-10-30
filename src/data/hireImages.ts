// Real photos for hire items, where an existing event photo happens to
// show that category of piece clearly. Every hire item has a match right
// now; an item added without one keeps the placeholder thumbnail in
// HireCard/hire/[slug] until a real photo of that specific piece exists.
// Never invent a photo for an item that doesn't have one.
//
// `position` is an optional CSS object-position, for photos whose subject
// isn't centred once cropped to the card / detail thumbnail.
import underTheSeaBirthday from '../assets/gallery/under-the-sea-birthday.jpg';
import seventiethBirthday from '../assets/gallery/seventieth-birthday-celebration.jpg';
import dessertTable from '../assets/gallery/dessert-table-setup.jpg';
import dessertTableFull from '../assets/gallery/dessert-table-setup-full.jpg';
import tableCentrepiece from '../assets/gallery/table-centrepiece.jpg';

export type HireImage = { src: ImageMetadata; alt: string; position?: string };

export const hireImages: Record<string, HireImage> = {
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
  'table-centrepieces': {
    src: tableCentrepiece,
    alt: 'White peony, hydrangea and lily floral centrepiece with trailing greenery on a tall gold geometric stand, on a lawn',
    position: 'center 35%',
  },
};

// Extra full-frame photos shown in the body of a hire detail page, below
// the intro text. Optional per item.
export const hireBodyImages: Record<string, HireImage> = {
  'dessert-table-setup': {
    src: dessertTableFull,
    alt: 'Full dessert table setup with riser plinth boxes, tall and medium flower vases, candles and lanterns on a white velvet tablecloth',
  },
};
