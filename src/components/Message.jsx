import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

const Message = ({ variant, children }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          container: "bg-green-900/30 border border-green-700 hover:border-green-600",
          text: "text-green-300",
          icon: <FaCheckCircle className="text-green-400 text-xl" />,
        };
      case "error":
      case "danger":
        return {
          container: "bg-red-900/30 border border-red-700 hover:border-red-600",
          text: "text-red-300",
          icon: <FaTimesCircle className="text-red-400 text-xl" />,
        };
      case "warning":
        return {
          container: "bg-yellow-900/30 border border-yellow-700 hover:border-yellow-600",
          text: "text-yellow-300",
          icon: <FaExclamationTriangle className="text-yellow-400 text-xl" />,
        };
      default:
        return {
          container: "bg-blue-900/30 border border-blue-700 hover:border-blue-600",
          text: "text-blue-300",
          icon: <FaInfoCircle className="text-blue-400 text-xl" />,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} rounded-lg p-4 md:p-5 transition-all duration-300 flex items-start gap-3`}>
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <div className={`${styles.text} font-medium text-sm md:text-base flex-1`}>{children}</div>
    </div>
  );
};

export default Message;
