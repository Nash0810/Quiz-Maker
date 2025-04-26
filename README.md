
# 🧠 Online Quiz Maker

An interactive online platform where users can **create** and **take quizzes** with real-time leaderboards, authentication, and performance tracking.

---

## 🎯 Objectives

- Allow creators to build quizzes with multiple-choice questions.
- Allow users to attempt quizzes and receive instant scores.
- Maintain a **Leaderboard** showcasing top scorers.
- Provide **User Authentication** (login/register) for creators.
- Offer basic **Analytics** to track quiz performance.

---

## 🚀 Features

- ✍️ **Quiz Creation:** Creators can add quizzes and questions.
- 🧩 **Quiz Attempting:** Users can attempt quizzes and see scores.
- 🏆 **Leaderboard:** Top scorers displayed dynamically.
- 🔒 **Authentication:** Secure login and registration system.
- 📊 **Basic Analytics:** View quiz performance stats.
- 🎨 **Modern UI:** Clean, intuitive user experience.

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **Next.js 14** | React Framework (App Router) |
| **Prisma ORM** | Database ORM |
| **PostgreSQL** | Primary database (or SQLite during dev) |
| **TailwindCSS** | Utility-first CSS styling |
| **Zod** | Form validation |
| **bcryptjs** | Password hashing |
| **jose** | JWT token handling |

---

## 📦 Folder Structure Overview

```bash
/online-quiz-maker
├── app/
│   ├── (auth)/        # Authentication (Login/Register)
│   ├── dashboard/     # User dashboard
│   ├── create-quiz/   # Create new quizzes
│   ├── quizzes/       # List quizzes
│   ├── quiz/[id]/     # Attempt a quiz
│   ├── leaderboard/   # Leaderboard page
│   └── layout.tsx     # Main layout
│
├── lib/               # Utility functions (auth helpers, db client)
├── prisma/            # Prisma schema & DB models
├── public/            # Static assets
├── styles/            # Global styles
├── README.md
├── package.json
├── next.config.js
├── tsconfig.json
└── .env               # Environment variables
```

---
## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Nash0810/Quiz-Maker.git
cd Quiz-Maker
```

---

### 2. Install Dependencies

```bash
pnpm install
```

---

### 3. Set up Environment Variables

Create a file called **`.env`** in the root directory:

```dotenv
DATABASE_URL=your_database_connection_string_here
JWT_SECRET=your_super_secret_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚡ Replace the placeholders with your real database URL and a strong random JWT secret.

---

### 4. Prisma Database Setup (Optional, if you are using Prisma)

If your project uses **Prisma** ORM (make sure you have a `prisma/schema.prisma` file), run:

```bash
pnpm prisma generate
pnpm prisma db push
```

- If you don't have a database yet, you can set one up on **Railway**, **Neon**, or **Supabase** for free.

---

### 5. Run the Development Server

```bash
pnpm dev
```

Your app will be available at:

```bash
http://localhost:3000
```

## ✅ Current Status

- [x] Authentication system
- [x] JWT-based sessions
- [x] Password security
- [ ] Full quiz creation and management
- [ ] Quiz attempt and scoring logic
- [ ] Leaderboard tracking
- [ ] Analytics dashboard

---

## 🧹 Code Quality

- Modularized architecture.
- Typed with TypeScript.
- Form validation with Zod.
- Secure authentication and cookie handling.
- Clean, readable and well-commented code.

---

## 📈 Future Improvements

- Quiz timers and difficulty levels
- Email notifications for quiz results
- Better mobile responsiveness
- Advanced analytics dashboard
- Admin panel for quiz moderation
- Public/private quizzes

---

## 📄 License

This project is licensed under the **MIT License**.

---

