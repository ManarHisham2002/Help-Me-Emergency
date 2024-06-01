from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Your routes and application logic here


# Load the dataset
data = pd.read_csv('C:\\Users\\Administrator\\Downloads\\Help-Me-Emergency-main (1)\\Help-Me-Emergency-main\\Training.csv')

# Preprocess the data
le = LabelEncoder()
data['prognosis'] = le.fit_transform(data['prognosis'])
X = data.drop('prognosis', axis=1)
y = data['prognosis']

# Train the model
model = RandomForestClassifier()
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict_disease():
    # Get the symptom data from the request
    symptom_data = request.get_json()

    # Create a feature vector from the symptom data
    feature_vector = np.zeros(len(X.columns))
    for i, col in enumerate(X.columns):
        if col in symptom_data.values():
            feature_vector[i] = 1

    # Make the prediction
    predicted_disease = model.predict_proba([feature_vector])[0]

    # Get the top 3 predicted diseases
    top_diseases = sorted(zip(le.inverse_transform(range(len(predicted_disease))), predicted_disease), key=lambda x: x[1], reverse=True)[:3]

    # Return the results as JSON
    return jsonify({'top_diseases': [{'name': disease, 'probability': prob} for disease, prob in top_diseases]})

if __name__ == '__main__':
    app.run(debug=True)