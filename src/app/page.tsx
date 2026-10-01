"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // Input states
  const [soilType, setSoilType] = useState("");
  const [crop, setCrop] = useState("");

  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");

  // Voice assistance
const [language, setLanguage] = useState("en-IN");
const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
const [selectedVoice, setSelectedVoice] = useState("");
const [isListening, setIsListening] = useState(false);
const [voiceText, setVoiceText] = useState("");
const [soilImage, setSoilImage] = useState<string | null>(null);
const [detectedSoilType, setDetectedSoilType] = useState("");
useEffect(() => {
  const loadVoices = () => {
    setVoices(window.speechSynthesis.getVoices());
  };

  loadVoices();

  window.speechSynthesis.onvoiceschanged = loadVoices;

  return () => {
    window.speechSynthesis.onvoiceschanged = null;
  };
}, []);
  // Recommendation result
  const [result, setResult] = useState<any>(null);
const [history, setHistory] = useState<any[]>([]);
  // Logged-in user
const [user, setUser] = useState<any>(null);

useEffect(() => {
  const savedUser = localStorage.getItem("soilSmartUser");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  const savedHistory = localStorage.getItem("soilAnalysisHistory");

  if (savedHistory) {
    setHistory(JSON.parse(savedHistory));
  }
}, []);

const logout = () => {
  localStorage.removeItem("soilSmartUser");
  setUser(null);
};
  // Soil analysis function
  const analyzeSoil = () => {
    const n = Number(nitrogen);
    const p = Number(phosphorus);
    const k = Number(potassium);
    const soilPh = Number(ph);

    // Check inputs
    if (!nitrogen || !phosphorus || !potassium || !ph) {
      alert("Please enter N, P, K and pH values.");
      return;
    }

    // Determine nutrient status
    const nStatus =
      n < 50 ? "Low" : n > 100 ? "High" : "Normal";

    const pStatus =
      p < 30 ? "Low" : p > 80 ? "High" : "Normal";

    const kStatus =
      k < 30 ? "Low" : k > 80 ? "High" : "Normal";

    // Fertilizer recommendation
    let fertilizer = "Balanced NPK fertilizer";

    if (nStatus === "Low") {
      fertilizer = "Urea";
    } else if (pStatus === "Low") {
      fertilizer = "DAP";
    } else if (kStatus === "Low") {
      fertilizer = "MOP";
    }

    // pH recommendation
    let phRecommendation = "";

    if (soilPh < 5.5) {
      phRecommendation =
        "Soil is acidic. Consider adding agricultural lime and organic matter.";
    } else if (soilPh > 7.5) {
      phRecommendation =
        "Soil is alkaline. Add organic matter and suitable soil amendments.";
    } else {
      phRecommendation =
        "Soil pH is in a suitable range for many crops.";
    }

    // Soil health score
    let score = 100;

    if (nStatus !== "Normal") {
      score -= 15;
    }

    if (pStatus !== "Normal") {
      score -= 15;
    }

    if (kStatus !== "Normal") {
      score -= 15;
    }

    if (soilPh < 5.5 || soilPh > 7.5) {
      score -= 20;
    }

    // Health status
    let healthStatus = "Good";

    if (score < 60) {
      healthStatus = "Needs Improvement";
    } else if (score < 80) {
      healthStatus = "Moderate";
    }

    // Crop suitability recommendation
let recommendedCrop = "Maize";

if (soilPh >= 6.0 && soilPh <= 7.5 && n >= 50 && p >= 30) {
  recommendedCrop = "Wheat";
}

if (soilPh >= 5.5 && soilPh <= 7.0 && n >= 40 && k >= 40) {
  recommendedCrop = "Rice";
}

if (soilPh >= 5.5 && soilPh <= 8.0 && k >= 40) {
  recommendedCrop = "Cotton";
}

if (soilPh >= 6.0 && soilPh <= 7.5 && p >= 30 && k >= 30) {
  recommendedCrop = "Groundnut";
}

// Top crop recommendations
const cropScores = [
  {
    crop: "Maize",
    score:
      (n >= 40 ? 25 : 15) +
      (p >= 20 ? 25 : 15) +
      (k >= 20 ? 25 : 15) +
      (soilPh >= 5.5 && soilPh <= 7.5 ? 25 : 10),
  },

  {
    crop: "Rice",
    score:
      (n >= 40 ? 25 : 15) +
      (p >= 20 ? 25 : 15) +
      (k >= 20 ? 25 : 15) +
      (soilPh >= 5.5 && soilPh <= 7.0 ? 25 : 10),
  },

  {
    crop: "Cotton",
    score:
      (n >= 40 ? 25 : 15) +
      (p >= 20 ? 25 : 15) +
      (k >= 40 ? 25 : 15) +
      (soilPh >= 5.5 && soilPh <= 8.0 ? 25 : 10),
  },

  {
    crop: "Groundnut",
    score:
      (n >= 30 ? 25 : 15) +
      (p >= 30 ? 25 : 15) +
      (k >= 30 ? 25 : 15) +
      (soilPh >= 6.0 && soilPh <= 7.5 ? 25 : 10),
  },

  {
    crop: "Wheat",
    score:
      (n >= 50 ? 25 : 15) +
      (p >= 30 ? 25 : 15) +
      (k >= 30 ? 25 : 15) +
      (soilPh >= 6.0 && soilPh <= 7.5 ? 25 : 10),
  },
];

const topCrops = cropScores
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

// Crop suitability score
let cropSuitability = 60;

if (nStatus === "Normal") {
  cropSuitability += 10;
}

if (pStatus === "Normal") {
  cropSuitability += 10;
}

if (kStatus === "Normal") {
  cropSuitability += 10;
}

if (soilPh >= 5.5 && soilPh <= 7.5) {
  cropSuitability += 10;
}

cropSuitability = Math.min(cropSuitability, 100);

// Soil improvement recommendations
const improvements: string[] = [];

if (nStatus === "Low") {
  improvements.push(
    "Nitrogen is low. Consider using nitrogen-rich fertilizer such as Urea and adding organic matter."
  );
}

if (pStatus === "Low") {
  improvements.push(
    "Phosphorus is low. Consider using phosphorus-rich fertilizer such as DAP."
  );
}

if (kStatus === "Low") {
  improvements.push(
    "Potassium is low. Consider using potassium-rich fertilizer such as MOP."
  );
}

if (soilPh < 5.5) {
  improvements.push(
    "Soil is acidic. Consider agricultural lime and organic matter to improve soil condition."
  );
}

if (soilPh > 7.5) {
  improvements.push(
    "Soil is alkaline. Add organic matter and use suitable soil amendments."
  );
}

if (improvements.length === 0) {
  improvements.push(
    "Soil nutrients and pH are in a suitable range. Continue maintaining organic matter and good soil management practices."
  );
}
  // Store all analysis results
const analysis = {
  id: Date.now(),
  date: new Date().toLocaleString(),

  soilType,
  crop,

  nitrogen,
  phosphorus,
  potassium,
  ph,

  nStatus,
  pStatus,
  kStatus,

  fertilizer,
  phRecommendation,

  score,
  healthStatus,

  recommendedCrop,
  cropSuitability,

  improvements,
  topCrops,
};

setResult(analysis);

setTimeout(() => {
  speakAnalysis();
}, 500);
// Save analysis to history
const updatedHistory = [analysis, ...history];

setHistory(updatedHistory);

localStorage.setItem(
  "soilAnalysisHistory",
  JSON.stringify(updatedHistory)
);
  };


  // Voice assistant
const speakAnalysis = () => {
  if (!result) {
    alert("Please analyze the soil first.");
    return;
  }

  let speechText = "";

  if (language === "te-IN") {
    speechText =
      `మీ నేల ఆరోగ్య స్కోర్ ${result.score} శాతం. ` +
      `నేల ఆరోగ్య స్థితి ${result.healthStatus}. ` +
      `నైట్రోజన్ స్థితి ${result.nStatus}. ` +
      `ఫాస్ఫరస్ స్థితి ${result.pStatus}. ` +
      `పొటాషియం స్థితి ${result.kStatus}. ` +
      `సిఫార్సు చేసిన పంట ${result.recommendedCrop}. ` +
      `పంట అనుకూలత ${result.cropSuitability} శాతం. ` +
      `సిఫార్సు చేసిన ఎరువు ${result.fertilizer}. ` +
      `${result.phRecommendation}`;
  } else if (language === "hi-IN") {
    speechText =
      `आपकी मिट्टी का स्वास्थ्य स्कोर ${result.score} प्रतिशत है। ` +
      `मिट्टी की स्वास्थ्य स्थिति ${result.healthStatus} है। ` +
      `नाइट्रोजन की स्थिति ${result.nStatus} है। ` +
      `फॉस्फोरस की स्थिति ${result.pStatus} है। ` +
      `पोटैशियम की स्थिति ${result.kStatus} है। ` +
      `अनुशंसित फसल ${result.recommendedCrop} है। ` +
      `फसल की उपयुक्तता ${result.cropSuitability} प्रतिशत है। ` +
      `अनुशंसित उर्वरक ${result.fertilizer} है। ` +
      `${result.phRecommendation}`;
  } else {
    speechText =
      `Your soil health score is ${result.score} out of 100. ` +
      `The soil health status is ${result.healthStatus}. ` +
      `Nitrogen status is ${result.nStatus}. ` +
      `Phosphorus status is ${result.pStatus}. ` +
      `Potassium status is ${result.kStatus}. ` +
      `The recommended crop is ${result.recommendedCrop}. ` +
      `Crop suitability is ${result.cropSuitability} percent. ` +
      `The recommended fertilizer is ${result.fertilizer}. ` +
      `${result.phRecommendation}`;
  }

  const speech = new SpeechSynthesisUtterance(speechText);

  speech.lang = language;

  const voice = voices.find(
    (voice) => voice.name === selectedVoice
  );

  if (voice) {
    speech.voice = voice;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};
const startVoiceInput = () => {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice input is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;

  setIsListening(true);

  recognition.onstart = () => {
    setVoiceText("🎤 Listening...");
  };

  recognition.onresult = (event: any) => {
  const text = event.results[0][0].transcript;

  setVoiceText(text);
  setIsListening(false);

  console.log("Voice Input:", text);

  // Extract Nitrogen
  const nitrogenMatch = text.match(/nitrogen\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i);

  // Extract Phosphorus
  const phosphorusMatch = text.match(/phosphorus\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i);

  // Extract Potassium
  const potassiumMatch = text.match(/potassium\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i);

  // Extract pH
  const phMatch = text.match(/p\s*h\s*(?:is|=|:)?\s*(\d+(?:\.\d+)?)/i);

  if (nitrogenMatch) {
    setNitrogen(nitrogenMatch[1]);
  }

  if (phosphorusMatch) {
    setPhosphorus(phosphorusMatch[1]);
  }

  if (potassiumMatch) {
    setPotassium(potassiumMatch[1]);
  }

  if (phMatch) {
    setPh(phMatch[1]);
  }
};

  recognition.onerror = (event: any) => {
    console.error("Speech recognition error:", event.error);
    setVoiceText("❌ Could not understand. Please try again.");
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.start();
};
const downloadReport = () => {
  if (!result) {
    alert("Please analyze the soil first.");
    return;
  }

  const reportWindow = window.open("", "_blank");

  if (!reportWindow) {
    alert("Please allow pop-ups to generate the report.");
    return;
  }

  reportWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>SoilSmart Soil Analysis Report</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          color: #1f2937;
        }

        .header {
          text-align: center;
          border-bottom: 3px solid #15803d;
          padding-bottom: 20px;
          margin-bottom: 25px;
        }

        .header h1 {
          color: #166534;
          margin-bottom: 5px;
        }

        .header p {
          color: #6b7280;
        }

        .section {
          margin-top: 25px;
        }

        .section h2 {
          color: #166534;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 6px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .card {
          background: #f0fdf4;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #bbf7d0;
        }

        .score {
          font-size: 32px;
          font-weight: bold;
          color: #15803d;
        }

        .crop {
          font-size: 24px;
          font-weight: bold;
          color: #166534;
        }

        .footer {
          margin-top: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }

        @media print {
          body {
            margin: 20px;
          }

          button {
            display: none;
          }
        }
      </style>
    </head>

    <body>

      <div class="header">
        <h1>🌱 SoilSmart</h1>
        <h2>AI-Powered Soil Analysis Report</h2>
        <p>Generated on ${new Date().toLocaleString()}</p>
      </div>

      <div class="section">
        <h2>🌾 Soil Details</h2>

        <div class="grid">
          <div class="card">
            <strong>Soil Type</strong>
            <p>${result.soilType}</p>
          </div>

          <div class="card">
            <strong>Preferred Crop</strong>
            <p>${result.crop}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>🧪 Nutrient Analysis</h2>

        <div class="grid">
          <div class="card">
            <strong>Nitrogen (N)</strong>
            <p>${result.nitrogen}</p>
            <strong>Status:</strong> ${result.nStatus}
          </div>

          <div class="card">
            <strong>Phosphorus (P)</strong>
            <p>${result.phosphorus}</p>
            <strong>Status:</strong> ${result.pStatus}
          </div>

          <div class="card">
            <strong>Potassium (K)</strong>
            <p>${result.potassium}</p>
            <strong>Status:</strong> ${result.kStatus}
          </div>

          <div class="card">
            <strong>Soil pH</strong>
            <p>${result.ph

            }</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>💚 Soil Health</h2>

        <div class="card">
          <p class="score">${result.score}%</p>
          <p><strong>Status:</strong> ${result.healthStatus}</p>
        </div>
      </div>

      <div class="section">
        <h2>🌾 Crop Recommendation</h2>

        <div class="card">
          <p class="crop">${result.recommendedCrop}</p>
          <p>
            <strong>Crop Suitability:</strong>
            ${result.cropSuitability}%
          </p>
        </div>
      </div>

      <div class="section">
        <h2>🧴 Fertilizer Recommendation</h2>

        <div class="card">
          <p>${result.fertilizer}</p>
        </div>
      </div>

      <div class="section">
        <h2>🌱 pH Recommendation</h2>

        <div class="card">
          <p>${result.phRecommendation}</p>
        </div>
      </div>

      <div class="section">
        <h2>💡 Soil Improvement Suggestions</h2>

        <div class="card">
          <p>${result.improvements}</p>
        </div>
      </div>

      <div class="section">
        <h2>🏆 Top Crop Recommendations</h2>

        <div class="card">
          ${result.topCrops
            .map(
              (
                item: { crop: string; score: number },
                index: number
              ) => `
                <p>
                  <strong>#${index + 1}</strong>
                  ${item.crop}
                  — ${item.score}%
                </p>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="footer">
        <p>Generated by SoilSmart — AI-Powered Soil Analytics</p>
        <p>This report is intended as a decision-support tool.</p>
      </div>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>

    </body>
    </html>
  `);

  reportWindow.document.close();
};  


const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};
  return (
    <main className="min-h-screen bg-green-50 text-gray-900">

      {/* Header */}
      <header className="bg-green-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            🌱 SoilSmart
          </h1>
        <nav className="flex items-center gap-4">

  <a
    href="#"
    className="hover:text-green-200"
  >
    Home
  </a>

  <a
    href="#soil-form"
    className="hover:text-green-200"
  >
    Recommendations
  </a>

  <a
    href="#about"
    className="hover:text-green-200"
  >
    About
  </a>

  {user ? (
    <div className="flex items-center gap-3">

      <div className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold">
        👤 {user.name}
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>
  ) : (
    <a
      href="/login"
      className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
    >
      🔐 Login
    </a>
  )}

</nav>
  
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-green-800">
            🌾 Smart Soil & Crop Recommendations
          </h2>

          <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto">
            Get simple recommendations for soil health,
            suitable crops, fertilizers and better crop management.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("soil-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg
                       font-semibold hover:bg-green-800 transition"
          >
            Get Recommendation 🌱
          </button>

        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="text-4xl">
              🧪
            </div>

            <h3 className="text-xl font-bold mt-4 text-green-800">
              Soil Analysis
            </h3>

            <p className="text-gray-600 mt-2">
              Analyze important soil parameters such as
              Nitrogen, Phosphorus, Potassium and pH.
            </p>

          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="text-4xl">
              🌾
            </div>

            <h3 className="text-xl font-bold mt-4 text-green-800">
              Crop Recommendation
            </h3>

            <p className="text-gray-600 mt-2">
              Find crops that are suitable for your
              soil conditions.
            </p>

          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="text-4xl">
              💧
            </div>

            <h3 className="text-xl font-bold mt-4 text-green-800">
              Soil Health
            </h3>

            <p className="text-gray-600 mt-2">
              Understand soil health and receive
              improvement suggestions.
            </p>

          </div>

        </div>
      </section>

      {/* Soil Input Form */}
      <section
        id="soil-form"
        className="px-6 py-12"
      >
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-green-800 text-center">
            Enter Soil Information
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Enter your soil details to receive recommendations.
          </p>

          {/* Soil Type and Crop */}
          <div className="grid md:grid-cols-2 gap-5 mt-8">

            {/* Soil Type */}
            <div>

              <label className="block font-semibold mb-2 text-gray-900">
                Soil Type
              </label>

              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="">
                  Select soil type
                </option>

                <option value="Alluvial">
                  Alluvial Soil
                </option>

                <option value="Arid">
                  Arid Soil
                </option>

                <option value="Black">
                  Black Soil
                </option>

                <option value="Laterite">
                  Laterite Soil
                </option>

                <option value="Mountain">
                  Mountain Soil
                </option>

                <option value="Red">
                  Red Soil
                </option>

                <option value="Yellow">
                  Yellow Soil
                </option>
              </select>

            </div>

            {/* Preferred Crop */}
            <div>

              <label className="block font-semibold mb-2 text-gray-900">
                Preferred Crop
              </label>

              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
              >
                <option value="">
                  Select crop
                </option>

                <option value="Rice">
                  Rice
                </option>

                <option value="Wheat">
                  Wheat
                </option>

                <option value="Maize">
                  Maize
                </option>

                <option value="Cotton">
                  Cotton
                </option>

                <option value="Groundnut">
                  Groundnut
                </option>

                <option value="Sugarcane">
                  Sugarcane
                </option>
              </select>

            </div>

          </div>

{/* Soil Image Analysis */}
<div className="mb-6">
  <label className="block font-semibold mb-2 text-gray-700">
    📸 Upload Soil Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
  const file = e.target.files?.[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setSoilImage(imageUrl);
  }
}}
    className="w-full border border-gray-300 rounded-lg p-3 bg-white"
  />

{soilImage && (
  <div className="mt-4">
    <p className="font-semibold text-gray-700 mb-2">
      🖼️ Selected Soil Image
    </p>

    <img
      src={soilImage}
      alt="Selected soil"
      className="w-full max-w-md h-64 object-cover rounded-xl border-2 border-green-300 shadow-md"
    />
  </div>
)}
{detectedSoilType && (
  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
    <p className="text-sm text-green-700 font-semibold">
      🤖 AI Soil Classification
    </p>

    <p className="text-2xl font-bold text-green-800 mt-1">
      🌱 {detectedSoilType}
    </p>
  </div>
)}

  <p className="text-sm text-gray-500 mt-2">
    Upload a clear image of your soil for soil-type analysis.
  </p>
</div>

          {/* N P K */}
          <div className="grid md:grid-cols-3 gap-5 mt-5">

            {/* Nitrogen */}
            <div>

              <label className="block font-semibold mb-2 text-gray-900">
                Nitrogen (N)
              </label>

              <input
                type="number"
                placeholder="Enter N value"
                value={nitrogen}
                onChange={(e) => setNitrogen(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
              />

            </div>

            {/* Phosphorus */}
            <div>

              <label className="block font-semibold mb-2 text-gray-900">
                Phosphorus (P)
              </label>

              <input
                type="number"
                placeholder="Enter P value"
                value={phosphorus}
                onChange={(e) => setPhosphorus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
              />

            </div>

            {/* Potassium */}
            <div>

              <label className="block font-semibold mb-2 text-gray-900">
                Potassium (K)
              </label>

              <input
                type="number"
                placeholder="Enter K value"
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
              />

            </div>

          </div>

          {/* pH */}
          <div className="mt-5">

            <label className="block font-semibold mb-2 text-gray-900">
              Soil pH
            </label>

            <input
              type="number"
              step="0.1"
              placeholder="Example: 6.5"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
            />

          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeSoil}
            className="w-full mt-8 bg-green-700 text-white py-3 rounded-lg
                       font-bold hover:bg-green-800 transition"
          >
            Analyze Soil 🌱
          </button>

{/* Voice Assistant */}
<div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">

  <h3 className="text-xl font-bold text-blue-800">
    🎤 Voice Assistant
  </h3>

  <p className="text-gray-700 mt-2">
    Listen to your soil analysis in your preferred language and voice.
  </p>

  <div className="grid md:grid-cols-2 gap-4 mt-4">

    {/* Language */}
    <div>
      <label className="block font-semibold text-gray-800 mb-2">
        🌐 Language
      </label>

      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
          setSelectedVoice("");
        }}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
      >
        <option value="en-IN">English</option>
        <option value="te-IN">తెలుగు (Telugu)</option>
        <option value="hi-IN">हिन्दी (Hindi)</option>
      </select>
    </div>

    {/* Voice */}
    <div>
      <label className="block font-semibold text-gray-800 mb-2">
        🗣️ Voice
      </label>

      <select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
      >
        <option value="">
          Default Voice
        </option>

        {voices
          .filter((voice) =>
            voice.lang
              .toLowerCase()
              .startsWith(language.split("-")[0])
          )
          .map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
      </select>
    </div>

  </div>

  <div className="flex gap-3 mt-5">

    <button
      onClick={speakAnalysis}
      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
    >
      🔊 Speak Analysis
    </button>

    <button
      onClick={stopSpeaking}
      className="px-6 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition"
    >
      ⛔ Stop
    </button>
<button
  onClick={startVoiceInput}
  className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
>
  {isListening ? "🎤 Listening..." : "🎤 Voice Input"}
</button>

  </div>
{voiceText && (
  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
    <p className="font-semibold text-green-800">🎤 Voice Input:</p>
    <p className="text-gray-700 mt-1">{voiceText}</p>
  </div>
)}
<button
  onClick={downloadReport}
  className="w-full mt-4 bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition"
>
  🖨️ Generate PDF Report
</button>
</div>

</div>
</section>

{/* Recommendation Results */}

      {/* Recommendation Results */}
      {result && (
        <section className="px-6 pb-12">

          <div className="max-w-5xl mx-auto">

            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
              🌱 Soil Analysis Results
            </h2>

            {/* Soil Health Score */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">

              <h3 className="text-xl font-semibold text-gray-700">
                Soil Health Score
              </h3>

              <div className="text-5xl font-bold text-green-700 mt-3">
                {result.score}/100
              </div>

              <p className="text-lg font-semibold mt-2">
                {result.healthStatus}
              </p>

            </div>

            {/* Nutrient Status */}
            <div className="grid md:grid-cols-3 gap-5 mb-6">

              {/* Nitrogen */}
              <div className="bg-white rounded-xl shadow p-6 text-center">

                <div className="text-3xl">
                  🌿
                </div>

                <h3 className="font-bold mt-2">
                  Nitrogen (N)
                </h3>

                <p className="text-green-700 font-semibold mt-2">
                  {result.nStatus}
                </p>

              </div>

              {/* Phosphorus */}
              <div className="bg-white rounded-xl shadow p-6 text-center">

                <div className="text-3xl">
                  🌱
                </div>

                <h3 className="font-bold mt-2">
                  Phosphorus (P)
                </h3>

                <p className="text-green-700 font-semibold mt-2">
                  {result.pStatus}
                </p>

              </div>

              {/* Potassium */}
              <div className="bg-white rounded-xl shadow p-6 text-center">

                <div className="text-3xl">
                  🥬
                </div>

                <h3 className="font-bold mt-2">
                  Potassium (K)
                </h3>

                <p className="text-green-700 font-semibold mt-2">
                  {result.kStatus}
                </p>

              </div>

            </div>

          {/* Crop Recommendation */}
<div className="bg-yellow-50 rounded-xl p-6 mb-5">
  <h3 className="text-xl font-bold text-green-800">
    🌾 Suitable Crop
  </h3>

  <p className="mt-2 text-gray-900">
    Based on the entered soil conditions, a suitable crop is:

    <span className="font-bold ml-2">
      {result.recommendedCrop}
    </span>
  </p>

  <div className="mt-4">
    <p className="font-semibold text-gray-900">
      Crop Suitability: {result.cropSuitability}%
    </p>

    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
      <div
        className="bg-green-600 h-3 rounded-full"
        style={{ width: `${result.cropSuitability}%` }}
      ></div>
    </div>
  </div>
</div>

{/* Top Crop Recommendations */}
<div className="bg-white rounded-xl shadow p-6 mb-5">
  <h3 className="text-xl font-bold text-green-800">
    🌾 Top Crop Recommendations
  </h3>

  <div className="mt-4 space-y-3">
    {result.topCrops.map(
      (
        item: { crop: string; score: number },
        index: number
      ) => (
        <div
          key={item.crop}
          className="flex items-center justify-between bg-green-50 p-4 rounded-lg"
        >
          <div>
            <span className="font-bold text-green-800">
              #{index + 1}
            </span>

            <span className="ml-3 font-semibold text-gray-900">
              {item.crop}
            </span>
          </div>

          <span className="font-bold text-green-700">
            {item.score}%
          </span>
        </div>
      )
    )}
  </div>
</div>
            {/* Fertilizer Recommendation */}
            <div className="bg-green-100 rounded-xl p-6 mb-5">

              <h3 className="text-xl font-bold text-green-800">
                🌾 Fertilizer Recommendation
              </h3>

              <p className="mt-2 text-gray-700">
                Recommended fertilizer:

                <span className="font-bold ml-2">
                  {result.fertilizer}
                </span>
              </p>

            </div>

            

            {/* pH Recommendation */}
<div className="bg-blue-50 rounded-xl p-6">

  <h3 className="text-xl font-bold text-blue-800">
    🧪 pH Recommendation
  </h3>

  <p className="mt-2 text-gray-700">
    {result.phRecommendation}
  </p>

</div>


{/* Soil Improvement Recommendations */}
<div className="bg-white rounded-xl shadow p-6 mt-5">

  <h3 className="text-xl font-bold text-green-800">
    🌱 Soil Improvement Recommendations
  </h3>

  <ul className="mt-4 space-y-3">
    {result.improvements.map(
      (item: string, index: number) => (
        <li
          key={index}
          className="bg-green-50 p-4 rounded-lg text-gray-900"
        >
          🌿 {item}
        </li>
      )
    )}
  </ul>

</div>
</div>
        </section>
      )}

{/* Soil Health Dashboard */}
{result && (
  <section className="max-w-6xl mx-auto px-6 py-8">

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-green-800 mb-2">
        📊 Soil Health Dashboard
      </h2>

      <p className="text-gray-600 mb-6">
        A visual summary of your soil nutrient condition.
      </p>

      {/* Nutrient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Nitrogen */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">
              🧪 Nitrogen (N)
            </h3>

            <span className="text-2xl font-bold text-blue-700">
              {result.nitrogen}
            </span>
          </div>

          <p className="mt-2 font-semibold text-gray-700">
            Status: {result.nStatus}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{
                width: `${Math.min((result.nitrogen / 120) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Phosphorus */}
        <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">
              🧪 Phosphorus (P)
            </h3>

            <span className="text-2xl font-bold text-purple-700">
              {result.phosphorus}
            </span>
          </div>

          <p className="mt-2 font-semibold text-gray-700">
            Status: {result.pStatus}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-purple-600 h-3 rounded-full"
              style={{
                width: `${Math.min((result.phosphorus / 100) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Potassium */}
        <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">
              🧪 Potassium (K)
            </h3>

            <span className="text-2xl font-bold text-orange-700">
              {result.potassium}
            </span>
          </div>

          <p className="mt-2 font-semibold text-gray-700">
            Status: {result.kStatus}
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div
              className="bg-orange-500 h-3 rounded-full"
              style={{
                width: `${Math.min((result.potassium / 100) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>

      </div>

      {/* Soil Health Score */}
      <div className="mt-6 bg-green-50 rounded-xl p-6">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-xl font-bold text-green-800">
              💚 Overall Soil Health
            </h3>

            <p className="text-gray-700 mt-1">
              Current soil health condition
            </p>
          </div>

          <div className="text-right">
            <p className="text-4xl font-bold text-green-700">
              {result.score}%
            </p>

            <p className="font-semibold text-gray-700">
              {result.healthStatus}
            </p>
          </div>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-5 mt-5">
          <div
            className="bg-green-600 h-5 rounded-full transition-all duration-700"
            style={{
              width: `${result.score}%`,
            }}
          ></div>
        </div>

      </div>

    </div>

  </section>
)}

{/* Analysis History */}
<section className="max-w-6xl mx-auto px-6 py-12">

  <div className="bg-white rounded-2xl shadow-lg p-6">

    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-green-800">
          📜 Analysis History
        </h2>

        <p className="text-gray-600 mt-1">
          View your previous soil analysis results.
        </p>
      </div>

      {history.length > 0 && (
        <button
          onClick={() => {
            setHistory([]);
            localStorage.removeItem("soilAnalysisHistory");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          🗑️ Clear History
        </button>
      )}
    </div>

    {history.length === 0 ? (
      <div className="text-center py-10 bg-green-50 rounded-xl">
        <div className="text-5xl mb-3">🌱</div>

        <p className="text-gray-700 font-semibold">
          No previous analyses yet.
        </p>

        <p className="text-gray-500 mt-1">
          Analyze your soil to create your first history record.
        </p>
      </div>
    ) : (
      <div className="space-y-4">

        {history.map((item: any, index: number) => (
          <div
            key={item.id}
            className="border border-green-100 rounded-xl p-5 bg-green-50"
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>
                <p className="text-sm text-gray-500">
                  Analysis #{history.length - index}
                </p>

                <h3 className="text-lg font-bold text-green-800">
                  🌾 {item.recommendedCrop}
                </h3>

                <p className="text-sm text-gray-600">
                  {item.date}
                </p>
              </div>

              <div className="bg-white rounded-lg px-5 py-3 text-center shadow-sm">
                <p className="text-sm text-gray-500">
                  Soil Health
                </p>

                <p className="text-2xl font-bold text-green-700">
                  {item.score}%
                </p>

                <p className="text-sm font-semibold text-gray-700">
                  {item.healthStatus}
                </p>
              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">

              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Nitrogen
                </p>
                <p className="font-bold text-gray-900">
                  {item.nitrogen}
                </p>
                <p className="text-sm text-green-700">
                  {item.nStatus}
                </p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Phosphorus
                </p>
                <p className="font-bold text-gray-900">
                  {item.phosphorus}
                </p>
                <p className="text-sm text-green-700">
                  {item.pStatus}
                </p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Potassium
                </p>
                <p className="font-bold text-gray-900">
                  {item.potassium}
                </p>
                <p className="text-sm text-green-700">
                  {item.kStatus}
                </p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Soil pH
                </p>
                <p className="font-bold text-gray-900">
                  {item.ph}
                </p>
              </div>

              <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-500">
                  Fertilizer
                </p>
                <p className="font-bold text-green-800">
                  {item.fertilizer}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>
    )}

  </div>

</section>
      {/* About */}
      <section
        id="about"
        className="px-6 py-12 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-green-800">
            🌱 About SoilSmart
          </h2>

          <p className="mt-4 text-gray-600">
            SoilSmart is an AI-powered soil analytics application
            designed to help farmers understand soil conditions,
            identify nutrient deficiencies and receive crop
            management recommendations.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white text-center py-6">

        <p>
          🌱 SoilSmart — AI-Powered Soil Analytics
        </p>

        <p className="text-green-200 text-sm mt-1">
          Smart decisions for better crop management
        </p>

      </footer>

    </main>
  );
}