export type JourneyType = 'dtg' | 'aop' | null;

export type StepKey = 
  | 'journey'
  | 'upload'
  | 'seamless'
  | 'style'
  | 'product'
  | 'model'
  | 'platform'
  | 'environment'
  | 'colors'
  | 'angles'
  | 'generate';

export const DTG_STEP_KEYS: StepKey[] = [
  'journey',
  'upload',
  'style',
  'product',
  'model',
  'platform',
  'environment',
  'colors',
  'angles',
  'generate'
];

export const AOP_STEP_KEYS: StepKey[] = [
  'journey',
  'upload',
  'seamless',
  'style',
  'product',
  'model',
  'platform',
  'environment',
  'colors',
  'angles',
  'generate'
];

export const STEP_LABELS: Record<StepKey, string> = {
  journey: 'Choose Journey',
  upload: 'Upload Design',
  seamless: 'Create Pattern',
  style: 'Brand Style',
  product: 'Select Product',
  model: 'Customize Model',
  platform: 'Choose Platform',
  environment: 'Describe Scene',
  colors: 'Select Colors',
  angles: 'Choose Angles',
  generate: 'Generate'
};

export type AgeGroup = 'ADULT' | 'YOUNG_ADULT' | 'TEEN';
export type Sex = 'MALE' | 'FEMALE';
export type Ethnicity = 'White' | 'Black' | 'Hispanic' | 'Asian' | 'Indian' | 'Southeast Asian' | 'Middle Eastern' | 'Indigenous' | 'Diverse';
export type ModelSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export interface ModelDetails {
  ageGroup: AgeGroup;
  sex: Sex;
  ethnicity: Ethnicity;
  size: ModelSize;
}

export const DEFAULT_MODEL_DETAILS: ModelDetails = {
  ageGroup: 'ADULT',
  sex: 'FEMALE',
  ethnicity: 'Diverse',
  size: 'M'
};

export const SIZES_BY_AGE_GROUP: Record<AgeGroup, ModelSize[]> = {
  ADULT: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
  YOUNG_ADULT: ['XS', 'S', 'M', 'L', 'XL'],
  TEEN: ['XS', 'S', 'M', 'L']
};

export interface BrandStyleOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
}

export const BRAND_STYLES: BrandStyleOption[] = [
  {
    id: 'ECOMMERCE_CLEAN',
    name: 'E-Commerce Clean',
    description: 'Professional product photography for online stores',
    icon: 'shopping-cart',
    keywords: ['professional', 'clean', 'commercial']
  },
  {
    id: 'EDITORIAL_FASHION',
    name: 'Editorial Fashion',
    description: 'High-end magazine-quality photography',
    icon: 'camera',
    keywords: ['dramatic', 'bold', 'artistic']
  },
  {
    id: 'VINTAGE_RETRO',
    name: 'Vintage Retro',
    description: 'Nostalgic 70s-inspired photography',
    icon: 'film',
    keywords: ['nostalgic', 'warm', 'analog']
  },
  {
    id: 'STREET_URBAN',
    name: 'Street Style Urban',
    description: 'Authentic documentary-style street photography',
    icon: 'building',
    keywords: ['authentic', 'urban', 'candid']
  },
  {
    id: 'MINIMALIST_MODERN',
    name: 'Minimalist Modern',
    description: 'Clean contemporary aesthetic with generous negative space',
    icon: 'square',
    keywords: ['minimal', 'clean', 'sophisticated']
  },
  {
    id: 'BOLD_PLAYFUL',
    name: 'Bold & Playful',
    description: 'Vibrant, energetic photography with bright colors',
    icon: 'sparkles',
    keywords: ['vibrant', 'playful', 'energetic']
  },
  {
    id: 'PREMIUM_LUXE',
    name: 'Premium Luxe',
    description: 'Sophisticated high-end photography',
    icon: 'gem',
    keywords: ['luxurious', 'premium', 'elegant']
  },
  {
    id: 'NATURAL_ORGANIC',
    name: 'Natural Organic',
    description: 'Earth-toned natural photography',
    icon: 'leaf',
    keywords: ['natural', 'organic', 'earthy']
  }
];

export interface PlatformOption {
  id: string;
  name: string;
  icon: string;
  recommendedStyle?: string;
  recommendedLighting?: string;
  recommendedMaterial?: string;
}

export const PLATFORMS: PlatformOption[] = [
  { id: 'amazon', name: 'Amazon', icon: 'package', recommendedLighting: 'ecommerce', recommendedMaterial: 'brand_new' },
  { id: 'etsy', name: 'Etsy', icon: 'heart', recommendedLighting: 'natural', recommendedMaterial: 'brand_new' },
  { id: 'shopify', name: 'Shopify', icon: 'store', recommendedLighting: 'ecommerce', recommendedMaterial: 'brand_new' },
  { id: 'social', name: 'Social Media', icon: 'instagram', recommendedLighting: 'lifestyle', recommendedMaterial: 'lightly_worn' },
  { id: 'print', name: 'Print Catalog', icon: 'book', recommendedLighting: 'studio', recommendedMaterial: 'brand_new' },
  { id: 'website', name: 'Brand Website', icon: 'globe', recommendedLighting: 'editorial', recommendedMaterial: 'brand_new' }
];

export interface ProductColor {
  name: string;
  hex: string;
  category: 'light' | 'dark' | 'neutral';
}

export const STANDARD_COLORS: ProductColor[] = [
  { name: 'White', hex: '#FFFFFF', category: 'light' },
  { name: 'Black', hex: '#000000', category: 'dark' },
  { name: 'Navy', hex: '#1E3A5F', category: 'dark' },
  { name: 'Royal Blue', hex: '#2E5090', category: 'dark' },
  { name: 'Red', hex: '#B22222', category: 'dark' },
  { name: 'Forest Green', hex: '#228B22', category: 'dark' },
  { name: 'Charcoal', hex: '#36454F', category: 'dark' },
  { name: 'Sport Grey', hex: '#9EA1A1', category: 'neutral' },
  { name: 'Light Pink', hex: '#FFB6C1', category: 'light' },
  { name: 'Purple', hex: '#663399', category: 'dark' },
  { name: 'Orange', hex: '#FF6600', category: 'dark' },
  { name: 'Gold', hex: '#FFD700', category: 'light' }
];

export interface MockupAngle {
  id: string;
  name: string;
  description: string;
  recommended: boolean;
}

export const MOCKUP_ANGLES: MockupAngle[] = [
  { id: 'front', name: 'Front View', description: 'Direct frontal shot - the hero image', recommended: true },
  { id: 'three-quarter', name: 'Three-Quarter', description: '45° angle to show dimension and fit', recommended: true },
  { id: 'side', name: 'Side Profile', description: '90° side view to showcase silhouette', recommended: false },
  { id: 'closeup', name: 'Close-up View', description: 'Detailed shot of the design and fabric', recommended: true },
  { id: 'back', name: 'Back View', description: 'Rear view of the product', recommended: false }
];

export const ENVIRONMENT_SUGGESTIONS = [
  'Professional photo studio with white backdrop',
  'Urban city street with brick walls',
  'Cozy coffee shop interior',
  'Modern minimalist apartment',
  'Outdoor park with natural lighting',
  'Industrial warehouse setting',
  'Beach or coastal environment',
  'Fashion runway backdrop'
];

export interface ProductCategory {
  id: string;
  name: string;
  subcategories: ProductSubcategory[];
}

export interface ProductSubcategory {
  id: string;
  name: string;
  products: ProductItem[];
}

export interface ProductItem {
  id: string;
  name: string;
  isWearable: boolean;
  availableColors: ProductColor[];
  journeyType: 'dtg' | 'aop' | 'both';
}

export const DTG_PRODUCTS: ProductCategory[] = [
  {
    id: 'mens',
    name: "Men's Clothing",
    subcategories: [
      {
        id: 'mens-tops',
        name: 'Tops',
        products: [
          { id: 'mens-tshirt', name: 'T-Shirt', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'mens-polo', name: 'Polo Shirt', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'mens-tanktop', name: 'Tank Top', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'mens-longsleeve', name: 'Long Sleeve Shirt', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'mens-hoodie', name: 'Hoodie', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'mens-sweatshirt', name: 'Sweatshirt', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' }
        ]
      }
    ]
  },
  {
    id: 'womens',
    name: "Women's Clothing",
    subcategories: [
      {
        id: 'womens-tops',
        name: 'Tops',
        products: [
          { id: 'womens-tshirt', name: 'T-Shirt', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'womens-croptop', name: 'Crop Top', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'womens-tanktop', name: 'Racerback Tank', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' },
          { id: 'womens-hoodie', name: 'Hoodie', isWearable: true, availableColors: STANDARD_COLORS, journeyType: 'dtg' }
        ]
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    subcategories: [
      {
        id: 'bags',
        name: 'Bags',
        products: [
          { id: 'tote-bag', name: 'Tote Bag', isWearable: false, availableColors: STANDARD_COLORS.slice(0, 6), journeyType: 'dtg' },
          { id: 'backpack', name: 'Backpack', isWearable: false, availableColors: STANDARD_COLORS.slice(0, 4), journeyType: 'dtg' }
        ]
      },
      {
        id: 'tech',
        name: 'Tech',
        products: [
          { id: 'phone-case', name: 'Phone Case', isWearable: false, availableColors: STANDARD_COLORS.slice(0, 4), journeyType: 'dtg' },
          { id: 'laptop-sleeve', name: 'Laptop Sleeve', isWearable: false, availableColors: STANDARD_COLORS.slice(0, 4), journeyType: 'dtg' }
        ]
      }
    ]
  },
  {
    id: 'home',
    name: 'Home & Living',
    subcategories: [
      {
        id: 'decor',
        name: 'Decor',
        products: [
          { id: 'mug', name: 'Mug', isWearable: false, availableColors: STANDARD_COLORS.slice(0, 2), journeyType: 'dtg' },
          { id: 'pillow', name: 'Throw Pillow', isWearable: false, availableColors: STANDARD_COLORS.slice(0, 4), journeyType: 'dtg' },
          { id: 'poster', name: 'Poster', isWearable: false, availableColors: [STANDARD_COLORS[0]], journeyType: 'dtg' }
        ]
      }
    ]
  }
];

export const AOP_PRODUCTS: ProductCategory[] = [
  {
    id: 'aop-apparel',
    name: 'All-Over Print Apparel',
    subcategories: [
      {
        id: 'aop-tops',
        name: 'Tops',
        products: [
          { id: 'aop-mens-tee', name: "AOP Men's Cut & Sew Tee", isWearable: true, availableColors: [], journeyType: 'aop' },
          { id: 'aop-womens-tee', name: "AOP Women's Tee", isWearable: true, availableColors: [], journeyType: 'aop' },
          { id: 'aop-hoodie', name: 'Unisex AOP Hoodie', isWearable: true, availableColors: [], journeyType: 'aop' },
          { id: 'aop-sweatshirt', name: 'Unisex AOP Sweatshirt', isWearable: true, availableColors: [], journeyType: 'aop' }
        ]
      },
      {
        id: 'aop-bottoms',
        name: 'Bottoms',
        products: [
          { id: 'aop-leggings', name: "AOP Women's Leggings", isWearable: true, availableColors: [], journeyType: 'aop' },
          { id: 'aop-swimsuit', name: 'AOP One-Piece Swimsuit', isWearable: true, availableColors: [], journeyType: 'aop' }
        ]
      }
    ]
  },
  {
    id: 'aop-home',
    name: 'All-Over Print Home',
    subcategories: [
      {
        id: 'aop-textiles',
        name: 'Textiles',
        products: [
          { id: 'aop-pillow', name: 'AOP Square Pillow', isWearable: false, availableColors: [], journeyType: 'aop' },
          { id: 'aop-blanket', name: 'AOP Fleece Blanket', isWearable: false, availableColors: [], journeyType: 'aop' },
          { id: 'aop-towel', name: 'AOP Beach Towel', isWearable: false, availableColors: [], journeyType: 'aop' }
        ]
      }
    ]
  }
];

export interface GenerationJob {
  id: string;
  color: ProductColor;
  angle: MockupAngle;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  progress: number;
  result?: string;
  error?: string;
}

export interface GenerationResult {
  id: string;
  src: string;
  color: string;
  angle: string;
  timestamp: Date;
}
