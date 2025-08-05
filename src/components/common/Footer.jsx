import React from 'react'
import { Link } from 'react-router-dom';
import { TbMailFilled } from "react-icons/tb";
import { BsTelephoneFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiFacebookCircleLine } from "react-icons/ri";
import { TiSocialLinkedinCircular } from "react-icons/ti";


export const Footer = () => {
  return (
    <footer className='flex flex-col'>
        <div className='flex flex-col lg:flex-row border-t pt-10 bg-[#FFFFFF] text-black w-4/5 mx-auto gap-5 mb-10'>
            <div className='footer-left flex flex-col justify-center lg:justify-start gap-4 lg:max-w-1/4'>
                <div className="logo lg:self-baseline self-center">
                    <Link to="/">
                        <img src="/images/logo.png" alt="Logo" className="logo-img w-50" />
                    </Link>
                </div>
                <div className='flex flex-row  lg:flex-col lg:gap-5 gap-10 lg:border-0 border-b lg:p-0 pb-5'>
                    <p>Dreamphase Travel and Tours LLP
                        2nd Floor, UL Cyber Park, Calicut, Kerala
                        673016
                    </p>
                    <p>Dreamphase Travel and Tours LLP, 58/167,
                        Koyappathodi Building, South Beach Road,
                        Calicut-673001
                    </p>
                </div>

                <div className='flex flex-col gap-2 lg:self-baseline self-center lg:border-0 border-b lg:pb-0 pb-5'>
                    <div className='flex flex-row items-center gap-2'><TbMailFilled/><p>hello@dreamphasetravel.com</p></div>
                    <div className='flex flex-row items-center gap-2'><TbMailFilled/><p>info@dreamphasetravel.com</p></div>
                    <div className='flex flex-row items-center gap-2'><BsTelephoneFill /><p>+91 8304060632</p></div>
                </div>


                <div className="socials flex flex-row items-center lg:self-baseline self-center gap-2 lg:border-0 border-b lg:pb-0 pb-5">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <RiFacebookCircleLine size={40} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <IoLogoInstagram size={40} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaXTwitter size={30} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <TiSocialLinkedinCircular size={40} />
                    </a>
                </div>
            </div>
            <div className='footer-right flex flex-col  w-full'>
                <div className='right-up flex flex-col lg:flex-row gap-5 md:gap-0 items-center justify-evenly'>
                    <div className='flex flex-row gap-10 border-b lg:border-0 pb-10 lg:p-0'>
                        <div className='company text-lg flex flex-col justify-center items-end lg:items-start gap-5'>
                            <h2 className='text-4xl font-black mb-8'>Company</h2>
                            <a href='/about-us'>About Us</a>
                            <a href='/contact'>Contact Us</a>
                            <a href='/blog'>Blog</a>
                            <a href='/careers'>Careers</a>
                        </div>

                        <div className='Support text-lg flex flex-col gap-5'>
                            <h2 className='text-4xl font-black mb-8'>Support</h2>
                            <a href='/faqs'>FAQs</a>
                            <a href='/terms-and-conditions'>Terms & Conditions</a>
                            <a href='/privacy-policy'>Privacy Policy</a>
                            <a href='/customer-support'>Customer Support</a>
                        </div>
                    </div>
                    
                    <div className='flex flex-row  justify-between gap-10'>
                        <div className='Explore text-lg flex flex-col items-end lg:items-start gap-5'>
                            <h2 className='text-4xl font-black mb-8'>Explore</h2>
                            <a href='/'>Tour</a>
                            <a href='/visa'>Visa Services</a>
                            <a href='/insurance'>Travel Insurance</a>
                            <a href='/travel-mart'>Travel Mart</a>
                        </div>

                        <div className='Services text-lg flex flex-col gap-5'>
                            <h2 className='text-4xl font-black mb-8'>Services</h2>
                            <a href='/flight'>Flights</a>
                            <a href='/attestation'>Attestation</a>
                            <a href='/hotels'>Hotels</a>
                        </div>
                    </div>
                    
                </div>

                <div className='right-down flex flex-row w-full gap-5  mt-5 lg:pr-5 items-center justify-center lg:justify-end'>
                    <img src='/images/footer/verisign.png' className='w-11 lg:w-18'/>
                    <img src='/images/footer/americanex.png' className='w-11 lg:w-18'/>
                    <img src='/images/footer/mastercard.png' className='w-11 lg:w-18'/>
                    <img src='/images/footer/visa.png' className='w-11 lg:w-18'/>
                    <img src='/images/footer/rupay.png' className='w-11 lg:w-20 lg:h-8'/>
                    <img src='/images/footer/iata.png' className='w-11 lg:w-18'/>
                </div>
            </div> 
            
        </div>
        <div className='bg-[#0E3755] flex justify-center items-center h-20 md:text-xl text-md'><p>© 2025 Dreamphase Travel. All rights reserved.</p></div>
    </footer>
  )
}
