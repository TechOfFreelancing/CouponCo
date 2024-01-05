import categoriesBasedCoupons from "../../api/CategoriesBasedCoupons";
import "../../components/couponsbutton.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { FaThumbsUp, FaThumbsDown, FaHeart, FaRegHeart } from 'react-icons/fa6';

const ElectronicsBased = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [likedItems, setLikedItems] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleOpenDialog = () => {
        // setSelectedProduct(product);
        if (!openDialog) {
            setOpenDialog(true);
        } else {
            setOpenDialog(false)
        }
    };

    const handleLikeClick = (index) => {
        // Check if the item is already liked
        if (!likedItems.includes(index)) {
            // If not liked, add it to the likedItems state
            setLikedItems([...likedItems, index]);
        } else {
            // If already liked, remove it from the likedItems state
            setLikedItems(likedItems.filter((item) => item !== index));
        }
    };
    return (
        <div className="clothing mb-5">
            <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10 ">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">Electronic Offers</span>
                </div>
                <Link to="" className="hover:underline h-7 duration-300 underline">
                    View All Electronic Offers
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4  justify-items-stretch gap-4">
                {categoriesBasedCoupons.Clothing.map((item, index) => (
                    <div key={index}
                        className="group flex flex-col gap-3 items-center justify-start relative h-[335px] w-auto border rounded-lg overflow-hidden shadow-lg duration-300 my-4 pb-10 bg-white">
                        <img
                            src={item.bg}
                            className="cursor-pointer w-full h-1/2"
                        />
                        <span
                            className={`p-2 hidden group-hover:block absolute right-1 top-1 backdrop-blur-sm bg-transparent border border-transparent  rounded-lg hover:text-[#B33D53] ${likedItems.includes(index) ? 'text-[#B33D53]' : 'text-black'
                                }`}
                            onClick={() => handleLikeClick(index)}
                        >
                            {likedItems.includes(index) ? (
                                <FaHeart className="cursor-pointer text-3xl duration-300" />
                            ) : (
                                <FaRegHeart className="cursor-pointer text-3xl duration-300" />
                            )}
                        </span>

                        <img src={item.logo} alt="" className="absolute z-10 h-[75px] w-[75px] left-2 bottom-36 border mt-2 bg-white rounded-full" />
                        <div className="ml-24 flex w-[60%] justify-end items-center text-gray-700 ">

                            {item.Verified && <span className="text-black bg-blue-200 px-1 rounded-md text-[12px] uppercase">Verified</span>}
                        </div>
                        <div className="mx-2 h-[48px] px-2 text-justify">
                            <span className="text-black mr-2">{item.title}</span>
                        </div>
                        <div className="flex justify-between items-center w-full text-sm px-5 text-[10px]">
                            <span>{item.company}</span>
                            <span>{item.used} Used</span>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <button className="button has-code" onClick={() => handleOpenDialog()}>
                                <span className="is-code">{item.coupon}</span>
                                <span className="is-code-text"><em>GET CODE</em></span>
                            </button>
                        </div>
                    </div>
                )).slice(0, 4)}
            </div>
        </div>
    )
}

export default ElectronicsBased;
