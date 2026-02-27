import sys
import json
import joblib
import numpy as np
import os

# Load models (Ensure these files are uploaded to the /models directory)
# burnout_model.pkl, scaler.pkl, target_encoder.pkl
try:
    # Use absolute paths if necessary, or relative to the root
    model_path = os.path.join("models", "burnout_model.pkl")
    scaler_path = os.path.join("models", "scaler.pkl")
    encoder_path = os.path.join("models", "target_encoder.pkl")
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")

    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    target_encoder = joblib.load(encoder_path)
except Exception as e:
    # If files don't exist yet, we'll return a specific error that server.ts can handle
    print(json.dumps({"error": f"Model loading failed: {str(e)}"}))
    sys.exit(1)

def predict():
    try:
        # Read input from stdin (sent by Node.js)
        line = sys.stdin.read()
        if not line:
            return
            
        input_data = json.loads(line)
        
        # Prepare features in the exact order the model expects
        features = np.array([
            float(input_data["gender"]),
            float(input_data["companyType"]),
            float(input_data["wfhSetup"]),
            float(input_data["designation"]),
            float(input_data["resourceAllocation"]),
            float(input_data["mentalFatigueScore"]),
        ]).reshape(1, -1)
        
        # Preprocess using the loaded scaler
        features_scaled = scaler.transform(features)
        
        # Predict using the loaded model
        prediction = model.predict(features_scaled)
        
        # Decode the target if it was encoded (e.g., 0 -> Low, 1 -> High)
        result = target_encoder.inverse_transform(prediction)
        
        # Output JSON to stdout for Node.js to capture
        print(json.dumps({"prediction": str(result[0])}))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    predict()
