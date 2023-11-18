import store from "../api/store"
import { MdLocalOffer } from "react-icons/md";
import { Rating } from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
    Dialog,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";

const Store = () => {
    let first_store = store[0];
    const [detailsVisibility, setDetailsVisibility] = useState(Array(first_store.products.length).fill(false));
    const [isMoreAboutCompanyVisible, setMoreAboutCompanyVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [ratingcount, setratingcount] = useState(0);

    // Function to handle opening the dialog and setting the selected product
    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(!open);
        setCopySuccess(false);
    }
    const handleOutsideClick = () => {
        if (open) {
            setOpen(false);
        }
        if (copySuccess) {
            setCopySuccess(false);
        }
    };
    const handleInsideClick = (event) => {
        // Prevent the click event from propagating to the outer container
        event.stopPropagation();
    };

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

    const handleCopyClick = () => {
        // Select the text inside the span
        const textToCopy = document.querySelector('.copy-text');
        const range = document.createRange();
        range.selectNode(textToCopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copy the selected text to the clipboard
        try {
            document.execCommand('copy');
            setCopySuccess(true);
        } catch (err) {
            console.error('Unable to copy text to clipboard', err);
            setCopySuccess(false);
        }
        // Clear the selection
        window.getSelection().removeAllRanges();
    };

    const handleRatingChange = (value) => {
        setUserRating(value);
    };
    const resetRating = () => {
        setUserRating(0);
        if (ratingcount > 0)
            setratingcount(ratingcount - 1);
    }

    useEffect(() => {
        if (userRating !== 0 && ratingcount < 1) {
            setratingcount(ratingcount + 1);
        }
    }, [userRating]);

    return (
        <div className="mt-20 lg:mt-28 flex flex-col lg:flex-row gap-5 h-full w-[100vw] lg:py-5" onClick={handleOutsideClick}>
            <div className="w-full lg:w-1/4 h-full flex flex-col gap-5 px-5 lg:px-10 text-sm">
                <div className="h-[208px] w-[208px] bg-white rounded-full flex items-center justify-center shadow-lg mt-5 mx-auto">
                    <img src={first_store.logo} alt="logo" className='h-auto w-auto px-5' />
                </div>
                <div className="text-2xl font-bold lg:hidden inline">{first_store.title}</div>
                <div>When you buy through links on RetailMeNot <span className="underline cursor-pointer">we may earn a commission.</span></div>
                <div className="flex gap-2 items-center text-purple-600 hover:underline">Submit a coupon <MdLocalOffer className="cursor-pointer"></MdLocalOffer></div>
                <div className="font-bold">  MORE ABOUT {first_store.name.toUpperCase()}</div>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                        <Rating value={userRating} onChange={handleRatingChange} />
                        <span className="font-bold whitespace-nowrap"><span>{userRating}</span> RATING </span>
                    </div>
                    <div className="flex gap-5 items-center">
                        <span>Total Rating : ({ratingcount})</span>
                        <button className="bg-purple-600 max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => resetRating()}>Reset</button>
                    </div>

                </div>
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
            <div className="w-full lg:w-3/4 h-full flex flex-col">
                <div className="my-5">
                    <div className="text-4xl font-bold ml-10 hidden lg:inline">{first_store.title}</div>
                    <div className="ml-10">{first_store.subtitle}</div>
                </div>
                <div className="flex flex-col gap-5 my-5 items-center mx-10">
                    {
                        first_store.products.map((ele, index) => {
                            return (
                                <div key={index} className="flex flex-col border border-gray-500 rounded-lg p-5 w-full lg:w-[50rem] hover:shadow-lg duration-200 ">
                                    <div className="flex flex-col lg:flex-row justify-between gap-10 px-4 items-center">
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
                                        <div className="bg-purple-600 max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Show Code</div>
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

                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black" >
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center" onClick={handleInsideClick}>
                    <div className="h-3/4  flex flex-col gap-5 items-center">
                        <div className="h-[112px] w-[112px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                            <img src={first_store.logo} alt="logo" className='h-auto w-auto px-5' />
                        </div>
                        <div className="text-md font-bold">{first_store.name.toUpperCase()}</div>
                        <div className="text-2xl font-bold text-black">{selectedProduct.title}</div>
                        <div className="text-sm">Ends {selectedProduct.ends}</div>
                        <div className="flex gap-2 items-center justify-center border border-black rounded-full text-2xl pl-5 p-2">
                            <span className="copy-text">RMNHCOM5O</span>
                            <button
                                className="bg-purple-600 max-w-fit p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                onClick={handleCopyClick}
                            >
                                Copy
                            </button>
                        </div>
                        {copySuccess && <span style={{ color: 'green' }}>Copied!</span>}
                        <div className="text-sm"> Copy and paste this code at <span className="underline text-purple-500 hover:cursor-pointer">{first_store.name.toUpperCase()}</span></div>
                    </div>
                    {
                        (selectedProduct.rules_restrictions || selectedProduct.details) && (
                            <div className="h-[15rem] w-full bg-gray-300 overflow-y-scroll mt-5 p-10 flex flex-col gap-5">
                                {
                                    selectedProduct.rules_restrictions && (
                                        <div>
                                            <span className="flex gap-2"><span className="text-black">Rules and Restrictions</span>
                                                <span>Ends {selectedProduct.ends}</span></span>
                                            <div className="text-gray-600">{selectedProduct.rules_restrictions}</div>
                                        </div>
                                    )
                                }
                                {
                                    selectedProduct.details && (
                                        <div>
                                            <span className="flex gap-2"><span className="text-black">Details</span>
                                            </span>
                                            <div className="text-gray-600">{selectedProduct.details}</div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </Dialog>

        </div>
    )
}

export default Store
