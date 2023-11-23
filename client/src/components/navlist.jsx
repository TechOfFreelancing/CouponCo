import {
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";



const navList = (
    <ul className="mx-10 py-5 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-black">
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal"
        >
            <Link to="/AllStores" className="flex items-center">
                Stores
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal"
        >
            <Link to="/AllCategories" className="flex items-center">
                Categories
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal"
        >
            <Link to="#" className="flex items-center">
                Our Codes
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            className="p-1 font-normal"
        >
            <Link to="#" className="flex items-center">
                Blog
            </Link>
        </Typography>
    </ul>
);

export default navList;