export interface InvitationStyle {
  slug: string
  name: string
  description: string
  previewClass: string
}

export interface InvitationCategory {
  slug: string
  name: string
  nameHy: string
  description: string
  descriptionHy: string
  searchTerms: string[]
  image: string
  primaryLabels: {
    firstName: string
    secondName: string
    date: string
    story: string
    location: string
  }
  defaults: {
    storyTitle: string
    timelineTitle: string
    rsvpTitle: string
    palette: string[]
  }
  styles: InvitationStyle[]
}

export const INVITATION_CATEGORIES: InvitationCategory[] = [
  {
    slug: 'wedding',
    name: 'Wedding',
    nameHy: 'Հարսանիք',
    description: 'Ceremony and reception invitations for couples.',
    descriptionHy: 'Հարսանեկան հրավիրատոմսեր զույգերի համար։',
    searchTerms: ['wedding', 'bride', 'groom', 'հարսանիք'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    primaryLabels: { firstName: 'Փեսա', secondName: 'Հարս', date: 'Հարսանիքի ամսաթիվ', story: 'Սիրո պատմություն', location: 'Վայրեր' },
    defaults: { storyTitle: 'Մեր Սիրո Պատմությունը', timelineTitle: 'ՕՐՎԱ ԾՐԱԳԻՐ', rsvpTitle: 'ՀԱՍՏԱՏԵՔ ՁԵՐ ՆԵՐԿԱՅՈՒԹՅՈՒՆԸ', palette: ['#4a6741', '#8b7355'] },
    styles: [
      { slug: 'elegant', name: 'Elegant', description: 'Refined serif type and soft spacing.', previewClass: 'bg-white text-stone-800 border-stone-300' },
      { slug: 'luxury', name: 'Luxury', description: 'Deep contrast with gold accents.', previewClass: 'bg-zinc-950 text-amber-200 border-amber-400' },
      { slug: 'minimal', name: 'Minimal', description: 'Quiet layout and clean type.', previewClass: 'bg-neutral-50 text-neutral-900 border-neutral-300' },
      { slug: 'floral', name: 'Floral', description: 'Botanical, romantic, airy.', previewClass: 'bg-rose-50 text-rose-950 border-rose-200' },
      { slug: 'classic', name: 'Classic', description: 'Formal traditional composition.', previewClass: 'bg-slate-50 text-slate-900 border-slate-300' },
    ],
  },
  {
    slug: 'birthday',
    name: 'Birthday',
    nameHy: 'Ծնունդ',
    description: 'Celebration pages for birthdays and parties.',
    descriptionHy: 'Ծննդյան և խնջույքի հրավիրատոմսեր։',
    searchTerms: ['birthday', 'party', 'ծնունդ'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    primaryLabels: { firstName: 'Հոբելյար', secondName: 'Կազմակերպիչ', date: 'Միջոցառման ամսաթիվ', story: 'Տոնի մասին', location: 'Խնջույքի վայր' },
    defaults: { storyTitle: 'Տոնի մասին', timelineTitle: 'ԾՐԱԳԻՐ', rsvpTitle: 'ԿՀԱՍՏԱՏԵ՞Ք ՄԱՍՆԱԿՑՈՒԹՅՈՒՆԸ', palette: ['#ff4d8d', '#ffd166'] },
    styles: [
      { slug: 'kids', name: 'Kids', description: 'Bright and playful.', previewClass: 'bg-sky-100 text-sky-950 border-sky-300' },
      { slug: 'modern', name: 'Modern', description: 'Bold contemporary party look.', previewClass: 'bg-white text-fuchsia-950 border-fuchsia-300' },
      { slug: 'neon', name: 'Neon', description: 'High-energy night palette.', previewClass: 'bg-black text-lime-300 border-lime-300' },
      { slug: 'cartoon', name: 'Cartoon', description: 'Soft illustrated mood.', previewClass: 'bg-yellow-100 text-purple-950 border-yellow-300' },
      { slug: 'luxury', name: 'Luxury', description: 'Polished celebration styling.', previewClass: 'bg-purple-950 text-amber-100 border-amber-300' },
    ],
  },
  {
    slug: 'baby-shower',
    name: 'Baby Shower',
    nameHy: 'Baby Shower',
    description: 'Warm invitations for welcoming a baby.',
    descriptionHy: 'Նուրբ հրավիրատոմսեր փոքրիկին սպասելու առիթով։',
    searchTerms: ['baby', 'shower'],
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80',
    primaryLabels: { firstName: 'Ծնող 1', secondName: 'Ծնող 2', date: 'Տոնի ամսաթիվ', story: 'Փոքրիկի մասին', location: 'Հավաքույթի վայր' },
    defaults: { storyTitle: 'Սիրով սպասում ենք փոքրիկին', timelineTitle: 'ՕՐՎԱ ԾՐԱԳԻՐ', rsvpTitle: 'ՀԱՍՏԱՏԵՔ ՁԵՐ ՆԵՐԿԱՅՈՒԹՅՈՒՆԸ', palette: ['#a7c7e7', '#f7c8d0'] },
    styles: [
      { slug: 'soft', name: 'Soft', description: 'Pastel and gentle.', previewClass: 'bg-blue-50 text-blue-950 border-blue-200' },
      { slug: 'storybook', name: 'Storybook', description: 'Sweet editorial layout.', previewClass: 'bg-emerald-50 text-emerald-950 border-emerald-200' },
      { slug: 'floral', name: 'Floral', description: 'Fresh and delicate.', previewClass: 'bg-pink-50 text-pink-950 border-pink-200' },
      { slug: 'minimal', name: 'Minimal', description: 'Calm and clean.', previewClass: 'bg-stone-50 text-stone-900 border-stone-200' },
    ],
  },
  {
    slug: 'engagement',
    name: 'Engagement',
    nameHy: 'Նշանադրություն',
    description: 'Romantic invitations for engagement celebrations.',
    descriptionHy: 'Նշանադրության ռոմանտիկ հրավիրատոմսեր։',
    searchTerms: ['engagement', 'նշանադրություն'],
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80',
    primaryLabels: { firstName: 'Անուն 1', secondName: 'Անուն 2', date: 'Նշանադրության ամսաթիվ', story: 'Մեր պատմությունը', location: 'Տոնակատարության վայր' },
    defaults: { storyTitle: 'Մեր Պատմությունը', timelineTitle: 'ԵՐԵԿՈՅԻ ԾՐԱԳԻՐ', rsvpTitle: 'ԿՍՊԱՍԵՆՔ ՁԵԶ', palette: ['#7f1d1d', '#f8d7da'] },
    styles: [
      { slug: 'romantic', name: 'Romantic', description: 'Soft, intimate styling.', previewClass: 'bg-red-50 text-red-950 border-red-200' },
      { slug: 'luxury', name: 'Luxury', description: 'Formal and polished.', previewClass: 'bg-neutral-950 text-amber-100 border-amber-300' },
      { slug: 'minimal', name: 'Minimal', description: 'Clean couple-first design.', previewClass: 'bg-white text-neutral-900 border-neutral-300' },
      { slug: 'classic', name: 'Classic', description: 'Timeless engagement look.', previewClass: 'bg-indigo-50 text-indigo-950 border-indigo-200' },
    ],
  },
  {
    slug: 'graduation',
    name: 'Graduation',
    nameHy: 'Ավարտական',
    description: 'Graduation ceremony and party invitations.',
    descriptionHy: 'Ավարտական միջոցառումների հրավիրատոմսեր։',
    searchTerms: ['graduation', 'school', 'university', 'ավարտական'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    primaryLabels: { firstName: 'Շրջանավարտ', secondName: 'Դպրոց/Համալսարան', date: 'Ավարտականի ամսաթիվ', story: 'Ձեռքբերումներ', location: 'Միջոցառման վայր' },
    defaults: { storyTitle: 'Ձեռքբերումների Օր', timelineTitle: 'ԾՐԱԳԻՐ', rsvpTitle: 'ՀԱՍՏԱՏԵՔ ՄԱՍՆԱԿՑՈՒԹՅՈՒՆԸ', palette: ['#1f2937', '#facc15'] },
    styles: [
      { slug: 'modern', name: 'Modern', description: 'Bold academic design.', previewClass: 'bg-gray-950 text-yellow-200 border-yellow-300' },
      { slug: 'formal', name: 'Formal', description: 'Ceremonial and structured.', previewClass: 'bg-blue-950 text-white border-blue-300' },
      { slug: 'minimal', name: 'Minimal', description: 'Simple announcement style.', previewClass: 'bg-white text-gray-900 border-gray-300' },
      { slug: 'bright', name: 'Bright', description: 'Confident celebration look.', previewClass: 'bg-cyan-50 text-cyan-950 border-cyan-300' },
    ],
  },
]

export function getCategoryBySlug(slug: string): InvitationCategory | undefined {
  return INVITATION_CATEGORIES.find((c) => c.slug === slug)
}

/**
 * Localized display name for a category. Armenian has dedicated names; other
 * languages fall back to the English name until per-locale names are added.
 */
export function getCategoryName(category: InvitationCategory, lang: string): string {
  if (lang.startsWith('hy')) return category.nameHy
  return category.name
}

export function getCategoryDescription(category: InvitationCategory, lang: string): string {
  if (lang.startsWith('hy')) return category.descriptionHy
  return category.description
}
