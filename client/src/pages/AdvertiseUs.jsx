import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const AdvertiseUs = () => {
    return (
        <>
            <div className="px-10 lg:px-28 flex flex-col text-black lg:mx-auto mt-20 lg:mt-32 items-start gap-5 h-screen">
                <div className="flex flex-col items-start flex-wrap p-5 pb-0">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-black hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>

                            <span className="mx-4 h-auto text-black font-medium">/</span>
                        </li>

                        <li className="inline-flex items-center">
                            <Link to="/aboutus" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                About Us
                            </Link>
                        </li>
                    </ul>
                    <span className="text-2xl font-semibold ml-2 mt-5">About Qwik Savings</span>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AdvertiseUs
