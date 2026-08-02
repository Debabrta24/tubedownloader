const Fotter = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white py-4 px-6 border-t border-green-400/30 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <p className="text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:tracking-widest">
          Created by{" "}
          <span className="font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-pointer">
            Debabrata Paul
          </span>
        </p>

        <span className="hidden sm:block text-green-200">•</span>

        <p className="flex items-center gap-2 text-sm sm:text-base">
          Made with
          <span className="text-red-400 animate-pulse text-lg">❤️</span>
          for love
        </p>
      </div>
    </footer>
  );
};

export default Fotter;