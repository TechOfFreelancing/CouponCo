import { MdLocalOffer } from "react-icons/md";
import { Rating } from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
    Dialog, List, ListItem,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-scroll';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FcAbout } from "react-icons/fc";
import { motion } from 'framer-motion'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";

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
    const [savedCoupons, setSavedCoupons] = useState({});

    const navigate = useNavigate();

    const location = useLocation();

    const [str, setStr] = useState(null);
    const [coupons, setCoupons] = useState(null);
    const [couponCounts, setCouponCounts] = useState({
        exclusive: 0,
        rewards: 0,
        deals: 0,
        sales: 0,
    });
    const [likedItems, setLikedItems] = useState([]);


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
                const verifiedCoupons = coup.data.coupons.filter(coupon => coupon.isVerified);

                setCoupons(verifiedCoupons);

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

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('id');

            if (userId) {
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };

                    const response = await axios.get(`http://localhost:4000/api/getDetails/${userId}`, config);
                    const savedCouponsData = response.data.savedCoupons || [];
                    const likedCouponIds = savedCouponsData.map(coupon => coupon.coupon_id);

                    setLikedItems(likedCouponIds);
                } catch (error) {
                    console.error('Error fetching saved coupons:', error);
                }
            }

            // Rest of your code for filtering and setting valid coupons
            const validCoupons = coupons?.filter((coupon) => {
                const dueDate = new Date(coupon.due_date);
                const today = new Date();
                return dueDate >= today;
            });

            const filteredCoupons = validCoupons?.filter((coupon) => {
                if (activeTab === 'all') {
                    return true;
                } else {
                    return coupon.type.toLowerCase() === activeTab;
                }
            });

            if (filteredCoupons) {
                const updatedSavedCoupons = {};
                filteredCoupons.forEach((coupon) => {
                    updatedSavedCoupons[coupon.id] = savedCoupons[coupon.id] || false;
                });
                setSavedCoupons(updatedSavedCoupons);
            }
        };

        fetchData();
    }, [coupons, activeTab]);


    const validCoupons = coupons?.filter((coupon) => {
        const dueDate = new Date(coupon.due_date);
        const today = new Date();
        return dueDate >= today;
    });

    const filteredCoupons = validCoupons?.filter(coupon => {
        if (activeTab === 'all') {
            return true;
        } else {
            return coupon.type.toLowerCase() === activeTab;
        }
    });

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);

        const day = date.getDate();
        const suffix = (day >= 10 && day <= 20) ? 'th' : ['st', 'nd', 'rd'][day % 10 - 1] || 'th';

        return formattedDate.replace(/(\d+)(?=(st|nd|rd|th))/, `$1${suffix}`);
    };

    let mostRecentDate = null;

    validCoupons?.forEach((coupon) => {
        const couponDate = new Date(coupon.created_at);
        if (!mostRecentDate || couponDate >= mostRecentDate) {
            mostRecentDate = couponDate;
        }
    });

    // Formatting the most recent date
    const formattedDate = mostRecentDate ? formatDate(mostRecentDate.toISOString()) : 'X'

    const expiredCoupons = coupons?.filter((coupon) => {
        const dueDate = new Date(coupon.due_date);
        const today = new Date();
        return dueDate < today;
    });

    const handleUse = async (cId) => {
        try {
            await axios.put(`http://localhost:4000/api/inCount/${cId}`);
        } catch (error) {
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

    const handleLikeClick = async (index, cId) => {
        const token = localStorage.getItem('token');

        // Check if token is present
        if (!token) {
            window.location.href = '/login'; // Redirect to login page if token is not present
            return;
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

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    const formatUserCount = (count) => {
        if (count >= 10000000) {
            return `${(count / 10000000).toFixed(1)} Cr`;
        } else if (count >= 100000) {
            return `${(count / 100000).toFixed(1)} L`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)} K`;
        } else {
            return count.toString();
        }
    };

    // const correctedRefLink = selectedProduct?.ref_link?.replace(/(https?:\/\/)([^:\/]+)/, "$1$2:");

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const descriptionToShow = showFullDescription
        ? str?.description
        : truncatedDescription;

    const lessAbout = showFullDescription ? 'Less' : 'More';

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="mt-20 lg:mt-28 flex flex-col lg:flex-row gap-5 h-full lg:w-[90vw] lg:mx-auto lg:py-5" onClick={handleOutsideClick}>
                <div className="w-full lg:w-1/4 h-full flex flex-col gap-5 px-5 text-sm">
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
                    <div className="flex flex-col gap-5 items-center justify-center">
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
                    <div className="min-w-full flex flex-col gap-2 pt-5 w-86">

                        <div className="text-base text-black font-semibold whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-full">{str?.name}&apos;s shoppers also like</div>
                        {
                            validCoupons && validCoupons?.slice(0, 2).map((ele, index) => {
                                return (

                                    <div key={index} className="flex gap-3 w-full cursor-pointer" onClick={() => handleOpen(ele)}>
                                        <div className="w-[30%] h-auto flex flex-col border border-gray-700 rounded-lg "><div className="flex flex-col "><img src={str?.logo_url} alt="H" className="rounded-full" /></div></div>
                                        <div className="flex flex-col justify-start">
                                            <div className="font-semibold">{ele.title}</div>
                                            <div>{ele.description.slice(0, 50)}...</div>
                                        </div>

                                    </div>

                                )
                            })
                        }
                    </div>
                    <div className="min-w-full flex flex-col gap-2 pt-5 w-86">
                        <div className="text-base text-black font-semibold whitespace-nowrap overflow-hidden text-overflow-ellipsis max-w-full">{str?.name}&apos;s Active Voucher Codes</div>
                        <div className="flex justify-between items-center px-5">
                            <span className="text-lg text-black">Exclusive codes</span>
                            <span>{couponCounts.exclusive}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center px-5">
                            <span className="text-lg text-black">Rewards</span>
                            <span>{couponCounts.rewards}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center px-5">
                            <span className="text-lg text-black">Deals</span>
                            <span>{couponCounts.deals}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center px-5">
                            <span className="text-lg text-black">Sales</span>
                            <span>{couponCounts.sales}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between items-center bg-red-50 px-5 py-2">
                            <span className="text-lg text-black">Total Offers</span>
                            <span className="text-red-600 text-lg">{validCoupons?.length}</span>
                        </div>
                        <List>
                            <div className="w-full lg:w-80 card">
                                <div className="font-semibold text-xl my-3 text-black">
                                    About {str?.name?.toUpperCase()}
                                </div>
                                <div className="moreaboutcompany flex flex-col gap-2 text-black ">
                                    <div className="flex flex-col text-justify w-64">{descriptionToShow}</div>
                                    <div
                                        className="underline text-red-500 cursor-pointer"
                                        onClick={toggleDescription}
                                    >
                                        {lessAbout}
                                    </div>
                                </div>
                            </div>
                            {
                                str?.moreAbout && (
                                    <Link
                                        className="text-initial"
                                        to="more_about"
                                        spy={true}
                                        smooth={true}
                                        offset={-150}
                                        duration={800}
                                    >
                                        <ListItem className="flex gap-5 justify-between">More About <FcAbout /> </ListItem>
                                    </Link>
                                )
                            }
                            {
                                str?.faq && (
                                    <Link
                                        className="text-initial"
                                        to="faqs"
                                        spy={true}
                                        smooth={true}
                                        offset={-150}
                                        duration={800}
                                    >
                                        <ListItem className="flex gap-5 justify-between">FAQS  <FaQuestionCircle></FaQuestionCircle></ListItem>
                                    </Link>
                                )
                            }
                            {
                                str?.hint && (
                                    <Link
                                        className="text-initial"
                                        to="hints_tips"
                                        spy={true}
                                        smooth={true}
                                        offset={-150}
                                        duration={800}
                                    >
                                        <ListItem className="flex gap-5 justify-between">How To Apply? <MdTipsAndUpdates></MdTipsAndUpdates></ListItem>
                                    </Link>
                                )
                            }


                        </List>
                        <div className="w-80">
                            <List>
                                <div className="font-semibold text-xl my-3 text-black">
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
                            <List>
                                <div className="font-semibold text-xl my-3 text-black">
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
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-3/4 h-full flex flex-col border-l-2 lg:mx-5">
                    <Tabs value={activeTab} className="p-5">
                        <div className="flex flex-col gap-3 justify-evenly mt-5 ">
                            <div className="lg:text-4xl text-2xl font-bold hidden lg:inline">{str?.title}</div>
                            <div className="text-sm font-semibold uppercase">
                                Best 9 offers last validated on {formattedDate}
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-5 mt-3 pr-10">
                            <TabsHeader className="lg:w-full flex lg:gap-4 " style={{ zIndex: 10 }}>
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
                                    value="Deals"
                                    className={activeTab === 'deal' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                    onClick={() => handleTabChange('deal')}
                                >
                                    <div className="flex items-center gap-2 lg:mx-2">
                                        Deals({couponCounts.deals})
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

                            </TabsHeader>
                            <div className="flex items-start text-red-600 hover:underline cursor-pointer" onClick={() => {
                                navigate('/submitcoupon', { state: { storeId: sId } });
                            }}>
                                <div className="inline">Submit a coupon</div>
                                <MdLocalOffer className="cursor-pointer" />
                            </div>
                        </div>
                    </Tabs>
                    <div className="flex flex-col gap-5 items-start lg:mx-5">
                        {
                            filteredCoupons && filteredCoupons.map((ele, index) => {
                                return (
                                    <motion.div variants={variants} initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="relative flex flex-col border border-gray-500 rounded-lg p-5 w-full lg:w-[60rem] hover:shadow-lg duration-300 ">
                                        <span
                                            className={`p-2 absolute right-1 top-1 rounded-lg bg-gray-300/80 ${likedItems.includes(ele.coupon_id) ? 'text-red-700' : 'text-white'}`}
                                            onClick={() => handleLikeClick(index, ele.coupon_id)}
                                        >
                                            <FaHeart className="cursor-pointer text-xl duration-300" />
                                        </span>
                                        <div className="flex w-full">
                                            <div className="w-[15%] h-auto flex flex-col"><div className="border border-black flex flex-col "><img src={str?.logo_url} alt="H" className="h-[104px] rounded-lg" /><span className="bg-blue-100 text-center">{ele.type}</span></div></div>
                                            <div className="flex flex-col w-[85%] mx-5 justify-between gap-5">

                                                <div className="flex justify-between w-full mt-10 ">
                                                    <div className="font-bold text-xl">{ele.title}</div>
                                                    <div className="bg-red-700 w-[20rem] text-center p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Get Deal</div>
                                                </div>
                                                <div className="flex w-full justify-between items-start h-[5rem] overflow-y-scroll scrollbar-hide">
                                                    <div>
                                                        <div className="flex gap-1 items-center text-sm cursor-pointer" onClick={() => toggleDetails(index)}>
                                                            See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                                        </div>
                                                        {detailsVisibility[index] && (
                                                            <div className="details flex flex-col">
                                                                <span className="font-bold">Ends {formatDate(ele.due_date)}</span>
                                                                <span>{ele.description}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex whitespace-nowrap gap-5 lg:mr-[4rem]">
                                                        <span className="flex justify-center items-center gap-2"><GoVerified className="text-blue-800" />Verified</span>
                                                        <span className="flex justify-center items-center gap-2">
                                                            <CiUser></CiUser>
                                                            {formatUserCount(ele.user_count)} Uses
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })
                        }
                    </div>
                    {
                        expiredCoupons && (
                            <div className="flex flex-col mt-5 gap-5 items-start lg:mx-5">
                                <div className="text-xl text-black font-semibold">
                                    Recently Expired {str?.name} Discount Codes & Deals
                                </div>
                                {expiredCoupons?.map((ele, index) => (
                                    <motion.div variants={variants} initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="relative group flex border border-gray-500 rounded-lg p-5 w-full lg:w-[60rem] hover:shadow-lg duration-300 ">

                                        <div className="flex w-full">
                                            <div className="w-[15%] h-auto flex flex-col"><div className="border border-black flex flex-col "><img src={str?.logo_url} alt="H" className="h-[104px] rounded-lg" /><span className="bg-blue-100 text-center">DEAL</span></div></div>
                                            <div className="flex flex-col w-[85%] mx-5 justify-center gap-5 ">

                                                <div className="flex justify-between w-full mt-10 ">
                                                    <div className="font-bold text-xl">{ele.title}</div>
                                                    <div className="bg-red-700 w-[20rem] text-center p-2 rounded-xl text-white cursor-pointer whitespace-nowrap hover:shadow-xl" onClick={() => handleOpen(ele)}>Get Deal</div>
                                                </div>
                                                <div className="flex w-full justify-between items-start h-[5rem] overflow-y-scroll scrollbar-hide">
                                                    <div>
                                                        <div className="flex gap-1 items-center text-sm cursor-pointer" onClick={() => toggleDetails(index)}>
                                                            See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                                        </div>
                                                        {detailsVisibility[index] && (
                                                            <div className="details flex flex-col">
                                                                <span className="font-bold">Ends {formatDate(ele.due_date)}</span>
                                                                <span>{ele.description}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex whitespace-nowrap gap-5 lg:mr-[4rem]">
                                                        <span className="flex justify-center items-center gap-2"><GoVerified className="text-blue-800" />Verified</span>
                                                        <span className="flex justify-center items-center gap-2">
                                                            <CiUser></CiUser>
                                                            {formatUserCount(ele.user_count)} Uses
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </motion.div>
                                )
                                )}
                            </div>
                        )
                    }
                    {
                        str?.moreAbout && (
                            <div className="w-full lg:w-[50rem] lg:mx-10 p-5" id="more_about">
                                <div className="font-semibold lg:text-4xl text-2xl my-3">More About {str?.name}</div>
                                <div className="moreaboutcompany flex flex-col gap-2">
                                    <div className="flex flex-col text-justify">{str?.moreAbout}</div>
                                </div>

                            </div>
                        )
                    }
                    {
                        str?.faq && (
                            <div className="w-full lg:w-[60rem] lg:mx-10 p-5" id="faqs">
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
                        )
                    }
                    {
                        str?.hint && (
                            <div className="w-full lg:w-[60rem] lg:mx-10 p-5" id="hints_tips">
                                <div className="font-semibold lg:text-4xl text-2xl my-3">How to apply?</div>
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
                        )
                    }
                </div>
            </div>
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black py-5" >
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center" onClick={handleInsideClick}>
                    <div className="h-3/4  flex flex-col gap-5 items-center">
                        <div className="h-[150px] w-[150px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                            <img src={str?.logo_url} alt="logo" className='h-auto w-auto px-5' />
                        </div>
                        <div className="flex gap-5 justify-center items-center"> <div className="text-2xl font-bold">{str?.name.toUpperCase()}</div>
                            <div className="text-2xl font-bold text-black">{selectedProduct.title}</div></div>
                        <div className="text-lg">Ends {formatDate(selectedProduct.due_date)}</div>
                        <div className="flex gap-10 items-center justify-center border border-black rounded-full text-2xl pl-10 p-2 bg-red-50/40">
                            <span className="copy-text tracking-widest">{selectedProduct.coupon_code}</span>
                            <button
                                className="bg-[#800000]  max-w-fit p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                onClick={handleCopyClick}
                            >
                                Copy
                            </button>
                        </div>
                        {copySuccess && <span style={{ color: 'green' }}>Copied!</span>}
                        <div className="text-lg">
                            Copy and paste this code at {""}
                            <a href={`http://${selectedProduct.ref_link}`} target="_blank" onClick={() => { handleUse(selectedProduct.coupon_id) }} rel="noopener noreferrer" className="underline text-[#800000] hover:cursor-pointer">
                                {str?.name}
                            </a>
                        </div>
                        <div className="flex gap-5 border border-[#800000] px-5 py-3 rounded-full items-center justify-center bg-red-50/40">
                            <span className="text-sm lg:text-lg text-[#800000]">
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

export default Store
