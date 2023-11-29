import { MdLocalOffer } from "react-icons/md";
import { Rating } from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";
import {
    Dialog, Card, List, ListItem,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-scroll';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from '../components/AuthContext';
import { motion } from 'framer-motion'


const Store = () => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [ratingcount, setratingcount] = useState(0);
    const [activeTab, setActiveTab] = useState('all');
    const [truncatedDescription, setDesc] = useState('...');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [similarStoreNames, setSimilarStoreNames] = useState([]);
    const [popularStoreNames, setPopularStoreNames] = useState([]);
    const [submittingCoupon, setSubmittingCoupon] = useState(false);
    const [couponCode, setCouponCode] = useState('');

    const navigate = useNavigate();

    const location = useLocation();

    const { role } = useContext(AuthContext);
    const [str, setStr] = useState(null);
    const [coupons, setCoupons] = useState(null);
    const [couponCounts, setCouponCounts] = useState({
        exclusive: 0,
        rewards: 0,
        deals: 0,
        sales: 0,
    });
    const sId = location.state?.sId;

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/getStore/${sId}`);
                const coup = await axios.get(`http://localhost:4000/api/coupons/${sId}`);
                setStr(res.data.store);

                const truncated = res.data.store.description?.slice(0, 100);
                setDesc(truncated || '...');

                const fetchedCoupons = coup.data.coupons;

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

                const couponsWithRedemption = fetchedCoupons.map((coupon, index) => ({
                    ...coupon,
                    redemptionCount: redemptionCounts[index],
                }));

                setCoupons(couponsWithRedemption);
                const response = await axios.get('http://localhost:4000/api/clouser');

                const similarStores = response.data.data.filter(item => item.store_type === 'similar' && item.store_id == sId);
                const popularStores = response.data.data.filter(item => item.store_type === 'popular' && item.store_id == sId);

                const getStoreInfo = async stores => {
                    return await Promise.all(
                        stores.map(async store => {
                            const res = await axios.get(`http://localhost:4000/api/getStore/${store.sId}`);
                            return { id: store.sId, name: res.data.store.name };
                        })
                    );
                };

                const similarStoreInfo = await getStoreInfo(similarStores);
                const popularStoreInfo = await getStoreInfo(popularStores);

                setSimilarStoreNames(similarStoreInfo);
                setPopularStoreNames(popularStoreInfo);

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

    const toggleCouponSubmission = () => {
        if (role !== 'General') {
            window.location.href = '/login'; // Redirect to login if the role is not General
        } else {
            setSubmittingCoupon(!submittingCoupon); // Toggle input field if the role is General
        }
    };

    const handleInputChange = event => {
        setCouponCode(event.target.value);
    };

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleRedeem();
        }
    };

    const handleRedeem = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/redeem`, {
                "coupon_code": couponCode
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.error);
            console.error(error);
        }

    }

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
        const confirmed = window.confirm('Are you sure you want to submit ratings?');

        if (confirmed) {
            handleReview(value);
        }
    };

    const handleReview = async (rate) => {

        let data = JSON.stringify({
            "rating": rate,
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

    const totalRedemptionCount = validCoupons?.reduce((total, coupon) => {
        return total + coupon.redemptionCount;
    }, 0)


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

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    const filteredCoupons = validCoupons?.filter(coupon => {
        if (activeTab === 'all') {
            return true;
        } else {
            return coupon.type.toLowerCase() === activeTab;
        }
    });


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const descriptionToShow = showFullDescription
        ? str?.description
        : truncatedDescription;

    const lessAbout = showFullDescription ? 'Less about ' : 'More about ';

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="mt-20 lg:mt-28 flex flex-col lg:flex-row gap-5 h-full w-[100vw] lg:py-5" onClick={handleOutsideClick}>
                <div className=" w-full lg:w-1/4 h-full flex flex-col gap-5 px-5 lg:px-10 text-sm">
                    <div className="bg-white p-4 flex items-center flex-wrap">
                        <ul className="flex items-center">
                            <li className="inline-flex items-center">
                                <a href="/" className="text-gray-600 hover:text-red-500">
                                    <svg className="w-5 h-auto fill-current mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                                </a>

                                <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                            </li>

                            <li className="inline-flex items-center">
                                <a href="/Stores" className="text-gray-600 hover:text-red-500 whitespace-nowrap">
                                    Stores
                                </a>
                                <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
                            </li>

                            <li className="inline-flex items-center">
                                <a href={`/Stores/${str?.name}`} className="text-gray-600 hover:text-red-500 whitespace-nowrap">
                                    {str?.name}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="h-[208px] w-[208px] bg-white rounded-full flex items-center justify-center shadow-lg mt-5 mx-auto overflow-hidden">
                        <img src={str?.logo_url} alt="logo" className='h-auto w-auto max-h-full max-w-full' />
                    </div>

                    <div className="text-2xl text-center font-bold inline">{str?.name}</div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5 items-center">
                            <Rating value={userRating} onChange={handleRatingChange} />
                            <span className="font-bold whitespace-nowrap"><span>{userRating}</span> RATING </span>
                        </div>
                        <div className="flex gap-5 items-center ">
                            <span className="whitespace-nowrap">
                                Avg Rating : {isNaN((str?.total_ratings / str?.ratings_count).toFixed(1)) ? 0 : (str?.total_ratings / str?.ratings_count).toFixed(1)}
                            </span>
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
                                <div className="w-full lg:w-80 lg:px-10 card">
                                    <div className="font-semibold text-2xl my-3 text-black">
                                        {lessAbout} {str?.name?.toUpperCase()}
                                    </div>
                                    <div className="moreaboutcompany flex flex-col gap-2 text-black ">
                                        <div className="flex flex-col text-justify w-64">{descriptionToShow}</div>
                                        <div
                                            className="underline text-red-500 cursor-pointer"
                                            onClick={toggleDescription}
                                        >
                                            {lessAbout} {str?.name}
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    className="text-initial"
                                    to="faqs"
                                    spy={true}
                                    smooth={true}
                                    offset={-150}
                                    duration={800}
                                >
                                    <ListItem>FAQS</ListItem>
                                </Link>
                                <Link
                                    className="text-initial"
                                    to="hints_tips"
                                    spy={true}
                                    smooth={true}
                                    offset={-150}
                                    duration={800}
                                >
                                    <ListItem>Hints & Tips</ListItem>
                                </Link>
                            </List>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-5">

                        <Card className="w-80">
                            <List>
                                <div className="font-semibold lg:text-4xl text-2xl my-3 text-black">
                                    Similar Stores
                                </div>
                                {similarStoreNames && similarStoreNames.length > 0 ? (
                                    similarStoreNames.map((store, index) => (
                                        <motion.div variants={variants} initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="text-initial"
                                            onClick={() => {
                                                navigate(
                                                    `/Stores/${store.name}`, { state: { sId: store.id } }
                                                )
                                            }}>
                                            <ListItem>{store.name}</ListItem>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div>No similar stores found</div>
                                )}
                            </List>
                        </Card>

                        <Card className="w-80">
                            <List>
                                <div className="font-semibold lg:text-4xl text-2xl my-3 text-black">
                                    Popular Stores
                                </div>
                                {popularStoreNames && popularStoreNames.length > 0 ? (
                                    popularStoreNames.map((store, index) => (
                                        <motion.div variants={variants} initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="text-initial"
                                            onClick={() => {
                                                navigate(
                                                    `/Stores/${store.name}`, { state: { sId: store.id } }
                                                )
                                            }}>
                                            <ListItem>{store.name}</ListItem>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div>No popular stores found</div>
                                )}
                            </List>
                        </Card>
                    </div>
                </div>
                <div className="w-full lg:w-3/4 h-full flex flex-col border-l-2">
                    <Tabs value={activeTab} className="p-5">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-5  px-10">
                            <TabsHeader className="w-full flex gap-4 " style={{ zIndex: 10 }}>
                                <Tab
                                    value="all"
                                    className={activeTab === 'all' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                    onClick={() => handleTabChange('all')}
                                >
                                    <div className="flex items-center gap-2 lg:mx-2">
                                        All({validCoupons?.length})
                                    </div>
                                </Tab>
                                <Tab
                                    value="Rewards"
                                    className={activeTab === 'reward' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                    onClick={() => handleTabChange('reward')}
                                >
                                    <div className="flex items-center gap-2 lg:mx-2">
                                        Rewards({couponCounts.rewards})
                                    </div>
                                </Tab>
                                <Tab
                                    value="codes"
                                    className={activeTab === 'code' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                    onClick={() => handleTabChange('code')}
                                >
                                    <div className="flex items-center gap-2 lg:mx-2">
                                        Codes({couponCounts.exclusive})
                                    </div>
                                </Tab>
                                <Tab
                                    value="Sale"
                                    className={activeTab === 'sale' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                    onClick={() => handleTabChange('sale')}
                                >
                                    <div className="flex items-center gap-2 lg:mx-2">
                                        Sale({couponCounts.sales})
                                    </div>
                                </Tab>
                            </TabsHeader>
                            <div className=" flex items-start text-red-600 hover:underline cursor-pointer">
                                {submittingCoupon ? (
                                    <div className="seachbar flex p-3 h-[3rem] border-red-700 border-solid border-2 hover:border-red-800 rounded-full w-full lg:w-[25rem]  justify-between">
                                        <input type="text" placeholder="Enter coupon code" className=' outline-none bg-transparent text-black' onChange={handleInputChange}
                                            onKeyDown={handleKeyPress} value={couponCode} />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-red-600 hover:underline cursor-pointer" onClick={toggleCouponSubmission}>
                                        <div className="inline">Submit a coupon</div>
                                        <MdLocalOffer className="cursor-pointer" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 justify-evenly mt-5 lg:mx-5">
                            <div className="lg:text-4xl text-2xl font-bold hidden lg:inline">Verified {str?.name} Coupons & Promo Codes </div>
                            <div className="text-sm font-semibold uppercase">
                                Best 9 offers last validated on November 29th, 2023
                            </div>
                        </div>
                        <TabsBody>
                            <div className="flex flex-col gap-5 items-center m-10">
                                {
                                    filteredCoupons && filteredCoupons.map((ele, index) => {
                                        return (
                                            <motion.div variants={variants} initial="hidden"
                                                animate="visible"
                                                transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="flex flex-col border border-gray-500 rounded-lg p-5 w-full lg:w-[50rem] hover:shadow-lg duration-300 ">
                                                <div className="flex flex-col lg:flex-row justify-between gap-10 px-4 items-center">
                                                    <div className="flex flex-col lg:flex-row items-center justify-start w-full gap-3 lg:gap-10">
                                                        <div className="bg-gray-300 max-w-fit p-2 rounded-lg">{ele.type}</div>
                                                        <div className="font-bold text-xl">{ele.title}</div>
                                                        <div className="flex gap-2 text-gray-500 text-sm">
                                                            <span><div>Verified</div></span>
                                                            <span>{ele.redemptionCount} uses</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-red-700 max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Show Code</div>
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
                                            </motion.div>
                                        )
                                    })
                                }
                            </div>
                        </TabsBody>
                    </Tabs>
                    <Card className="flex flex-col gap-5 items-center m-10">
                        <div className="text-xl text-black font-semibold whitespace-nowrap px-5">
                            Recently Expired {str?.name} Discount Codes & Deals
                        </div>
                        {expiredCoupons?.map((ele, index) => (
                            <motion.div variants={variants} initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="flex flex-col border border-gray-500 rounded-lg p-5 w-full lg:w-[50rem] hover:shadow-lg duration-300 ">
                                <div className="flex flex-col lg:flex-row justify-between gap-10 px-4 items-center">
                                    <div className="flex flex-col lg:flex-row items-center justify-start w-full gap-3 lg:gap-10">
                                        <div className="bg-gray-300 max-w-fit p-2 rounded-lg">{ele.type}</div>
                                        <div className="font-bold text-xl">{ele.title}</div>
                                        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                                            <IoMdTime />
                                            <span>expired!</span>
                                        </div>
                                    </div>
                                    <div className="bg-red-700 max-w-fit p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Show Code</div>
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
                            </motion.div>
                        )
                        )}
                    </Card>
                    <div className="w-full lg:w-[50rem] lg:mx-10" id="faqs">
                        <div className="font-semibold lg:text-4xl text-2xl my-3">FAQs</div>
                        <div className="moreaboutcompany flex flex-col gap-2">
                            {
                                str?.faq?.map((ele, index) => {
                                    return (
                                        <motion.div variants={variants} initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="flex flex-col gap-2">
                                            <div className="font-bold text-2xl">{ele.question}</div>
                                            <div>{ele.answer}</div>
                                        </motion.div>)
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full lg:w-[50rem] lg:mx-10" id="hints_tips">
                        <div className="font-semibold lg:text-4xl text-2xl my-3">Hints and Tips</div>
                        <div className="moreaboutcompany flex flex-col gap-2">
                            {str?.hint?.includes('\n') ? (
                                str?.hint?.split('\n').map((line, index) => (
                                    <motion.div className="flex flex-col text-justify" key={index} variants={variants} initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }}>
                                        {line}
                                    </motion.div>
                                ))
                            ) : (
                                <div className="flex flex-col text-justify">{str?.hint}</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black" >
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center" onClick={handleInsideClick}>
                    <div className="h-3/4  flex flex-col gap-5 items-center">
                        <div className="h-[150px] w-[150px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
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
                            <a href={`http://${selectedProduct.ref_link}`} target="_blank" rel="noopener noreferrer" className="underline text-[#800000] hover:cursor-pointer">
                                {str?.name}
                            </a>
                        </div>
                    </div>
                    <div className="mt-auto bg-gray-200 rounded-b-lg p-4 flex justify-center items-center gap-3 lg:gap-5 w-[100%]">
                        <span className="font-semibold text-sm lg:text-lg">
                            Did the coupon work?
                        </span>

                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none">
                            Yes
                        </button>
                        <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none">
                            No
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Store
