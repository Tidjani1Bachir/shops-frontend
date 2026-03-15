import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="relative">
      {favoriteCount > 0 && (
        <span className="absolute -right-2 -top-3 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-br from-pink-600 to-pink-500 rounded-full shadow-lg ring-2 ring-gray-900 animate-pulse hover:animate-none transition-all duration-300 transform hover:scale-110">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
