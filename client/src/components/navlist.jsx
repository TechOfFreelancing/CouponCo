import {
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";





const Navlist = () => {
    return (
        <ul className="mx-10 py-5 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-black">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/Stores" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2">
                    Stores
                </Link>
                <div className="hidden lg:block absolute top-0 -left-48 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[100vw] transform">
                    <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        <div
                            className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[12.65rem] duration-500 ease-in-out rounded-sm">
                        </div>

                        <div className="relative z-10">
                            <a href="#"
                                className="block p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600">
                                Documentation
                                <p className="text-gray-500 font-normal">Start integrating in no time</p>
                            </a>
                            <div className="mt-6 grid grid-cols-2 gap-6">
                                <div>
                                    <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">Get started</p>
                                    <ul className="mt-3 text-[15px]">
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Libraries and SDKs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Plugins
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Code samples
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Tutorials
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">Guides</p>
                                    <ul className="mt-3 text-[15px]">
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Accept online payments
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Editing video like a pro
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Automation techniques
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Create stunning effects
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/AllCategories" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2">
                    Categories
                </Link>
                <div className="hidden lg:block absolute top-0 -left-48 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[560px] transform">
                    <div className="relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        <div
                            className="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-x-[12.65rem] duration-500 ease-in-out rounded-sm">
                        </div>

                        <div className="relative z-10">
                            <a href="#"
                                className="block p-2 -mx-2 rounded-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-pink-50 transition ease-in-out duration-300 text-gray-800 font-semibold hover:text-indigo-600">
                                Documentation
                                <p className="text-gray-500 font-normal">Start integrating in no time</p>
                            </a>
                            <div className="mt-6 grid grid-cols-2 gap-6">
                                <div>
                                    <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">Get started</p>
                                    <ul className="mt-3 text-[15px]">
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Libraries and SDKs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Plugins
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Code samples
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Tutorials
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="uppercase tracking-wider text-gray-500 font-medium text-[13px]">Guides</p>
                                    <ul className="mt-3 text-[15px]">
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Accept online payments
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Editing video like a pro
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Automation techniques
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-600 hover:text-gray-800 py-1 block font-normal">
                                                Create stunning effects
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/Ourcodes" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500">
                    Our Codes
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/events" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500">
                    Events
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins]"
            >
                <Link to="#" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2">
                    Blog
                </Link>
            </Typography>
        </ul>
    )
}

export default Navlist
