import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import bg from '../assets/images/event/eventbg.jpg';
import { eventDetails } from "../api/event";
import { useState } from "react";
import { GoVerified } from 'react-icons/go';
import { CiUser } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa6';
import { IoAddOutline } from "react-icons/io5";
import "../components/couponsbutton.css";

const EventDetails = () => {

    const [detailsVisibility, setDetailsVisibility] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);


    const toggleDetails = (index) => {
        setDetailsVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const eventsToShow = showAllEvents ? eventDetails.Events.length : 25;
    const toggleShowAllEvents = () => {
        setShowAllEvents((prev) => !prev);
    };
    return (
        <>
            <div className="lg:w-[75vw] flex flex-col text-black border lg:mx-auto mt-20 lg:mt-32">
                <div className="p-4 flex flex-col items-start flex-wrap gap-5">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-900 hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>
                            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                Events
                            </Link>
                            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                Christmas Deals Online
                            </Link>
                        </li>
                    </ul>
                    <div className="relative flex items-center justify-center w-full">
                        <img src={bg} alt="" className="w-full h-[160px]" />
                        {/* <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                            <div className='p-4 text-3xl font-bold text-white z-10'>Browse Top Shopping Events</div>
                        </div> */}
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row ">
                        <div className="w-screen lg:w-1/4 lg:flex flex-col gap-5 text-black border lg:mx-auto lg:p-5">
                            <div className="bg-white p-5 rounded-lg shadow-boxshadow">
                                <div className="text-xl font-bold my-2">About</div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    <p>{eventDetails.about}</p>

                                </div>
                            </div>
                            <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                                <div className="text-xl text-justify" style={{ fontWeight: 700 }}>Today{`'`}s Top Shopping Events</div>
                                {
                                    eventDetails.Events && eventDetails.Events?.slice(0, 2).map((ele, index) => {
                                        return (

                                            <ul key={index} className="w-full cursor-pointer list-disc bg-white p-2 rounded-lg flex gap-3 text-justify">
                                                <li className="font-semibold text-[12px] ">{ele.title}</li>
                                            </ul>
                                        )
                                    })
                                }
                                <div className="bg-white flex flex-col gap-2 border border-gray-400 py-5 rounded-lg font-[16px]">
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Total Offers</span>
                                        <span>{eventDetails.Events?.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Total Codes</span>
                                        <span>25</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Best Offer</span>
                                        <span>40% Off</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Average Discount</span>
                                        <span>25 %</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 shadow-boxshadow rounded-lg">
                                <div className="text-xl font-bold my-2">Popular Store</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        eventDetails.popularStore.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md cursor-pointer">{ele}</div>)
                                    }
                                </div>
                            </div>

                        </div> 
                        <div className="lg:w-[75vw] lg:flex flex-col items-center justify-center gap-5 text-black  lg:mx-auto lg:p-5">
                            {
                                eventDetails.Events.slice(0, eventsToShow).map((ele, index) => {
                                    return (
                                        <>
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

                                        </>

                                    )
                                })
                            }
                            <div className="flex items-center justify-center lg:w-[45rem] ">
                                {eventDetails.Events.length > 25 && (
                                    <button onClick={toggleShowAllEvents} className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300">
                                        {showAllEvents ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default EventDetails