# 🎮 Esports Performance Analyzer

A modern, real-time analytics dashboard for competitive gamers to track, analyze, and improve their in-game performance across multiple titles like BGMI and Call of Duty.

---

## 🚀 Live Demo

👉 (https://esports-analyzer.vercel.app/)

---

## 📊 Features

* 🎯 Track match performance (kills, damage, rank, K/D, etc.)
* 📈 Real-time analytics with charts (K/D trends, performance over time)
* 🧠 Smart performance score calculation
* 🎮 Multi-game support (BGMI, COD, more)
* ☁️ Cloud sync using Firebase Firestore
* 📱 Responsive and modern UI
* 📄 Export analytics as PDF

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 16, React
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **Backend:** Firebase Firestore
* **Deployment:** Vercel

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/esports-analyzer.git
cd esports-analyzer
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

### 4. Run the development server

```bash
npm run dev
```

---

## 🔥 Firebase Setup

1. Go to Firebase Console
2. Create a project
3. Enable Firestore Database
4. Set rules (for development):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ Note: These rules are open for development only.

---

## 📸 Screenshots

(Add screenshots here)

---

## 📌 Future Improvements

* 🔐 Firebase Authentication (Google Login)
* 👥 Multi-user support
* 🏆 Leaderboard system
* 🤖 AI-based performance insights
* 🎯 Advanced analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Harsh Pal
GitHub: https://github.com/harshpal-18

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
