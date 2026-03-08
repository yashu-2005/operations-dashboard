# 📊 Operations Dashboard

A full-stack web application to monitor and manage operational data in a clear and interactive interface. This project allows users to track key metrics, visualize data, and interact with operational activities in real-time.

---

## 🚀 Project Overview

The **Operations Dashboard** provides a centralized platform where users can view and manage operational data through charts, tables, and status indicators. Built with **React** on the frontend, **Node.js/Express** on the backend, and **MongoDB** for data storage, the app is fully interactive and scalable.

---

## ✨ Features

- 📈 Dynamic data visualization using charts and graphs  
- 📋 Display of operational metrics and statistics  
- 🔍 Real-time monitoring of activities and performance  
- 💻 Responsive and clean dashboard interface  
- ⚡ Full-stack architecture with API integration  

---

## 🛠️ Technologies Used

- **Frontend:** React, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **API Testing:** Postman  
- **Version Control:** Git & GitHub  

---

## 🏗️ Architecture

- **Frontend:** React components fetch data from backend APIs and render charts, tables, and dashboards.  
- **Backend:** Node.js with Express handles REST API requests, performs data logic, and communicates with MongoDB.  
- **Database:** MongoDB stores operational metrics and user data.  
- **Data Flow:** MongoDB → Node.js API → React frontend → Dashboard display  

---

## 📂 Project Structure

```
operations-dashboard
│
├── backend
│   ├── server.js
│   ├── routes/
│   └── models/
│
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md
└── package.json
```

---

## ⚙️ Installation & Usage

### Backend
1. Navigate to the `backend` folder:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```
- The backend will run on `http://localhost:5000` by default.

### Frontend
1. Navigate to the `frontend` folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the React app:
```bash
npm start
```
- The frontend will run on `http://localhost:3000` and fetch data from the backend APIs.

---

## 📚 API Documentation

- `GET /api/metrics` – Fetch all operational metrics  
- `POST /api/metrics` – Add a new metric  
- `PUT /api/metrics/:id` – Update an existing metric  
- `DELETE /api/metrics/:id` – Delete a metric  

> All endpoints were tested in **Postman** to ensure proper functionality.

---

## 🎯 Objectives

- Build a full-stack operational dashboard  
- Practice integrating React frontend with Node.js/MongoDB backend  
- Visualize and manage real-time operational data  

---

## 📸 Future Improvements

- Add user authentication and roles  
- Enable real-time updates with WebSocket  
- Improve UI with advanced React libraries (Material-UI, Recharts)  
- Deploy the full-stack app online  

---

## 👩‍💻 Author

**Yasaswini Reddy**

---

## 🌐 Live Demo

[Operations Dashboard Live](https://yashu-2005.github.io/operations-dashboard/)

---

⭐ If you like this project, feel free to give it a star!