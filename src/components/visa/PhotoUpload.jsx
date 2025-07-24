import React, { useState } from 'react';
import axios from 'axios';

export const PhotoUpload = ({ onChange, onPassportExtracted, label = 'Upload Photo', name = 'photo' }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('📤 Selected file:', file);

    setPreview(URL.createObjectURL(file));
    onChange(file); // send file to parent

    const formData = new FormData();    
    formData.append('passport', file);  // ✅ backend expects this key

    console.log('📦 FormData content:', formData.get('image'));


    try {
      setLoading(true);
      console.log('📡 Sending to OCR API...');

      const res = await axios.post(
        'https://website-0suz.onrender.com/api/extract-passport/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ OCR success:', res.data);

      if (onPassportExtracted) {
        onPassportExtracted(res.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('❌ OCR failed:', error.response.status, error.response.data);
      } else {
        console.error('❌ OCR failed:', error.message);
      }

    } finally {
      setLoading(false);
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
                   file:bg-blue-50 file:text-[#164B71]
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

      {loading && <p className="text-sm text-[#164B71] mt-2">Extracting passport data...</p>}
    </div>
  );
};
