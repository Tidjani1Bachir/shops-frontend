import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  const colorClasses = {
    "yellow-500": "text-yellow-400",
    "yellow-400": "text-yellow-400",
    "pink-500": "text-pink-400",
    "blue-500": "text-blue-400",
  };

  const starColor = colorClasses[color] || "text-yellow-400";

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar
            key={`full-${index}`}
            className={`${starColor} text-lg drop-shadow-md`}
          />
        ))}

        {halfStars === 1 && (
          <FaStarHalfAlt className={`${starColor} text-lg drop-shadow-md`} />
        )}

        {[...Array(emptyStar)].map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            className={`${starColor} opacity-30 text-lg`}
          />
        ))}
      </div>

      {text && (
        <span className={`${starColor} font-semibold text-sm lg:text-base whitespace-nowrap`}>
          {text}
        </span>
      )}
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};

export default Ratings;
