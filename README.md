#  Project & Task Manager App

##  Overview

This is a full-stack **Project & Task Manager mobile application** built using React Native (Expo) and Node.js.
It allows users to manage projects and tasks with OTP-based authentication and a clean UI.

---

##  Tech Stack

### Frontend

* React Native (Expo)
* Redux Toolkit (State Management)
* Axios (API calls)

### Backend

* Node.js (Express)
* MongoDB Atlas (Database)
* Mongoose (ODM)
* JWT Authentication

---

## 🔐 Features

### Authentication

* Signup & Login using OTP
* JWT-based session handling

### Projects

* Create Project
* View Projects List
* Delete Project

### Tasks

* Create Tasks inside a project
* Mark task as Complete / Incomplete
* Delete Task

---

##  Folder Structure

```bash
frontend/
 ├── app/
 │   ├── (tabs)/
 │   │   ├── projects.tsx
 │   │   ├── tasks.tsx
 │   ├── login.tsx
 │   ├── signup.tsx
 │   ├── otp.tsx
 │
 ├── src/
 │   ├── components/
 │   │   ├── ProjectCard.tsx
 │   │   ├── TaskItem.tsx
 │
 │   ├── redux/
 │   │   ├── store.ts
 │   │   ├── projectSlice.ts
 │   │   ├── taskSlice.ts
 │   │   ├── authSlice.ts
 │   │   ├── hooks.ts
 │
 │   ├── services/
 │   │   ├── api.ts
```

```bash
backend/
 ├── server.js
 ├── config/db.js
 ├── models/
 ├── routes/
 ├── controllers/
 ├── middleware/
```

---

##  Setup Instructions

###  Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

###  Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

---

##  API Configuration

Update API base URL in:

```ts
src/services/api.ts
```

```ts
baseURL: "http://YOUR_IP:5000/api"
```

---

## 🗄 Database Setup

* Using MongoDB Atlas
* Create cluster
* Add Database User
* Add Network Access:

```text
0.0.0.0/0
```

---

##  APK Build (Expo)

```bash
npm install -g eas-cli
eas login
eas init
eas build -p android --profile preview
```

---

##  Key Highlights

* Clean UI with dark theme
* Proper Redux state management
* Async API handling using Thunks
* Modular and scalable folder structure

---

##  Challenges Faced

* MongoDB Atlas connection issues (DNS & Network)
* Redux TypeScript setup
* OTP flow implementation

---

##  Future Improvements

* Edit Project & Task
* Due Date & Calendar
* Push Notifications
* Better UI Animations

---

##  Author

**Saveri Gavvala**

---

##  Submission

* GitHub Repository
* APK File
* README Documentation

---
