# Greddit: Professional Social Media & Community Platform

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://greddit-i2ndrp7ez-greddit.vercel.app/)


![Project Banner](./coverimage.jpg)

## 🌐 Introduction

**Greddit** is a comprehensive, full-stack social networking solution engineered to facilitate community-driven content sharing and engagement. Inspired by the architectural pillars of Reddit, the platform provides a scalable environment for users to create, categorize, and interact with diverse media content. 

Built with the **MERN** stack (MongoDB, Express, React, Node.js), Greddit emphasizes security via stateless authentication, high-performance data modeling, and a premium, responsive user interface.

**🚀 [Live Deployment Link](https://greddit-i2ndrp7ez-greddit.vercel.app/)**

---

## 📑 Table of Contents

- [Features](#-features)
  - [User Capabilities](#user-capabilities)
  - [Administrative Control](#administrative-control)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Installation & Deployment](#-installation--deployment)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Setup](#step-by-step-setup)
- [API Documentation](#-api-documentation)
- [Security Implementation](#-security-implementation)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### User Capabilities
- **Stateless Authentication**: Robust login and registration system utilizing **JSON Web Tokens (JWT)** and **Bcrypt.js** encryption.
- **Content Management**: Full lifecycle support for posts (Create, Read, Like, Comment) with support for rich text and media URLs.
- **Categorization (Subgreddits)**: Multidimensional tagging system allowing content filtering by niche interests (Sports, Gaming, News, Tech, etc.).
- **Social Graph**: Interactive follow/unfollow system enabling users to curate their personalized feed.
- **Discovery Engine**: Optimized search functionality across users, posts, and communities.
- **Dynamic Profiles**: Visual user dashboards showcasing activity logs, bios, and social metrics.

### Administrative Control
- **Centralized Moderation**: A dedicated administrative portal for platform governance.
- **Content Auditing**: Real-time tools to identify, evaluate, and purge non-compliant content.
- **System Integrity**: Hardcoded administrative protocols ensuring secure initial setup and recovery.

---

## 🛠️ Tech Stack

### Frontend Ecosystem
- **Core**: [React.js](https://reactjs.org/) (Functional Components, Hooks)
- **Navigation**: [React Router v7](https://reactrouter.com/)
- **State**: React Context API (Auth Persistence)
- **Styling**: Premium Vanilla CSS System (Responsive, Dark-Mode optimized)
- **HTTP Client**: [Axios](https://axios-http.com/) with Interceptors

### Backend Ecosystem
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL)
- **ORM/ODM**: [Mongoose](https://mongoosejs.com/)
- **Security**: JWT, Bcryptjs, CORS

---

## 📂 System Architecture

The project follows a decoupled client-server architecture, promoting separation of concerns and maintainability.

```text
Greddit/
├── backend/                # RESTful API Server
│   ├── src/
│   │   ├── controllers/    # Request handling & Entity logic
│   │   ├── models/         # Mongoose Schemas & Data Validation
│   │   ├── routes/         # Express Router Endpoint definitions
│   │   ├── middleware/     # Auth Guards & Security layers
│   │   └── server.js       # Core Server Initialization
│   └── scripts/            # Database Seeding & Admin Utilities
└── frontend/               # Single Page Application (SPA)
    ├── src/
    │   ├── pages/          # High-level View Components
    │   ├── components/     # Reusable Atomic UI Elements
    │   ├── context/        # Global Auth & State Management
    │   └── Stylesheets/    # Modular CSS Design Tokens
```

---

## 🚀 Installation & Deployment

### Prerequisites
- **Node.js** v16.0.0 or higher
- **MongoDB** (Local instance or MongoDB Atlas)
- **npm** (Node Package Manager)

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/jakeer-hussain/Greddit.git
cd Greddit
```

#### 2. Backend Infrastructure
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/greddit
JWT_SECRET=your_super_secret_key_123
```
Launch the API server:
```bash
npm run dev
```

#### 3. Frontend Interface
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend/` directory:
```env
REACT_APP_API_URL=http://localhost:8000
```
Launch the development server:
```bash
npm start
```

---

## 🔐 Security Implementation
Greddit employs a multi-layered security approach:
- **Authentication**: JWT-based stateless sessions prevent session hijacking.
- **Passwords**: One-way cryptographic hashing via Bcrypt.js with individual salts.
- **Resource Protection**: Middleware-level authorization checks on all sensitive API endpoints.
- **CORS Handling**: Strict Cross-Origin Resource Sharing policies to prevent unauthorized domain access.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

---

## 📧 Contact
**Jakeer Hussain** - [GitHub Profile](https://github.com/jakeer-hussain)

Project Link: [https://github.com/jakeer-hussain/Greddit](https://github.com/jakeer-hussain/Greddit)

---
