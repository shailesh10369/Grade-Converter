# 🎓 Academic Grade Converter

A modern, responsive, and visually appealing **web application** that converts between different academic grading systems — **SGPA, CGPA, and Percentage**.  
It’s built with **HTML, CSS, and JavaScript**, featuring a **dark mode**, interactive animations, and validation for incorrect inputs.

---

## 🚀 Live Demo  
🔗 [Click here to view live website](https://shailesh10369.github.io/Grade-Converter/)

---

## 🚀 Features

✅ **Convert between:**
- SGPA → Percentage  
- SGPA → CGPA (using two different methods)  
- Percentage → CGPA  
- Percentage → SGPA  
- CGPA → Percentage  
- CGPA → SGPA (approx.)  

✅ **Includes:**
- 🎨 Dark/Light Mode Toggle  
- 🔄 Swap Button to interchange “From” and “To” fields  
- ➕ Add / Remove Semesters dynamically  
- ⚠️ Validation for invalid or out-of-range inputs  
- ✨ Modern UI with animations and hover effects  

---

## 🧠 Conversion Formulas Used

| Conversion Type | Formula |
|------------------|----------|
| SGPA → Percentage | SGPA × 10 − 7.5 |
| Percentage → SGPA | (Percentage − 7.5) ÷ 10 |
| CGPA → Percentage | CGPA × 9.5 |
| Percentage → CGPA | Percentage ÷ 9.5 |
| SGPA → CGPA | Total SGPA ÷ No. of Semesters |
| CGPA → SGPA | Approximation (same as CGPA) |

---

## 🧩 Project Structure

```text
📁 Academic-Grade-Converter
│
├── index.html       # Main HTML structure
├── style.css        # Styling and animations
└── script.js        # Functionality and input validation 
```
---

## 🖥️ How to Run

### 1️⃣ Download or Clone the Repository

git clone https://github.com/<your-username>/academic-grade-converter.git

### 2️⃣ Open in Browser
- Simply double-click on `index.html`  
- Or serve it locally using VS Code Live Server  

🎉 Enjoy converting your grades easily!

---

## 🧾 Example Usage

1. Select conversion type (e.g., **SGPA → Percentage**)  
2. Enter your academic value (like **SGPA = 8.2**)  
3. Click **Convert Now**  
4. See your result instantly with formula details below  

Invalid or empty input automatically shows an error message like:  
> ⚠️ Please enter a valid number (0–10)

---

## 🛠️ Tech Stack

- **HTML5**  
- **CSS3** (with animations and custom properties)  
- **JavaScript (ES6+)**

---

## 👨‍💻 Author

**Shailesh Vijaykar**  
📧 Feel free to connect on [GitHub](https://github.com/shailesh10369)

---

## 📜 License

This project is licensed under the **MIT License** — you are free to use, modify, and distribute with attribution.
