  TOGETHERA

> **Preserve emotions. Capture moments. Unlock memories in the future.**
>
> TOGETHERA is a digital time capsule platform built to help families and loved ones store memories—photos, videos, letters, and messages—that unlock at a meaningful moment in the future. It focuses on **emotional storytelling, privacy, and shared experiences**, making memories timeless.

🌐 **Live Demo:** [https://hacksphere-mu.vercel.app/](https://hacksphere-mu.vercel.app/)

---

## 🧠 Project Motivation

Memories fade, but emotions don’t.

MemoryLane was built with one core belief:

> *The most valuable gift we can give our future selves and loved ones is a memory filled with emotion.*

Whether it’s a message for a child’s graduation, a family video for future years, or a letter to be opened after a milestone, MemoryLane allows users to **lock emotions in time** and relive them when they matter the most.

This project emphasizes:

* ❤️ Emotional storytelling
* 👨‍👩‍👧‍👦 Family & friends bonding
* 🔐 Privacy-first memory sharing
* ⏳ Anticipation through time-based unlocks

---

## 🚀 Features

###

* **Digital Time Capsules**
  Upload text, images, audio, and videos to create personalized memory capsules.

* **Unlock Conditions**
  Capsules unlock on a specific future date or life event (e.g., graduation, wedding).

* **Recipient Assignment**
  Assign one or multiple recipients who gain access once the capsule unlocks.

* **Email Notifications**
  Automatic notifications when a capsule becomes available.

* **Themed Memory Collections**
  Organize capsules into themes like *Childhood*, *Family History*, or *College Years*.

* **Collaboration Mode**
  Multiple family members can contribute to a shared capsule.

* **Countdown Timer**
  Displays remaining time before the capsule unlocks, building anticipation.

###

* **AI Memory Assistant**
  Generate captions, summaries, or transcriptions using AI.

* **Scheduled Email Delivery**
  Full capsule content can be emailed automatically upon unlock.

* **Post-Unlock Interaction**
  Reactions, comments, and reflections after a capsule opens.

* **Privacy Controls**
  Capsules can be public, private, or limited to selected family members.

---

## 🏗️ Tech Stack

### Frontend

* **React + Vite**
* Context API for state management
* Firebase (auth / storage if enabled)
* Deployed on **Vercel**

### Backend

* **Node.js + Express**
* MongoDB (Database)
* REST APIs
* Cron jobs for scheduled unlocks & emails

---

## 📁 Project Folder Structure

```
hacksphere/
│
├── backend/
│   ├── config/          # Database & environment configuration
│   ├── controllers/    # Request handlers
│   ├── cron/           # Scheduled jobs (unlock, emails)
│   ├── middleware/     # Auth & request middlewares
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Helper utilities
│   ├── .env             # Environment variables
│   ├── server.js        # Express server entry point
│   └── package.json
│
├── public/              # Static assets
│
├── src/
│   ├── assets/          # Images & media
│   ├── component/       # Reusable UI components
│   ├── context/         # Global state & auth context
│   ├── hooks/           # Custom React hooks
│   ├── icons/           # SVG & icon files
│   ├── pages/           # Application pages
│   ├── App.jsx
│   ├── main.jsx
│   ├── firebase.js      # Firebase configuration
│   ├── ProtectedRoute.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
└── package.json
```

---

## 🔐 Authentication & Security

* Protected routes for private capsules
* Role-based access for contributors & recipients
* Secure token-based authentication

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/memorylane.git
cd hacksphere
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 3️⃣ Frontend Setup

```bash
npm install
npm run dev
```

---

## 🌍 Deployment

* **Frontend:** Vercel → [https://hacksphere-mu.vercel.app/](https://hacksphere-mu.vercel.app/)
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 🎯 Future Improvements

* Voice memories with emotion detection

---

## 🤝 Hackathon

Built with passion during **HackSphere** 🚀

This project represents the intersection of **technology and human emotion**—where code protects memories.

---

## ❤️ Final Note

> *Some memories are meant to be opened later.*
> *MemoryLane makes sure they arrive with the same emotion they were created with.*

If you like this project, ⭐ star the repo and help us preserve memories forever.
