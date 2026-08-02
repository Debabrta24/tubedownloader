import axios from "axios";
import { useState } from "react";
import FormatList from "../FormatList/FormatList";

const Main = () => {
  const [initialValue, setValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlefunctioncall = async () => {
    if (!initialValue.trim()) {
      setError("Please enter a URL first");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/videourlget?url=${encodeURIComponent(initialValue)}`
      );
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch video info. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
        Video Downloader
      </h1>

      {/* Input row */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Paste any video URL here..."
          value={initialValue}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
        <button
          onClick={handlefunctioncall}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Fetching..." : "Get Video"}
        </button>
      </div>

      {error && (
        <p className="text-red-400 mb-6 bg-red-950/40 px-4 py-2 rounded-lg border border-red-900">
          {error}
        </p>
      )}

      {/* Result card */}
      {data && (
        <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
          {data.thumbnail && (
            <img
              className="w-full max-h-80 object-cover"
              src={data.thumbnail}
              alt={data.title || "video thumbnail"}
            />
          )}

          <div className="p-6">
            {data.title && (
              <h2 className="text-xl font-semibold text-white mb-2">
                {data.title}
              </h2>
            )}
            {data.duration && (
              <p className="text-slate-400 text-sm mb-4">
                Duration: {(data.duration / 60).toFixed(2)} min
              </p>
            )}

            <FormatList formats={data.formats} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;