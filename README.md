
# 🏥 MedPulse: AI-Powered Triage & Disease Prediction System  

![Python](https://img.shields.io/badge/Language-Python-3776AB?style=for-the-badge&logo=python&logoColor=yellow) 
![Scikit-learn](https://img.shields.io/badge/ML-ScikitLearn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white) 
![Pandas](https://img.shields.io/badge/Data-Pandas-150458?style=for-the-badge&logo=pandas) 
![NumPy](https://img.shields.io/badge/Math-NumPy-013243?style=for-the-badge&logo=numpy) 
![XAI](https://img.shields.io/badge/Explainability-XAI-8E44AD?style=for-the-badge&logo=openai&logoColor=white)  

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black) 
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) 
![Supabase](https://img.shields.io/badge/Database-Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white) 
![Postgres](https://img.shields.io/badge/SQL-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)  

![TensorFlow](https://img.shields.io/badge/ML-TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white) 
![Random Forest](https://img.shields.io/badge/ML-RandomForest-228B22?style=for-the-badge&logo=scikitlearn&logoColor=white) 
![Logistic Regression](https://img.shields.io/badge/ML-LogisticRegression-1F618D?style=for-the-badge&logo=scikitlearn&logoColor=white) 
![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) 
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🧭 Vision  

*"Every second matters in healthcare. MedPulse empowers medical professionals with AI-driven decision-making to prioritize patients effectively and accelerate diagnosis, combining speed and accuracy to save lives."*  

---

## 📌 The Problem  

⏳ **Inefficient Triage** – Patients are often seen on a first-come, first-served basis, leading to dangerous delays for critical cases.  

🧩 **Complex Diagnosis** – Identifying the right disease from multiple symptoms is slow and depends heavily on the availability of senior doctors.  

---

## ✨ The Solution: MedPulse  

An intelligent **AI + API-driven system** that delivers:  

- ✅ **Immediate Triage Level** → 🔴 Red | 🟠 Orange | 🟡 Yellow | 🟢 Green  
- ✅ **Probable Disease Prediction** → ML models trained on real patient data  
- ✅ **Explainable AI** → Highlights the key symptoms influencing predictions  

⚡ Faster • Consistent • Data-driven Emergency Care ⚡  

---

##  How It Works  

The system uses **Python-trained ML models** served via a **Node.js backend**, with persistence and authentication handled by **Supabase**.

```

+-----------------------------+
|        Patient Data         |
| (Vitals + Symptom List)     |
+--------------+--------------+
               | (POST Request to /predict)
               v
+----------------------------------------------------------------------------------+
|                                  Node.js API Server                                |
|                                                                                  |
|   +--------------------------+               +--------------------------------+  |
|   |      Triage Model        |               |        Disease Model           |  |
|   |   (triage\_model.pkl)    |               |   (disease\_model.pkl)         |  |
|   +------------+-------------+               +----------------+---------------+  |
|                | (Vitals)                                    | (Symptoms)        |
|                v                                              v                  |
|   +--------------------------+               +--------------------------------+  |
|   |      "\predicted"        |               |          "\predicted"       |  |
|   +--------------------------+               +--------------------------------+  |
|                                                                                  |
+----------------------------------+-----------------------------------------------+
                                   | JSON Response + Log to DB
                                   v
                                   +------------------------+
                                   |   Complete Diagnosis   |
                                   +------------------------+
                                   |   Supabase (Postgres)  |
                                   +------------------------+

````

---

## 🛠️ Tech Stack  

### 🎨 Frontend  
- **React.js** ⚛️ – Modern component-based UI framework  
- **Figma** 🎨 – UI/UX wireframing & prototyping  

### ⚙️ Backend  
- **Flask (Python)** 🐍 – Lightweight API server for ML models  
- **Supabase** 🗄️ – Database, Auth, Realtime APIs  

### 🤖 AI & Machine Learning  
- **Random Forest** 🌳 – Ensemble ML model for accuracy  
- **Logistic Regression** 📊 – Baseline probabilistic model  
- **TensorFlow** 🧠 – Neural networks for triage scoring  
- **XAI** 🔎 – Explainable AI methods for transparency  

### 🗄️ Database  
- **Supabase (Postgres)** 🐘 – Scalable SQL database with RLS (Row-Level Security)  

### 🚀 Deployment  
- **Vercel** ▲ – Frontend hosting (React)  
- **Supabase** ☁️ – DB + backend hosting  
- **Render/Heroku** 🚀 – Flask API deployment  

---

## 🚀 API Usage: `/predict` Endpoint  

**Endpoint:** `http://localhost:5000/predict`  
**Method:** `POST`  

### Example Request  

```json
{
  "age": 75,
  "gender": 1,
  "chest pain type": 4,
  "blood pressure": 180,
  "cholesterol": 280,
  "max heart rate": 95,
  "exercise angina": 1,
  "plasma glucose": 200,
  "hypertension": 1,
  "heart_disease": 1,
  "symptoms": ["vomiting", "breathlessness", "sweating", "chest_pain"]
}
````

### Example Response

```json
{
  "severity_level": "red",
  "likely_disease": "Heart attack",
  "confidence": 0.89,
  "explanation": {
    "reason": "Critical symptoms: chest_pain, breathlessness, sweating",
    "top_symptoms": [
      { "symptom": "chest_pain", "weight": 7 },
      { "symptom": "breathlessness", "weight": 6 },
      { "symptom": "sweating", "weight": 5 }
    ]
  }
}
```

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/MedPulse.git
cd MedPulse/Backend
```

### 2️⃣ Install Node.js Dependencies


```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file inside `Backend/` and add:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Train ML Models

```bash
cd ML
pip install pandas scikit-learn joblib tensorflow
python train_triage_model.py
python train_disease_model.py
cd ..
```

### 5️⃣ Run the Node.js API

```bash
npm start
```
The API is now live and ready to accept requests at http://localhost:3000/predict.

---

## 📂 Project Structure

```
📦 MedPulse/
 ├── 📂 Backend/
 │   ├── 📜 server.js           # The main Node.js API server
 │   ├── 📜 package.json               
 │   ├── 📜 .env                # Supabase Credential
 │   ├── 📜 triage_model.pkl
 │   ├── 📜 disease_model.pkl
 │   ├── 📜 disease_label_encoder.pkl
 │   └── 📜 all_symptoms.pkl
 │
 └── 📂 ML/
     ├── 📜 train_triage_model.py
     ├── 📜 train_disease_model.py
     ├── 📜 dataset.csv
     ├── 📜 Symptom-severity.csv
```

---

## 🧑‍💻 Contributors

👨‍💻 **Vibhav S Chaudhary**

👨‍💻 **Piyush Varma**

---

## 📜 License

This project is licensed under the **MIT License**.

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

