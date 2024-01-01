import Footer from "../components/newsletter";
import { Link } from "react-router-dom";
import { eventDetails } from "../api/event";
import { useState } from "react";
import { GoVerified } from 'react-icons/go';
import { CiUser } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa6';
import { IoAddOutline } from "react-icons/io5";
import "../components/couponsbutton.css";
import category from '../assets/images/categories/category.png'
import { Rating } from "@material-tailwind/react";
import { IoIosPeople } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

const CategoriesStore = () => {
    const [showFullContent, setShowFullContent] = useState(false);
    const [detailsVisibility, setDetailsVisibility] = useState([]);


    const truncatedContent = eventDetails.about.length > 200 ? `${eventDetails.about.substring(0, 200)}...` : eventDetails.about;

    const toggleAbout = () => {
        setShowFullContent(!showFullContent);
    };
    const firstLatter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    const toggleDetails = (index) => {
        setDetailsVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };
    return (
        <>
            <div className="lg:w-[75vw] flex flex-col text-black border lg:mx-auto mt-20 lg:mt-32">
                <div className="bg-white p-4 flex flex-col items-start flex-wrap gap-5">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-900 hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>
                            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                All Brands
                            </Link>
                            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                Category Name
                            </Link>
                        </li>
                    </ul>
                    <div className="relative flex items-center justify-center w-full">
                        <div className="w-1/3 lg:w-2/12">
                            <img src={category} alt="" className="h-[90px] w-[90px] lg:h-[130px] lg:w-[130px] rounded-full" />
                        </div>
                        <div className="flex flex-col justify-between w-2/3 lg:w-8/12 gap-3">
                            <div className="text-lg lg:text-xl font-bold">Autodoc Voucher Codes January 2024</div>
                            <div className="font-sm lg:font-normal">Save money with these 5 Autodoc voucher codes & deals</div>
                            <div className="flex lg:flex-row flex-col gap-5">
                                <Rating value={4} />
                                <span className="font-bold whitespace-nowrap"> Rated <span>4</span> from 1 votes </span>
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-col gap-2 lg:w-2/12">
                            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-red-100"><IoIosPeople className="text-xl" />6.3K</div>
                            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-200"><FaArrowRight className="text-xl" />Visit Site</div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="w-screen lg:w-[25vw] lg:flex flex-col gap-2 text-black border lg:mx-auto lg:p-5">
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Related Categories</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        eventDetails.relatedCategories.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md">{ele}</div>)
                                    }
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">About</div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    <p>{showFullContent ? eventDetails.about : truncatedContent}</p>
                                    <button onClick={toggleAbout} className="text-blue-500">
                                        {showFullContent ? 'Less About' : 'More About'}
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Today{`'`}s Top Categories</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        eventDetails.todaystop.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md">{ele}</div>)
                                    }
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Brows By Store</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        firstLatter.map((ele, index) => <div key={index} className="text-sm flex items-center justify-center cursor-pointer h-[25px] w-[25px] p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md">{ele}</div>)
                                    }
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Popular Store</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        eventDetails.popularStore.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md">{ele}</div>)
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="lg:w-[75vw] lg:flex flex-col gap-2 text-black border lg:mx-auto lg:p-5">

                            {
                                eventDetails.Events.map((ele, index) => {
                                    return (
                                        <div key={index} className="group w-full lg:w-[45rem] bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 hover:shadow-lg duration-300">
                                            <span
                                                className={`p-2 hidden group-hover:inline-block duration-300 absolute right-5 top-5 lg:right-1 lg:top-1 rounded-lg bg-gray-300/80 }`}
                                            >
                                                <FaHeart className="cursor-pointer text-xl duration-300" />
                                            </span>
                                            <div className="flex flex-col w-full gap-2">
                                                <div className="flex gap-5">
                                                    <div className="lg:w-[15%] w-[10%] h-auto flex flex-col items-center justify-center ">
                                                        <div className="border border-black flex flex-col items-center justify-center">
                                                            <img src={ele.img} alt="H" className="h-[50px] w-[50px] lg:h-[75px] lg:w-[75px] rounded-lg m-2" />
                                                            <span className="bg-blue-100 text-center w-full">{ele.type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col lg:w-[85%] w-[75%] lg:mx-5 justify-between gap-2">
                                                        <div className="flex flex-col lg:flex-row justify-between w-full mt-5">
                                                            <div className="font-bold text-sm lg:text-xl">{ele.title}</div>

                                                            <div className="flex flex-col gap-5">
                                                                <div className="flex whitespace-nowrap gap-3 lg:gap-5 lg:mr-[4rem]">
                                                                    <span className="flex justify-center items-center lg:gap-2 text-green-800">
                                                                        <GoVerified className="font-bold" />Verified</span>
                                                                    <span className="flex justify-center items-center lg:gap-2">
                                                                        <CiUser></CiUser>
                                                                        {(ele.user_count)} Uses
                                                                    </span>
                                                                </div>
                                                                <button className="button has-code" >
                                                                    <span className="is-code">745
                                                                        {ele.coupon_code}</span>
                                                                    <span className="is-code-text"><em>GET CODE</em></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 items-center text-sm cursor-pointer"
                                                    onClick={() => toggleDetails(index)}
                                                >
                                                    See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                                </div>
                                                {detailsVisibility[index] && (
                                                    <div className="details flex flex-col w-screen lg:w-auto">
                                                        <span className="font-bold">Ends {(ele.enddate)}</span>
                                                        <span>{ele.detils}</span>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default CategoriesStore;