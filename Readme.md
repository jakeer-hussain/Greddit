# Greddit - A Social Media Post Sharing Platform

Greddit is a full-stack social media application inspired by Reddit, where users can create posts, categorize them with tags, follow other users, and engage through likes and comments. It also features a robust Administrative system for content management.

![](./coverimage.jpg)

## 🚀 Features

### User Features
- **User Authentication**: Secure registration and login using JWT and Bcrypt.
- **Post Sharing**: Create posts with titles, content, images, and interest-based tags.
- **Engagement**: Like posts and leave comments on interesting content.
- **Subgreddit**: Explore content filtered by specific categories (Sports, Movies, Technology, Gaming, News, Music).
- **Global Search**: Search for users and posts across the entire platform.
- **User Profiles**: View profiles, bios, and follow/unfollow other users.

### Administrative Features
- **Admin Role**: Specialized access for site administrators.
- **Admin Dashboard**: Dedicated interface to search for any post and delete inappropriate content.
- **Admin Credentials**: Hardcoded secure access for quick setup (`admin`/`admin`).

## 🛠️ Tech Stack

### Frontend
- **React**: Modern UI components.
- **React Router**: Seamless client-side navigation.
- **Axios**: API communication.
- **Vanilla CSS**: Premium, dark-themed responsive design.

### Backend
- **Node.js**: Server-side runtime.
- **Express**: Lightweight web framework.
- **MongoDB & Mongoose**: Flexible NoSQL database and ORM.
- **JWT**: Secure stateless authentication.

## 📦 Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/jakeer-hussain/cloning.git
cd cloning
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_API_URL=http://localhost:8000
```

Run the frontend:
```bash
npm start
```

## 🔐 Credentials
- **Regular User**: Register via the signup page.
- **Admin Access**: 
  - Username: `admin`
  - Password: `admin`

## 📂 Project Structure
```
cloning/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route logic
│   │   ├── models/        # Database schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth & protection
│   │   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── pages/         # React Views
│   │   ├── context/       # State management (Auth)
│   │   ├── components/    # Reusable UI
│   │   └── utils/         # API configurations
```

---
Built with ❤️ by Jakeer Hussain