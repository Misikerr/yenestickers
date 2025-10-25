# YeneStickers – Full Project Documentation (for technical showcase)

This document explains the full stack, dependencies, file structure, pages/components, API design, environment setup, and operational flow of the YeneStickers e‑commerce platform. Use it for a technical presentation to a developer/teacher audience.

- Repository: `yenestickers`
- Apps: `frontend` (customer), `backend` (API), `admin` (dashboard)
- Tech: React 19 + Vite, Node.js + Express 5, MongoDB + Mongoose 8, Cloudinary, TailwindCSS 3

---

## 1) Architecture overview

```
┌─────────────────────────┐        ┌──────────────────────────┐        ┌───────────────────────────┐
│        Frontend         │  HTTP  │          Backend          │  DB    │         MongoDB           │
│  React 19 + Vite + PWA  │◄──────►│  Express 5 + JWT + Multer │◄──────►│  Mongoose models          │
│  TailwindCSS, React-Router│      │  Cloudinary image upload  │        │  (user/product/order)     │
└─────────────▲───────────┘        └──────────────▲───────────┘        └──────────▲────────────────┘
              │                                    │                                     │
              │                                    │                                     │
              │                            ┌───────┴────────┐                             │
              │                            │    Admin UI    │  Auth (admin JWT)           │
              └────────────────────────────│ React + Vite   │─────────────────────────────┘
                                           └────────────────┘
```

Key flows:
- Customers browse products, add to cart, and place orders with payment proof (screenshot) upload.
- Admins add/remove products, list products, update order statuses, and remove orders.
- Images are stored in Cloudinary; metadata and data live in MongoDB.

---

## 2) Monorepo structure (annotated)

```
yenestickers/
├─ admin/                  # React (Vite) admin dashboard
│  ├─ src/
│  │  ├─ components/       # Navbar, Sidebar, Login
│  │  ├─ pages/            # Add (product), List (products), Orders (orders)
│  │  ├─ App.jsx, main.jsx # Routing and app boot
│  ├─ package.json         # axios, react, react-router-dom, react-toastify
│  └─ ...                  # Tailwind, Vite configs
│
├─ backend/                # Node.js Express API
│  ├─ server.js            # Express app setup and route mounting
│  ├─ config/              # DB and Cloudinary connectors
│  │  ├─ mongodb.js        # connectDB()
│  │  └─ cloudinary.js     # connectCloudinary()
│  ├─ models/              # Mongoose models: user/product/order
│  ├─ controllers/         # Route handlers
│  ├─ routes/              # Express Routers (user/product/cart/order)
│  ├─ middleware/          # authUser, adminAuth, multer
│  ├─ package.json         # express, mongoose, cloudinary, jwt, multer, bcrypt
│  └─ ERROR_HANDLING.md    # (placeholder)
│
├─ frontend/               # React (Vite) customer app
│  ├─ src/
│  │  ├─ context/          # ShopContext (global state, API calls)
│  │  ├─ pages/            # Home, Collection, Product, Cart, Login, PlaceOrder, Orders, About, Contact
│  │  ├─ components/       # Navbar, SearchBar, ProductItem, CartTotal, RelatedProducts, Loader, etc.
│  │  ├─ App.jsx, main.jsx # Routing and app boot
│  ├─ public/manifest.webmanifest # PWA
│  ├─ package.json         # axios, react, react-router-dom, tailwind
│  └─ ...                  # Tailwind, Vite configs
│
├─ README.md               # Project overview (short)
└─ PROJECT_DOCUMENTATION.md# This detailed document
```

---

## 3) Dependency inventory (versions)

### Backend (`backend/package.json`)
- express ^5.1.0
- mongoose ^8.18.2
- mongodb 5.5
- jsonwebtoken ^9.0.2
- bcrypt ^6.0.0
- multer ^2.0.2
- cloudinary ^2.7.0
- cors ^2.8.5
- dotenv ^17.2.2
- validator ^13.15.15
- stripe ^18.5.0 (not wired yet)
- razorpay ^2.9.6 (not wired yet)
- nodemon ^3.1.10 (dev)

Scripts:
- start: node server.js
- server: nodemon server.js

### Frontend (`frontend/package.json`)
- react ^19.1.0, react-dom ^19.1.0
- react-router-dom ^7.9.1
- axios ^1.12.2
- react-icons ^5.5.0
- react-toastify ^11.0.5
- tailwindcss ^3.4.17, @tailwindcss/vite ^4.1.13, postcss ^8.5.6
- vite ^6.3.5, @vitejs/plugin-react ^4.4.1
- eslint 9.x stack (optional dev)

Scripts:
- dev | build | preview | lint

### Admin (`admin/package.json`)
- react ^19.1.1, react-dom ^19.1.1
- react-router-dom ^7.9.2
- axios ^1.12.2
- react-toastify ^11.0.5
- tailwindcss ^3.4.17, vite ^7.1.7, @vitejs/plugin-react ^5.0.3
- eslint 9.x stack (optional dev)

Scripts:
- dev | build | preview | lint

---

## 4) Environment variables

Backend `.env` (required):

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017        # code appends /e-commerce
JWT_SECRET=replace_with_long_random_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong_admin_password
```

Frontend/Admin `.env` (Vite):

```
VITE_BACKEND_URL=http://localhost:4000
```

Notes:
- `backend/config/mongodb.js` connects to `${MONGODB_URI}/e-commerce`.
- Admin auth uses a special token: `jwt.sign(email + password, JWT_SECRET)` and middleware checks it equals `ADMIN_EMAIL + ADMIN_PASSWORD` after verifying the signature. Documented as-is; for production consider role‑based users instead.

---

## 5) Backend — server boot and configuration

- `backend/server.js`
  - Loads env (`import 'dotenv/config'`).
  - Connects to Mongo (`connectDB()`), Cloudinary (`connectCloudinary()`).
  - Sets `express.json()`, `cors()`.
  - Mounts routers:
    - `/api/user` → `routes/userRoute.js`
    - `/api/product` → `routes/productRoute.js`
    - `/api/cart` → `routes/cartRoute.js`
    - `/api/order` → `routes/orderRoute.js`

### Config
- `config/mongodb.js`: establishes connection and logs on `connected`.
- `config/cloudinary.js`: configures Cloudinary v2 SDK with keys.

### Middleware
- `middleware/auth.js` (authUser):
  - Reads `token` from headers; `jwt.verify(token, JWT_SECRET)` → injects `req.body.userId` and `req.userId`.
- `middleware/adminAuth.js`:
  - Reads `token` from headers; verifies; compares payload to `ADMIN_EMAIL + ADMIN_PASSWORD`.
- `middleware/multer.js`:
  - Disk storage with original filename; used for image uploads and payment screenshot.

### Models (Mongoose)
- `models/userModel.js`:
  - name, email (unique), password (hash), cartData (Object, default `{}`, `minimize:false`).
- `models/productModel.js`:
  - name, description, price (Number), image (Array of URLs), category, sizes (Array), date (Number timestamp).
- `models/orderModel.js`:
  - userId, items (Array of product snapshots with quantity/size), amount, address (Object incl. delivery option and paymentProofUrl), status (default "Order Placed"), paymentMethod, payment (Boolean), date.

### Controllers and routes

Authentication (`routes/userRoute.js` → `controllers/userController.js`):
- POST `/api/user/register`
  - body: { name, email, password }
  - Validates email and min password length 8, hashes with bcrypt, returns `{success, token}`.
- POST `/api/user/login`
  - body: { email, password }
  - Compares bcrypt hash, returns `{success, token}` if valid.
- POST `/api/user/admin`
  - body: { email, password }
  - On match with ADMIN creds, returns signed admin token.

Products (`routes/productRoute.js` → `controllers/productController.js`):
- POST `/api/product/add` (adminAuth + `upload.fields([image1..image4])`)
  - Uploads up to 4 images to Cloudinary; stores URLs.
  - Auto‑derives `sizes` and base `price` by `category`:
    - LaptopSkin → sizes [13",14",15"], base price 500
    - Others (stickers) → sizes [Tiny,Small,Large], base price 40 (detailed sticker unit pricing at cart time)
- POST `/api/product/remove` (adminAuth)
  - body: { id }
- POST `/api/product/single`
  - body: { productId }
  - Returns product document.
- GET `/api/product/list`
  - Returns all products (UI sorts by `date` desc).
- POST `/api/product/price-cart`
  - body: `{ cartItems: { [productId]: { [size]: qty } } }`
  - Computes per‑line prices server‑side; for stickers uses tiered discounts:
    - Tiny: 35 ETB, Small: 40 ETB, Large: 45 ETB base
    - 5+ per size → 10% (Small: 7.5%)
    - 10+ per size → 20% (Small: 15%)
  - Returns `{ success, subtotal, lines: [{productId,name,image,size,qty,unitBase,discountPercent,unitAfter,lineTotal}] }`.

Cart (`routes/cartRoute.js` → `controllers/cartController.js`) [authUser]:
- POST `/api/cart/add` → `{ itemId, size }` increments quantity in `user.cartData`.
- POST `/api/cart/update` → `{ itemId, size, quantity }` sets explicit quantity (can be 0 to remove).
- POST `/api/cart/get` → returns `{ cartData }` stored for the user.

Orders (`routes/orderRoute.js` → `controllers/orderController.js`):
- POST `/api/order/place` [authUser + `upload.single('screenshot')`]
  - Accepts multipart form with fields:
    - `screenshot` (file), `address` (JSON), `items` (JSON), `amount` (string), `paymentMethod` (string)
  - Uploads screenshot to Cloudinary; stores url under `address.paymentProofUrl`.
  - Empties user cart post‑order.
- POST `/api/order/userorders` [authUser]
  - Returns user’s orders.
- POST `/api/order/list` [adminAuth]
  - Returns all orders for admin.
- POST `/api/order/status` [adminAuth]
  - body: { orderId, status } → updates order status.
- POST `/api/order/remove` [adminAuth]
  - body: { orderId } → deletes order.

Error contract: API returns JSON with `{ success: boolean, message?: string, ...data }` and logs server errors. Clients surface `message` via toasts.

---

## 6) Frontend (customer app) — routes, state, components

Entry: `frontend/src/App.jsx` with routes and layout (Navbar, SearchBar, InstallPwaBanner, Footer).

Routes:
- `/` → `pages/Home.jsx`
  - Sections: `Hero`, `HowToOrder`, `PricingCards`, `DiscountBanner`, `DeliveryInfo`, `OurPolicy`.
- `/shop` → `pages/Collection.jsx`
  - Filters by category and name; sorts newest first; lazy “Show more”; robust scroll position save/restore across navigation.
- `/product/:productId` → `pages/Product.jsx`
  - Gallery with thumbnails; size selection; `addToCart(productId,size)`; shows `RelatedProducts` by category/subCategory.
- `/cart` → `pages/Cart.jsx`
  - Renders cart lines with server‑priced `unitAfter` and discount badges; allows quantity updates/removal; minimum checkout guard (100 ETB).
- `/login` → `pages/Login.jsx`
  - Toggle Sign in / Sign up; persists JWT `token` in localStorage.
- `/place-order` → `pages/PlaceOrder.jsx`
  - Captures address, delivery option (standard/express/pickup), notes; payment method (CBE/Telebirr); requires screenshot; posts multipart to `/api/order/place`.
- `/orders` → `pages/Orders.jsx`
  - Lists user order items with status; requires auth (redirects if unauthenticated).
- `/about` → `pages/About.jsx`; `/contact` → `pages/Contact.jsx` (Formspree contact form + social links).

Global state: `frontend/src/context/ShopContext.jsx`
- Values:
  - `products`, `loadingProducts`, `search`, `showSearch`
  - `cartItems` (shape `{[id]: {[size]: qty}}`), `token`, `currency='ETB '`, `delivery_fee=30`
  - `serverPricing` from `/api/product/price-cart`
- Methods:
  - `getProductsData()`, `getUserCart(token)`
  - `addToCart(id,size)`, `updateQuantity(id,size,qty)`, `getCartCount()`
  - `priceCartServer()`, `getCartAmount()` (uses serverPricing.subtotal)
- Effects:
  - Load products on mount; hydrate auth/cart from localStorage; reprices cart when items/products change.

Key components:
- `Navbar`: theme toggle (dark/light), auth dropdown (Orders/Logout), cart badge, mobile menu.
- `SearchBar`: sticky search visible on `/shop` only.
- `InstallPwaBanner`: prompts PWA install using `beforeinstallprompt`.
- `ProductItem`: product card linking to detail page.
- `CartTotal`: totals with optional shipping.
- `RelatedProducts`: grid with “show more”, filtered by category/subCategory.
- Plus UI sections: `Hero`, `HowToOrder`, `PricingCards`, `DiscountBanner`, `DeliveryInfo`, `OurPolicy`, `Footer`.

PWA: `public/manifest.webmanifest` present; `InstallPwaBanner` surfaces install prompt.

---

### 6.1) How frontend pages connect + HTTP methods used

High‑level navigation flow:

```
Home (/) ──▶ Shop (/shop) ──▶ Product (/product/:id) ──▶ Cart (/cart)
                                              │
                                              ├─ addToCart (requires size)
                                              ▼
                                   (if subtotal ≥ 100 ETB)
Cart ──▶ (if not logged in) Login (/login)
   │
   └─▶ Place Order (/place-order) ──▶ POST /api/order/place ──▶ Orders (/orders)

Navbar profile menu (if logged in) ──▶ Orders (/orders)
```

When and what the frontend calls (HTTP methods):

- App boot / data hydration
  - GET `/api/product/list` on mount to load catalog (Collection page and context)
  - POST `/api/cart/get` when a stored `token` exists (hydrate cart)
  - POST `/api/product/price-cart` whenever cart or product list changes (server‑priced totals)

- Collection (/shop)
  - Uses products from context (from GET `/api/product/list`)
  - Triggers POST `/api/product/price-cart` via context effect when cart changes

- Product (/product/:productId)
  - Local lookup from loaded products (no HTTP for product detail)
  - On Add to Cart:
    - If logged in: POST `/api/cart/add` with `{ itemId, size }`
    - Always updates local cart first (optimistic UI)

- Cart (/cart)
  - Displays `serverPricing.lines` from POST `/api/product/price-cart`
  - Quantity change: POST `/api/cart/update` `{ itemId, size, quantity }`
  - Remove item: same update API with quantity 0
  - Proceed to checkout: navigates to `/place-order` (requires subtotal ≥ 100 ETB and login)

- Login (/login)
  - Sign Up: POST `/api/user/register` `{ name, email, password }`
  - Sign In: POST `/api/user/login` `{ email, password }`
  - On success: save `token`, navigate to `/`

- Place Order (/place-order)
  - Submit: multipart/form-data → POST `/api/order/place` with fields:
    - `screenshot` (file), `address` (JSON), `items` (JSON), `amount` (string), `paymentMethod` (string)
  - On success: clear cart and navigate to `/orders`

- Orders (/orders)
  - POST `/api/order/userorders` to fetch the user’s orders

- About/Contact
  - About: no API
  - Contact: posts to external Formspree endpoint (not the backend)

## 7) Admin app — pages and flows

Entry: `admin/src/App.jsx` stores admin token in localStorage, gates routes.

Pages:
- `pages/Add.jsx` (admin token required)
  - FormData upload for product: name, description, category; up to 4 images (`image1..image4`).
- `pages/List.jsx`
  - Fetches `/api/product/list`; sorted by newest; remove product via `/api/product/remove`.
- `pages/Orders.jsx`
  - Fetches `/api/order/list`; shows items, address, proof thumbnail; update status via `/api/order/status`; remove order via `/api/order/remove`.

Components:
- `components/Login.jsx`: posts to `/api/user/admin` to obtain admin token.
- `components/Navbar.jsx`: shows logo and Logout.
- `components/Sidebar.jsx`: nav links (Add/List/Orders).

---

### 7.1) How admin pages connect + HTTP methods used

Admin navigation and calls:

```
Login (POST /api/user/admin) ──▶ token ──▶ Admin routes

Add page ──▶ multipart POST /api/product/add (adminAuth)

List page ──▶ GET /api/product/list
            └─▶ Remove product: POST /api/product/remove { id } (adminAuth)

Orders page ──▶ POST /api/order/list (adminAuth)
              ├─▶ Update status: POST /api/order/status { orderId, status } (adminAuth)
              └─▶ Remove order:  POST /api/order/remove { orderId } (adminAuth)
```

Notes:
- All admin-protected routes require `headers: { token }` returned by `/api/user/admin`.
- Backend root `GET /` responds with “API Working” (health check).

## 8) Running locally (Windows PowerShell)

Prerequisites:
- Node.js 18+
- MongoDB running locally (or Atlas URI in `MONGODB_URI`)
- Cloudinary account and keys

Setup steps:

```powershell
# 1) Backend API
cd backend
npm install
# Create .env (see section 4) then:
npm run server  # starts on PORT (default 4000)
```

```powershell
# 2) Frontend (customer app)
cd ..\frontend
npm install
# .env: VITE_BACKEND_URL=http://localhost:4000
npm run dev  # default http://localhost:5173
```

```powershell
# 3) Admin dashboard
cd ..\admin
npm install
# .env: VITE_BACKEND_URL=http://localhost:4000
npm run dev  # default http://localhost:5173 or 5174 depending on port
```

Useful URLs:
- Frontend: http://localhost:5173
- Admin: http://localhost:5174 (or whichever Vite dev port)
- Backend: http://localhost:4000 (GET `/` → "API Working")

---

## 9) API quick reference (with samples)

Auth
- Register: `POST /api/user/register` `{ name, email, password }` → `{ success, token }`
- Login: `POST /api/user/login` `{ email, password }` → `{ success, token }`
- Admin login: `POST /api/user/admin` `{ email, password }` → `{ success, token }`

Products
- List: `GET /api/product/list` → `{ success, products: [...] }`
- Single: `POST /api/product/single` `{ productId }`
- Add (admin): `POST /api/product/add` (multipart, images image1..image4, header `token`)
- Remove (admin): `POST /api/product/remove` `{ id }`
- Server price: `POST /api/product/price-cart` `{ cartItems }` → `{ subtotal, lines[] }`

Cart (auth header `token`)
- Add: `POST /api/cart/add` `{ itemId, size }`
- Update: `POST /api/cart/update` `{ itemId, size, quantity }`
- Get: `POST /api/cart/get`

Orders
- Place (auth): `POST /api/order/place` multipart (fields: screenshot, address JSON, items JSON, amount, paymentMethod)
- My orders (auth): `POST /api/order/userorders`
- Admin list/status/remove (admin token):
  - `POST /api/order/list`
  - `POST /api/order/status` `{ orderId, status }`
  - `POST /api/order/remove` `{ orderId }`

Response pattern: `{ success: boolean, message?: string, ...data }`.

---

## 10) Data contracts (selected)

Product (DB):
```
{
  _id, name, description, category, price, sizes: string[], image: string[], date: number
}
```

Cart (client state and price-cart input):
```
{
  [productId]: { [size]: number }
}
```

Price-cart response:
```
{
  success: true,
  subtotal: number,
  lines: [
    { productId, name, image, size, qty, unitBase, discountPercent, unitAfter, lineTotal }
  ]
}
```

Order (DB):
```
{
  userId, items: Array<productSnapshot & { size, quantity }>,
  amount, address: { fullName, phone, address, deliveryOption, notes, paymentProofUrl },
  status, paymentMethod, payment, date
}
```

---

## 11) Notable design choices and teacher notes

- Express 5 (latest) and Mongoose 8 are used; middleware and routers follow modern ESM (`type: module`).
- Pricing logic for stickers is centralized on the server (`/price-cart`) to avoid client tampering; frontend displays server‑computed discounts.
- Admin authentication is a minimal token check; for production, consider:
  - Add admin users/roles in DB with bcrypt hashes
  - Short‑lived JWTs with refresh, CORS tightening, HTTPS only cookies
- File uploads use Multer (disk) → uploaded to Cloudinary; backend retains only URLs.
- Frontend UX details: scroll restoration in Collection, sticky search on shop page, PWA install prompt, dark/light theme.
- Minimum checkout enforced in UI (>= 100 ETB) with helper messages for smaller orders.

---

## 12) Linting, builds, and quality gates

- Frontend/Admin: ESLint configs included; Tailwind and Vite configs present.
- Backend: no tests yet; consider adding integration tests for controllers.
- Build status: each app builds independently with `vite build` (frontend/admin) and `node server.js` (backend).

---

## 13) Future improvements

- Real payment gateways (Stripe/Razorpay) wiring or local providers’ SDKs where available.
- Robust admin auth & RBAC; audit trails for status changes.
- Rate limiting and request validation (zod/joi) at API boundaries.
- Image transformations and size limits at upload time.
- Pagination/infinite scroll and server‑side filtering for large catalogs.
- E2E tests (Playwright) and API tests (Vitest/Jest + Supertest).

---

Prepared for: University tech community showcase — focuses on clarity, completeness, and code‑accurate mapping to this repository.
