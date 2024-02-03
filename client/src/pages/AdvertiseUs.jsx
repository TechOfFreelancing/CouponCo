import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import img1 from '../assets/images/advertise/Advertise With Us.jpg';

import ads from "../api/advertise";
import { useState } from "react";
import '../styles/advertiseus.css';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AdvertiseUs = () => {

    const [advertise, setAdvertise] = useState({
        name: '',
        company: '',
        url: '',
        email: '',
        affiliate: 'No',
        affiliate_network: '',
        message: '',
        isAccepted: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdvertise((prev) => ({
            ...prev,
            [name]: e.target.type === 'checkbox' ? e.target.checked : value
        }))
    }

    console.log(advertise);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, company, url, email, affiliate, affiliate_network, message, isAccepted } = advertise;

        if (affiliate === 'Yes' && !affiliate_network) return toast.error("Please fill affiliate network")

        if (!isAccepted) return toast.error("Please Accept Privacy Policy");

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:4000/api/advertise/${localStorage.getItem('id')}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: advertise
        };

        await axios.request(config)
            .then((response) => {
                setAdvertise({
                    name: '',
                    company: '',
                    url: '',
                    email: '',
                    affiliate: 'No',
                    affiliate_network: '',
                    message: '',
                    isAccepted: '',
                })
                toast.success("Data sent successfully");
            })
            .catch((error) => {
                toast.error(error.response.data);
            });


    }

    return (
        <>
            <Toaster position="top-center"></Toaster>

            <div className="px-5 lg:px-28 flex flex-col text-black lg:mx-auto mt-28 mb-5 lg:mt-32 items-start gap-5">
                <div className="flex flex-col items-start flex-wrap lg:p-5 lg:pb-0">
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
                    <span className="text-xl lg:text-2xl font-bold lg:ml-2 mt-5">Advertise With Us</span>
                </div>
                <div className="w-full lg:ml-2 lg:p-5 lg:pt-0 text-lg lg:-mt-20">
                    <img className="lg:float-right w-full  lg:w-[45%] h-auto lg:m-10 lg:mt-0 lg:mr-0" src={img1} />
                    <p className="text-justify lg:mt-20">
                        At  Qwik  Savings,  we  offer  prime  advertising
                        opportunities  to  elevate  your  brand  visibility.
                        Partner  with  us  to  showcase  your  products  or
                        services  to  our  engaged  audience  of
                        thousands.
                    </p>
                    <div className="text-xl lg:text-2xl font-semibold my-5">Why  Advertise  With  Us?</div>
                    <ul className="ml-5 list-disc text-justify">
                        {ads.map((ele, index) => (
                            <li key={index} className="my-5">
                                <span className="font-semibold whitespace-nowrap inline">{ele.text}:</span>
                                <span className="whitespace-wrap"> {ele.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="contactform flex justify-between items-center w-fit p-5 lg:p-10 shadow-boxshadow rounded-lg bg-white lg:mx-5 lg:mt-5 lg:mb-10">
                    <div className="w-full flex flex-col gap-5">
                        <div className='text-xl font-semibold'>Ready  to  get  started?</div>
                        <div className='text-justify'>Fill  out  the  form  below  to  kickstart  your  advertising  journey  with  Qwik
                            Savings.  Let{`'`}s  collaborate  and  create  impactful  campaigns  that  drive  results.  Your  success  is  our
                            priority,  and  we{`'`}re  here  to  help  you  achieve  your  advertising  goals.  Join  us  today  to  unlock  a
                            world  of  advertising  possibilities!</div>
                        <div className="flex flex-col gap-3">
                            <span className="text-md flex">Full Name <span>*</span></span>
                            <input type="text"
                                name="name"
                                value={advertise.name}
                                onChange={handleChange}
                                className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Company Name <span>*</span></span>
                            <input type="text"
                                name="company"
                                value={advertise.company}
                                onChange={handleChange}
                                className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Website  URL <span>*</span></span>
                            <input type="text"
                                name="url"
                                value={advertise.url}
                                onChange={handleChange}
                                className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Email Address<span>*</span></span>
                            <input type="email"
                                name="email"
                                value={advertise.email}
                                onChange={handleChange}
                                className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <label className="block">
                            Are you in an affiliate network?
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio  checked:bg-[#FAF9F5] text-gray-800 focus:outline-none"
                                        name="affiliate"
                                        value="Yes"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2">Yes</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        className="form-radio checked:bg-[#FAF9F5] text-gray-800 focus:outline-none"
                                        name="affiliate"
                                        value="No"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2">No</span>
                                </label>
                            </div>
                        </label>
                        {
                            (advertise.affiliate === 'Yes' && <div className="flex flex-col gap-1">
                                <span className="text-md flex">Name of Affiliate Network</span>
                                <input type="text"
                                    name="affiliate_network"
                                    value={advertise.affiliate_network}
                                    onChange={handleChange}
                                    className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                            </div>)
                        }
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Message <span>*</span></span>
                            <textarea type="text"
                                name="message"
                                value={advertise.message}
                                onChange={handleChange}
                                className="w-full bg-[#FAF9F5] h-28 outline-none border rounded-lg p-1 " required />
                        </div>
                        <div className="inline-flex items-center gap-5">
                            <input type="checkbox"
                                name="isAccepted"
                                checked={advertise.isAccepted}
                                onChange={handleChange}
                                className=" bg-[#FAF9F5] w-6 h-6 outline-none border rounded-lg p-1 accent-[#FAF9F5]" />
                            <span className="text-md flex items-center gap-2">I accept the <span className="font-bold cursor-pointer">Privacy Policy</span> </span>
                        </div>

                        <button onClick={handleSubmit} className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300 w-fit">Submit Form</button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AdvertiseUs