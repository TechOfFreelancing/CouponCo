import { MdLocalOffer } from "react-icons/md";
import { Rating } from "@material-tailwind/react";
import { IoAddOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import {
    Dialog,
    Tabs,
    TabsHeader,
    Tab,
    Input,
    Button,
    Typography,
    Card
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-scroll';
import axios from "axios";
import { useLocation, useNavigate, Link as Link1 } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FcAbout } from "react-icons/fc";
import { motion } from 'framer-motion'
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';
import "../styles/couponsbutton1.css";
import Footer from "../components/Footer";
import AuthContext from "../components/AuthContext";
import { TbExternalLink } from "react-icons/tb";
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'



const Store = () => {
    const [open, setOpen] = useState(false);
    const [openlogin, setOpenlogin] = useState(false);
    const [openregister, setOpenregister] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [ratingcount, setratingcount] = useState(0);
    const [activeTab, setActiveTab] = useState('all');
    const [similarStoreNames, setSimilarStoreNames] = useState([]);
    const [popularStoreNames, setPopularStoreNames] = useState([]);
    const [savedCoupons, setSavedCoupons] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name1, setName1] = useState('');
    const [email1, setEmail1] = useState('');
    const [password1, setPassword1] = useState('');
    const [productlink, setProductlink] = useState('');
    const [waiting, setWaiting] = useState(false);


    const navigate = useNavigate();
    const { role, updateUserRole } = useContext(AuthContext);
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

    const handleOpenlogin = () => setOpenlogin(!openlogin);
    const handleOpenregister = () => setOpenregister(!openregister);

    const closeboth = () => {
        setOpenlogin(false);
        setOpenregister(false);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://backend.qwiksavings.com/api/register`, {
                name: name1,
                email,
                password,
            });
            toast.success("Registration successful");

            setTimeout(() => {
                setOpenregister(false);
                setOpenlogin(true)
            }, 200);
        } catch (error) {
            toast(error.response.statusText);
            console.error("Registration failed:", error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://backend.qwiksavings.com/api/login`, {
                email,
                password,
            });

            const { message, token, user } = res.data;

            toast.success(message);

            localStorage.setItem("token", token);
            localStorage.setItem("id", user.user_id);
            localStorage.setItem("role", user.role);
            updateUserRole(user.role);
            setOpenlogin(false);
            setTimeout(() => {
                user.role === navigate("/");
            }, 1200);
        } catch (error) {
            toast.error(error.response.statusText);
            console.error("Login failed:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://backend.qwiksavings.com/api/getStore/${sId}`);
                const coup = await axios.get(`https://backend.qwiksavings.com/api/coupons/${sId}`);
                setStr(res.data.store);
                const verifiedCoupons = coup.data.coupons.filter(coupon => coupon.isVerified);
                console.log(verifiedCoupons);
                const sortedCoupons = verifiedCoupons.sort((a, b) => {
                    const dateA = new Date(a.coupon_id);
                    const dateB = new Date(b.coupon_id);
                    return dateB - dateA; // Compare dates in descending order
                });
                console.log(sortedCoupons);
                setCoupons(sortedCoupons);

                const response = await axios.get(`https://backend.qwiksavings.com/api/clouser`);

                const similarStores = response.data.data.filter(item => item.store_type === 'similar' && item.store_id == sId);
                const popularStores = response.data.data.filter(item => item.store_type === 'popular' && item.store_id == sId);

                const getStoreInfo = async stores => {
                    return await Promise.all(
                        stores.map(async store => {
                            const res = await axios.get(`https://backend.qwiksavings.com/api/getStore/${store.sId}`);
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

                    const response = await axios.get(`https://backend.qwiksavings.com/api/getDetails/${userId}`, config);
                    const savedCouponsData = response.data.savedCoupons || [];
                    const likedCouponIds = savedCouponsData.map(coupon => coupon.coupon_id);

                    setLikedItems(likedCouponIds);
                } catch (error) {
                    console.error('Error fetching saved coupons:', error);
                }
            }
        
            // Rest of your code for filtering and setting valid coupons
            const validCoupons = coupons?.filter((coupon) => {
                console.log();
                const dueDateStr = coupon.due_date.split("T")[0]; 
                const parts = dueDateStr.split("-");
                const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
                const currentDate = new Date();
                const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                const targetDateWithoutTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
                console.log(currentDateWithoutTime);
                console.log(targetDateWithoutTime);
                return targetDateWithoutTime >= currentDateWithoutTime;
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
        return dueDate => today;
    });

    const handleUse = async (cId) => {
        try {
            await axios.patch(`https://backend.qwiksavings.com/api/inCount/${cId}`);
        } catch (error) {
            console.error(error);
        }
    }


    const handleOpen = (product) => {
        if (open) {
            handleClose();
        }
        else {
            setSelectedProduct(product);
            setOpen(!open);
            setWaiting(true)
            const correctedRefLink = product?.ref_link?.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/, "https://$1");
            setProductlink(correctedRefLink);
            if (correctedRefLink) {
                setTimeout(() => {
                    handleCopyClick();
                }, 1000);
                setTimeout(() => {
                    window.open(correctedRefLink, '_blank');
                }, 2000);
            }
        }
    };

    const handleClose = () => {
        setWaiting(true);
        setSelectedProduct("");
        setOpen(!open);
    }

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
                    setWaiting(false);
                })
                .catch((err) => {
                    console.error('Unable to copy text to clipboard', err);
                })
                .finally(() => {
                    // Restore the original selection
                    selection.removeAllRanges();
                    selection.addRange(range);
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
            await axios.put(`https://backend.qwiksavings.com/api/addRatings/${sId}`, data, {
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
                await axios.post(`https://backend.qwiksavings.com/api/saveCoupon/${cId}`, { userId }, config);
            } else {
                const filteredItems = updatedLikedItems.filter((item) => item !== cId);

                // Update state immediately for smooth UI
                setLikedItems(filteredItems);

                // API call to unsave the coupon
                await axios.delete(`https://backend.qwiksavings.com/api/unsaveCoupon/${cId}`, config);
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
            exclusive: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('codes')).length,
            rewards: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('reward')).length,
            deals: validCoupons?.filter((coupon) => coupon.type.toLowerCase().includes('deals')).length,
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

    const DueDatas = validCoupons ? (validCoupons[0]?.due_date.split('T')[0] || "X") : "X";
    console.log(validCoupons);

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="mt-22 lg:my-32 flex flex-col lg:flex-row h-full max-w-[1280px] mx-auto" >
                <div className="w-full lg:w-1/4 h-full flex flex-col gap-5 text-sm items-center">
                    <div className="bg-[#FAF9F5] p-4 pl-0 flex items-center flex-wrap">
                        <ul className="flex items-center">
                            <li className="inline-flex items-center">
                                <Link1 to="/" className="text-gray-600 hover:text-[#B33D53]">
                                    <svg className="w-5 h-auto fill-current mx-2 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                                </Link1>

                                <span className="mx-4 h-auto text-black font-medium">/</span>
                            </li>

                            <li className="inline-flex items-center">
                                <Link1 to="/all-stores" className="text-black hover:text-[#B33D53] whitespace-nowrap">
                                    All Stores
                                </Link1>
                                <span className="mx-4 h-auto text-black font-medium">/</span>
                            </li>

                            <li className="inline-flex items-center">
                                <span className="text-black hover:text-[#B33D53] whitespace-nowrap cursor-pointer">
                                    {str?.name}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className='h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem] p-5 rounded-full flex items-center justify-center border-2 border-black hover:shadow-2xl overflow-hidden'>
                        <img
                            src={str?.logo_url}
                            alt={str?.name}
                            className='h-auto w-auto max-h-full max-w-full'
                        />
                    </div>

                    <a
                        href={str?.ref_link ? (str.ref_link.startsWith('http') ? str.ref_link : 'https://' + str.ref_link) : '#'}
                        className="whitespace-nowrap hover:-translate-y-1 duration-300 text-[#B33D53] p-2 rounded-md flex items-center justify-center cursor-pointer"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Store {str?.name}
                    </a>

                    <div className="flex flex-col gap-5 items-center justify-center">
                        <div className="flex gap-5 items-center">
                            <Rating value={userRating} onChange={handleRatingChange} />
                            <span className="font-bold whitespace-nowrap"><span>{userRating}</span> Rating </span>
                        </div>
                        <div className="flex gap-5 items-center">
                            <span className="whitespace-nowrap text-lg font-bold">
                                Average Rating : {isNaN((str?.total_ratings / str?.ratings_count).toFixed(1)) ? 0 : (str?.total_ratings / str?.ratings_count).toFixed(1)}
                            </span>
                        </div>
                    </div>
                    <div className="lg:flex flex-col gap-5 hidden">
                        <div className="min-w-full flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                            <div className="font-semibold text-xl my-3 text-black">
                                About {str?.name}
                            </div>
                            <div className="moreaboutcompany flex flex-col gap-2 text-black">
                                <div>{str?.description}</div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                            <div className="text-xl" style={{ fontWeight: 600 }}>Today{`'`}s Top {str?.name} Coupon Codes</div>
                            {
                                validCoupons && validCoupons?.slice(0, 2).map((ele, index) => {
                                    return (

                                        <div key={index} className="w-full cursor-pointer list-disc bg-white rounded-lg flex gap-3">
                                            <span className="text-md">- {ele.title}</span>
                                        </div>
                                    )
                                })
                            }
                            <div className="bg-white flex flex-col gap-2 rounded-lg font-[16px]">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-black">Total Offers</span>
                                    <span>{validCoupons?.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-black">Total Codes</span>
                                    <span>{couponCounts.exclusive}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-black">Best Offer</span>
                                    <span>{str?.best_offer}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg text-black">Average Discount</span>
                                    <span className="whitespace-nowrap">{str?.avg_disc}</span>
                                </div>
                            </div>
                        </div>

                        {
                            (str?.faq || str?.hint || str?.moreAbout) && (
                                <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white ">

                                    <div className="font-semibold text-xl text-black">
                                        Quick Links
                                    </div>

                                    {
                                        str?.faq && (
                                            <Link
                                                className=" border border-gray-400 w-full cursor-pointer bg-white p-2 rounded-lg flex gap-3"
                                                to="faqs"
                                                spy={true}
                                                style={{ wordWrap: "break-word" }}
                                                smooth={true}
                                                offset={-150}
                                                duration={800}

                                            >
                                                <div className="flex gap-5 justify-between w-full">FAQS  <FaQuestionCircle></FaQuestionCircle></div>
                                            </Link>
                                        )
                                    }
                                    {
                                        str?.hint && (
                                            <Link
                                                className=" border border-gray-400 w-full cursor-pointer bg-white p-2 rounded-lg flex gap-3"
                                                to="hints_tips"
                                                spy={true}
                                                smooth={true}
                                                offset={-150}
                                                duration={800}
                                            >
                                                <div className="flex gap-5 justify-between w-full">How To Apply? <MdTipsAndUpdates></MdTipsAndUpdates></div>
                                            </Link>
                                        )
                                    }
                                    {
                                        str?.moreAbout && (
                                            <Link
                                                className="border border-gray-400 w-full cursor-pointer bg-white p-2 rounded-lg flex gap-3"
                                                to="more_about"
                                                spy={true}
                                                smooth={true}
                                                offset={-150}
                                                duration={800}
                                            >
                                                <div className="flex gap-5 justify-between w-full">More About <FcAbout /> </div>
                                            </Link>
                                        )
                                    }
                                </div>
                            )

                        }

                        {(similarStoreNames && similarStoreNames.length > 0) && (
                            <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                                <div className="font-semibold text-xl text-black">
                                    Similar Stores
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        similarStoreNames.map((store, index) => (
                                            <motion.div variants={variants} initial="hidden"
                                                animate="visible"
                                                transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md cursor-pointer"
                                                onClick={() => {
                                                    navigate(
                                                        `/Stores/${store.name}`, { state: { sId: store.id } }
                                                    )
                                                }}>
                                                <span>{store.name}</span>
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {(popularStoreNames && popularStoreNames.length > 0) && (
                            <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                                <div className="font-semibold text-xl text-black">
                                    Popular Stores
                                </div>
                                <div className="flex flex-wrap gap-2">{
                                    popularStoreNames.map((store, index) => (
                                        <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md cursor-pointer"

                                            onClick={() => {
                                                navigate(
                                                    `/Stores/${store.name}`, { state: { sId: store.id } }
                                                )
                                            }}>
                                            <span>{store.name}</span>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="w-full lg:w-3/4 h-full flex flex-col border-l-2 lg:mx-5">

                    <div className="flex flex-col gap-3 justify-evenly p-5 pt-2">
                        <div className="lg:text-4xl text-2xl font-bold hidden lg:inline">{str?.title}</div>

                        <div className="text-md lg:text-sm font-semibold uppercase">
                            Best {validCoupons?.length} offers last validated on {DueDatas}
                        </div>
                        <Tabs value={activeTab}>
                            <div className="flex flex-row items-center justify-between gap-3 lg:gap-5">
                                <TabsHeader className="lg:w-full flex gap-2 lg:gap-4 bg-[#FAF9F5]" style={{ zIndex: 10 }}>
                                    <Tab
                                        value="all"
                                        className={activeTab === 'all' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                        onClick={() => handleTabChange('all')}
                                    >
                                        <div className="flex items-center gap-2 lg:mx-2 whitespace-nowrap text-xs lg:text-sm">
                                            All ({validCoupons?.length})
                                        </div>
                                    </Tab>
                                    <Tab
                                        value="codes"
                                        className={activeTab === 'codes' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                        onClick={() => handleTabChange('codes')}
                                    >
                                        <div className="flex items-center gap-2 lg:mx-2 whitespace-nowrap text-xs lg:text-sm">
                                            Codes ({couponCounts.exclusive})
                                        </div>
                                    </Tab>
                                    <Tab
                                        value="Deals"
                                        className={activeTab === 'deals' ? "text-[#800000] border-b-2 border-[#800000]" : ""}
                                        onClick={() => handleTabChange('deals')}
                                    >
                                        <div className="flex items-center gap-2 lg:mx-2 whitespace-nowrap text-xs lg:text-sm">
                                            Deals ({couponCounts.deals})
                                        </div>
                                    </Tab>
                                </TabsHeader>
                                <div className="flex items-center text-[#B33D53] hover:underline cursor-pointer whitespace-nowrap text-xs lg:text-base" onClick={() => {
                                    navigate('/submitcoupon', { state: { storeId: sId } });
                                }}>
                                    <div className="inline">Submit a coupon</div>
                                    <MdLocalOffer className="cursor-pointer" />
                                </div>
                            </div>
                        </Tabs>
                    </div>

                    <div className="flex flex-col gap-5 items-start lg:mx-5 mx-2">
                        {
                            filteredCoupons && filteredCoupons.map((ele, index) => {
                                return (
                                    <div key={index} className="group bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 w-full lg:w-full hover:shadow-lg duration-300">
                                        <span
                                            className={`p-2 hidden group-hover:inline-block duration-300 absolute right-1 top-1 rounded-lg bg-gray-300/80 ${role && likedItems.includes(ele.coupon_id) ? 'text-red-500' : 'text-white'
                                                }`}
                                            onClick={() => handleLikeClick(index, ele.coupon_id)}
                                        >
                                            <FaHeart className="cursor-pointer text-xs lg:text-xl duration-300" />
                                        </span>
                                        <div className="flex flex-col w-full gap-2">
                                            <div className="flex gap-1 lg:gap-0">
                                                <div className="w-[15%] h-auto flex flex-col items-center justify-center">
                                                    <div className="border border-black flex flex-col items-center justify-center">
                                                        <img src={str?.logo_url} alt="H" className="max-h-[50px] h-auto w-[50px] lg:max-h-[75px]  lg:w-[75px] rounded-lg m-2" />
                                                        <span className="bg-blue-100 text-center w-full capitalize text-xs lg:text-base">{ele.type}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-[40%] lg:w-[55%] lg:mx-5 justify-between gap-2">
                                                    <div className="flex flex-col lg:flex-row justify-between w-full mt-5">
                                                        <div className="lg:font-bold text-[12px] lg:text-xl text-center lg:text-start">{ele.title}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-[45%] lg:w-[30%] lg:mx-5 pt-5 justify-between gap-2">
                                                    <div className="flex flex-col gap-5">
                                                        <div className="flex whitespace-nowrap gap-3 lg:gap-5 lg:mr-[1rem] justify-between text-xs lg:text-base">
                                                            <span className="flex justify-center items-center lg:gap-2 text-green-800">
                                                                <GoVerified className="font-bold " />Verified</span>
                                                            <span className="flex justify-center items-center lg:gap-2">
                                                                <CiUser></CiUser>
                                                                {formatUserCount(ele.user_count)} Uses
                                                            </span>
                                                        </div>
                                                        {ele.type === "Codes" ? (
                                                            <button
                                                                className='button has-code1'
                                                                onClick={() => handleOpen(ele)}
                                                            >
                                                                <span className='is-code1'>
                                                                    {ele.coupon_code}
                                                                </span>
                                                                <span className='is-code-text1 uppercase'>
                                                                    <em>Get {ele.type}</em>
                                                                </span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className='whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md'
                                                                onClick={() => handleOpen(ele)}
                                                            >
                                                                <span className='uppercase font-bold h-3' style={{ height: "50px" }}>
                                                                    Get {ele.type}
                                                                </span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 items-center text-sm cursor-pointer justify-between lg:px-2 w-full">
                                                <span className="flex gap-1 items-center text-sm cursor-pointer" onClick={() => toggleDetails(index)}> See Details <IoAddOutline className="cursor-pointer"></IoAddOutline></span>
                                                <span className="flex gap-4 lg:gap-20 items-center justify-between text-sm cursor-pointer lg:mr-1 h-10">
                                                    <span className="whitespace-nowrap text-sx lg:text-base">41 % Success</span>
                                                    <span className="flex items-center gap-2 lg:gap-7 w-full lg:text-xl"> <FaRegThumbsUp className="hover:scale-125 duration-200 lg:h-5 lg:w-5"></FaRegThumbsUp>
                                                        <FaRegThumbsDown className="hover:scale-125 duration-200 lg:h-5 lg:w-5"></FaRegThumbsDown></span>

                                                </span>
                                            </div>
                                            {detailsVisibility[index] && (
                                                <div className="details flex flex-col w-screen lg:w-auto overflow-x-clip text-xs lg:text-base lg:px-2">
                                                    <span className="font-bold">Due Date : {formatDate(ele.due_date)}</span>
                                                    <span className="text-ellipsis">{ele.description}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        expiredCoupons && (
                            <div className="flex flex-col my-5 gap-5 items-start lg:mx-5 mx-2">
                                {expiredCoupons.length > 0 && (
                                    <div className="text-xl text-black font-semibold">
                                        Recently Expired {str?.name} Discount Codes & Deals
                                    </div>
                                )}
                                {expiredCoupons?.map((ele, index) => (
                                    <motion.div variants={variants} initial="hidden"
                                        animate="visible"
                                        transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="group bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 w-full lg:w-full hover:shadow-lg duration-300">

                                        <div className="flex flex-col w-full gap-2">
                                            <div className="flex gap-5 lg:gap-0">
                                                <div className="w-[15%] h-auto flex flex-col items-center justify-center ">
                                                    <div className="border border-black flex flex-col items-center justify-center text-xs lg:text-base">
                                                        <img src={str?.logo_url} alt="H" className="max-h-[50px] h-auto w-[50px] lg:max-h-[75px] lg:w-[75px] rounded-lg m-2 contrast-50 grayscale" />
                                                        <span className="bg-blue-100 text-center w-full capitalize">{ele.type}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:w-[55%] w-[40%] lg:mx-5 justify-between gap-2">
                                                    <div className="flex flex-col lg:flex-row justify-between w-full mt-5">
                                                        <div className="lg:font-bold text-[12px] lg:text-xl text-center lg:text-start">{ele.title}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col lg:w-[30%] w-[45%] lg:mx-5 mt-5 justify-between gap-2">
                                                    <div className="flex flex-col gap-5">
                                                        <div className="flex whitespace-nowrap gap-3 lg:gap-5 lg:mr-[1rem] justify-between text-xs lg:text-base">
                                                            <span className="flex justify-center items-center lg:gap-2 text-red-800">
                                                                <MdOutlineSentimentDissatisfied className="text-xl" />Expired</span>
                                                            <span className="flex justify-center items-center lg:gap-2">
                                                                <CiUser></CiUser>
                                                                {formatUserCount(ele.user_count)} Uses
                                                            </span>
                                                        </div>
                                                        {
                                                            ele.type === "Codes" ? <button className="button has-code1 !grayscale" onClick={() => handleOpen(ele)} >
                                                                <span className="is-code1">74
                                                                    {ele.coupon_code}</span>
                                                                <span className="is-code-text1 uppercase"><em>Get {ele.type}</em></span>
                                                            </button> : <button className="!grayscale whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md" style={{ height: "48px" }} onClick={() => handleOpen(ele)}>
                                                                <span className="uppercase font-bold" >Get {ele.type}</span>
                                                            </button>
                                                        }
                                                    </div> </div>
                                            </div>
                                            <div className="flex gap-1 items-center cursor-pointer text-xs lg:text-base lg:mx-2 lg:mt-2" onClick={() => toggleDetails(index + validCoupons.length)}>
                                                See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                            </div>
                                            {detailsVisibility[index + validCoupons.length] && (
                                                <div className="details flex flex-col lg:ml-4 text-xs lg:text-base">
                                                    <span className="font-bold">Ends {formatDate(ele.due_date)}</span>
                                                    <span>{ele.description}</span>
                                                </div>
                                            )}

                                        </div>
                                    </motion.div>
                                )
                                )}
                            </div>
                        )
                    }
                    <div className="flex flex-col gap-5 lg:hidden mx-5">
                        <div className="min-w-full flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white ">
                            <div className="font-semibold text-xl my-3 text-black">
                                About {str?.name}
                            </div>
                            <div className="moreaboutcompany flex flex-col gap-2 text-black">
                                <div>{str?.description}</div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                            <div className="text-xl" style={{ fontWeight: 600 }}>Today{`'`}s Top {str?.name} Coupon Codes</div>
                            {
                                validCoupons && validCoupons?.slice(0, 2).map((ele, index) => {
                                    return (

                                        <ul key={index} className="w-full cursor-pointer list-disc bg-white p-2 rounded-lg flex gap-3 ml-1">
                                            <li className="font-semibold text-[12px] pl-2">{ele.title}</li>
                                        </ul>
                                    )
                                })
                            }
                            <div className="bg-white flex flex-col gap-2 border border-gray-400 py-5 rounded-lg font-[16px]">
                                <div className="flex justify-between items-center px-5">
                                    <span className="text-lg text-black">Total Offers</span>
                                    <span>{validCoupons?.length}</span>
                                </div>
                                <div className="flex justify-between items-center px-5">
                                    <span className="text-lg text-black">Total Codes</span>
                                    <span>{couponCounts.exclusive}</span>
                                </div>
                                <div className="flex justify-between items-center px-5">
                                    <span className="text-lg text-black">Best Offer</span>
                                    <span>40% Off</span>
                                </div>
                                <div className="flex justify-between items-center px-5">
                                    <span className="text-lg text-black">Average Discount</span>
                                    <span className="whitespace-nowrap">25 %</span>
                                </div>
                            </div>
                        </div>
                        {
                            (str?.faq || str?.hint || str?.moreAbout) && (
                                <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white ">

                                    <div className="font-semibold text-xl text-black">
                                        Quick Links
                                    </div>

                                    {
                                        str?.faq && (
                                            <Link
                                                className=" border border-gray-400 w-full cursor-pointer bg-white p-2 rounded-lg flex gap-3"
                                                to="faqs"
                                                spy={true}
                                                smooth={true}
                                                offset={-150}
                                                duration={800}

                                            >
                                                <div className="flex gap-5 justify-between w-full">FAQS  <FaQuestionCircle></FaQuestionCircle></div>
                                            </Link>
                                        )
                                    }
                                    {
                                        str?.hint && (
                                            <Link
                                                className=" border border-gray-400 w-full cursor-pointer bg-white p-2 rounded-lg flex gap-3"
                                                to="hints_tips"
                                                spy={true}
                                                smooth={true}
                                                offset={-150}
                                                duration={800}
                                            >
                                                <div className="flex gap-5 justify-between w-full">How To Apply? <MdTipsAndUpdates></MdTipsAndUpdates></div>
                                            </Link>
                                        )
                                    }
                                    {
                                        str?.moreAbout && (
                                            <Link
                                                className="border border-gray-400 w-full cursor-pointer bg-white p-2 rounded-lg flex gap-3"
                                                to="more_about"
                                                spy={true}
                                                smooth={true}
                                                offset={-150}
                                                duration={800}
                                            >
                                                <div className="flex gap-5 justify-between w-full">More About <FcAbout /> </div>
                                            </Link>
                                        )
                                    }
                                </div>
                            )

                        }

                        <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">

                            <div className="font-semibold text-xl text-black">
                                Similar Stores
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {similarStoreNames && similarStoreNames.length > 0 ? (
                                    similarStoreNames.map((store, index) => (
                                        <motion.div variants={variants} initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md cursor-pointer"
                                            onClick={() => {
                                                navigate(
                                                    `/Stores/${store.name}`, { state: { sId: store.id } }
                                                )
                                            }}>
                                            <span>{store.name}</span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div>No similar stores found</div>
                                )}
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">

                            <div className="font-semibold text-xl text-black">
                                Popular Stores
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {popularStoreNames && popularStoreNames.length > 0 ? (
                                    popularStoreNames.map((store, index) => (
                                        <motion.div variants={variants} initial="hidden"
                                            animate="visible"
                                            transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md cursor-pointer"

                                            onClick={() => {
                                                navigate(
                                                    `/Stores/${store.name}`, { state: { sId: store.id } }
                                                )
                                            }}>
                                            <span>{store.name}</span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div>No popular stores found</div>
                                )}
                            </div>

                        </div>
                    </div>
                    {
                        str?.faq && (
                            <div className="w-full lg:mx-5 p-10 bg-white my-2 shadow-boxshadow rounded-lg" id="faqs">
                                <div className="font-semibold lg:text-4xl text-xl my-3">FAQs</div>
                                <div className="moreaboutcompany flex flex-col gap-2">
                                    {
                                        str?.faq?.map((ele, index) => {
                                            return (
                                                <div variants={variants} initial="hidden"
                                                    key={index} className="flex flex-col gap-2 lg:text-justify">
                                                    <div className="font-bold text-xl lg:text-2xl">{ele.question}</div>
                                                    <div className="text-justify" style={{ wordWrap: "break-word" }}>{ele.answer}</div>
                                                </div>)
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        str?.hint && (
                            <div className="w-full lg:mx-5 p-10 bg-white my-2 shadow-boxshadow rounded-lg" id="hints_tips">
                                <div className="font-semibold lg:text-4xl text-xl my-3">How to apply?</div>
                                <div className="moreaboutcompany flex flex-col gap-2">
                                    {str?.hint?.includes('\n') ? (
                                        str?.hint?.split('\n').map((line, index) => (
                                            <div className="flex flex-col text-justify" key={index}>
                                                {line}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col lg:text-justify">{str?.hint}</div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    {
                        str?.moreAbout && (
                            <div className="w-full lg:mx-5 p-10 bg-white my-2 shadow-boxshadow rounded-lg" id="more_about">
                                <div className="font-semibold lg:text-4xl text-xl my-3">More About {str?.name}</div>
                                <div className="moreaboutcompany flex flex-col gap-2">
                                    <div className="moreaboutcompany flex flex-col gap-2">
                                        {str?.moreAbout?.includes('\n') ? (
                                            str?.moreAbout?.split('\n').map((line, index) => (
                                                <div className="flex flex-col text-justify" key={index}>
                                                    {line}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex flex-col lg:text-justify">{str?.moreAbout}</div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
            <Footer></Footer>
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black p-5" >
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-3 lg:gap-5 items-center">
                        <div className="border border-black h-[150px] w-[150px] rounded-full flex flex-wrap items-center justify-center overflow-clip p-1 bg-white">
                            <img src={str?.logo_url} alt={str?.name} className="h-full w-auto object-cover rounded-full" />
                        </div>
                        <div className="flex flex-col gap-5 justify-center items-center flex-wrap">
                            <div className="text-2xl whitespace-nowrap">{str?.name}</div>
                            <div className="text-sm lg:text-3xl font-semibold text-black whitespace-nowrap">{selectedProduct.title}</div></div>
                        <div className="text-lg">Ends {formatDate(selectedProduct.due_date)}</div>
                        {selectedProduct.type === "Codes" ?
                            <div
                                className="flex items-center lg:min-w-[20rem] w-fit max-w-full justify-center border border-black rounded-full text-xl pl-10 p-2 bg-red-50/40">
                                <span className="copy-text w-[60%] text-center">{selectedProduct.coupon_code}</span>
                                <button
                                    className="bg-[#800000] w-[40%] p-2 lg:p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                    onClick={handleCopyClick}>
                                    Copy
                                </button>
                            </div>
                            : null}
                        {!waiting ? (<div
                            className="text-xs lg:text-2xl text-green-800 w-full flex items-center justify-center gap-5">
                            <span className="whitespace-nowrap"> Copy and paste Coupon code at</span>
                            <a href={productlink} target="_blank" onClick={() => { handleUse(selectedProduct.coupon_id) }}
                                rel="noopener noreferrer" className="whitespace-nowrap duration-300 underline text-[#800000]
                        cursor-pointer flex items-center gap-2">
                                {selectedProduct.name &&
                                    selectedProduct?.name.toUpperCase()} {str?.name} Product
                                <TbExternalLink />
                            </a>
                        </div>) : (<div className="text:sm lg:text-2xl text-[#800000]">Wait for 2 Second...</div>)}

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
            <Dialog open={openlogin} handler={handleOpenlogin} className="relative ">
                <span className="absolute top-5 right-5 text-3xl cursor-pointer z-10" onClick={() => closeboth()}>
                    <IoMdClose></IoMdClose>
                </span>

                <Card color="transparent" className="h-full flex flex-col justify-center items-center" shadow={false}>
                    <div className="text-2xl text-black font-semibold mb-2 mt-10 lg:mt-20">Login</div>
                    <div className="mt-4 mx-auto font-normal text-black my-2">
                        <span>  New customer?  <span className="underline font-medium text-red-500 transition-colors hover:text-red-800 cursor-pointer" onClick={() => handleOpenregister()}>
                            Create your account
                        </span></span>

                    </div>
                    <div className="bg-white p-10 rounded-xl border flex flex-col gap-5 my-10">

                        <form className="w-56 max-w-screen-lg lg:w-96 mx-auto">
                            <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                                <Input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="lg" color="black" label={
                                        <>
                                            Email <span className="text-red-500">*</span>
                                        </>
                                    } />
                                <Input
                                    size="lg"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    color="black"
                                    label={
                                        <>
                                            Password <span className="text-red-500">*</span>
                                        </>
                                    }
                                />
                            </div>
                            <Typography color="gray" className="mt-2 mx-auto font-normal">
                                <Link to="https://backend.qwiksavings.com/api/forgot-password" className=" underline font-medium transition-colors hover:text-orange-700 cursor-pointer">
                                    Forgot your password?
                                </Link>
                            </Typography>
                            <Button className="mt-6 bg-[#800000]" type="submit" onClick={handleLogin} fullWidth>
                                SIGN IN
                            </Button>
                            <span className="text-sm text-black font-extralight">By continuing, I agree to RetailMeNot’s
                                <span className="underline font-bold cursor-pointer"> Privacy Policy</span> and <span className="underline font-bold cursor-pointer">Terms & use</span></span>
                        </form>
                    </div>
                </Card>
            </Dialog>
            <Dialog open={openregister} handler={handleOpenregister} className="relative ">
                <span className="absolute top-5 right-5 text-3xl cursor-pointer z-10" onClick={() => { closeboth() }}>
                    <IoMdClose></IoMdClose>
                </span>

                <Card color="transparent" className="h-full flex justify-center items-center" shadow={false}>
                    <div className="text-4xl text-black font-semibold mb-2 mt-10 lg:mt-20">Join Now</div>
                    <div className="mt-4 mx-auto font-normal text-black my-2 cursor-pointer">
                        <span>  Already have an account?  <span className="underline font-medium text-red-500 transition-colors hover:text-red-800" onClick={() => { handleOpenregister(); openlogin() }}>
                            Log In
                        </span></span>

                    </div>
                    <div className="bg-white p-10 rounded-xl my-5 flex flex-col gap-5">
                        <form className="w-56 max-w-screen-lg lg:w-96 mx-auto">
                            <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                                <Input type="text" size="lg" value={name1}
                                    onChange={(e) => setName1(e.target.value)}
                                    color="black" label="Name" />
                                <Input type="email"
                                    value={email1}
                                    onChange={(e) => setEmail1(e.target.value)}
                                    size="lg" color="black" label={
                                        <>
                                            Email <span className="text-red-500">*</span>
                                        </>
                                    } />
                                <Input
                                    size="lg"
                                    type="password"
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    color="black"
                                    label={
                                        <>
                                            Password <span className="text-red-500">*</span>
                                        </>
                                    }
                                />
                                <span className="text-sm text-gray-500">Password must be 8 characters or more, Don&apos;t use any part of your email, Don&apos;t use a common password</span>
                            </div>
                            <Button className="mt-6 bg-[#800000] rounded-full cursor-pointer" type="submit" onClick={handleRegister} fullWidth >
                                Register
                            </Button>
                            <span className="text-sm text-black font-extralight">By continuing, I agree to RetailMeNot’s
                                <span className="underline font-bold cursor-pointer"> Privacy Policy</span> and <span className="underline font-bold cursor-pointer">Terms & use</span></span>
                        </form>
                    </div>
                </Card>
            </Dialog>
        </>
    )
}

export default Store
