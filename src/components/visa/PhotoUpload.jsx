import React, { useState } from 'react';

export const PhotoUpload = ({ onChange, label = 'Upload Photo', name = 'photo' }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-[20px] border border-black/10 shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <input
        type="file"
        accept="image/*"
        name={name}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 bg-white file:mr-4 file:py-1 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-[12px] border border-gray-200 shadow-sm"
          />
        </div>
      )}
    </div>
  );
};
