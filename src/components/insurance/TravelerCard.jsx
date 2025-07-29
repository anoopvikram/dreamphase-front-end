// components/insurance/TravelerCard.jsx
import React from 'react';

const Input = ({ type, label }) => (
  <div className='flex w-full mb-2 items-start flex-col'>
    <label className='text-sm text-black'>{label}</label>
    <input
      type={type}
      className="w-full px-4 py-1 my-1 bg-[#FFFFFF] rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

const TravelerCard = ({ index }) => {
  return (
    <div className='w-3/4 mx-auto flex flex-col rounded-lg border bg-[#edf4f7] mt-6'>
      <h1 className='bg-[#1E7291] p-2 text-white pl-10 rounded-t-lg'>Traveller {index + 1}</h1>

      {/* Traveler Info */}
      <div className='flex flex-col md:flex-row justify-between gap-4 p-4'>
        <div className='flex flex-col'>
          <Input type='number' label='Passport Number' />
          <div className='flex flex-col'>
            <label className='block text-sm font-medium mb-1'>Address</label>
            <textarea className='w-full p-2 rounded-sm bg-[#FFFFFF] resize-none h-[60px]' />
          </div>
        </div>

        <div className='flex flex-col'>
          <Input type='text' label='Name' />
          <Input type='number' label='Pincode' />
          <Input type='number' label='Mobile No.' />
        </div>

        <div className='flex flex-col'>
          <Input type='date' label='Date of Birth' />
          <Input type='text' label='City' />
          <Input type='email' label='Email' />
        </div>
      </div>

      <hr className='my-2 w-90/100 text-[#A7A6A6] mx-auto' />

      {/* Nominee Details */}
      <div className='px-4 flex sm:w-3/4 flex-col pb-4'>
        <h2 className='text-lg font-semibold mb-2'>Nominee Details</h2>
        <div className='grid grid-cols-2 gap-4'>
          <Input type='text' label='Nominee Name' />
          <Input type='text' label='Relationship of Nominee' />
        </div>

        {/* Medical Condition */}
        <div className='flex items-center gap-4 mt-4'>
          <div className='flex items-center gap-2'>
            <input type='radio' name={`medicalCondition_${index}`} id={`yes_${index}`} />
            <label htmlFor={`yes_${index}`}>Yes</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='radio' name={`medicalCondition_${index}`} id={`no_${index}`} />
            <label htmlFor={`no_${index}`}>No</label>
          </div>
          <p className='ml-2 text-sm'>Does the traveller have a pre-existing medical condition?</p>
          <input
            type='text'
            className='ml-auto border px-2 py-1 rounded w-1/3'
            placeholder='Specify if yes'
          />
        </div>
      </div>
    </div>
  );
};

export default TravelerCard;
