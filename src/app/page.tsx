"use client";

import { useState } from "react";

export default function Home() {
  // Input states
  const [soilType, setSoilType] = useState("");
  const [crop, setCrop] = useState("");

  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");

  // Recommendation result
  const [result, setResult] = useState<any>(null);

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
setResult({
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
});
  };

  return (
    <main className="min-h-screen bg-green-50 text-gray-900">

      {/* Header */}
      <header className="bg-green-700 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            🌱 SoilSmart
          </h1>

          <nav className="space-x-6 hidden md:block">
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

        </div>
      </section>

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