import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

try:
    df_dataset = pd.read_csv('S:\Projects\MedPulse\Backend\ML\dataset.csv')
    df_severity = pd.read_csv('S:\Projects\MedPulse\Backend\ML\Symptom-severity.csv')
    print("Datasets loaded successfully.")
except FileNotFoundError:
    print("ERROR: files not found.")
    exit()

df_severity['Symptom'] = df_severity['Symptom'].str.strip().str.replace(' ', '_')
symptom_to_severity = dict(zip(df_severity['Symptom'], df_severity['weight']))
all_symptoms = sorted(list(set(s.strip().replace(' ', '_') for s in symptom_to_severity.keys())))
X = pd.DataFrame(0, index=np.arange(len(df_dataset)), columns=all_symptoms)

for i, row in df_dataset.iterrows():
    for symptom in row.dropna()[1:]:
        cleaned_symptom = symptom.strip().replace(' ', '_')
        if cleaned_symptom in all_symptoms:
            X.loc[i, cleaned_symptom] = symptom_to_severity.get(cleaned_symptom, 0)

y = df_dataset['Disease']
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

print("Training the disease prediction model...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print(f"Model trained with accuracy: {model.score(X_test, y_test):.2%}")

joblib.dump(model, 'disease_model.pkl')
joblib.dump(label_encoder, 'disease_label_encoder.pkl')
joblib.dump(all_symptoms, 'all_symptoms.pkl')

print("\nDisease model and necessary files saved successfully.")
