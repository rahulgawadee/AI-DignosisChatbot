import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load Data
training = pd.read_csv('./data/Training.csv')

# Prepare Data
cols = training.columns[:-1]
X = training[cols]
y = training['prognosis']
le = LabelEncoder()
y = le.fit_transform(y)

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train Model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Save Model & Encoders
joblib.dump(clf, "random_forest_model.pkl")
joblib.dump(le, "label_encoder.pkl")
joblib.dump(list(cols), "symptom_columns.pkl")

print("✅ Model saved as 'random_forest_model.pkl'")
