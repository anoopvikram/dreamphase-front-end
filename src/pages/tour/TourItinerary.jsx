import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const availableActivities = [
  { id: 1, name: 'Red Fort Visit' },
  { id: 2, name: 'Qutub Minar Tour' },
  { id: 3, name: 'India Gate Evening Walk' },
  { id: 4, name: 'Akshardham Light Show' },
];

export const TourItinerary = () => {
  const location = useLocation();
  const state = location.state || {};
  const payload = state.payload || {};
  const numberOfNights = payload.num_nights || 4;
  const number_of_adults = payload.number_of_adults || 1;

  const [travelerCount, setTravelerCount] = useState(number_of_adults);
  const totalDays = numberOfNights + 1;

  const [dayActivities, setDayActivities] = useState({});
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [modalDayIndex, setModalDayIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const totalPrice = 12561;
  const perPersonPrice = totalPrice / travelerCount;

  const handleAddActivity = () => {
    if (modalDayIndex !== null && selectedActivityId) {
      const selectedActivity = availableActivities.find(
        act => act.id === parseInt(selectedActivityId)
      );

      setDayActivities(prev => {
        const currentActivities = prev[modalDayIndex] || [];

        const alreadyExists = currentActivities.some(
          act => act.id === selectedActivity.id
        );
        if (alreadyExists) return prev;

        return {
          ...prev,
          [modalDayIndex]: [...currentActivities, selectedActivity],
        };
      });

      setShowModal(false);
      setSelectedActivityId('');
      setModalDayIndex(null);
    }
  };

  const alreadySelected = Object.values(dayActivities).flat();
  const getFilteredActivities = () =>
    availableActivities.filter(
      act => !alreadySelected.find(sel => sel.id === act.id)
    );

  return (
    <>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 text-black bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add Activity</h3>
            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={selectedActivityId}
              onChange={e => setSelectedActivityId(e.target.value)}
            >
              <option value="">Select activity</option>
              {getFilteredActivities().map(act => (
                <option key={act.id} value={act.id}>
                  {act.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddActivity}
                className="bg-[#1A4470] text-white px-3 py-1 rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN ITINERARY */}
      <div className="flex flex-row w-full md:w-3/4 mx-auto text-black gap-20 py-30 p-6">
        <div className="flex w-full flex-col gap-6">
          {Array.from({ length: totalDays }, (_, index) => {
            const isFirst = index === 0;
            const isLast = index === totalDays - 1;

            const currentDate = new Date(2025, 7, 31);
            currentDate.setDate(currentDate.getDate() + index);
            const formattedDate = currentDate.toLocaleDateString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            const activities = dayActivities[index] || [];

            return (
              <div key={index}>
                <div className="bg-white flex flex-col p-4 rounded-xl">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-xl font-bold mb-2">
                      Day {index + 1} : {formattedDate}
                    </h2>
                    {isFirst && (
                      <div className="flex justify-end mb-3">
                        <button className="bg-[#1A4470] text-white text-sm px-4 py-1 rounded">
                          Update Arrival Details
                        </button>
                      </div>
                    )}
                    {isLast && (
                      <div className="flex justify-end mb-3">
                        <button className="bg-[#1A4470] text-white text-sm px-4 py-1 rounded">
                          Update Departure Details
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#0E375533] p-4 rounded-lg shadow-sm">
                    <p className="text-xl text-gray-700 pb-3 mb-4 p-2">
                      {isFirst ? (
                        <>
                          Arrival at Delhi & Hotel Check-in<br />
                          <span className="text-sm text-gray-600">
                            Our staff welcomes you at Delhi Airport. Transfer to hotel, check-in and relax. Spend the rest of the day at leisure or explore nearby areas on your own.
                          </span>
                        </>
                      ) : isLast ? (
                        <>
                          Final Day & Departure<br />
                          <span className="text-sm text-gray-600">
                            Enjoy breakfast and check out. You’ll be dropped at Delhi Airport or Railway Station. Thank you for choosing us for your travel!
                          </span>
                        </>
                      ) : index === 1 ? (
                        <>
                          Delhi Heritage Tour<br />
                          <span className="text-sm text-gray-600">
                            Visit Red Fort and Jama Masjid. Enjoy a rickshaw ride at Chandni Chowk. A day full of old Delhi charm and street vibes.
                          </span>
                        </>
                      ) : index === 2 ? (
                        <>
                          Mughal Delhi Visit<br />
                          <span className="text-sm text-gray-600">
                            See Qutub Minar and Humayun’s Tomb. Stop by the peaceful Lotus Temple before heading back to the hotel.
                          </span>
                        </>
                      ) : index === 3 ? (
                        <>
                          Modern Delhi Highlights<br />
                          <span className="text-sm text-gray-600">
                            Explore Akshardham Temple. End your day with a light and sound show before returning to relax.
                          </span>
                        </>
                      ) : (
                        'Day at Leisure'
                      )}
                    </p>

                    <hr />

                    <ul className="text-sm mt-3 mb-4">
                      <li className="bg-[#0068A34D] w-fit p-1 my-1 rounded text-gray-600">
                        🛏️ Overnight stay at The Grand Delhi Hotel
                      </li>
                      {index > 0 && index !== totalDays - 1 && (
                        <li>🍳 Breakfast Included</li>
                      )}
                      {activities.map(activity => (
                        <li key={activity.id} className="text-sm text-gray-700">
                          ✅ {activity.name}
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-between items-center">
                      {isFirst && (
                        <button className="bg-[#1A4470] text-white text-sm px-4 py-1 rounded">
                          Change Hotel
                        </button>
                      )}
                      {isLast && (
                        <button className="bg-[#1A4470] text-white text-sm px-4 py-1 rounded">
                          Change Day
                        </button>
                      )}
                      {!isFirst && !isLast && (
                        <button
                          onClick={() => {
                            setModalDayIndex(index);
                            setShowModal(true);
                          }}
                          className="ml-auto bg-[#1A4470] text-white text-sm px-4 py-1 rounded"
                        >
                          + Activities
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price Summary */}
        <div className="w-full sm:w-3/4 xl:w-1/2">
          <div className="price-summary border rounded-xl p-4 shadow-md bg-white flex flex-col gap-4">
            <h2 className="text-2xl text-center font-semibold bg-[#164B71] text-white px-3 py-2 -mx-10 rounded-xl">
              Price Summary
            </h2>

            <div className="text-sm">
              <div className="flex justify-between items-center mb-2">
                <p>👤 Traveler</p>
                <div className="flex items-center gap-2 px-3 py-1 rounded">
                  <button onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}>-</button>
                  <span>{travelerCount}</span>
                  <button onClick={() => setTravelerCount(travelerCount + 1)}>+</button>
                </div>
              </div>

              <div className="flex justify-between">
                <p>Price per person</p>
                <p>₹{perPersonPrice}</p>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <p>Net Price</p>
              <p>₹{totalPrice}</p>
            </div>

            <button className="bg-[#0068A3] text-white p-1 px-5 mx-auto rounded-lg mt-3 text-sm">
              Get Your Visa Or Full Refund
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
