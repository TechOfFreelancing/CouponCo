import {
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import '../components/navlist.css';



const Navlist = () => {



    return (
        <ul className="mx-10 py-5 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-black">
            <Typography
                as="li"
                variant="small"
                classNameName="p-1 font-normal font-[Poppins]"

            >
                <Link to="/allstores" classNameName="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2">
                    Stores
                </Link>


            </Typography>
            <Typography
                as="li"
                variant="small"
                classNameName="p-1 font-normal font-[Poppins]"

            >
                <Link to="/allcategories" classNameName="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2">
                    Categories
                </Link>

            </Typography>
            <Typography
                as="li"
                variant="small"
                classNameName="p-1 font-normal font-[Poppins]"
            >
                <Link to="/Ourcodes" classNameName="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500">
                    Our Codes
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                classNameName="p-1 font-normal font-[Poppins]"
            >
                <Link to="/events" classNameName="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500">
                    Events
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                classNameName="p-1 font-normal font-[Poppins]"
            >
                <Link to="#" classNameName="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:border-red-500 hover:border-b-2">
                    Blog
                </Link>
            </Typography>
        </ul>
    )
}

export default Navlist;