# Marjaan Collection - E-commerce Storefront

Welcome to the Marjaan Collection codebase! This is a modern, blazing-fast, server-side rendered e-commerce storefront built with Next.js, React, Tailwind CSS, and Framer Motion. 

This platform supports three main product lines:
1. **Premium Footwear** (Static pricing by size)
2. **Clothing** (Static pricing by size)
3. **Holistic Organic Care** (Dynamic pricing by weight/variant)

---

## 🛍️ Store Management Guide (Decap CMS)

This project uses an incredibly fast, lightweight architecture. You do not need to log into a complicated database to manage your store. Everything is powered by **Decap CMS**, which saves your product data securely as files inside this code repository.

### 1. Accessing the Admin Panel
To manage products and testimonials, navigate to the admin dashboard:
**`https://your-domain.com/admin/`**

*(Note: During local development on your computer, you can access it at `http://localhost:3000/admin/` as long as you are running both `npm run dev` and `npx decap-server`.)*

### 2. Managing Products
Inside the Admin Panel, click on **Products**.
- **Adding a product:** Click "New Product". Fill out the required fields (Name, Price, Category, etc.) and upload a Primary Image.
- **Putting a product on sale:** Enter the old, higher price into the "Original Price" field, and enter the active sale price into the "Base Price" field. The website will automatically cross out the old price and display a red "Save X%" tag!
- **Featuring a product:** Type "Best Seller" or "New Arrival" into the "Badge" field. This will force the product to appear in the "Top Picks" section on the homepage.
- **Managing Sizes:** Scroll down to the "Sizes (Footwear & Clothing)" section to add sizes like W28, W30, or EU 36.

### 3. How the Data Pipeline Works (For Developers)
1. You edit products in the visual admin UI at `/admin/`
2. Decap CMS saves the changes as `.json` files inside the `content/products/` directory and commits them to GitHub.
3. Vercel automatically detects the change and rebuilds the site.
4. During the build, a prebuild script (`scripts/generate-products.ts`) converts all those JSON files into a highly-optimized TypeScript file (`data/products.ts`).
5. **CRITICAL:** Never manually edit `data/products.ts`! Any manual changes will be instantly overwritten the next time the site builds. If you want to manually edit data without the CMS, edit the JSON files in `content/products/`.

## 🔐 Admin Panel (Decap CMS)

This store includes a built-in admin panel powered by **Decap CMS** (formerly Netlify CMS). It lets you add/edit products and upload images through a visual UI — **no database required**. All changes are saved as JSON files in the repo, and images go to `public/images/`.

### How It Works
1. You edit products in the admin UI at `/admin/`
2. Decap CMS saves the changes as JSON files in `content/products/` and commits to GitHub
3. Vercel auto-rebuilds the site
4. A prebuild script (`scripts/generate-products.ts`) regenerates `data/products.ts` from the JSON files
5. The new product appears on the live site

### Local Development (Testing the Admin)

1. **Start the Decap CMS local server** in a separate terminal:
   ```bash
   npx decap-server
   ```
2. **Start the Next.js dev server** in another terminal:
   ```bash
   npm run dev
   ```
3. **Open the admin panel:**
   ```
   http://localhost:3000/admin/
   ```
4. You should see the CMS with all products and testimonials listed. You can edit them and changes will be saved to the local `content/` directory. No GitHub login needed in local mode.

### Production Setup (Deploying to Vercel)

When you're ready to deploy, you need to set up GitHub OAuth so the admin can authenticate:

**Step 1: Create a GitHub OAuth App**
1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Application name: `Marjaan Collection CMS`
3. Homepage URL: `https://your-domain.com`
4. Authorization callback URL: `https://your-domain.com/api/decap-auth`
5. Copy the **Client ID** and generate a **Client Secret**

**Step 2: Set Environment Variables in Vercel**
Go to your Vercel project → Settings → Environment Variables and add:
- `OAUTH_GITHUB_CLIENT_ID` = your Client ID
- `OAUTH_GITHUB_CLIENT_SECRET` = your Client Secret
- `OAUTH_REDIRECT_URI` = `https://your-domain.com/api/decap-auth`

**Step 3: Access the Admin Panel**
Navigate to `https://your-domain.com/admin/` and log in with GitHub.

### Who Can Access the CMS?
- **Only invited repository collaborators** can log in and access the CMS, because this is a private repository.
- To add an admin: GitHub → Repo Settings → Collaborators → Add people
- To remove access: Remove them as a collaborator

### Managing Products via CMS vs. Manual Editing
- **Via CMS (recommended):** Use the admin UI at `/admin/` — changes are saved as JSON files in `content/products/`
- **Manual editing:** You can still edit the JSON files directly in `content/products/` — the prebuild script will pick them up
- **Do NOT edit** `data/products.ts` or `data/testimonials.ts` directly — they are auto-generated!

---
**Built by Haseeb** | [muhammadhaseebhassan23@gmail.com](mailto:muhammadhaseebhassan23@gmail.com)
