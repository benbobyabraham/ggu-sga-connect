# 🏫 GGU Anonymous Feedback Portal  

A simple and secure **anonymous feedback/suggestion platform** for the **Golden Gate University (GGU) campus**. This React-based web app allows students to share their thoughts, suggestions, and concerns anonymously with the **Student Government Association (SGA)**. Feedback is submitted via EmailJS, sending messages directly to sga@ggu.edu. This web app ensures privacy while fostering open communication between students and campus leadership.  

✨ Features:
✅ Anonymous feedback submission
✅ Simple & intuitive UI
✅ Direct email delivery to SGA
✅ No login required

🎯 Goal: Foster open communication and ensure student voices are heard!

## 🛠️ Tech Stack  

- **React (Vite)** – Fast and lightweight frontend  
- **EmailJS** – Handles form submissions via email  
- **GitHub Pages** – Static site hosting  

## 🎯 Purpose  

The goal of this project is to create a **safe and accessible** way for students to share their voices with the Student Government Association at GGU. Whether it's a **suggestion, concern, or feedback**, this portal makes sure that student opinions reach decision-makers without compromising anonymity.  

---

## 📌 Getting Started  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/ggu-anonymous-feedback.git
cd ggu-anonymous-feedback
```

### 2️⃣ Install Dependencies  

```sh
npm install
```

### 3️⃣ Configure EmailJS  

1. Sign up at [EmailJS](https://www.emailjs.com/)  
2. Create a new service and email template  
3. Add your **Service ID**, **Template ID**, and **Public Key** in an `.env` file:  

```sh
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4️⃣ Run Locally  

```sh
npm run dev
```

### 5️⃣ Deploy to GitHub Pages  

1. Install `gh-pages`:  

   ```sh
   npm install gh-pages --save-dev
   ```

2. Add the following lines to `package.json`:

   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/ggu-anonymous-feedback",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy with:  

   ```sh
   npm run deploy
   ```

---

## 📬 How It Works  

1️⃣ Users visit the anonymous feedback page  
2️⃣ They enter their message in the feedback form  
3️⃣ The form submission is handled by **EmailJS**  
4️⃣ The message is sent **directly to SGA's official email (sga@ggu.edu)**  
5️⃣ The SGA team receives the feedback for review and action  

---

## 🛠️ Future Enhancements  

🔹 Custom success/failure notifications  
🔹 Option to attach images or files  
🔹 Dark mode support  
🔹 Improved accessibility & UI enhancements  

---

## 🤝 Contributing  

Interested in improving the platform? Feel free to submit a pull request! 🎉  

1. Fork the repository  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Make your changes and commit (`git commit -m "Added new feature"`)  
4. Push to your fork (`git push origin feature-branch`)  
5. Submit a PR 🚀  

---

## 📄 License  

This project is licensed under the **MIT License**.  

---

### 💡 Have Feedback or Suggestions?  

Submit them through the **GGU Anonymous Feedback Portal** or reach out to SGA directly at **sga@ggu.edu**.  

📌 **Live Demo**: *[Link to GitHub Pages deployment]*  
