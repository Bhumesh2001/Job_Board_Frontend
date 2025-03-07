# Frontend Documentation

## Overview
This is the **frontend** for a **Job Portal** that allows **Recruiters** and **Candidates** to manage job postings and applications. It is built using **React.js** with **React Bootstrap** for styling and **Axios** for API communication.

---

## Tech Stack
- **React.js** - Frontend framework
- **React Router** - Navigation & route management
- **Axios** - API requests handling
- **React Bootstrap** - UI components
- **Context API** - State management

---

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/frontend.git
cd frontend
```

### 2. Install dependencies:
```bash
npm install
```

### 4. Start the frontend server:
```bash
npm run dev  # For Vite
```

---

## Features
### **Authentication & Routing**
- **Context API** manages authentication state
- **Protected Routes** ensure only logged-in users can access certain pages
- **Token Storage** in localStorage

### **Job Management (Recruiter Dashboard)**
- **Create, Update, Delete Jobs**
- **View job applications with resume parsing**

### **Candidate Features**
- **View job listings**
- **Apply for jobs with resume upload**
- **Track applications**

---

## Deployment
### **Frontend on Vercel**
1. Install Vercel CLI:
```bash
npm install -g vercel
```
2. Login to Vercel:
```bash
vercel login
```
3. Deploy frontend:
```bash
vercel --prod
```

Your frontend will be live at:
```
https://your-frontend.vercel.app
```

---

## Contributors
- Bhumesh Kewat
For any issues, contact [bhumeshkewat10@gmail.com](mailto:bhumeshkewat10@gmail.com).
