const Main = () => {
  return (
    <>
      <div className="min-h-[80vh] bg-gradient-to-br from-slate-900 via-gray-900 to-black flex flex-col items-center justify-start py-12 px-4">

        {/* Input Section */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 rounded-xl border border-gray-600 bg-white/10 backdrop-blur-md px-5 py-3 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-green-400 focus:ring-2 focus:ring-green-400 hover:border-green-300"
            type="text"
            placeholder="Paste your video URL here..."
          />

          <button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-green-500/40 active:scale-95">
            ⬇ Download
          </button>
        </div>

        {/* Options */}
        <div className="mt-10 w-full max-w-3xl rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-lg p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-bold text-white">
            Available Options
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="cursor-pointer rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-center text-white transition-all duration-300 hover:scale-105 hover:border-green-400 hover:bg-green-500/20">
              🎥 MP4
            </div>

            <div className="cursor-pointer rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-center text-white transition-all duration-300 hover:scale-105 hover:border-green-400 hover:bg-green-500/20">
              🎵 MP3
            </div>

            <div className="cursor-pointer rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-center text-white transition-all duration-300 hover:scale-105 hover:border-green-400 hover:bg-green-500/20">
              📺 HD
            </div>

            <div className="cursor-pointer rounded-xl border border-gray-700 bg-gray-800/50 p-4 text-center text-white transition-all duration-300 hover:scale-105 hover:border-green-400 hover:bg-green-500/20">
              ⚡ Fast
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;