// src/components/insurance/AddCard.jsx
import React, { useState } from "react";

export const AddCard = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // keep only digits for cardNumber & cvv
    if (name === "cardNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((s) => ({ ...s, cardNumber: digitsOnly }));
    } else if (name === "cvv") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((s) => ({ ...s, cvv: digitsOnly }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Enter valid expiry (MM/YY)";
    } else {
      const [mm, yy] = formData.expiry.split("/").map(Number);
      const now = new Date();
      const expiryDate = new Date(2000 + yy, mm); // month index ok for comparison
      if (expiryDate < now) newErrors.expiry = "Card has expired";
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits";
    if (!formData.name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const maskNumber = (digits) => {
    if (!digits) return "";
    const last4 = digits.slice(-4);
    return `**** **** **** ${last4}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const raw = formData.cardNumber.replace(/\s+/g, "");
      const masked = maskNumber(raw);
      const newCard = {
        number: masked,      // display value
        raw,                 // digits-only, used for detection
        name: formData.name,
        expiry: formData.expiry,
      };

      // call onAdd if provided
      if (typeof onAdd === "function") {
        onAdd(newCard);
      }

      // close modal
      if (typeof onClose === "function") onClose();
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#0F3753]">Enter Credit/Debit Card details</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0F3753] mb-1">Card Number</label>
          <input
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Enter Card Number (digits only)"
            inputMode="numeric"
            maxLength={16}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0F3753]"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#0F3753] mb-1">Expiry</label>
            <input
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0F3753]"
            />
            {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-[#0F3753] mb-1">CVV</label>
            <input
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="Enter CVV"
              inputMode="numeric"
              maxLength={4}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0F3753]"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0F3753] mb-1">Name on Card</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name on card"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#0F3753]"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#0F3753] text-white py-2 rounded-xl font-medium hover:opacity-90"
          >
            Add Card
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
