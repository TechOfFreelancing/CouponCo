import { MdLocalOffer } from "react-icons/md";
import { Rating } from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import {
    Dialog, Card, List, ListItem
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-scroll';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Store = () => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [ratingcount, setratingcount] = useState(0);


    const location = useLocation();
    const navigate = useNavigate();

    const [str, setStr] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [coupons, setCoupons] = useState(null);
    const [couponCounts, setCouponCounts] = useState({
        exclusive: 0,
        rewards: 0,
        deals: 0,
        sales: 0,
    });
    const sId = location.state?.sId;

    const { role } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/getStore/${sId}`);
                const coup = await axios.get(`http://localhost:4000/api/coupons/${sId}`);
                setStr(res.data.store);

                const fetchedCoupons = coup.data.coupons;

                role === "General" ? setIsLoggedIn(true) : setIsLoggedIn(false);

                const redemptionCounts = await Promise.all(
                    fetchedCoupons.map(async (coupon) => {
                        try {
                            const redemptionResponse = await axios.get(`http://localhost:4000/api/getRedeemCount/${coupon.coupon_id}`);
                            return redemptionResponse.data.redemptionCount;
                        } catch (error) {
                            console.error('Error fetching redemption count:', error);
                            return 0; // Return 0 if there's an error
                        }
                    })
                );

                // Combining coupon data with redemption counts
                const couponsWithRedemption = fetchedCoupons.map((coupon, index) => ({
                    ...coupon,
                    redemptionCount: redemptionCounts[index],
                }));

                setCoupons(couponsWithRedemption);

            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [sId]);

    const validCoupons = coupons?.filter((coupon) => {
        const dueDate = new Date(coupon.due_date);
        const today = new Date();
        return dueDate >= today;
    });

    const expiredCoupons = coupons?.filter((coupon) => {
        const dueDate = new Date(coupon.due_date);
        const today = new Date();
        return dueDate < today;
    });

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

    const handleCopyClick = () => {
        const textToCopy = document.querySelector('.copy-text');

        if (textToCopy) {
            const text = textToCopy.textContent || textToCopy.innerText;
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopySuccess(true);
                })
                .catch((err) => {
                    console.error('Unable to copy text to clipboard', err);
                    setCopySuccess(false);
                });
        }
    };

    const handleRatingChange = (value) => {
        setUserRating(value);
    };

    const resetRating = () => {
        setUserRating(0);
        if (ratingcount > 0)
            setratingcount(ratingcount - 1);
    }

    const handleReview = async () => {
        console.log(userRating);

        let data = JSON.stringify({
            "rating": userRating,
        });

        try {
            await axios.put(`http://localhost:4000/api/addRatings/${sId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            toast.success(`Ratings Added Successfully!`);
        } catch (error) {
            toast.error("Failed to add ratings!");
            console.error(error);
        }

    }

    useEffect(() => {
        if (userRating !== 0 && ratingcount < 1) {
            setratingcount(ratingcount + 1);
        }
    }, [userRating]);

    const [detailsVisibility, setDetailsVisibility] = useState(Array(coupons?.length).fill(false));

    useEffect(() => {
        const counts = {
            exclusive: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('code')).length,
            rewards: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('reward')).length,
            deals: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('deal')).length,
            sales: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('sale')).length,
        };

        setCouponCounts(counts);
    }, [coupons]);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="mt-20 lg:mt-28 flex flex-col lg:flex-row gap-5 h-full w-[100vw] lg:py-5" onClick={handleOutsideClick}>
                <div className="w-full lg:w-1/4 h-full flex flex-col gap-5 px-5 lg:px-10 text-sm">
                    <div className="h-[208px] w-[208px] bg-white rounded-full flex items-center justify-center shadow-lg mt-5 mx-auto overflow-hidden">
                        <img src={str?.logo_url} alt="logo" className='h-auto w-auto max-h-full max-w-full' />
                    </div>

                    <div className="text-2xl text-center font-bold inline">{str?.name}</div>
                    <div className="flex gap-2 items-center text-red-600 hover:underline">
                        Submit a coupon <MdLocalOffer className="cursor-pointer"></MdLocalOffer>
                    </div>
                    <div className="font-bold">MORE ABOUT {str?.name?.toUpperCase()}</div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5 items-center">
                            <Rating value={userRating} onChange={handleRatingChange} />
                            <span className="font-bold whitespace-nowrap"><span>{userRating}</span> RATING </span>
                        </div>
                        <div className="flex gap-5 items-center ">
                            <span className="whitespace-nowrap">
                                Avg Rating : {isNaN((str?.total_ratings / str?.ratings_count).toFixed(1)) ? 0 : (str?.total_ratings / str?.ratings_count).toFixed(1)}
                            </span>

                            <button className="bg-[#800000] max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => resetRating()}>Reset</button>
                            {isLoggedIn ? (
                                <button className="bg-[#800000] max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => { handleReview() }}>Submit</button>
                            ) : (
                                <button className="bg-[#800000] max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => { navigate("/login") }}>Login</button>
                            )}

                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Card className="min-w-full flex flex-col gap-2 pt-5 w-86">
                            <div className="text-xl text-black font-semibold whitespace-nowrap px-5 overflow-hidden text-overflow-ellipsis max-w-full">{str?.name}&apos;s Active Voucher Codes</div>
                            <div className="flex justify-between items-center px-5">
                                <span className="text-lg text-black font-semibold">Exclusive codes</span>
                                <span>{couponCounts.exclusive}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center px-5">
                                <span className="text-lg text-black font-semibold">Rewards</span>
                                <span>{couponCounts.rewards}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center px-5">
                                <span className="text-lg text-black font-semibold">Deals</span>
                                <span>{couponCounts.deals}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center px-5">
                                <span className="text-lg text-black font-semibold">Sales</span>
                                <span>{couponCounts.sales}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between items-center bg-red-50 px-5 py-2">
                                <span className="text-lg text-black font-semibold ">Total Offers</span>
                                <span className="text-red-600 text-lg font-semibold">{validCoupons?.length}</span>
                            </div>

                        </Card>
                        <Card className="w-80">
                            <List>
                                <Link className="text-initial" to="about"
                                    spy={true}
                                    smooth={true}
                                    offset={-150}
                                    duration={800}>
                                    <ListItem>About {str?.name?.toUpperCase()}</ListItem>
                                </Link>
                                <Link className="text-initial" to="faqs"
                                    spy={true}
                                    smooth={true}
                                    offset={-150}
                                    duration={800}>
                                    <ListItem>FAQS</ListItem>
                                </Link>
                                <Link className="text-initial" to="hints_tips"
                                    spy={true}
                                    smooth={true}
                                    offset={-150}
                                    duration={800}>
                                    <ListItem>Hints & Tips</ListItem>
                                </Link>
                            </List>
                        </Card>
                    </div>
                </div>
                <div className="w-full lg:w-3/4 h-full flex flex-col">
                    <div className="my-5">
                        <div className="lg:text-4xl text-2xl font-bold ml-10 hidden lg:inline">Verified {str?.name} Coupons & Promo Codes </div>
                    </div>
                    <div className="flex flex-col gap-5 my-5 items-center mx-10">
                        {
                            validCoupons && validCoupons.map((ele, index) => {
                                return (
                                    <div key={index} className="flex flex-col border border-gray-500 rounded-lg p-5 w-full lg:w-[50rem] hover:shadow-lg duration--150 ">
                                        <div className="flex flex-col lg:flex-row justify-between gap-10 px-4 items-center">
                                            <div className="flex flex-col lg:flex-row items-center justify-start w-full gap-3 lg:gap-10">
                                                <div className="bg-gray-300 max-w-fit p-2 rounded-lg">{ele.type}</div>
                                                <div className="font-bold text-xl">{ele.title}</div>
                                                <div className="flex gap-2 text-gray-500 text-sm">
                                                    <span><div>Verified</div></span>
                                                    <span>{ele.redemptionCount} uses</span>
                                                </div>
                                            </div>
                                            <div className="bg-[#800000] max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Show Code</div>
                                        </div>
                                        <hr className="my-5" />
                                        <div className="flex gap-1 items-center text-sm cursor-pointer" onClick={() => toggleDetails(index)}>
                                            See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                        </div>
                                        {detailsVisibility[index] && (
                                            <div className="details flex flex-col gap-2">
                                                <span className="font-bold">Ends {formatDate(ele.due_date)}</span>
                                                <span>{ele.description}</span>
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-full lg:w-[50rem]" id="about">
                        <div className="font-semibold lg:text-4xl text-2xl my-3">About {str?.name?.toUpperCase()}</div>
                        <div className="moreaboutcompany flex flex-col gap-2">
                            <div className="flex flex-col text-justify">{str?.description}</div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[50rem]" id="faqs">
                        <div className="font-semibold lg:text-4xl text-2xl my-3">FAQs</div>
                        <div className="moreaboutcompany flex flex-col gap-2">
                            {
                                str?.faq?.map((ele, index) => {
                                    return (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="font-bold text-2xl">{ele.question}</div>
                                            <div>{ele.answer}</div>
                                        </div>)
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full lg:w-[50rem]" id="hints_tips">
                        <div className="font-semibold lg:text-4xl text-2xl my-3">Hints and Tips</div>
                        <div className="moreaboutcompany flex flex-col gap-2">
                            {str?.hint?.includes('\n') ? (
                                str?.hint?.split('\n').map((line, index) => (
                                    <div className="flex flex-col text-justify" key={index}>
                                        {line}
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col text-justify">{str?.hint}</div>
                            )}
                        </div>
                    </div>

                    <Card className="flex flex-col gap-2 pt-5 w-full lg:w-[50rem]">
                        <div className="text-xl text-black font-semibold whitespace-nowrap px-5">
                            Recently Expired {str?.name} Discount Codes & Deals
                        </div>
                        {expiredCoupons?.map((coupon, index) => (
                            <div key={index} className="flex justify-between items-center px-5">
                                <span>{coupon.title}</span>
                                <span className="text-lg text-black font-semibold line-through border-2 border-dashed border-black p-2 px-5 rounded-md">
                                    {coupon.coupon_code}
                                </span>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
            {/* <div className="flex flex-col gap-5 my-5 items-start mx-10">
                    <div className="font-semibold lg:text-4xl text-2xl my-3">Similar Products</div>
                    {
                        first_store.similar_products.map((ele, index) => {
                            return (
                                <div key={index} className="flex flex-col border border-gray-500 rounded-lg p-5 w-full lg:w-[50rem] hover:shadow-lg duration--150 ">
                                    <div className="flex flex-col lg:flex-row justify-between gap-10 px-4 items-center">
                                        <div className="flex flex-col font-bold">
                                            <span className="text-3xl text-red-600 whitespace-nowrap">{ele.offer} %</span>
                                            <span className="text-3xl text-red-600">Off</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="bg-gray-300 max-w-fit p-2 rounded-lg">{ele.label}</div>
                                            <div className="font-bold text-xl">{ele.title}</div>
                                            <div className="flex gap-2 text-gray-500 text-sm">
                                                <span>{ele.verified && <div>Verified</div>}</span>
                                                <span>{ele.uses} uses today</span>
                                            </div>
                                        </div>
                                        <div className="bg-[#800000] max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Show Code</div>
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
                </div> */}
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black" >
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center" onClick={handleInsideClick}>
                    <div className="h-3/4  flex flex-col gap-5 items-center">
                        <div className="h-[112px] w-[112px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                            <img src={str?.logo_url} alt="logo" className='h-auto w-auto px-5' />
                        </div>
                        <div className="text-md font-bold">{str?.name.toUpperCase()}</div>
                        <div className="text-2xl font-bold text-black">{selectedProduct.title}</div>
                        <div className="text-sm">Ends {formatDate(selectedProduct.due_date)}</div>
                        <div className="flex gap-2 items-center justify-center border border-black rounded-full text-2xl pl-5 p-2">
                            <span className="copy-text">{selectedProduct.coupon_code}</span>
                            <button
                                className="bg-[#800000] max-w-fit p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                onClick={handleCopyClick}
                            >
                                Copy
                            </button>
                        </div>
                        {copySuccess && <span style={{ color: 'green' }}>Copied!</span>}
                        <div className="text-sm">
                            Copy and paste this code at {""}
                            <a href={`http://${selectedProduct.ref_link}`} target="_blank" rel="noopener noreferrer" className="underline text-red-500 hover:cursor-pointer">
                                {selectedProduct.ref_link}
                            </a>
                        </div>
                        {
                            selectedProduct.description && (
                                <div className="h-[15rem] w-full bg-gray-300 overflow-y-scroll mt-5 p-10 flex flex-col gap-5">
                                    {
                                        selectedProduct.description && (
                                            <div>
                                                <span className="flex gap-2"><span className="text-black">Details</span>
                                                </span>
                                                <div className="text-gray-600">{selectedProduct.description}</div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Store
