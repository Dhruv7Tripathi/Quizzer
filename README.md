# Quizzer - A Next.js Quiz Application

## Overview

Quizzer is a dynamic and interactive quiz application built with Next.js and TypeScript. It allows users to take quizzes, track scores, and enjoy a seamless quiz-taking experience.

## Features

- User Authentication (Credential-based or OAuth)
- Create, Edit, and Delete Quizzes
- Take Quizzes and View Scores
- Leaderboard System
- Responsive UI for Mobile and Desktop
- Dark Mode Support
- Secure API with Next.js API Routes

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
<!-- - **State Management**: Zustand / Redux (if needed) -->

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quizzer.git
   cd quizzer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env.local` file:
   ```plaintext
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your id
   GOOGLE_CLIENT_SECRET=your secret key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

To deploy Quizzer, you can use Vercel, Netlify, or any cloud provider that supports Next.js.

```bash
npm run build
npm start
```

## Contributing

Feel free to fork this repository and create a pull request with new features or improvements.

## Give a Star

If you Like this project give a star on github
