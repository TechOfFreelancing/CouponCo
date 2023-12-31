import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import img1 from '../assets/images/advertise/Advertise With Us.jpg';
import advertise from "../api/advertise";
import { useState } from "react";
import '../styles/advertiseus.css';

const AdvertiseUs = () => {
    const [isAffiliate, setIsAffiliate] = useState(false);
    const handleAffiliateChange = (event) => {
        setIsAffiliate(event.target.value === 'yes');
    };
    return (
        <>
            <div className="px-10 lg:px-28 flex flex-col text-black lg:mx-auto mt-20 lg:mt-32 items-start gap-5">
                <div className="flex flex-col items-start flex-wrap p-5 pb-0">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/advertisewithus" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                Advertise With Us
                            </Link>
                        </li>
                    </ul>
                    <span className="text-2xl font-bold ml-2 mt-5">About Qwik Savings</span>
                </div>
                <div className="w-full ml-2 p-5 pt-0 text-lg">
                    <img className="float-right w-[40%] h-auto m-10 mt-0 mr-0" src={img1} />
                    <p className="text-justify">
                        At  Qwik  Savings,  we  offer  prime  advertising
                        opportunities  to  elevate  your  brand  visibility.
                        Partner  with  us  to  showcase  your  products  or
                        services  to  our  engaged  audience  of
                        thousands.
                    </p>
                    <div className="text-2xl font-semibold my-5">Why  Advertise  With  Us?</div>
                    <ul className="ml-5 list-disc text-justify">
                        {advertise.map((ele, index) => (
                            <li key={index} className="my-5">
                                <span className="font-semibold whitespace-nowrap inline">{ele.text}:</span>
                                <span className="whitespace-wrap"> {ele.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="contactform flex justify-between items-center w-fit p-10 border border-gray-600 shadow-xl rounded-lg bg-white mx-5 mt-5 mb-10">
                    <div className="w-full flex flex-col gap-5">
                        <div className='text-xl font-semibold'>Ready  to  get  started?</div>
                        <div className='text-justify'>Fill  out  the  form  below  to  kickstart  your  advertising  journey  with  Qwik
                            Savings.  Let{`'`}s  collaborate  and  create  impactful  campaigns  that  drive  results.  Your  success  is  our
                            priority,  and  we{`'`}re  here  to  help  you  achieve  your  advertising  goals.  Join  us  today  to  unlock  a
                            world  of  advertising  possibilities!</div>
                        <div className="flex flex-col gap-3">
                            <span className="text-md flex">Full Name <span>*</span></span>
                            <input type="text" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Company Name <span>*</span></span>
                            <input type="text" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Website  URL <span>*</span></span>
                            <input type="text" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Email Address<span>*</span></span>
                            <input type="email" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <label className="block">
                            Are you in an affiliate network?
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio  checked:bg-[#FAF9F5] text-gray-800 focus:outline-none"
                                        name="affiliate"
                                        value="yes"
                                        onChange={handleAffiliateChange}
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio checked:bg-[#FAF9F5] text-gray-800 focus:outline-none"
                                        name="affiliate"
                                        value="no"
                                        onChange={handleAffiliateChange}
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                        </label>
                        {
                            isAffiliate && (<div className="flex flex-col gap-1">
                                <span className="text-md flex">Name of Affiliate Network</span>
                                <input type="text" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                            </div>)
                        }
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Message <span>*</span></span>
                            <textarea type="text" className="w-full bg-[#FAF9F5] h-28 outline-none border rounded-lg p-1 " required />
                        </div>
                        <div className="inline-flex items-center gap-5">
                            <input type="checkbox" className=" bg-[#FAF9F5] w-6 h-6 outline-none border rounded-lg p-1 accent-[#FAF9F5]" />
                            <span className="text-md flex items-center gap-2">I accept the <span className="font-bold cursor-pointer">Privacy Policy</span> </span>
                        </div>

                        <button className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300 w-fit">Submit Form</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AdvertiseUs
