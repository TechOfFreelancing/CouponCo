import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import event from '../api/event';

const Event = () => {
    return (
        <>
            <div className='lg:px-28 flex flex-col text-black lg:mx-auto mt-20 lg:mt-32'>
                <div className="p-4 flex flex-col items-start flex-wrap">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                Events
                            </Link>
                        </li>
                    </ul>
                    <div className='font-bold text-lg lg:text-3xl mt-5 ml-2' style={{ fontWeight: 700 }}>Browse Top Saving Events</div>
                    <div className='p-4 text-xl font-bold'>Browse Top Shopping Events</div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 bg-[#F2F0E6] gap-4 p-5">
                    {
                        event.map((ele, index) => {
                            return <div key={index} className='flex flex-col items-center justify-center gap-3 space-y-4 h-[335px] w-[275px] border shadow-lg rounded-xl p-2 bg-white'>
                                <span className='text-xl font-bold text-center w-3/4'>{ele.title}</span>
                                <div className='bg-[#F2F0E6] h-[245px] w-[200px] rounded-lg flex items-center justify-center'>
                                    <img src={ele.img} alt="" className='h-[100px] w-auto'/>
                                </div>
                                <Link to="/eventdetails" className='bg-black text-white px-5 py-2 w-[200px] rounded-lg text-center'>{ele.button}</Link>

                            </div>
                        })

                    }
                </div>

      <Footer />
    </div>
  );
};

export default Event;
