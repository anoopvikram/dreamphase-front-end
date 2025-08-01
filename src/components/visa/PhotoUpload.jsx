import React, { useRef, useState } from 'react';
import axios from 'axios';

export const PhotoUpload = ({ onChange, onPassportExtracted, label = 'Upload Photo', name = 'photo' }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const magnifierSize = 150; // diameter of the circle
  const zoomLevel = 3;       // how much to zoom in

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    onChange(file);

    const formData = new FormData();
    formData.append('passport', file);

    try {
      setLoading(true);
      const res = await axios.post(
        'https://website-0suz.onrender.com/api/extract-passport/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (onPassportExtracted) {
        onPassportExtracted(res.data);
      }
    } catch (error) {
      console.error('❌ OCR failed:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

const handleMouseMove = (e) => {
  const { top, left, width, height } = imgRef.current.getBoundingClientRect();
  const x = e.clientX - left;
  const y = e.clientY - top;

  // Percentage position for background
  const posXPercent = (x / width) * 100;
  const posYPercent = (y / height) * 100;

  // Position magnifier offset by half its size so cursor is centered
  setMagnifierPosition({
    x: e.clientX + 20,
    y: e.clientY - magnifierSize / 2,
  });

  setBackgroundPosition(`${posXPercent}% ${posYPercent}%`);
};
  

  return (
    <div className="w-full flex flex-col items-center max-w-md p-6 bg-white rounded-[20px] border border-black/10 shadow-sm relative">
      <label className="block text-sm font-medium text-gray-700 mb-4">{label}</label>

      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name={name}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleClick}
          className="px-6 py-2 bg-[#0068A3] text-white text-sm font-semibold rounded-full hover:bg-blue-900"
        >
          Choose File
        </button>

        <p className="text-sm text-gray-500 mt-1">
          {fileName || 'or drop a file'}
        </p>

        {loading && (
          <p className="text-sm text-[#164B71] mt-2">Extracting passport data...</p>
        )}
      </div>

      {preview && (
        <div className="mt-4 w-full relative">
          <img
            ref={imgRef}
            src={preview}
            alt="Preview"
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseMove}
            className="w-full h-auto object-contain rounded-[12px] border border-gray-200 shadow-sm"
          />

          {showMagnifier && (
            <div
  style={{
    position: 'fixed',
    top: magnifierPosition.y,
    left: magnifierPosition.x,
    width: `${magnifierSize}px`,
    height: `${magnifierSize}px`,
    pointerEvents: 'none',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(0,0,0,0.5)',
    backgroundImage: `url(${preview})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${imgRef.current?.width * zoomLevel}px ${imgRef.current?.height * zoomLevel}px`,
    backgroundPosition: backgroundPosition,
    zIndex: 999,
  }}  
            />
          )}
        </div>
      )}
    </div>
  );
};
