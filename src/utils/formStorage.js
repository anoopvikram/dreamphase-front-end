// src/utils/formStorage.js

const FORM_DATA_KEY = 'insuranceFormData';

export const saveFormData = (data) => {
  try {
    const existing = getFormData();
    const updated = { ...existing, ...data };
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving form data:', error);
  }
};

export const getFormData = () => {
  try {
    const stored = localStorage.getItem(FORM_DATA_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading form data:', error);
    return {};
  }
};

export const clearFormData = () => {
  try {
    localStorage.removeItem(FORM_DATA_KEY);
  } catch (error) {
    console.error('Error clearing form data:', error);
  }
};
