import express from "express";
import { createServer as createViteServer } from "vite";
import { spawn } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ===============================
  // Helper: Call Python ML Script
  // ===============================
  const callPythonModel = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Cross-platform Python command
      const pythonCommand =
        process.platform === "win32" ? "python" : "python3";

      // Absolute path to predict.py
      const scriptPath = path.join(__dirname, "predict.py");

      const pythonProcess = spawn(pythonCommand, [scriptPath]);

      let result = "";
      let error = "";

      pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          console.error("Python error:", error);
          reject(error || "Python process failed");
        } else {
          try {
            const parsed = JSON.parse(result);
            resolve(parsed);
          } catch (e) {
            reject("Failed to parse Python output");
          }
        }
      });

      // Send input data to Python
      pythonProcess.stdin.write(JSON.stringify(data));
      pythonProcess.stdin.end();

      // Safety timeout (10s)
      setTimeout(() => {
        pythonProcess.kill();
        reject("Python process timeout");
      }, 10000);
    });
  };

  // ===============================
  // Prediction Route
  // ===============================
  app.post("/api/predict", async (req, res) => {
    try {
      const requiredFields = [
        "gender",
        "companyType",
        "wfhSetup",
        "designation",
        "resourceAllocation",
        "mentalFatigueScore"
      ];

      // Validate input
      for (const field of requiredFields) {
        if (req.body[field] === undefined) {
          return res
            .status(400)
            .json({ error: `${field} is required` });
        }
      }

      // Call Python model
      const pyResult = await callPythonModel(req.body);

      if (pyResult.error) {
        throw new Error(pyResult.error);
      }

      const prediction = pyResult.prediction;

      // ===============================
      // Risk Mapping Layer
      // ===============================

      const scoreMap: Record<string, number> = {
        Low: 15,
        Moderate: 45,
        High: 75,
        Critical: 95
      };

      const recommendationsMap: Record<string, string[]> = {
        Low: [
          "Maintain your current work-life balance habits.",
          "Schedule regular short breaks throughout the day.",
          "Continue engaging in hobbies outside of work."
        ],
        Moderate: [
          "Identify specific stressors and discuss them with your manager.",
          "Practice daily mindfulness or meditation (10-15 mins).",
          "Ensure you are getting 7-8 hours of quality sleep."
        ],
        High: [
          "Consider taking a short leave or mental health day immediately.",
          "Strictly disconnect from work communications after hours.",
          "Consult with a professional counselor or therapist."
        ],
        Critical: [
          "Immediate intervention is recommended. Contact HR or a healthcare provider.",
          "Prioritize rest and recovery above all professional commitments.",
          "Develop an immediate plan for workload reduction or temporary leave."
        ]
      };

      const summaryMap: Record<string, string> = {
        Low: "Your metrics indicate a healthy professional balance with low signs of fatigue.",
        Moderate:
          "You are showing early signs of burnout. Address these stressors now before they escalate.",
        High:
          "Your fatigue levels and workload are significantly high. Action is needed to prevent long-term impact.",
        Critical:
          "You are at severe burnout risk. Immediate rest and professional support are strongly advised."
      };

      const fatigue = Number(req.body.mentalFatigueScore);
      const allocation = Number(req.body.resourceAllocation);

      let primaryDriver = "Balanced factors";

      if (fatigue > 7) primaryDriver = "High Mental Fatigue";
      else if (allocation > 7)
        primaryDriver = "Excessive Resource Allocation";

      const riskLevel = prediction || "Moderate";

      const analysis = {
        riskLevel,
        score: scoreMap[riskLevel] || 50,
        summary:
          summaryMap[riskLevel] ||
          "Analysis complete based on provided metrics.",
        recommendations:
          recommendationsMap[riskLevel] ||
          recommendationsMap["Moderate"],
        insights: `Primary driver identified: ${primaryDriver}.`
      };

      res.json(analysis);
    } catch (error) {
      console.error("Prediction error:", error);
      res.status(500).json({
        error:
          "Failed to analyze burnout risk. Ensure Python and model files are properly configured."
      });
    }
  });

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite Dev Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

startServer();