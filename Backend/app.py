from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
import base64
from io import BytesIO
import os

# Prevent Matplotlib GUI errors
matplotlib.use('Agg')

# Determine static folder: prefer committed frontend/dist/build if present, otherwise use backend/static
base_dir = os.path.dirname(os.path.abspath(__file__))

# Candidate frontend build locations (check in order)
candidates = [
    os.path.normpath(os.path.join(base_dir, '..', 'frontend', 'dist')),
    os.path.normpath(os.path.join(base_dir, '..', 'frontend', 'build')),  # CRA-style
    os.path.join(base_dir, 'static'),
]

static_folder = None
for cand in candidates:
    if os.path.isdir(cand):
        static_folder = cand
        break

# Fallback to backend/static even if it doesn't exist yet
if static_folder is None:
    static_folder = os.path.join(base_dir, 'static')

print(f"Using static folder: {static_folder}")

app = Flask(__name__, static_folder=static_folder, static_url_path='/')
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow frontend access

# Load model and encoders
try:
    clf = joblib.load("random_forest_model.pkl")
    le = joblib.load("label_encoder.pkl")
    cols = joblib.load("symptom_columns.pkl")
except Exception as e:
    print(f"Error loading model files: {e}")
    exit(1)

# Load additional data
try:
    severity_data = pd.read_csv('./data/Symptom_severity.csv')
    description_data = pd.read_csv('./data/symptom_Description.csv')
    precaution_data = pd.read_csv('./data/symptom_precaution.csv')

    severity_dict = dict(zip(severity_data.iloc[:, 0], severity_data.iloc[:, 1]))
    description_dict = dict(zip(description_data.iloc[:, 0], description_data.iloc[:, 1]))
    precaution_dict = {
        k: [p for p in v if isinstance(p, str) and p.lower() != 'nan'] 
        for k, v in zip(precaution_data.iloc[:, 0], precaution_data.iloc[:, 1:].values.tolist())
    }

    valid_symptoms = list(severity_data.iloc[:, 0])  # Extract valid symptom names
except Exception as e:
    print(f"Error loading data files: {e}")
    exit(1)


@app.route('/get_valid_symptoms', methods=['GET'])
def get_valid_symptoms():
    """ Returns all valid symptoms for frontend autocomplete validation """
    return jsonify({"symptoms": valid_symptoms})


@app.route('/get_related_questions', methods=['POST'])
def get_related_questions():
    """Returns 5-6 Yes/No questions related to the user's entered symptom."""
    try:
        data = request.json
        user_symptoms = data.get("symptoms", [])

        if not user_symptoms:
            return jsonify({"questions": []})

        # Load Training.csv to get disease associations
        training_data = pd.read_csv("./data/Training.csv")

        # Find diseases linked to the entered symptoms
        matching_diseases = set()
        for symptom in user_symptoms:
            matching_diseases.update(training_data[training_data[symptom] == 1]["prognosis"].unique())

        if not matching_diseases:
            return jsonify({"questions": []})

        # Find the most common symptoms linked to those diseases
        symptom_counts = {}
        for disease in matching_diseases:
            disease_symptoms = training_data[training_data["prognosis"] == disease].iloc[:, :-1]
            for symptom, present in disease_symptoms.items():
                if present.sum() > 0 and symptom not in user_symptoms:  # Avoid repeating entered symptom
                    symptom_counts[symptom] = symptom_counts.get(symptom, 0) + present.sum()

        # Select the top 5-6 most relevant Yes/No questions
        sorted_symptoms = sorted(symptom_counts, key=symptom_counts.get, reverse=True)[:6]

        return jsonify({"questions": sorted_symptoms})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """ Takes user symptoms and number of days, then predicts the disease. """
    try:
        data = request.json
        symptoms = data.get("symptoms", [])
        num_days = data.get("num_days", 1)

        # Convert symptoms to input vector
        input_vector = np.zeros(len(cols))
        for symptom in symptoms:
            if symptom in cols:
                input_vector[cols.index(symptom)] = 1

        # Make predictions
        prediction_proba = clf.predict_proba([input_vector])[0]
        top_3_indices = np.argsort(prediction_proba)[-3:][::-1]
        top_3_diseases = le.inverse_transform(top_3_indices)
        confidence_scores = prediction_proba[top_3_indices] * 100

        # Severity calculation
        severity_score = sum(severity_dict.get(s, 0) for s in symptoms) * num_days / (len(symptoms) + 1)
        risk_level = "High" if severity_score > 13 else "Low"

        # Generate graph
        plt.figure(figsize=(6, 4))
        sns.barplot(x=top_3_diseases, y=confidence_scores, palette="coolwarm")
        plt.xlabel("Diseases")
        plt.ylabel("Confidence Score (%)")
        plt.title("Top 3 Predictions")

        # Convert plot to base64
        img_buf = BytesIO()
        plt.savefig(img_buf, format='png')
        img_buf.seek(0)
        img_base64 = base64.b64encode(img_buf.read()).decode()
        plt.close()

        return jsonify({
            "predictions": [
                {
                    "disease": d,
                    "confidence": round(c, 2),
                    "description": description_dict.get(d, "No description available."),
                    "precautions": precaution_dict.get(d, ["No specific precautions available."])
                }
                for d, c in zip(top_3_diseases, confidence_scores)
            ],
            "severity_score": severity_score,
            "risk_level": risk_level,
            "graph": f"data:image/png;base64,{img_base64}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def serve_frontend():
    """Serve index.html (SPA). Try static_folder/index.html first, else serve absolute file if present."""
    index_in_static = os.path.join(app.static_folder, 'index.html')
    if os.path.isfile(index_in_static):
        return app.send_static_file('index.html')
    # try other likely locations (e.g., frontend/dist/index.html)
    alt_index = os.path.normpath(os.path.join(base_dir, '..', 'frontend', 'dist', 'index.html'))
    if os.path.isfile(alt_index):
        return send_file(alt_index)
    alt_index2 = os.path.normpath(os.path.join(base_dir, '..', 'frontend', 'build', 'index.html'))
    if os.path.isfile(alt_index2):
        return send_file(alt_index2)
    return "Index file not found", 404

@app.route('/<path:path>')
def serve_static(path):
    """Serve requested static asset if present; otherwise fallback to index.html for SPA routing."""
    # Try to serve file from static_folder
    candidate = os.path.join(app.static_folder, path)
    if os.path.isfile(candidate):
        # If file is inside static_folder, use send_file for correct absolute path serving
        return send_file(candidate)
    # Try other likely locations
    alt_candidate = os.path.normpath(os.path.join(base_dir, '..', 'frontend', 'dist', path))
    if os.path.isfile(alt_candidate):
        return send_file(alt_candidate)
    alt_candidate2 = os.path.normpath(os.path.join(base_dir, '..', 'frontend', 'build', path))
    if os.path.isfile(alt_candidate2):
        return send_file(alt_candidate2)
    # Fallback to index.html so SPA routes work
    return serve_frontend()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
