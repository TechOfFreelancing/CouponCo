import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import img from '../assets/images/faqs/faq.png'
import { IoIosArrowDropright } from 'react-icons/io'
import faq from '../api/faqs';
import Accordion from "../components/Accordion";

const FAQS = () => {
    return (
        <>
            <div className="px-5 lg:px-28 flex flex-col text-black lg:mx-auto mt-28 lg:mt-32 items-start gap-5">
                <div className="flex flex-col items-start flex-wrap lg:p-5 lg:pb-0">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/faqs" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                Faqs
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-full lg:ml-2 lg:p-5 lg:pt-0 text-lg flex lg:flex-row flex-col lg:justify-around items-center lg:h-[500px]">
                    <img className="lg:float-left w-full lg:w-2/5 h-auto m-10 my-0 ml-0 mix-blend-multiply" src={img} />
                    <div className="lg:w-2/5 flex flex-col my-5 gap-5">
                        <span className="text-xl lg:text-2xl font-semibold">Need  help?</span>
                        <p className="lg:text-justify text-lg">
                            No worries….. we{`'`}ve got you covered!!!
                        </p>
                        <p className="text-justify text-lg">
                            If you can{`'`}t find what your looking for,
                            contact us today so we can help you
                            further.
                        </p>

                        <Link to="/contactus" className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300 w-fit flex items-center gap-2">Contact Us <IoIosArrowDropright className="text-2xl" /></Link>
                    </div>
                </div>
                <div className="lg:p-5">
                    <span className="text-xl lg:text-2xl font-bold">Common FAQs at Qwik Savings</span>
                    <ol className="flex flex-col gap-5 list-decimal ml-2 lg:ml-5 my-5 lg:my-10">
                        {
                            faq.map((ele, index) => <Accordion key={index} q={ele.q} a={ele.a}></Accordion>)
                        }
                    </ol>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default FAQS
