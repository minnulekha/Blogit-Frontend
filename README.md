
# 📖 BlogIt Frontend  

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)  
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)  
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  
![Status](https://img.shields.io/badge/Status-Active-success)  

The **BlogIt Frontend** is the user interface for the **BlogIt blogging platform**, where users can register, log in, and create or read blogs. It communicates with the **BlogIt Backend** via APIs.  

---

## ✨ Features  

- 🔐 User registration and login  
- 📝 Create, edit, and delete blogs (after login)  
- 📚 View all blog posts  
- 📱 Responsive design for desktop & mobile  

---

## 🛠️ Technologies Used  

- **React.js**  
- **HTML, CSS, JavaScript**  
- **Axios** – for API requests  
- **React Router** – for navigation  
- **dotenv** – for environment variables  

---

## 🚀 Setup Instructions  

Follow these steps to run the project locally:  

### 1. Clone the repository  

```bash
git clone https://github.com/minnulekha/BlogIt-Frontend.git
cd BlogIt-Frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root and add your backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run the development server

```bash
npm start
```

Your app will now run at **[http://localhost:3000](http://localhost:3000)** 🚀

---

## 📂 Project Structure

```
BlogIt-Frontend/
│-- public/              # Static files  
│-- src/  
│   │-- components/      # Reusable UI components  
│   │-- pages/           # Application pages (Login, Register, Blogs, etc.)  
│   │-- services/        # API calls using Axios  
│   │-- App.js           # Main app component with routes  
│   └-- index.js         # Entry point  
│-- .env                 # Environment variables  
│-- package.json         # Dependencies & scripts  
```

---

## 📸 Screenshots

### 🏠 Home Page

<img width="1366" height="768" alt="Home Page" src="https://github.com/user-attachments/assets/81d82d13-55d3-4857-8264-6b4d48cfeb7f" />  

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork this repository
2. Create a new branch (`feature/your-feature-name`)
3. Commit your changes
4. Push your branch and open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

```

---

✨ This version has **badges (React, Node.js, License, Status)** at the top, so your GitHub page will look much more professional.  

Do you also want me to add a **live demo section** (with your deployed frontend link) if you have already hosted it on Vercel/Netlify?
```


