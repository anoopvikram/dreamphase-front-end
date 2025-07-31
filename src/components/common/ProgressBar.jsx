import React from 'react';

export const ProgressBar = ({ currentStepIndex, steps }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
      {steps.map((step, i) => (
        <div key={i} className="relative flex-1 flex items-center justify-center">
          {i !== 0 && (
            <div
              className={`absolute z-30 -translate-x-13/32 md:-translate-x-14/32 lg:-translate-x-15/32 top-1/2 transform -translate-y-1/2 h-1 ${
                i <= currentStepIndex ? 'bg-[#0068A3]' : 'bg-gray-300'
              } w-full z-0`}
            ></div>
          )}

          <div
            className={`relative z-10 rounded-full border-2 ${
              i === currentStepIndex
                ? 'bg-[#0068A3] w-7 h-7 border-[#D9D9D9] border-8'
                : i < currentStepIndex
                ? 'bg-[#0068A3] w-6 h-6 border-[#0068A3]'
                : 'bg-gray-300 w-6 h-6 border-gray-300'
            }`}
          ></div>

          <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
            <p className={`${i <= currentStepIndex ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
