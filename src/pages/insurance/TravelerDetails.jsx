import React from 'react'

export const TravelerDetails = () => {
  return (
    <div className='flex flex-col items-center py-50 md:py-30 w-full sm:w-3/4 text-black mx-auto'>
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-15 px-4 mt-8">
        {['Travel Details', 'Choose Plan', 'Choose Add-ons', 'Traveller Details', 'Review and Payment'].map((step, i) => (
            <div key={i} className="relative flex-1 flex items-center justify-center">
            
            {/* Line Before */}
            {i !== 0 && (
                <div className={`absolute -translate-x-1/2 top-1/2 transform -translate-y-1/2 h-1 ${
                i <= 3 ? 'bg-[#164B71]' : 'bg-gray-300'
                } w-full z-0`}></div>
            )}

            {/* Circle */}
            <div className={`relative z-10 w-5 h-5 rounded-full border-2 ${
                i === 3 
                ? 'bg-white border-[#164B71]'           // current
                : i < 3
                ? 'bg-[#164B71] border-[#164B71]'       // previous
                : 'bg-gray-300 border-gray-300'         // upcoming
            }`}></div>

            {/* Label */}
            <div className="absolute top-8 text-[13px] font-semibold text-center w-max -translate-x-1/2 left-1/2">
                <p className={`${i <= 2 ? 'text-[#164B71]' : 'text-gray-500'}`}>{step}</p>
            </div>
            </div>
        ))}
        </div>

        <div className='w-3/4 mx-auto flex flex-col rounded-lg border bg-[#edf4f7]'>
            <h1 className='bg-[#1E7291] p-2 text-white pl-10 rounded-t-lg'>Traveller 1</h1>

            {/* Traveler Info */}
            <div className='flex flex-col md:flex-row justify-between gap-4 p-4'>
                <div className='flex flex-col'>
                    <Input type='number' label='Passport Number' />
                    <div className='flex flex-col'>
                        <label className='block text-sm font-medium mb-1'>Address</label>
                        <textarea className='w-full p-2  rounded-sm bg-[#FFFFFF] resize-none h-[60px]' />
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
                    <input type='radio' name='medicalCondition' id='yes' />
                    <label htmlFor='yes'>Yes</label>
                </div>
                <div className='flex items-center gap-2'>
                    <input type='radio' name='medicalCondition' id='no' />
                    <label htmlFor='no'>No</label>
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

            <div className='buttons flex flex-row my-5 gap-15'>
                <button className="mt-2 px-4 py-1 rounded-lg bg-white border border-[#004c99] text-[#004c99] hover:text-white hover:bg-[#004c99]" onClick={() => navigate(-1)}>
                Go back
                </button>
                <button className="mt-2 px-4 py-1 rounded-lg bg-[#004c99] border border-[#004c99] text-white hover:bg-white hover:text-[#004c99]" onClick={()=> navigate('/insurance/details')}>
                Continue
                </button>
            </div>

        </div>
    )
}

const Input = ({ type , label }) => (
    <div className='flex w-full mb-2 items-start flex-col'>
        <label className='text-sm text-black'>{label}</label>
         <input
            type={type}
            className="w-full px-4 py-1 my-1 bg-[#FFFFFF] rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
  
    </div>
 
);

export default TravelerDetails