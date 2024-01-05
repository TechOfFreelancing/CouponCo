import {
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Categories from "../api/categories";





const Navlist = () => {
    return (
        <ul className="mx-10 py-5 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-black">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/allstores" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2 whitespace-nowrap">
                    Stores
                </Link>
                <div className="hidden lg:block absolute top-0 -left-[18.5rem] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[100vw] transform">
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {
                            Categories.map((ele, index) => {
                                return <div key={index}>{ele.name}</div>
                            })
                        }
                    </div>
                </div>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/allcategories" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2 whitespace-nowrap">
                    Categories
                </Link>
                <div className="hidden lg:block absolute top-0 -left-[23rem] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[100vw] transform">
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {
                            Categories.map((ele, index) => {
                                return <div key={index}>{ele.name}</div>
                            })
                        }
                    </div>
                </div>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/Ourcodes" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500 whitespace-nowrap">
                    Our Codes
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/events" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500 whitespace-nowrap">
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
