export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-green-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-green-700 text-center">
          🌱 Soil Analysis
        </h1>

        <p className="text-gray-600 text-center mt-2">
          Enter your soil details
        </p>

        <div className="mt-6 space-y-4">

          <input
            type="number"
            placeholder="Nitrogen (N)"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Phosphorus (P)"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Potassium (K)"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="pH"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Moisture (%)"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            placeholder="Organic Matter (%)"
            className="w-full border rounded-xl p-3"
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">
            Analyze Soil
          </button>

        </div>
      </div>
    </main>
  );
}