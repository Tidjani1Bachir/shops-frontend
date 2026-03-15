import { FaUser, FaTruck, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Login", icon: FaUser, completed: step1 },
    { label: "Shipping", icon: FaTruck, completed: step2 },
    { label: "Summary", icon: FaClipboardList, completed: step3 },
  ];

  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps Container */}
        <div className="flex items-center justify-between relative">
          {/* Progress Bars Background */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2" style={{ zIndex: 0 }}></div>

          {/* Active Progress Bar */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-pink-600 to-pink-500 -translate-y-1/2 transition-all duration-500"
            style={{
              width:
                step1 && step2 && step3
                  ? "100%"
                  : step1 && step2
                  ? "66.67%"
                  : step1
                  ? "33.33%"
                  : "0%",
              zIndex: 1,
            }}
          ></div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = steps
              .slice(0, index + 1)
              .every((s) => s.completed);
            const isActive = isCompleted || step.completed;
            const StepIcon = step.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center relative"
                style={{ zIndex: 2 }}
              >
                {/* Step Circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 border-4 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-600 to-pink-500 border-pink-500 shadow-lg shadow-pink-500/50 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <FaCheckCircle className="text-2xl" />
                  ) : (
                    <StepIcon className="text-2xl" />
                  )}
                </div>

                {/* Step Label */}
                <p
                  className={`mt-3 font-semibold text-sm md:text-base transition-colors duration-300 ${
                    isActive ? "text-pink-500" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </p>

                {/* Divider */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-24 h-0.5 transform -translate-y-full"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Counter */}
        <div className="md:hidden mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Step{" "}
            <span className="text-pink-500 font-semibold">
              {step1 ? (step2 ? (step3 ? "3" : "2") : "1") : "1"}
            </span>{" "}
            of 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
