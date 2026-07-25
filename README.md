# Marjaan Collection - E-commerce Storefront

Welcome to the Marjaan Collection codebase! This is a modern, blazing-fast, server-side rendered e-commerce storefront built with Next.js, React, Tailwind CSS, and Framer Motion. 

This platform supports two main product lines:
1. **Premium Footwear**
2. **Holistic Organic Care**

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation & Running Locally

1. **Install dependencies:**
   Open your terminal in the project directory and run:
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The site will automatically reload when you make edits to any files!

3. **Build for Production:**
   When you are ready to deploy the site to a live server (like Vercel, Netlify, or a VPS), run:
   ```bash
   npm run build
   ```
   This will create an optimized, static production build.

---

## 🛍️ Content Management Guide (No Database Required!)

This project is designed to be as fast and easy to maintain as possible. You do not need to log into a complicated database to add new products or reviews. Everything is powered by local data arrays.

### 1. How to Modify or Add Products

All product data is stored in a single file: `data/products.ts`.

#### Modifying an existing product:
1. Open `data/products.ts`.
2. Find the product you want to change in the list.
3. Edit the properties (e.g., change the `price`, edit the `name`, or change the `badge` from "New Arrival" to "Best Seller").
4. Save the file. The changes will instantly appear on the website!

#### Adding a new product:
1. Open `data/products.ts`.
2. Scroll to the bottom of the `products` array.
3. Copy an existing product block and paste it below.
4. Give it a **unique ID**.
5. Fill in the new details. Here is the template:

```typescript
{
    id: "new-unique-id", // MUST be unique
    name: "Product Name",
    price: 5000, // Price in PKR
    category: "SKIN-CARE", // Options: "HEELS", "SANDALS", "FLATS", "HAIR-CARE", "SKIN-CARE"
    productLine: "organics", // Options: "footwear" or "organics"
    image: "/images/your-primary-image.jpg",
    images: ["/images/your-primary-image.jpg", "/images/alternate-image.jpg"],
    description: "Your product description goes here.",
    badge: "New Arrival", // Optional: "New Arrival" or "Best Seller"
    features: ["Feature 1", "Feature 2"],
}
```

### 2. How to Manage Images
All product images and site graphics live in the `public/` directory (specifically `public/images/`).

To add a new image:
1. Place your `.jpg` or `.png` file into the `public/images/` folder.
2. In your `data/products.ts` file, reference the image simply by starting with a slash: `"/images/my-new-image.jpg"`.
*Note: Do not include "public" in the path name inside your code.*

### 3. How to Modify or Add Customer Testimonials
Testimonials are just as easy to edit as products. They are stored in `data/testimonials.ts`.

#### Adding a new testimonial:
1. Open `data/testimonials.ts`.
2. Add a new block to the array:

```typescript
{
    id: "unique-review-id",
    customerName: "Ali Raza",
    location: "Lahore",
    rating: 5,
    text: "The quality of the footwear is amazing and the organic serum smells incredible!",
    date: "July 2026",
    productBought: "Leather Loafers & Face Serum"
}
```

---

## 📱 WhatsApp Checkout Integration

This store utilizes a "Cart to WhatsApp" flow instead of a traditional credit card gateway. 
When a customer clicks "Place Order via WhatsApp", the code in `app/checkout/page.tsx` dynamically gathers:
- Customer details (Name, Phone, Address, City)
- Every single item in the cart (Name, Size, Qty, Price)
- The calculated Subtotal & Total

It perfectly formats this into a secure WhatsApp message and redirects the user to their WhatsApp app to send it directly to your business number!

**To change the business number:**
1. Open `app/checkout/page.tsx`.
2. Locate the line: `const waNumber = "+12345678900";`
3. Change `+12345678900` to your actual WhatsApp Business number.

---

## 💻 Tech Stack
- **Framework:** Next.js 16
- **Styling:** Tailwind CSS
- **Animations:** [Framer Motion]
- **State Management:** Zustand (for the Shopping Cart)
- **Icons:** Lucide React
- **Image Optimization:** Sharp (High-performance compression for production images)

---

## 👨‍💻 Credits
**Built by Haseeb** | [muhammadhaseebhassan23@gmail.com](mailto:muhammadhaseebhassan23@gmail.com)
