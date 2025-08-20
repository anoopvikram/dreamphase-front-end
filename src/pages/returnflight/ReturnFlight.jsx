// src/pages/ReturnFlight.jsx
import React, { useState } from "react";
import { LandingHero } from "../../components/common/LandingHero";
import FlightSearch from "../../components/common/FlightSearch";

// Passport Regex Map by Country
const passportRegexByCountry = {
  IN: /^[A-PR-WYa-pr-wy][1-9]\d{6}$/, // India
  US: /^[0-9]{9}$/,                   // USA
  UK: /^\d{9}$/,                      // UK
  CA: /^[A-Z]{2}\d{6}$/,              // Canada
  AU: /^[N]\d{7}$/,                   // Australia
  SG: /^[A-Z]\d{7}[A-Z]$/,            // Singapore
  PH: /^[A-Z]\d{7}$/,                 // Philippines
  PK: /^[A-Z]{2}\d{7}$/               // Pakistan
};

export const ReturnFlight = () => {
  const [form, setForm] = useState({
    passport: "",
    firstName: "",
    lastName: "",
    dob: "",
    phoneCountry: "+91",
    phone: "",
    email: "",
  });
  const [files, setFiles] = useState({ visa: null, passportFile: null, ticket: null });
  const [errors, setErrors] = useState({ passport: "", email: "", phone: "" });

  const handleChange = (field, value) => {
    if (field === "passport") {
      const regex = passportRegexByCountry["IN"]; // default India
      if (regex && value.trim() && !regex.test(value.trim())) {
        setErrors(prev => ({ ...prev, passport: "Invalid passport format for IN" }));
      } else {
        setErrors(prev => ({ ...prev, passport: "" }));
      }
    }
    if (field === "email") {
      const ok = !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrors(prev => ({ ...prev, email: ok ? "" : "Invalid email" }));
    }
    if (field === "phone") {
      const ok = !value || /^\d{6,15}$/.test(value);
      setErrors(prev => ({ ...prev, phone: ok ? "" : "Invalid phone number" }));
    }
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFile = (key, file) => {
    setFiles(prev => ({ ...prev, [key]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...form, files });
  };

  return (
    <div className="flex flex-col text-black">
      <div className="relative z-10">
        <LandingHero activeTab="" animateOnLoad={false} />
      </div>

      {/* FlightSearch with custom props for Return Flight */}
      <div className="relative z-20 mt-1 px-4">
        <FlightSearch variant="return" />
      </div>

      {/* Integrated Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 pt-5 mx-auto my-6 px-4"
      >
        {/* top row */}
        <div className="flex flex-row w-4/5 mx-auto gap-6 mb-6">
          <div>
            <label className="text-sm">Passport Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.passport}
              onChange={(e) => handleChange("passport", e.target.value)}
              className="w-full px-3 py-2 border border-[#17659D] bg-[#0E37551A]/50 rounded-md"
              placeholder="Passport Number"
            />
            {errors.passport && <span className="text-red-500 text-xs">{errors.passport}</span>}
          </div>
          <div>
            <label className="text-sm">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full px-3 py-2 border border-[#17659D] bg-[#0E37551A]/50 rounded-md"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="text-sm">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full px-3 py-2 border border-[#17659D] bg-[#0E37551A]/50 rounded-md"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="text-sm">Date of Birth <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full px-3 py-2 border border-[#17659D] bg-[#0E37551A]/50 rounded-md"
            />
          </div>
        </div>

        {/* file inputs */}
<div className="flex flex-col md:flex-row  mx-auto items-center justify-center gap-10 mb-6">
  {/* Visa Copy */}
  <div className="flex items-center gap-3">
    <label className="text-sm w-fit">Visa Copy:</label>
    <div className="flex items-center gap-3">
      <label className="bg-gray-200 border  text-sm px-4 py-1 rounded-md cursor-pointer">
        Choose File
        <input 
          type="file" 
          className="hidden"
          onChange={(e) => handleFile("visa", e.target.files?.[0])} 
        />
      </label>
      <span className="text-xs text-gray-600">
        {files?.visa?.name || "No file chosen"}
      </span>
    </div>
  </div>

  {/* Passport */}
  <div className="flex items-center gap-3">
    <label className="text-sm w-fit">Passport:</label>
    <div className="flex items-center gap-3">
      <label className="bg-gray-200 border  text-sm px-4 py-1 rounded-md cursor-pointer">
        Choose File
        <input 
          type="file" 
          className="hidden"
          onChange={(e) => handleFile("passportFile", e.target.files?.[0])} 
        />
      </label>
      <span className="text-xs text-gray-600">
        {files?.passportFile?.name || "No file chosen"}
      </span>
    </div>
  </div>

  {/* Onward Ticket */}
  <div className="flex items-center gap-3">
    <label className="text-sm w-fit">Onward Ticket:</label>
    <div className="flex items-center gap-3">
      <label className="bg-gray-200 border  text-sm px-4 py-1 rounded-md cursor-pointer">
        Choose File
        <input 
          type="file" 
          className="hidden"
          onChange={(e) => handleFile("ticket", e.target.files?.[0])} 
        />
      </label>
      <span className="text-xs text-gray-600">
        {files?.ticket?.name || "No file chosen"}
      </span>
    </div>
  </div>
</div>


        {/* phone + email */}
        <div className="flex flex-row justify-evenly gap-4 mb-6">
          <div>
            <label className="text-sm">Phone Number <span className="text-red-500">*</span></label>
            <div className="flex gap-2 rounded-md border-[#17659D] border">
              <select
                value={form.phoneCountry}
                onChange={(e) => setForm(prev => ({ ...prev, phoneCountry: e.target.value }))}
                className="px-3 py-2  rounded-md bg-white"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="flex-1 px-3 py-2  rounded-md"
                placeholder="Phone number"
              />
            </div>
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>

          <div>
            <label className="text-sm">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 border border-[#17659D] rounded-md"
              placeholder="Email"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-center mb-8">
          <button type="submit" className="px-6 py-2 bg-[#17659D] text-white rounded-md shadow">
            Submit
          </button>
        </div>

        {/* notes */}
        <div className="max-w-2xl mx-auto text-lg pt-5 text-gray-700 space-y-2">
          <p>* Can be issued only within 24 hrs before your onward travel date.</p>
          <p>* Comes with a confirmed PNR – valid for 20 hrs only.</p>
          <p>* Ticket copy will be emailed to you within 30 minutes – just sit back and relax!</p>
          <p className="mt-4 pt-4 italic text-xl text-center">
            “Return cancellation ticket will be shared in your email 24 hours before your journey.”
          </p>
        </div>
      </form>
    </div>
  );
};
