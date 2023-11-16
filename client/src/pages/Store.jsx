import store from "../api/store"
import { MdLocalOffer } from "react-icons/md";
import { Rating } from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import {
    Dialog,
} from "@material-tailwind/react";

const Store = () => {
    let first_store = store[0];
    const [detailsVisibility, setDetailsVisibility] = useState(Array(first_store.products.length).fill(false));
    const [isMoreAboutCompanyVisible, setMoreAboutCompanyVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    const toggleDetails = (index) => {
        setDetailsVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const toggleMoreAboutCompany = () => {
        setMoreAboutCompanyVisible(!isMoreAboutCompanyVisible);
    };


    return (
        <div className="mt-20 lg:mt-28 flex gap-5  h-full w-[100vw] lg:py-5">
            <div className="w-1/4 h-full flex flex-col gap-5 px-10 text-sm">
                <div className="h-[208px] w-[208px] bg-white rounded-full flex items-center justify-center shadow-lg mt-5 mx-auto">
                    <img src={first_store.logo} alt="logo" className='h-auto w-auto px-5' />
                </div>
                <div>When you buy through links on RetailMeNot <span className="underline cursor-pointer">we may earn a commission.</span></div>
                <div className="flex gap-2 items-center text-purple-600 hover:underline">Submit a coupon <MdLocalOffer className="cursor-pointer"></MdLocalOffer></div>
                <div className="font-bold" >  MORE ABOUT {first_store.name.toUpperCase()}</div>
                <div className="flex gap-2 items-center"><Rating value={Math.round(first_store.rating.rating)} readonly /><span className="font-bold">{first_store.rating.rating} RATING ({first_store.rating.persons})</span></div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">{first_store.moreaboutcompany}</div>
                    {isMoreAboutCompanyVisible &&
                        <div className="moreaboutcompany flex flex-col gap-2">
                            <div className="flex flex-col"><span className="font-bold">{first_store.name.toUpperCase()} Coupons</span><span>{first_store.companycoupons}</span></div>
                            <div className="flex flex-col"><span className="font-bold">{first_store.name.toUpperCase()} Rewards</span><span>{first_store.rewards}</span></div>
                            <div className="flex flex-col"><span className="font-bold">Price Guarantee</span><span>{first_store.priceguarantee}</span></div>
                            <div className="flex flex-col"><span className="font-bold">Cancelations and Refunds</span><span>{first_store.cancelations_refunds}</span></div>
                            <div className="flex flex-col"><span className="font-bold">Customer Support</span><span>{first_store.customer_support}</span></div>
                        </div>
                    }
                    <div className="font-bold cursor-pointer" onClick={toggleMoreAboutCompany}>{isMoreAboutCompanyVisible ? 'SHOW LESS' : 'SHOW MORE'}</div>
                </div>

            </div>
            <div className="w-3/4 h-full flex flex-col">
                <div className="my-5">
                    <div className="text-4xl font-bold ml-10 ">{first_store.title}</div>
                    <div className="ml-10">{first_store.subtitle}</div>
                </div>
                <div className="flex flex-col gap-5 my-5 items-center">
                    {
                        first_store.products.map((ele, index) => {
                            return (
                                <div key={index} className="flex flex-col border border-gray-500 rounded-lg p-5 w-[50rem] hover:shadow-lg duration-200">
                                    <div className="flex justify-between gap-10 px-4 items-center">
                                        <div className="flex flex-col font-bold">
                                            <span className="text-3xl text-purple-600 whitespace-nowrap">{ele.offer} %</span>
                                            <span className="text-3xl text-purple-600">Off</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="bg-gray-300 max-w-fit p-2 rounded-lg">{ele.label}</div>
                                            <div className="font-bold text-xl">{ele.title}</div>
                                            <div className="flex gap-2 text-gray-500 text-sm">
                                                <span>{ele.verified && <div>Verified</div>}</span>
                                                <span>{ele.uses} uses today</span>
                                            </div>
                                        </div>
                                        <div className="bg-purple-600 max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={handleOpen}>Show Code</div>
                                    </div>
                                    <hr className="my-5" />
                                    <div className="flex gap-1 items-center text-sm cursor-pointer" onClick={() => toggleDetails(index)}>
                                        See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                    </div>
                                    {detailsVisibility[index] && (
                                        <div className="details flex flex-col gap-2">
                                            <span className="font-bold">Ends {ele.ends}</span>
                                            <span>{ele.details}</span>
                                        </div>
                                    )}

                                    <Dialog open={open} handler={handleOpen} size="lg">
                                        <div className="flex flex-col">
                                            <div className="h-3/4">

                                                <div className="h-[112px] w-[112px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                                                    <img src={first_store.logo} alt="logo" className='h-auto w-auto px-5' />
                                                </div>
                                                <div>{first_store.name.toUpperCase()}</div>
                                                <div>{ele.title}</div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <div className="h-1/4">
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            )
                        })
                    }
                </div>

            </div>


        </div>
    )
}

export default Store
