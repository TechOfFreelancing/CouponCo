import { Link } from "react-router-dom";
import contactus from '../assets/images/contactus/Contact Us-1.png'
import Footer from "../components/Footer";
import SocialIcon from "../api/socialmedia";


const ContactUs = () => {
    return (
        <>
            <div className="px-10 lg:px-28 flex flex-col text-black lg:mx-auto mt-20 lg:mt-32 items-start">
                <div className="flex flex-col items-start flex-wrap p-4">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/contactus" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                Contact US
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="contactform flex justify-between items-center w-fit p-10 border border-gray-600 shadow-xl rounded-lg bg-white mx-5 mt-5 mb-10">
                    <div className="w-3/5 flex flex-col gap-5">
                        <div className='font-bold text-lg lg:text-3xl text-start' style={{ fontWeight: 700 }}>Contact Us</div>
                        <div className='text-xl'>Got any questions? Don{`'`}t hesitate to get in touch.</div>
                        <div className='text-justify'>Fill in the form below and one of our friendly customer support staff will contact you back ASAP regarding your question or query. You can also contact us via this Email address:
                            <a href="mailto:contact@qwiksavings.com" className="text-blue-600">contact@qwiksavings.com</a>
                            . Please allow up-to 24 hours for a response - thank you!</div>
                        <div className="flex flex-col gap-3">
                            <span className="text-md flex">Full Name <span>*</span></span>
                            <input type="text" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-md flex">Email Address <span>*</span></span>
                            <input type="text" className="w-full bg-[#FAF9F5] h-10 outline-none border rounded-lg p-1 required" />
                        </div>
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
                    <div className="w-2/5">
                        <img src={contactus} alt="contact us" className="w-full h-auto object-cover" />
                    </div>
                </div>

                <div className="icons flex gap-7 items-center justify-center w-full h-10 text-2xl mb-10">
                    {
                        SocialIcon.map((ele, index) => {
                            let Icon = ele.icon;
                            return <Icon key={index} className="hover:text-[#B33D53] duration-300 cursor-pointer"></Icon>
                        })
                    }

                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ContactUs