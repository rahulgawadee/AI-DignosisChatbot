### **🩺 AI Health Assistant - Symptom-Based Disease Prediction**  

🚀 An advanced AI-powered **disease prediction system** that intelligently asks follow-up questions and continuously improves over time!  

---

## **🔹 Unique Features**  

### **1️⃣ Dynamic & Intelligent Yes/No Questioning**  
✔ **Asks 5-6 follow-up questions** **related to the entered symptom's disease** only.  
✔ **No random questions** – questions are extracted from real disease associations.  
✔ Uses **decision tree logic** to make each question **depend on previous answers**.  

### **2️⃣ Smart Text-to-Speech (TTS) System**  
✔ **Reads only the current screen content** – **Stops immediately when a step changes**.  
✔ **Ignores special characters** (`_`, `/`, `.`) for a **natural-sounding experience**.  
✔ Provides a **seamless audio guide** at every step of the diagnosis process.  

### **3️⃣ Real-Time Symptom Validation & Autocomplete**  
✔ Users can **type their symptom manually** – **AI checks validity in real time**.  
✔ **Dropdown suggestion box** for **spelling correction & faster selection**.  
✔ **Shows an error message if the symptom is invalid** (prevents incorrect inputs).  

### **4️⃣ Model Retrains with Real User Data (Self-Learning)**  
✔ **Stores user interactions** (symptoms & diagnosis) in a dataset.  
✔ Periodically **re-trains the Random Forest model** to **improve accuracy over time**.  
✔ Automatically updates the **model (`random_forest_model.pkl`)** with real cases.  

### **5️⃣ Beautiful, Interactive UI with Step-by-Step Flow**  
✔ **Modern UI with Lucide Icons** for an engaging user experience.  
✔ **Step-based flow:** Name → Symptom Input → Yes/No Questions → Duration → Diagnosis.  
✔ **Progress bar** shows user completion percentage dynamically.  

### **6️⃣ Diagnosis with Confidence Scores & Graphs**  
✔ **Predicts top 3 diseases** with confidence scores.  
✔ Displays **disease descriptions & precautions** in an easy-to-read format.  
✔ **Visual representation:** Generates a **bar chart** comparing confidence scores.  

### **7️⃣ Restart Button for a Fresh Diagnosis**  
✔ At the end, users can **restart the diagnosis with one click**.  
✔ **Clears all input fields** and resets the entire flow.  

---

## **📦 Tech Stack**  
- **Frontend:** React.js (Vite) + Tailwind CSS + Lucide Icons  
- **Backend:** Flask (Python) + Pandas + Scikit-Learn  
- **ML Model:** Random Forest Classifier (Self-Learning)  

---

## **🚀 How to Run**  
```bash
# Build Frontend
cd frontend
npm install
npm run build
cp -r dist ../backend/static

# Backend Setup
cd ../backend
pip install -r requirements.txt
python app.py
```

## **🚀 Deployment on Render**
1. Build frontend locally: `cd frontend && npm install && npm run build`.
2. Commit the `frontend/dist` folder to your repo (so it's available on Render).
3. Push code to Git.
4. Connect repo to Render, set build command: `pip install -r requirements.txt`.
5. Start command: `gunicorn --bind 0.0.0.0:$PORT app:app`.
6. Deploy; the backend URL will serve the frontend from `../frontend/dist`.

