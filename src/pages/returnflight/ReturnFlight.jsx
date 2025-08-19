import React from 'react'
import { LandingHero } from '../../components/common/LandingHero'

export const ReturnFlight = () => {
  return (
    <div className='flex flex-col'>
        <div className="relative z-10">
            <LandingHero activeTab="Tour" animateOnLoad={true} />
        </div>

    </div>
  )
}
