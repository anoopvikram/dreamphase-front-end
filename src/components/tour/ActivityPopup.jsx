// components/ActivityPopup.jsx
import React from 'react';

const locations = [
  'Red Fort',
  'Qutub Minar',
  'India Gate',
  'Lotus Temple',
  'Humayun\'s Tomb',
  'Akshardham Temple',
  'Raj Ghat'
];

export const ActivityPopup = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-semibold mb-4">Select Activity</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {locations.map((place, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSelect(place);
                onClose();
              }}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded text-sm text-gray-700"
            >
              📍 {place}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-[#1A4470] text-white px-4 py-1 rounded text-sm">
          Close
        </button>
      </div>
    </div>
  );
};
