import React from 'react'
import { Link } from 'react-router-dom';
import { TbMailFilled } from "react-icons/tb";
import { BsTelephoneFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { SlSocialYoutube } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";


export const Footer = () => {
  return (
    <footer className='flex flex-col mt-5'>
                <div className='bg-black/7 py-2 items-center'>
                    <div className=' flex flex-row w-3/4 mx-auto gap-5  lg:pr-5 items-center justify-evenly'>
                        <img src='/images/footer/verisign.png' className='w-11 lg:w-18'/>
                        <img src='/images/footer/americanex.png' className='w-11 lg:w-18'/>
                        <img src='/images/footer/mastercard.png' className='w-11 lg:w-18'/>
                        <img src='/images/footer/visa.png' className='w-11 lg:w-18'/>
                        <img src="/images/footer/rupay.png" className="w-11 lg:w-30 h-auto" />

                        <img src='/images/footer/iata.png' className='w-11 lg:w-18'/>
                    </div>
                </div>
                

        <div className='flex flex-col lg:flex-row  pt-10 bg-[#FFFFFF] text-black w-4/5 mx-auto gap-5 mb-10'>
            <div className='footer-left flex flex-col space-y-4 justify-center lg:justify-start gap-4 lg:max-w-1/4'>

                    <div className='flex    lg:gap-5 gap-10 lg:border-0 border-b lg:p-0 pb-5'>
                        <p>
                            <FaLocationDot style={{ display: 'inline', verticalAlign: 'middle', color: '#0F3753' }} /> Dreamphase Travel and Tours LLP
                            2nd Floor, UL Cyber Park, Calicut, Kerala
                            673016
                        </p>
                     </div>
                
                <div className='flex flex-col ml-4 gap-2 space-y-2 lg:self-baseline self-center lg:border-0 border-b lg:pb-0 pb-5'>
                    <div className='flex flex-row items-center gap-2'><TbMailFilled className='text-[#0F3753]'/><p>hello@dreamphasetravel.com</p></div>
                    <div className='flex flex-row items-center gap-2'><TbMailFilled className='text-[#0F3753]'/><p>info@dreamphasetravel.com</p></div>
                    <div className='flex flex-row items-center gap-2'><BsTelephoneFill  className='text-[#0F3753]'/><p>+91 8304060632</p></div>
                </div>

            </div>
            
                <div className='footer-right  w-full  flex flex-col xl:flex-row gap-5 md:gap-0 items-center justify-evenly'>
                    <div className='flex flex-row gap-10 border-b lg:border-0 pb-10 lg:p-0'>
                        <div className='company text-lg flex flex-col gap-5'>
                            <h2 className='text-4xl text-[#0E3755] font-bold mb-8'>Company</h2>
                            <a href='/about-us'>About Us</a>
                            <a href='/contact'>Contact Us</a>
                            <a href='/blog'>Blog</a>
                            <a href='/careers'>Careers</a>
                        </div>

                        <div className='Support text-lg flex flex-col gap-5'>
                            <h2 className='text-4xl text-[#0E3755] font-bold mb-8'>Support</h2>
                            <a href='/faqs'>FAQs</a>
                            <a href='/terms-and-conditions'>Terms & Conditions</a>
                            <a href='/privacy-policy'>Privacy Policy</a>
                            <a href='/refund-policy'>Refund Policy</a>
                            
                            <a href='/customer-support'>Customer Support</a>
                        </div>
                    </div>
                    
                    <div className='flex flex-row  justify-between gap-10'>
                        <div className='Explore text-lg flex flex-col gap-5'>
                            <h2 className='text-4xl text-[#0E3755] font-bold mb-8'>Explore</h2>
                            <a href='/'>Tour</a>
                            <a href='/visa'>Visa Services</a>
                            <a href='/insurance'>Travel Insurance</a>
                            <a href='/group-tickets'>Group Tickets</a>
                            <a href='/return-cancellation-ticket'>Return Cancellation Ticket</a>
                        </div>

                        <div className='Services text-lg flex flex-col gap-5'>
                            <h2 className='text-4xl text-[#0E3755] font-bold mb-8'>Services</h2>
                            <a href='/flight'>Flights</a>
                            <a href='/attestation'>Attestation</a>
                            <a href='/hotels'>Hotels</a>
                            <a href='/ok-to-board'>Ok to board</a>
                            
                        </div>
                    </div>
                </div>
 
            
        </div>
        <div className='border-t border-black md:w-5/6 mx-auto'>
            <div className='text-black w-14/15 mx-auto md:flex-row flex-col flex justify-between items-center gap-5 h-20 md:text-xl text-md'>
                <p className='text-base text-center'>© 2025 <span className='font-bold'>Welcome to Dreamphase Travel</span>. All rights reserved.</p>
                <div className="socials flex flex-row items-center gap-4   lg:pb-0 pb-5">
                        <a href="https://www.facebook.com/dreamphasetravel/" target="_blank" rel="noopener noreferrer">
                            <RiFacebookCircleLine size={30} className='hover:scale-110 hover:text-blue-500 transition-all duration-300'/>
                        </a>
                        <a href="https://www.instagram.com/dreamphasetravel/" target="_blank" rel="noopener noreferrer">
                            <IoLogoInstagram size={30} className='hover:scale-110 hover:text-pink-500 transition-all duration-300'/>
                        </a>
                        
                        <a href="https://www.linkedin.com/company/dreamphasetravel/" target="_blank" rel="noopener noreferrer">
                            <TiSocialLinkedinCircular size={30} className='hover:scale-110 hover:text-blue-500 transition-all duration-300'/>
                        </a>
                        <a href="https://www.youtube.com/@dreamphasetravel" target="_blank" rel="noopener noreferrer">
                            <SlSocialYoutube size={30} className='hover:scale-110 hover:text-red-500 transition-all duration-300'/>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter size={25} className='hover:scale-110 hover:text-red-500 transition-all duration-300'/>
                        </a>
                </div>
            </div>
        </div>


    </footer>
  )
}

