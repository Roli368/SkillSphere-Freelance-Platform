# SkillSphere - Intelligent Freelance Platform

SkillSphere is a next-generation, hyper-local freelance platform built with a modern tech stack. It bridges the gap between clients and top-tier freelancers by utilizing an AI-powered job matching engine, secure escrow payments, and comprehensive project management tools.

---

## 🚀 Key Features

### 1. Multi-Role Authentication System
- **Roles:** Client, Freelancer, Admin.
- **Security:** JWT authentication, Role-Based Access Control (RBAC), and Google OAuth integration.
- **Verification:** Two-Factor Authentication (2FA) and email verification capabilities.

### 2. AI-Powered Job Matching
- **Semantic Search:** A standalone Python microservice using Hugging Face's `sentence-transformers` for intelligent skill similarity scoring.
- **Recommendations:** Suggests top freelancers to clients based on semantic gig requirements, complete with dynamic match scoring.

### 3. Comprehensive Freelancer Profiles
- **Portfolio & Skills:** Deep integration of certifications, verification badges, and milestone pricing structures.
- **Analytics:** Visual statistics cards for Profile Views, Gig Applications, and Earnings, featuring custom CSS-animated revenue charts.

### 4. Project Progress Tracker
- **Milestones:** Track completion percentages, manage file uploads, and log daily progress.
- **Interactive UI:** Animated progress bars and vertical timelines for project logs.

### 5. Secure Payment System
- **Escrow & Milestones:** Transactions are securely held in escrow until milestones are released. 
- **Dashboards:** Dedicated Payment History UI for tracking incoming payouts and refund statuses.

### 6. Advanced Search Engine
- **Filters:** Powerful MongoDB aggregations for location, skill, price range, and rating filters.
- **Dynamic UI:** Seamlessly switch between querying open Gigs and verified Freelancers.

### 7. Real-Time Notification System
- **WebSockets:** Powered by Socket.io to deliver instant alerts for new messages, gig proposals, milestone payments, and verified reviews.

### 8. Admin & Dispute Resolution Center
- **Admin Dashboard:** High-level platform analytics tracking revenue, active users, and fraud detection.
- **Dispute Center:** Portal for users to open tickets against specific transactions, upload evidence, and request admin mediation.
- **Availability Scheduler:** Calendar interfaces allowing freelancers to define availability slots and manage bookings.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Vite, Redux Toolkit, Tailwind CSS, Premium Vanilla CSS, Framer Motion.
- **Backend:** Node.js, Express.js, Socket.io.
- **Database:** MongoDB (Mongoose).
- **AI Microservice:** Python, Flask, Hugging Face `sentence-transformers`.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Roli368/SkillSphere-Freelance-Platform.git
cd SkillSphere
```

### 2. Setup the Backend (Node.js API)
```bash
cd backend
npm install
# Create a .env file based on environment variables (PORT, MONGO_URI, JWT_SECRET, etc.)
npm run dev
```
The backend server will run on `http://localhost:5000`.

### 3. Setup the Frontend (React Client)
```bash
cd ../frontend
npm install
# Ensure VITE_API_URL is pointing to your backend
npm run dev
```
The frontend application will run on `http://localhost:5173`.

### 4. Setup the AI Microservice (Python)
```bash
cd ../ai-service
pip install -r requirements.txt
python app.py
```
The AI matching service will run on `http://localhost:5001`.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is licensed under the MIT License.
