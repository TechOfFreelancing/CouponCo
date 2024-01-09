import Footer from "../components/Footer";
import {
    Dialog,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { eventDetails } from "../api/event";
import { useEffect, useState } from "react";
import { GoVerified } from 'react-icons/go';
import { CiUser } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa6';
import { IoAddOutline } from "react-icons/io5";
import "../components/couponsbutton.css";
import Categories from "../api/categories";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from "axios";


const CategoriesDetails = () => {
    const [showFullContent, setShowFullContent] = useState(false);
    const [detailsVisibility, setDetailsVisibility] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [couponDetails, setCouponDetails] = useState([]);
    const [openlogin, setOpenlogin] = useState(false);
    const [likedItems, setLikedItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);


    const location = useLocation();

    const navigate = useNavigate();

    const category = location.state.category;

    const category_icon = location.state.category_icon;
    // console.log(category);

    const truncatedContent = eventDetails.about.length > 200 ? `${eventDetails.about.substring(0, 200)}...` : eventDetails.about;

    const toggleAbout = () => {
        setShowFullContent(!showFullContent);
    };
    const firstLatter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    const toggleDetails = (index) => {
        setDetailsVisibility((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };
    const eventsToShow = showAllEvents ? eventDetails.Events.length : 25;
    const toggleShowAllEvents = () => {
        setShowAllEvents((prev) => !prev);
    };

    const handleOpenlogin = () => setOpenlogin(!openlogin);

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);

        const day = date.getDate();
        const suffix = (day >= 10 && day <= 20) ? 'th' : ['st', 'nd', 'rd'][day % 10 - 1] || 'th';

        return formattedDate.replace(/(\d+)(?=(st|nd|rd|th))/, `$1${suffix}`);
    };


    const handleLikeClick = async (index, cId) => {
        const token = localStorage.getItem('token');

        // Check if token is present
        if (!token) {
            // window.location.href = '/login'; // Redirect to login page if token is not present
            // return;
            handleOpenlogin();
        }

        try {
            const userId = localStorage.getItem('id')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedLikedItems = [...likedItems]; // Make a copy of the liked items array

            if (!likedItems.includes(cId)) {
                updatedLikedItems.push(cId); // Add the coupon ID to the liked items list

                // Update state immediately for smooth UI
                setLikedItems(updatedLikedItems);

                // API call to save the coupon
                await axios.post(`http://localhost:4000/api/saveCoupon/${cId}`, { userId }, config);
            } else {
                const filteredItems = updatedLikedItems.filter((item) => item !== cId);

                // Update state immediately for smooth UI
                setLikedItems(filteredItems);

                // API call to unsave the coupon
                await axios.delete(`http://localhost:4000/api/unsaveCoupon/${cId}`, config);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };


    const handleCopyClick = () => {
        const textToCopy = document.querySelector('.copy-text');

        if (textToCopy) {
            // Save the current selection range
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(textToCopy);
            selection.removeAllRanges();
            selection.addRange(range);

            // Copy the selected text to the clipboard
            const text = textToCopy.textContent || textToCopy.innerText;
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopySuccess(true);
                })
                .catch((err) => {
                    console.error('Unable to copy text to clipboard', err);
                    setCopySuccess(false);
                })
                .finally(() => {
                    // Restore the original selection
                    selection.removeAllRanges();
                    selection.addRange(range);
                });
        }
    };

    const handleOpen = async (product) => {
        setSelectedProduct(product);
        setOpen(true);
        // console.log(correctedRefLink);
        setTimeout(() => {
            handleCopyClick();
        }, 1000);
        setTimeout(() => {
            window.open(correctedRefLink, '_blank');
        }, 2000);

    };

    const handleClose = () => {
        setOpen(!open);
        setCopySuccess(false);
    }

    const handleInsideClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:4000/api/coupon/${category}`);
            if (response) {
                setCouponDetails(response.data.data);
            } else {
                console.log("Unable to fetch data");
            }
        }
        fetchData();
    }, [category]);

    console.log(category);

    const correctedRefLink = selectedProduct?.ref_link?.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/, "https://$1");

    return (
        <>
            <div className="lg:w-[75vw] flex flex-col text-black border lg:mx-auto mt-20 lg:mt-32">
                <div className="bg-white p-4 flex flex-col items-start flex-wrap gap-5">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-900 hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>
                            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/categoriesStore" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                All Brands
                            </Link>
                            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                {category}
                            </Link>
                        </li>
                    </ul>
                    <div className="relative flex items-center justify-center w-full">
                        <div className="w-1/3 lg:w-2/12">
                            <img src={category_icon} alt="" className="h-[90px] w-[90px] lg:h-[130px] lg:w-[130px] rounded-full border border-gray-800" />
                        </div>
                        <div className="flex flex-col justify-between w-2/3 lg:w-8/12 gap-3">
                            <div className="text-lg lg:text-3xl font-bold">{category}</div>
                            {/* <div className="font-sm lg:font-normal">Save money with these 5 Autodoc voucher codes & deals</div> */}
                            {/* <div className="flex lg:flex-row flex-col gap-5">
                                <Rating value={4} />
                                <span className="font-bold whitespace-nowrap"> Rated <span>4</span> from 1 votes </span>
                            </div> */}
                        </div>
                        {/* <div className="hidden lg:flex flex-col gap-2 lg:w-2/12">
                            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-red-100"><IoIosPeople className="text-xl" />6.3K</div>
                            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-200"><FaArrowRight className="text-xl" />Visit Site</div>
                        </div> */}
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="w-screen lg:w-[25vw] lg:flex flex-col gap-2 text-black border lg:mx-auto lg:p-5">
                            {/* <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Related Categories</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        eventDetails.relatedCategories.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md">{ele}</div>)
                                    }
                                </div>
                            </div> */}
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold mb-2">About</div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    {/* <p>{showFullContent ? eventDetails.about : truncatedContent}</p>
                                    <button onClick={toggleAbout} className="text-blue-500">
                                        {showFullContent ? 'Less About' : 'More About'}
                                    </button> */}
                                    <p className="text-justify">{eventDetails.about}</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Today{`'`}s Top Categories</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        Categories.slice(0, 20).map((ele, index) => (
                                            <div key={index} className="text-sm p-1 duration-300 bg-gray-300 hover:bg-red-200 rounded-md"
                                                onClick={() => {
                                                    navigate("/categoriesdetails", { state: { category: ele.name, category_icon: ele.icon } })
                                                }}>
                                                {ele.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Browse By Store</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        firstLatter.map((ele, index) => (
                                            <div
                                                key={index}
                                                className="text-sm flex items-center justify-center cursor-pointer h-[25px] w-[25px] p-1 duration-300 bg-gray-300 hover:bg-red-200 rounded-md"
                                                onClick={() => navigate("/allstores", { state: { letter: ele } })}
                                            >
                                                {ele}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="bg-white p-3 shadow-sm">
                                <div className="text-xl font-bold my-2">Popular Store</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        couponDetails.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md"
                                            onClick={() => {
                                                navigate(`/Stores/${ele.name}`, { state: { sId: ele.store_id } });
                                            }}>{ele.name}</div>)
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="lg:w-[75vw] lg:flex flex-col gap-5 text-black border lg:mx-auto lg:p-5">

                            {
                                couponDetails.slice(0, eventsToShow).map((ele, index) => {
                                    return (
                                        <div key={index} className="group w-full lg:w-[45rem] bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 hover:shadow-lg duration-300">
                                            <span
                                                className={`p-2 hidden group-hover:inline-block duration-300 absolute right-1 top-1 rounded-lg bg-gray-300/80 ${likedItems.includes(ele.coupon_id) ? 'text-red-500' : 'text-white'
                                                    }`}
                                                onClick={() => handleLikeClick(index, ele.coupon_id)}
                                            >
                                                <FaHeart className="cursor-pointer text-xl duration-300" />
                                            </span>
                                            <div className="flex flex-col w-full gap-2">
                                                <div className="flex gap-5">
                                                    <div className="lg:w-[15%] w-[10%] h-auto flex flex-col items-center justify-center ">
                                                        <div className="border border-black flex flex-col items-center justify-center">
                                                            <img src={ele.logo_url} alt="H" className="h-[50px] w-[50px] lg:h-[75px] lg:w-[75px] rounded-lg m-2" />
                                                            <span className="bg-blue-100 text-center w-full">{ele.type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col lg:w-[85%] w-[75%] lg:mx-5 justify-between gap-2">
                                                        <div className="flex flex-col lg:flex-row justify-between w-full mt-5">
                                                            <div className="font-bold text-sm lg:text-xl">{ele.title}</div>

                                                            <div className="flex flex-col gap-5">
                                                                <div className="flex whitespace-nowrap gap-3 lg:gap-5 lg:mr-[4rem]">
                                                                    <span className="flex justify-center items-center lg:gap-2 text-green-800">
                                                                        <GoVerified className="font-bold" />Verified</span>
                                                                    <span className="flex justify-center items-center lg:gap-2">
                                                                        <CiUser></CiUser>
                                                                        {(ele.user_count)} Uses
                                                                    </span>
                                                                </div>
                                                                <button className="button has-code1" onClick={() => handleOpen(ele)} >
                                                                    <span className="is-code1">74
                                                                        {ele.coupon_code}</span>
                                                                    <span className="is-code-text1 uppercase"><em>Get {ele.type}</em></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="flex gap-1 items-center text-sm cursor-pointer justify-between">
                                                    <span className="flex gap-1 items-center text-sm cursor-pointer" onClick={() => toggleDetails(index)}> See Details <IoAddOutline className="cursor-pointer"></IoAddOutline></span>
                                                    <span className="flex gap-5 items-center text-sm cursor-pointer mr-5">
                                                        <span>41 % Success</span>
                                                        <span className="flex items-center justify-center gap-1"> <FaRegThumbsUp></FaRegThumbsUp>
                                                            <FaRegThumbsDown></FaRegThumbsDown></span>

                                                    </span>
                                                </div>
                                                {detailsVisibility[index] && (
                                                    <div className="details flex flex-col w-screen lg:w-auto">
                                                        <span className="font-bold">Due Date :  {(Date(ele.due_date))}</span>
                                                        <span>{ele.description}</span>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="flex items-center justify-center lg:w-[45rem]">
                                {eventDetails.Events.length > 25 && (
                                    <button onClick={toggleShowAllEvents} className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300">
                                        {showAllEvents ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div >
            <Footer></Footer>
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black p-5" >
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center" onClick={handleInsideClick}>
                    <div className="h-3/4  flex flex-col gap-3 lg:gap-5 items-center">
                        <div className="h-[150px] w-[150px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                            <img src={couponDetails.length !== 0 && couponDetails.logo_url && couponDetails?.logo_url} alt="logo" className='h-auto w-auto px-5' />
                        </div>
                        <div className="flex flex-col gap-5 justify-center items-center flex-wrap">
                            <div className="text-2xl font-bold whitespace-nowrap">
                                {couponDetails && couponDetails.length !== 0 && couponDetails.name && couponDetails.name.toUpperCase()}
                            </div>
                            <div className="text-xl font-bold text-black whitespace-nowrap">{selectedProduct.title}</div></div>
                        <div className="text-lg">Ends {formatDate(selectedProduct.due_date)}</div>
                        <div className="flex gap-10 items-center justify-center border border-black rounded-full text-2xl pl-10 p-2 bg-red-50/40">
                            <span className="copy-text tracking-widest">{selectedProduct.coupon_code}</span>
                            <button
                                className="bg-[#800000]  max-w-fit p-2 lg:p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                onClick={handleCopyClick}
                            >
                                Copy
                            </button>
                        </div>
                        {copySuccess && <div className="text:sm lg:text-lg text-green-800">
                            Copy and paste this code at {""}
                            <a href={correctedRefLink} target="_blank" onClick={() => { handleUse(selectedProduct.coupon_id) }} rel="noopener noreferrer" className="underline text-[#800000] hover:cursor-pointer">
                                {/* {str?.name} */}{correctedRefLink}
                            </a>
                        </div>}

                        <div className="flex gap-2 lg:gap-5 border border-[#800000] px-5 py-3 rounded-full items-center justify-center bg-red-50/40">
                            <span className="text-sm lg:text-lg text-[#800000] whitespace-nowrap">
                                Did the coupon work?
                            </span>
                            <button className="border border-green-600 hover:bg-green-600 text-black hover:text-white duration-150 px-5 py-3 rounded-md focus:outline-none">
                                <FaThumbsUp></FaThumbsUp>
                            </button>
                            <button className="border border-red-600 hover:bg-red-600 text-black hover:text-white duration-150 px-5 py-3 rounded-md focus:outline-none">
                                <FaThumbsDown></FaThumbsDown>
                            </button>
                        </div>
                    </div>

                </div>
            </Dialog>
        </>
    )
}

export default CategoriesDetails;