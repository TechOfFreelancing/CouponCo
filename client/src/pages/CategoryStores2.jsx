
import { eventDetails } from "../api/event";
import { useState } from "react";
import { GoVerified } from 'react-icons/go';
import { CiUser } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa6';
import { IoAddOutline } from "react-icons/io5";
// import logo from '../assets/images/Store/1.webp';
import { Link } from "react-router-dom";

const firstLatter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const CategoryStores = () => {
    // const [showFullContent, setShowFullContent] = useState(false);
    const [detailsVisibility, setDetailsVisibility] = useState([]);
    // const [showAllEvents, setShowAllEvents] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        // console.log(category);
    }
    const toggleDetails = (index) => {
        setDetailsVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    // const eventsToShow = showAllEvents ? eventDetails.Events.length : 25;
    // const toggleShowAllEvents = () => {
    //     setShowAllEvents((prev) => !prev);
    // };
    return (
        <div className="lg:w-[75vw] flex flex-col text-black border lg:mx-auto mt-20 lg:mt-32">
            <div className="flex flex-col">
                <ul className="flex items-center">
                    <li className="inline-flex items-center">
                        <Link to="/" className="text-gray-900 hover:text-[#B33D53]">
                            <svg className="w-5 h-auto fill-current mx-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                        </Link>
                        <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                    </li>
                    <li className="inline-flex items-center">
                        <Link to="/categoriesStore" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                            All Brands
                        </Link>
                    </li>
                </ul>
                <span className="text-2xl font-semibold">All Brands & Stores A-Z</span>
                <div className="border-2 border-gray-400">
                    <span className="text-lg text-gray-700 m-2">Browse by stores</span>
                    <div className="flex flex-wrap gap-2 justify-start items-center m-2">
                        <button className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === 'All' ? 'bg-black text-white' : ''}`}
                            onClick={() => handleCategoryClick('All')}>All</button>
                        {firstLatter.map((letter, index) => (
                            <button
                                key={index}
                                className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === letter ? 'bg-black text-white' : ''}`}
                                onClick={() => handleCategoryClick(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                        <button
                            className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === '#' ? 'bg-black text-white' : ''}`}
                            onClick={() => handleCategoryClick('#')}
                        >
                            #
                        </button>
                    </div>
                </div>
                <div className="lg:flex flex-col items-center justify-center gap-2 text-black border-4 w-full lg:mx-auto lg:p-5">
                    {selectedCategory === "All" ? (
                        Array.from([...firstLatter, '0-9']).map(
                            (letter, index) => (
                                <div key={index} className="border-2 border-gray-400 mb-3 w-full">
                                    <div className="text-4xl font-medium mx-5 my-2">{letter}</div>

                                    {eventDetails.Events
                                        .filter((event) => {
                                            if (letter === '0-9') {
                                                // Filter for numbers
                                                return /\d/.test(event.title.charAt(0));
                                            } else {
                                                return event.title.charAt(0).toUpperCase() === letter;
                                            }
                                        })
                                        .map((ele, index) => (
                                            <div key={index} className="group w-full lg:w-[45rem] bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 hover:shadow-lg duration-300">
                                                <span
                                                    className={`p-2 hidden group-hover:inline-block duration-300 absolute right-1 top-1 rounded-lg bg-gray-300/80 }`}
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
                                                                <div className="font-bold text-sm lg:text-xl">{ele.title} {ele.id}</div>

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

                                        ))}

                                </div>
                            )
                        )

                    ) : selectedCategory === "#" ? (
                        Array.from(Array.from({ length: 10 }).map((_, i) => `${i}`)).map(
                            (letter, index) => (
                                <div key={index} className="border-2 border-gray-400 mb-3">

                                    {eventDetails.Events
                                        .filter((event) => event.title.charAt(0) === letter)
                                        .map((ele, index) => (
                                            <div key={index} className="group w-full lg:w-[45rem] bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 hover:shadow-lg duration-300">
                                                <span
                                                    className={`p-2 hidden group-hover:inline-block duration-300 absolute right-1 top-1 rounded-lg bg-gray-300/80 }`}
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
                                                                <div className="font-bold text-sm lg:text-xl">{ele.title} {ele.id}</div>

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
                                        ))}

                                </div>
                            )
                        )
                    ) : (Array.from(firstLatter.map((letter) => letter)).map(
                        (letter, index) => (
                            <div key={index} className={`border-2 border-gray-400 mb-3 ${selectedCategory === letter ? '' : 'hidden'}`}>
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {eventDetails.Events
                                        .filter((event) => event.title.charAt(0) === selectedCategory)
                                        .map((ele, index) => (
                                            <div key={index} className="group w-full lg:w-[45rem] bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 hover:shadow-lg duration-300">
                                                <span
                                                    className={`p-2 hidden group-hover:inline-block duration-300 absolute right-1 top-1 rounded-lg bg-gray-300/80 }`}
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
                                                                <div className="font-bold text-sm lg:text-xl">{ele.title} {ele.id}</div>

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
                                        ))}
                                </div>
                            </div>
                        )
                    ))}



                </div>
            </div>
        </div>
    )
}
export default CategoryStores