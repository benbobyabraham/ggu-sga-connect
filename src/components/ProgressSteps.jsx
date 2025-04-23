export default function ProgressSteps({ steps, currentStep }) {
  return (
    <div className="bg-gray-50 px-6 py-4 border-b">
      <div className="flex justify-between">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= idx ? 'bg-gguBlue text-white' : 'bg-gray-200'
              }`}
            >
              {idx + 1}
            </div>
            <span className="ml-2 text-sm font-medium hidden md:block">
              {step.name}
            </span>
            {idx < steps.length - 1 && (
              <div className="w-24 h-px bg-gray-200 mx-4 hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
