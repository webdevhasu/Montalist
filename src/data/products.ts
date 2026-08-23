export const products = [
  {
    id: 'gentle-barrier-face-wash',
    number: '01',
    name: 'Gentle Barrier Face Wash',
    shortName: 'Face Wash',
    tagline: 'Clean without stripping the skin',
    position: 'Supporting product',
    image: '/images/products/facewash.png',
    isHero: false,
    steps: {
      am: true,
      pm: true,
    },
    routineOrder: 1,
    description:
      'Pahari ilaqon mein dry hawa, thand aur strong sunlight skin ko zyada dry aur stressed feel kara sakta hai. Gentle Barrier Face Wash skin ko effectively clean karta hai bina natural moisture layer ke. Yeh face wash skin ke pH balance ko maintain rakhta hai aur mild cleansing system use karta hai.',
    benefits: [
      'Skin ko moisture retain karne mein help karta hai',
      'Soothing aur skin comfort ke liye',
      'Mild cleansing — skin natural oils ko strip nahi karta',
      'Target pH 5.0–5.5',
    ],
    keyIngredients: [
      {
        name: 'Glycerin',
        target: '3–5%',
        purpose: 'Skin ko moisture retain karne mein help karta hai.',
      },
      {
        name: 'Panthenol',
        target: '1–2%',
        purpose: 'Skin ko soothe aur moisture support dene mein madad karta hai.',
      },
      {
        name: 'Niacinamide',
        target: '~2%',
        purpose: 'Skin barrier support ke liye.',
      },
      {
        name: 'Betaine',
        target: '1–2%',
        purpose: 'Mild humectant, skin comfort support.',
      },
      {
        name: 'Allantoin',
        target: '0.2–0.3%',
        purpose: 'Soothing aur skin comfort ke liye.',
      },
    ],
  },
  {
    id: 'high-altitude-spf-50',
    number: '02',
    name: 'High-Altitude SPF 50+',
    shortName: 'SPF 50+',
    tagline: 'Mountain sunlight mein daily protection',
    position: 'Hero product',
    image: '/images/products/sunblock.png',
    isHero: true,
    steps: {
      am: true,
      pm: false,
    },
    routineOrder: 2,
    description:
      'Paharon mein rehne wale logon ke liye daily UV protection essential hai. MONTALIST High-Altitude SPF 50+ ek lightweight, fragrance-free sunscreen hai jo SPF 50+, PA++++ aur Broad Spectrum UVA + UVB protection deta hai. Yeh modern UV filter system use karta hai jo skin ko effective daily defense deta hai mountain environment mein.',
    benefits: [
      'SPF 50+, PA++++, Broad Spectrum — UVA + UVB protection',
      'Lightweight formula, fragrance-free',
      'No visible white cast',
      'Water-resistant target',
    ],
    keyIngredients: [
      {
        name: 'Modern UV Filters',
        target: 'Uvinul A Plus, Uvinul T 150, Tinosorb S/M',
        purpose: 'Daily UVA + UVB defense.',
      },
      {
        name: 'Niacinamide',
        target: '~4%',
        purpose: 'Skin barrier support aur overall skin appearance ke liye.',
      },
      {
        name: 'Panthenol',
        target: '~2%',
        purpose: 'Moisture aur soothing support ke liye.',
      },
      {
        name: 'Hyaluronic Acid',
        target: '0.1–0.2%',
        purpose: 'Hydration support ke liye.',
      },
    ],
  },
  {
    id: 'barrier-night-cream',
    number: '03',
    name: 'Barrier Night Cream',
    shortName: 'Night Cream',
    tagline: 'Raat ke waqt skin ko moisture aur barrier support',
    position: 'Second hero product',
    image: '/images/products/nighcream.png',
    isHero: true,
    steps: {
      am: false,
      pm: true,
    },
    routineOrder: 3,
    description:
      'Raat ke waqt skin ko moisture aur barrier support dene ke liye banayi gayi cream. Barrier Night Cream dry, cold aur windy mountain environment mein skin ko comfortable aur moisturized feel karata hai. Ceramide + cholesterol + fatty-acid lipid system barrier function ko support karta hai.',
    benefits: [
      'Raat bhar moisture support',
      'Skin barrier lipid system ke liye ceramide complex',
      'Skin ko comfortable aur moisturized feel karata hai',
      'Dryness reduce karne mein help karta hai',
    ],
    keyIngredients: [
      {
        name: 'Glycerin',
        target: '4–5%',
        purpose: 'Skin ko moisture retain karne mein help karta hai.',
      },
      {
        name: 'Niacinamide',
        target: '4%',
        purpose: 'Skin barrier support ke liye.',
      },
      {
        name: 'Squalane',
        target: '3–5%',
        purpose: 'Skin ko comfortable aur moisturized feel karne mein help karta hai.',
      },
      {
        name: 'Panthenol',
        target: '2%',
        purpose: 'Soothing aur moisture support ke liye.',
      },
      {
        name: 'Ceramide + Cholesterol + Fatty Acids',
        target: 'Lipid system',
        purpose: 'Barrier support.',
      },
      {
        name: 'Beta-Glucan',
        target: '0.2–0.5%',
        purpose: 'Skin soothing support ke liye.',
      },
      {
        name: 'Hyaluronic Acid',
        target: '0.1–0.2%',
        purpose: 'Hydration support.',
      },
      {
        name: 'Allantoin',
        target: '0.2–0.3%',
        purpose: 'Soothing ke liye.',
      },
    ],
  },
] as const

export type Product = (typeof products)[number]
