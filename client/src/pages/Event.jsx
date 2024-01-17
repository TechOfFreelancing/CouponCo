import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import event from '../api/event'


const Event = () => {

    const navigate = useNavigate();

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
                            return <div key={index} className='flex flex-col items-center justify-center gap-3 space-y-4 h-[335px] w-auto border duration-300 hover:shadow-boxshadow rounded-xl p-5 bg-white'>
                                <span className='text-xl font-bold text-center w-3/4 h-1/6'>{ele.title}</span>
                                <img src={ele.img} alt="" className='w-auto h-1/2 object-cover' />
                                <div className='border text-white bg-[#B33D53] py-2 w-[200px] rounded-lg flex text-center justify-center hover:-translate-y-1 duration-300'
                                    onClick={() => navigate("/eventdetails", { state: { event: ele.title } })}>
                                    Reveal Offer
                                </div>
                            </div>
                        })

                    }
                </div>



            </div>
            <Footer></Footer>
        </>
    )
}

export default Event
