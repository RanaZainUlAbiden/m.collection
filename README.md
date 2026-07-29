# Marjaan Collection - E-commerce Storefront

Welcome to the Marjaan Collection codebase! This is a modern, blazing-fast, server-side rendered e-commerce storefront built with Next.js, React, Tailwind CSS, and Framer Motion. 

This platform supports three main product lines:
1. **Premium Footwear** (Static pricing by size)
2. **Clothing** (Static pricing by size)
3. **Holistic Organic Care** (Dynamic pricing by weight/variant)

---

## 🛍️ Store Management Guide (No Database Required!)

This project is designed to be incredibly fast and easy to maintain. You do not need to log into a complicated database to add new products or manage your store. Everything is powered by a local file!

### 1. The Core Data File
All product data is stored in a single file: `data/products.ts`.
This is your **source of truth**. Any changes made to this file instantly update the entire website (shop pages, product details, cart, etc).

### 2. How to Add a New Product
To add a new product:
1. Open `data/products.ts`.
2. Scroll to the bottom of the `products` array.
3. Copy an existing product block and paste it below.
4. Fill in the new details based on the template below:

```typescript
{
    id: "new-unique-id", // MUST be unique (e.g. p11, c3, o4)
    name: "Product Name",
    shortDescription: "A very brief 1-sentence summary.",
    description: "Your full product description goes here. It can be long.",
    price: 5000, // Default Base Price in PKR
    category: "HEELS", // e.g., "HEELS", "SANDALS", "FLATS", "HAIR-CARE", "SKIN-CARE", "JEANS", "SHIRTS"
    productLine: "footwear", // CRITICAL: Choose "footwear" | "organics" | "clothing"
    image: "/images/your-primary-image.jpg",
    images: ["/images/your-primary-image.jpg", "/images/alternate-image.jpg"],
    
    // --- OPTIONAL FIELDS ---
    badge: "New Arrival", // E.g. "New Arrival" or "Best Seller". Used to feature products on homepage!
    colors: ["Beige", "Pink"], // Array of color names. This automatically shows the color picker on the UI.
    careInstructions: ["Wipe clean", "Store in a cool dry place"], // Array of strings. Renders an accordion section.
    
    // --- SIZING FOR FOOTWEAR & CLOTHING ---
    // If the product has static prices regardless of size, use 'sizes':
    sizes: [
        { label: "EU 36", price: 5000 },
        { label: "EU 37", price: 5000 }
        // For Jeans: { label: "W30 L32", price: 6000 }
        // For Tops: { label: "S", price: 3000 }
    ],

    // --- SIZING FOR ORGANICS ---
    // If the price changes based on weight/size, use 'variants' instead:
    // variants: [
    //     { size: "50g", price: 1200 },
    //     { size: "35g", price: 800 }
    // ],
    // howToUse: ["Apply to skin", "Leave for 10 mins"], // Specific to organics
    // ingredients: ["Aloe Vera", "Vitamin E"], // Specific to organics
}
```

### 3. How to Feature a Product on the Homepage (Top Picks)
The **Bestselling Products** section on the homepage automatically selects up to 4 products based on their badges.
To force a product to appear on the homepage, simply give it a badge!
Add or modify the `badge` property in the product object:
`badge: "Best Seller"` or `badge: "New Arrival"`

### 4. How to Mark an Item Out of Stock
If a specific size sells out, you can easily hide it from the website so customers can't buy it.
1. Open `data/products.ts`.
2. Locate the product you want to modify.
3. In the `sizes` array, simply comment out (or delete) the line corresponding to the out-of-stock size by putting `//` in front of it.

```typescript
    sizes: [
        { label: "EU 36", price: 5250 },
        { label: "EU 37", price: 5250 },
        // { label: "EU 38", price: 5250 }, <-- Commented out! It instantly disappears from the site.
        { label: "EU 39", price: 5250 }
    ],
```

### 5. How to Put a Product on Sale (Discounts)
You have full manual control over sales and discounts.
To put a product on sale, edit the product's entry in `data/products.ts` and use two fields:
- `originalPrice`: The old, higher price before the discount.
- `price`: The current, active sale price that the customer will pay.

```typescript
{
  id: "p1",
  name: "SPARKE SLIDES - Black",
  originalPrice: 7000, // The old price (will be automatically crossed out)
  price: 5250,         // The new sale price
  // ...
}
```
*The website will automatically calculate the % saved and display a bright red "Save X%" tag on the product!*

### 6. How to Manage Images
All product images live in the `public/images/` directory.
1. Place your `.jpg` or `.png` file into the `public/images/` folder.
2. In your `data/products.ts` file, reference the image simply by starting with a slash: `"/images/my-new-image.jpg"`.
*Note: Do not type "public" in the path name inside your code.*

### 7. How to Modify Customer Testimonials
Testimonials are stored in `data/testimonials.ts`. Add a new block to the array to display a new review:
```typescript
{
    id: "unique-review-id",
    customerName: "Ali Raza",
    location: "Lahore",
    rating: 5,
    text: "The quality of the footwear is amazing!",
    date: "July 2026",
    productBought: "Leather Loafers"
}
```

---

## 📱 WhatsApp Checkout Integration

This store utilizes a highly optimized **"Cart to WhatsApp"** flow. 
When a customer clicks "Place Order via WhatsApp", the code in `app/checkout/page.tsx` dynamically gathers the customer details, order summary, and calculated totals, formats it into a secure WhatsApp message, and redirects the user to send it directly to your business number!

**To change the business number:**
1. Open `app/checkout/page.tsx`.
2. Locate the line: `const waNumber = "+923154322433";`
3. Change `+923154322433` to your actual WhatsApp Business number.

---

## 🚀 Technical Setup (For Developers)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 💻 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & GSAP
- **State Management:** Zustand
- **UI Components:** Shadcn UI, Lucide React

---
**Built by Haseeb** | [muhammadhaseebhassan23@gmail.com](mailto:muhammadhaseebhassan23@gmail.com)
