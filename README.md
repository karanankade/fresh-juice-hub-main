# 🍹 Nath Krupa Raswanti Gruh — Fresh Juice Hub

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for **Nath Krupa Raswanti Gruh** — a fresh sugarcane juice shop in Dudulgaon, Pune, owned by **Rushikesh Borade**.

---

## 📁 Project Structure

```
fresh-juice-hub-main/
├── client/                   # React + Vite + TypeScript frontend
│   ├── public/               # Static assets (favicon, robots.txt)
│   ├── src/
│   │   ├── assets/           # Images (hero, juice photos)
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # shadcn/ui base components
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── StatusBar.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Index.tsx         # Public homepage
│   │   │   ├── AdminLogin.tsx    # Admin login page
│   │   │   ├── AdminSignup.tsx   # Admin signup (one-time only)
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── NotFound.tsx
│   │   ├── lib/
│   │   │   ├── api.ts            # Axios instance with JWT interceptor
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                   # Node.js + Express + MongoDB backend
│   ├── models/
│   │   ├── Admin.js          # Admin credentials
│   │   ├── Blog.js           # Blog posts
│   │   ├── Gallery.js        # Gallery media
│   │   ├── Review.js         # Customer reviews
│   │   └── Message.js        # Contact messages
│   ├── routes/
│   │   ├── auth.js           # Signup / Login
│   │   ├── blogs.js          # Blog CRUD
│   │   ├── gallery.js        # Gallery upload/delete
│   │   ├── reviews.js        # Reviews CRUD + approve
│   │   └── messages.js       # Messages CRUD + mark read
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── uploads/              # Uploaded gallery files (auto-created)
│   ├── index.js              # Express app entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── .gitignore
├── package.json              # Root scripts to run both client & server
└── README.md
```

---

## ⚙️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, TypeScript, Vite              |
| Styling   | Tailwind CSS, shadcn/ui, Framer Motion  |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB + Mongoose                      |
| Auth      | JWT (jsonwebtoken) + bcryptjs           |
| HTTP      | Axios (with Vite proxy)                 |
| Uploads   | Multer (image/video, max 8MB)           |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)
- npm

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/fresh-juice-hub.git
cd fresh-juice-hub
```

---

### 2. Setup Server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fresh-juice-hub
JWT_SECRET=your_super_secret_jwt_key_change_this
```

---

### 3. Setup Client

```bash
cd client
npm install --legacy-peer-deps
```

---

### 4. Run the Project

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

| Service  | URL                          |
|----------|------------------------------|
| Frontend | http://localhost:8080         |
| Backend  | http://localhost:5000         |
| Admin    | http://localhost:8080/admin-login |

---

## 🔐 Admin Authentication

### First Time Setup
1. Go to `http://localhost:8080/admin-signup`
2. Create your admin account (email + password)
3. Only **one admin account** is allowed — signup is permanently blocked after the first account is created

### Login
- Go to `http://localhost:8080/admin-login`
- Enter your email and password
- JWT token is stored in `localStorage` and expires in **8 hours**

---

## 🛠️ Admin Dashboard Features

| Tab       | Features                                              |
|-----------|-------------------------------------------------------|
| Blogs     | Add blogs (title, category, excerpt, content), delete |
| Gallery   | Upload images/videos (max 8MB), delete                |
| Reviews   | Approve/unapprove customer reviews, delete            |
| Messages  | View contact messages, mark as read, delete           |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint               | Access | Description                  |
|--------|------------------------|--------|------------------------------|
| GET    | /api/auth/can-signup   | Public | Check if signup is allowed   |
| POST   | /api/auth/signup       | Public | Create admin account (once)  |
| POST   | /api/auth/login        | Public | Login, returns JWT token     |

### Blogs
| Method | Endpoint        | Access | Description       |
|--------|-----------------|--------|-------------------|
| GET    | /api/blogs      | Public | Get all blogs     |
| POST   | /api/blogs      | Admin  | Create a blog     |
| DELETE | /api/blogs/:id  | Admin  | Delete a blog     |

### Gallery
| Method | Endpoint           | Access | Description              |
|--------|--------------------|--------|--------------------------|
| GET    | /api/gallery       | Public | Get all gallery items    |
| POST   | /api/gallery       | Admin  | Upload images/videos     |
| DELETE | /api/gallery/:id   | Admin  | Delete a gallery item    |

### Reviews
| Method | Endpoint                  | Access | Description              |
|--------|---------------------------|--------|--------------------------|
| GET    | /api/reviews              | Public | Get approved reviews     |
| GET    | /api/reviews/all          | Admin  | Get all reviews          |
| POST   | /api/reviews              | Public | Submit a review          |
| PATCH  | /api/reviews/:id/approve  | Admin  | Toggle approve/unapprove |
| DELETE | /api/reviews/:id          | Admin  | Delete a review          |

### Messages
| Method | Endpoint                  | Access | Description           |
|--------|---------------------------|--------|-----------------------|
| POST   | /api/messages             | Public | Send a message        |
| GET    | /api/messages             | Admin  | Get all messages      |
| PATCH  | /api/messages/:id/read    | Admin  | Mark message as read  |
| DELETE | /api/messages/:id         | Admin  | Delete a message      |

---

## 🏪 Public Website Sections

| Section   | Description                                      |
|-----------|--------------------------------------------------|
| Hero      | Banner with Visit Us & WhatsApp Order buttons    |
| About     | Shop highlights — Natural, Hygienic, Quick       |
| Reviews   | Approved customer reviews + submit review form   |
| Blog      | Blog posts from admin + WhatsApp share           |
| Gallery   | Photo/video gallery uploaded by admin            |
| Contact   | Location, phone, WhatsApp + contact form         |

---

## 📞 Business Info

- **Shop:** Nath Krupa Raswanti Gruh
- **Owner:** Rushikesh Borade
- **Phone:** +91 77220 59126
- **Location:** MVFM+W3G, Talekar Nagar, Dudulgaon, Pune, Maharashtra 412105
- **Hours:** 9:00 AM – 9:00 PM

---

## 📝 Environment Variables

### `server/.env`

| Variable    | Description                        | Example                                      |
|-------------|------------------------------------|----------------------------------------------|
| PORT        | Express server port                | 5000                                         |
| MONGO_URI   | MongoDB connection string          | mongodb://localhost:27017/fresh-juice-hub    |
| JWT_SECRET  | Secret key for signing JWT tokens  | your_super_secret_key                        |

---

## 🔒 Security Features

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- Routes protected with **JWT middleware**
- Only **one admin account** allowed in the system
- File uploads restricted to **image/video only**, max **8MB**
- Path traversal protection on file uploads
- Auto logout on **401 Unauthorized** response
- CORS restricted to frontend origin only

---

## 👤 Author

Built and maintained by **Rushikesh Borade**
