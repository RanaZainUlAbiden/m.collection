export type Product = {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    badge?: string;
    category: string;
    productLine: 'footwear' | 'organics' | 'clothing';
    weight?: string;
    sizes?: { label: string; price: number }[];
    variants?: { size: string; price: number }[];
    colors?: string[];
    ingredients?: string[];
    howToUse?: string[];
    careInstructions?: string[];
    benefits?: string[];
    sizeOptions?: { label: string; price: number }[];
    skinHairType?: string;
    usage?: string;
    scale?: number;
    rotate?: number;
};

export const products: Product[] = [
  {
    id: "p1",
    careInstructions: ["Wipe with a damp cloth", "Use leather conditioner", "Avoid direct sunlight"],
    name: "SPARKE SLIDES - Black",
    shortDescription: "Fancy black heel slippers with shimmer detailing.",
    description: "Designed for graceful occasions, these fancy black heel slippers combine shimmer detailing with soft materials for elegant comfort. The cushioned design ensures you stay stylish without compromising ease.",
    price: 5250,
    image: "/images/opia-shoe-1-nobg.png",
    images: ["/images/opia-shoe-1-nobg.png", "/images/opia-shoe-1-alt.jpg"],
    badge: "Best Seller",
    category: "heels",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 5250 },
        { label: "EU 37", price: 5250 },
        { label: "EU 38", price: 5250 },
        { label: "EU 39", price: 5250 },
        { label: "EU 40", price: 5250 },
        { label: "EU 41", price: 5250 }
    ],
    colors: ["BLACK"]
  },
  {
    id: "p2",
    careInstructions: ["Wipe clean only", "Do not machine wash"],
    name: "SILKEN SANDAL - Peach",
    shortDescription: "Elegant peach heel sandals with a stable block heel.",
    description: "Designed to add elegance to every step, these fancy silver heel sandals combine a smart silhouette. The distinctive upper and stable block heel make them a stylish choice for special occasions and festive wear.",
    price: 5250,
    image: "/images/opia-shoe-2-nobg.png",
    images: ["/images/opia-shoe-2-nobg.png", "/images/opia-shoe-2-alt.jpg"],
    badge: "New",
    category: "heels",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 5250 },
        { label: "EU 37", price: 5250 },
        { label: "EU 38", price: 5250 },
        { label: "EU 39", price: 5250 },
        { label: "EU 40", price: 5250 },
        { label: "EU 41", price: 5250 }
    ],
    colors: ["PEACH"]
  },
  {
    id: "p3",
    careInstructions: ["Store in a dust bag", "Wipe with a soft cloth"],
    name: "SILKEN SANDAL - Silver",
    shortDescription: "Elegant silver heel sandals with a stable block heel.",
    description: "Designed to add elegance to every step, these fancy silver heel sandals combine a smart silhouette. The distinctive upper and stable block heel make them a stylish choice for special occasions and festive wear.",
    price: 5250,
    image: "/images/opia-shoe-3-nobg.png",
    images: ["/images/opia-shoe-3-nobg.png", "/images/opia-shoe-3-alt.jpg"],
    badge: "",
    category: "heels",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 5250 },
        { label: "EU 37", price: 5250 },
        { label: "EU 38", price: 5250 },
        { label: "EU 39", price: 5250 },
        { label: "EU 40", price: 5250 },
        { label: "EU 41", price: 5250 }
    ],
    colors: ["SILVER"]
  },
  {
    id: "p4",
    careInstructions: ["Wipe clean with a damp cloth", "Store in a cool, dry place"],
    name: "SILKEN SANDAL - Gold",
    shortDescription: "Elegant gold heel sandals with a stable block heel.",
    description: "Designed to add elegance to every step, these fancy gold heel sandals combine a smart silhouette. The distinctive upper and stable block heel make them a stylish choice for special occasions and festive wear.",
    price: 5250,
    image: "/images/opia-shoe-4-nobg.png",
    images: ["/images/opia-shoe-4-nobg.png", "/images/opia-shoe-4-alt.jpg"],
    badge: "Trending",
    category: "heels",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 5250 },
        { label: "EU 37", price: 5250 },
        { label: "EU 38", price: 5250 },
        { label: "EU 39", price: 5250 },
        { label: "EU 40", price: 5250 },
        { label: "EU 41", price: 5250 }
    ],
    colors: ["GOLD"]
  },
  {
    id: "p5",
    careInstructions: ["Wipe clean only", "Do not machine wash"],
    name: "DAISY SLIDES - Tan",
    shortDescription: "Comfortable flat slides with an elegant bow detail.",
    description: "Tan in color, these flat slides are designed for everyday comfort. They combine feminine styling with supportive cushioning. The elegant bow detail adds a graceful finishing touch to your daily look.",
    price: 4500,
    image: "/images/opia-shoe-5-alt.jpg",
    images: ["/images/opia-shoe-5-alt.jpg", "/images/opia-shoe-5-nobg.png"],
    badge: "",
    category: "flats",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 4500 },
        { label: "EU 37", price: 4500 },
        { label: "EU 38", price: 4500 },
        { label: "EU 39", price: 4500 },
        { label: "EU 40", price: 4500 },
        { label: "EU 41", price: 4500 }
    ],
    colors: ["TAN"]
  },
  {
    id: "p6",
    careInstructions: ["Store in a dust bag", "Wipe with a soft cloth"],
    name: "DAISY SLIDES - Black",
    shortDescription: "Comfortable flat slides with an elegant bow detail.",
    description: "Black in color, these flat slides are designed for everyday comfort. They combine feminine styling with supportive cushioning. The elegant bow detail adds a graceful finishing touch to your daily look.",
    price: 4500,
    image: "/images/opia-shoe-6-alt.jpg",
    images: ["/images/opia-shoe-6-alt.jpg", "/images/opia-shoe-6-nobg.png"],
    badge: "",
    category: "flats",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 4500 },
        { label: "EU 37", price: 4500 },
        { label: "EU 38", price: 4500 },
        { label: "EU 39", price: 4500 },
        { label: "EU 40", price: 4500 },
        { label: "EU 41", price: 4500 }
    ],
    colors: ["BLACK"]
  },
  {
    id: "p7",
    careInstructions: ["Wipe clean with a damp cloth", "Store in a cool, dry place"],
    name: "DAISY SLIDES - Beige",
    shortDescription: "Comfortable flat slides with an elegant bow detail.",
    description: "Beige in color, these flat slides are designed for everyday comfort. They combine feminine styling with supportive cushioning. The elegant bow detail adds a graceful finishing touch to your daily look.",
    price: 4500,
    image: "/images/opia-shoe-7-alt.jpg",
    images: ["/images/opia-shoe-7-alt.jpg", "/images/opia-shoe-7-nobg.png"],
    badge: "Must Have",
    category: "flats",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 4500 },
        { label: "EU 37", price: 4500 },
        { label: "EU 38", price: 4500 },
        { label: "EU 39", price: 4500 },
        { label: "EU 40", price: 4500 },
        { label: "EU 41", price: 4500 }
    ],
    colors: ["BEIGE"]
  },
  {
    id: "p8",
    careInstructions: ["Wipe clean only", "Do not machine wash"],
    name: "WALKZE SLIDES - Pink",
    shortDescription: "Pink flat slides with padded straps and medicated insole.",
    description: "Blending contemporary style with everyday comfort, these pink flat slides feature soft padded straps for a plush feel. The cushioned medicated insole keeps every step comfortable from morning to evening.",
    price: 4295,
    image: "/images/opia-shoe-8-alt.jpg",
    images: ["/images/opia-shoe-8-alt.jpg", "/images/opia-shoe-8-nobg.png"],
    badge: "",
    category: "flats",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 4295 },
        { label: "EU 37", price: 4295 },
        { label: "EU 38", price: 4295 },
        { label: "EU 39", price: 4295 },
        { label: "EU 40", price: 4295 },
        { label: "EU 41", price: 4295 }
    ],
    colors: ["PINK"]
  },
  {
    id: "p9",
    careInstructions: ["Store in a dust bag", "Wipe with a soft cloth"],
    name: "WALKZE SLIDES - Grey",
    shortDescription: "Grey flat slides with padded straps and medicated insole.",
    description: "Blending contemporary style with everyday comfort, these grey flat slides feature soft padded straps for a plush feel. The cushioned medicated insole keeps every step comfortable from morning to evening.",
    price: 4295,
    image: "/images/opia-shoe-9-alt.jpg",
    images: ["/images/opia-shoe-9-alt.jpg", "/images/opia-shoe-9-nobg.png"],
    badge: "",
    category: "flats",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 4295 },
        { label: "EU 37", price: 4295 },
        { label: "EU 38", price: 4295 },
        { label: "EU 39", price: 4295 },
        { label: "EU 40", price: 4295 },
        { label: "EU 41", price: 4295 }
    ],
    colors: ["GREY"]
  },
  {
    id: "p10",
    careInstructions: ["Wipe clean with a damp cloth", "Store in a cool, dry place"],
    name: "WALKZE SLIDES - Black",
    shortDescription: "Black flat slides with padded straps and medicated insole.",
    description: "Blending contemporary style with everyday comfort, these black flat slides feature soft padded straps for a plush feel. The cushioned medicated insole keeps every step comfortable from morning to evening.",
    price: 4295,
    image: "/images/opia-shoe-10-alt.jpg",
    images: ["/images/opia-shoe-10-alt.jpg", "/images/opia-shoe-10-nobg.png"],
    badge: "Popular",
    category: "flats",
    productLine: "footwear",
    sizes: [
        { label: "EU 36", price: 4295 },
        { label: "EU 37", price: 4295 },
        { label: "EU 38", price: 4295 },
        { label: "EU 39", price: 4295 },
        { label: "EU 40", price: 4295 },
        { label: "EU 41", price: 4295 }
    ],
    colors: ["BLACK"]
  },
  {
    id: "o1",
    careInstructions: ["Store in a cool, dark place", "Keep away from direct sunlight", "Keep tightly closed after use"],
    name: "Pure Rosemary Hair Oil",
    shortDescription: "100% natural cold-pressed rosemary oil for hair growth.",
    description: "Stimulate your scalp and promote healthy hair growth with our 100% natural, cold-pressed rosemary hair oil. It strengthens roots, reduces hair fall, and adds a natural shine to your hair.",
    price: 1200,
    image: "/images/hair-oil-nobg.png",
    category: "hair-care",
    productLine: "organics",
    variants: [
        { size: "50ml", price: 800 },
        { size: "100ml", price: 1200 }
    ],
    ingredients: ["100% Pure Rosemary Essential Oil", "Carrier Oil Blend"],
    howToUse: ["Apply a few drops to the scalp", "Massage gently for 5 minutes", "Leave overnight or for at least 2 hours before washing"],
    benefits: ["Promotes hair growth", "Reduces hair fall", "Strengthens roots"],
    skinHairType: "All hair types"
  },
  {
    id: "o2",
    careInstructions: ["Store in a cool, dry place", "Avoid getting water in the bottle", "Keep away from direct sunlight"],
    name: "Keratin Smooth Shampoo",
    shortDescription: "Sulfate-free keratin shampoo for silky smooth hair.",
    description: "Keep your hair healthy and smooth with our keratin-infused shampoo. Formulated to fight frizz and gently cleanse without stripping your hair of its natural moisture.",
    price: 850,
    image: "/images/shampoo-keratin-nobg.png",
    category: "hair-care",
    productLine: "organics",
    variants: [
        { size: "200ml", price: 850 },
        { size: "400ml", price: 1500 }
    ],
    ingredients: ["Keratin Extract", "Aloe Vera", "Vitamin E"],
    howToUse: ["Take a small amount", "Massage onto wet hair", "Rinse thoroughly with water"],
    benefits: ["Fights frizz", "Smooths hair", "Adds shine"],
    skinHairType: "All hair types"
  },
  {
    id: "c1",
    careInstructions: ["Machine wash cold", "Wash inside out", "Tumble dry low", "Do not bleach"],
    name: "Oversized Balloon Jeans",
    shortDescription: "Relaxed fit balloon jeans in beige.",
    price: 4500,
    category: "JEANS",
    productLine: "clothing",
    image: "/images/bottom1.webp",
    images: [
        "/images/bottom1.webp",
        "/images/bottom2.webp",
        "/images/bottom3.jpg",
        "/images/bottom4.webp"
    ],
    colors: ["Beige"],
    description: "These oversized balloon jeans feature button and zip closure, front two pockets and back patch pockets with a fitted waist and wider leg tapering at ankle.",
    sizes: [
        { label: "W28", price: 4500 },
        { label: "W30", price: 4500 },
        { label: "W32", price: 4500 },
        { label: "W34", price: 4500 }
    ],
  },
  {
    id: "c2",
    careInstructions: ["Machine wash cold", "Wash with like colors", "Iron on low heat", "Do not dry clean"],
    name: "Striped Jacquard Shirt (Relaxed Fit)",
    shortDescription: "Relaxed fit striped jacquard shirt.",
    price: 3990,
    category: "SHIRTS",
    productLine: "clothing",
    image: "/images/top1.webp",
    images: [
        "/images/top1.webp",
        "/images/top2.webp",
        "/images/top3.webp"
    ],
    colors: ["Pink"],
    description: "This striped jacquard shirt features a refined v-neck collar, and half sleeves that are made from 100% cotton with a relaxed, comfortable fit and drop shoulders for effortless movement and style.",
    sizes: [
        { label: "S", price: 3990 },
        { label: "M", price: 3990 },
        { label: "L", price: 3990 },
        { label: "XL", price: 3990 }
    ],
  }
];

export const footwearProducts = products.filter(p => p.productLine === 'footwear');
