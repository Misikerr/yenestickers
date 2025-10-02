# 🎨 የኔ Stickers - Premium Sticker E-commerce Platform

<div align="center">

**Transform your world with 1000+ unique stickers and premium laptop skins!**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-yenestickers.store-purple?style=for-the-badge)](https://yenestickers.store)
[![Telegram](https://img.shields.io/badge/💬_Custom_Orders-@YeneStickerGuy-0088cc?style=for-the-badge&logo=telegram)](https://t.me/YeneStickerGuy)

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=flat-square&logo=tailwindcss)

</div>

## 🌟 Overview

**የኔ Stickers** is a modern, full-stack e-commerce platform specializing in high-quality stickers and laptop skins. Built for the Ethiopian market with local payment methods and delivery options.

### ✨ Key Features
- 🎯 **1000+ Unique Designs** - Anime, memes, tech, nature, and more
- 🌍 **Ethiopian Payment Methods** - CBE Mobile Banking & Telebirr
- 📱 **Progressive Web App** - Install on mobile/desktop
- 🎨 **Modern UI/UX** - Dark/light theme with responsive design
- 🔐 **Secure Authentication** - JWT-based user system
- 📦 **Smart Cart Management** - Persistent cart with server pricing

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🎨 Frontend   │    │   ⚙️ Backend    │    │   🔧 Admin      │
│   React 19      │◄──►│   Node.js       │◄──►│   React Admin   │
│   TailwindCSS   │    │   MongoDB       │    │   Dashboard     │
│   PWA Ready     │    │   Cloudinary    │    │   Management    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 19** - Latest React with concurrent features
- 🚀 **Vite** - Lightning-fast build tool
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🛣️ **React Router** - Client-side routing
- 📱 **PWA Support** - Installable web app

### Backend
- 🟢 **Node.js & Express** - Server framework
- 🍃 **MongoDB** - NoSQL database with Mongoose
- ☁️ **Cloudinary** - Image storage and optimization
- 🔐 **JWT & bcrypt** - Authentication and security

## 📁 Project Structure

```
yenestickers/
├── 🎨 frontend/          # Customer React app
├── ⚙️ backend/           # Node.js API server
├── 🔧 admin/             # Admin dashboard
├── 📄 README.md          # Documentation
└── 📜 LICENSE            # MIT License
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Cloudinary account

### Setup
```bash
# Clone repository
git clone https://github.com/Misikerr/yenestickers.git
cd yenestickers

# Backend setup
cd backend
npm install
cp .env.example .env  # Configure your environment
npm run server

# Frontend setup
cd ../frontend
npm install
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
npm run dev

# Admin setup
cd ../admin
npm install
npm run dev
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Admin Panel**: http://localhost:5174

## 🎯 Core Features

### 🛒 E-commerce
- Product catalog with categories and search
- Smart cart with real-time pricing
- Streamlined checkout with payment proof upload
- Order tracking and management
- User registration and authentication

### 💳 Payment Integration
- CBE Mobile Banking support
- Telebirr payment method
- Payment screenshot verification
- Automated order confirmation

### 📱 User Experience
- Responsive design for all devices
- Dark/light theme toggle
- Progressive Web App capabilities
- Advanced filtering and search
- Pagination (25 products per page)

## 🎨 Product Categories

- 🐱 Animal & Pets
- 🎌 Anime & Manga
- 🎭 Cartoon
- 😂 Meme & Humor
- 💻 Tech & Coding
- 🎮 Gaming
- 🌿 Nature
- 🍕 Food
- ⚽ Sports & Fitness
- 🎨 Art
- 👕 Fashion & Style
- 🏗️ Architecture
- ⭕ Abstract
- 💻 Laptop Skins

## 📊 API Endpoints

```
# Authentication
POST /api/user/register    # User registration
POST /api/user/login       # User login

# Products
GET  /api/product/list     # Get all products
POST /api/product/add      # Add product (admin)

# Cart
POST /api/cart/add         # Add to cart
POST /api/cart/get         # Get user cart

# Orders
POST /api/order/place      # Place order
POST /api/order/userorders # Get user orders
```



## 🚀 Deployment

- **Frontend**: Render with Namecheap for DNS
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Images**: Cloudinary CDN

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **🌐 Website**: [yenestickers.store](https://yenestickers.store)
- **💬 Telegram**: [@YeneStickerGuy](https://t.me/YeneStickerGuy)
- **🐛 Issues**: [GitHub Issues](https://github.com/YourUsername/yenestickers/issues)

## 📜 License

MIT License - Copyright (c) 2025 Misiker_Genene

---

<div align="center">

**Made with ❤️ for the Ethiopian market**

**🌟 Star this repository if you found it helpful!**

</div>
