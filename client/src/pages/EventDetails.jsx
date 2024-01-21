import Footer from "../components/Footer";
import {
    Dialog,
    Card,
    Input,
    Typography,
    Button
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bg from '../assets/images/event/eventbg.jpg';
import { eventDetails } from "../api/event";
import { useState, useEffect, useContext } from "react";
import { GoVerified } from 'react-icons/go';
import { CiUser } from 'react-icons/ci';
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import "../styles/couponsbutton1.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { TbExternalLink } from 'react-icons/tb'
import AuthContext from "../components/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const EventDetails = () => {

    const [detailsVisibility, setDetailsVisibility] = useState([]);
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [eventData, setEventData] = useState([]);
    const [popularStore, setPopularStore] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [openlogin, setOpenlogin] = useState(false);
    const [openregister, setOpenregister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name1, setName1] = useState("");
    const [email1, setEmail1] = useState("");
    const [password1, setPassword1] = useState("");
    const [open, setOpen] = useState(false);
    const [productlink, setProductlink] = useState('');
    const [waiting, setWaiting] = useState(false);

    const { updateUserRole, role } = useContext(AuthContext);

    const location = useLocation();

    const navigate = useNavigate();

    const event = location.state.event;

    const handleOpenlogin = () => setOpenlogin(!openlogin);
    const handleOpenregister = () => setOpenregister(!openregister);

    const closeboth = () => {
        setOpenlogin(false);
        setOpenregister(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://43.205.126.26:3000//api/register`, {
                name: name1,
                email,
                password,
            });
            console.log(response);
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
            const res = await axios.post(`http://43.205.126.26:3000//api/login`, {
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

    const formatDate = (dateString) => {
        const options = { month: "long", day: "numeric", year: "numeric" };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-US", options);

        const day = date.getDate();
        const suffix = (day >= 10 && day <= 20) ? "th" : ["st", "nd", "rd"][day % 10 - 1] || "th";

        return formattedDate.replace(/(\d+)(?=(st|nd|rd|th))/, `$1${suffix}`);
    };

    const handleUse = async (cId) => {
        try {
            await axios.patch(`http://43.205.126.26:3000//api/inCount/${cId}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpen = (product) => {
        if (open) {
            handleClose();
        }
        else {
            // console.log("clicked")
            setSelectedProduct(product);
            setOpen(!open);
            setWaiting(true)
            const correctedRefLink = product?.ref_link?.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/, "https://$1");
            setProductlink(correctedRefLink);
            // console.log('selected link', correctedRefLink, productlink); // Use correctedRefLink directly
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

    const handleCopyClick = () => {
        const textToCopy = document.querySelector(".copy-text");

        if (textToCopy) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(textToCopy);
            selection.removeAllRanges();
            selection.addRange(range);

            const text = textToCopy.textContent || textToCopy.innerText;
            navigator.clipboard.writeText(text)
                .then(() => {
                    setWaiting(false);
                })
                .catch((err) => {
                    console.error("Unable to copy text to clipboard", err);
                })
                .finally(() => {
                    selection.removeAllRanges();
                    selection.addRange(range);
                });
        }
    };

    const handleLikeClick = async (index, cId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            handleOpenlogin();
            return;
        }

        try {
            const userId = localStorage.getItem("id");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedLikedItems = [...likedItems];

            if (!likedItems.includes(cId)) {
                updatedLikedItems.push(cId);
                setLikedItems(updatedLikedItems);

                await axios.post(`http://43.205.126.26:3000//api/saveCoupon/${cId}`, { userId }, config);
            } else {
                const filteredItems = updatedLikedItems.filter((item) => item !== cId);
                setLikedItems(filteredItems);

                await axios.delete(`http://43.205.126.26:3000//api/unsaveCoupon/${cId}`, config);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
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

                    const response = await axios.get(`http://43.205.126.26:3000//api/getDetails/${userId}`, config);
                    const savedCouponsData = response.data.savedCoupons || [];
                    const likedCouponIds = savedCouponsData.map(coupon => coupon.coupon_id);

                    setLikedItems(likedCouponIds);
                } catch (error) {
                    console.error('Error fetching saved coupons:', error);
                }
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const store = await axios.get('http://43.205.126.26:3000//api/getAllStore');
                setPopularStore(store.data.stores);
                const response = await axios.get(`http://43.205.126.26:3000//api/events/${event}`);
                const validCoupons = await Promise.all(response.data.coupons.map(async (c) => {
                    const coupons = await axios.get(`http://43.205.126.26:3000//api/coupons/${c.store_id}/${c.coupon_id}`);
                    // console.log(coupons);
                    if (new Date(coupons.data.coupon.due_date) >= new Date()) {
                        return coupons.data.coupon;
                    }
                    // Return null for items that don't meet the condition
                    return null;
                }));

                // Filter out null values
                const filteredCoupons = validCoupons.filter((coupon) => coupon !== null);
                setEventData(filteredCoupons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [event]);



    console.log(eventData);

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

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="lg:w-[90vw] flex flex-col text-black border lg:mx-auto mt-28 lg:mt-32">
                <div className="p-1 lg:p-4 flex flex-col items-start flex-wrap gap-5">
                    <ul className="flex items-center">
                        <li className="inline-flex items-center">
                            <Link to="/" className="text-gray-900 hover:text-[#B33D53]">
                                <svg className="w-5 h-auto fill-current mx-1 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" /></svg>
                            </Link>
                            <span className="mx-2 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                Events
                            </Link>
                            <span className="mx-2 h-auto text-gray-400 font-medium">/</span>
                        </li>
                        <li className="inline-flex items-center">
                            <Link to="/events" className="text-gray-900 hover:text-[#B33D53] whitespace-nowrap">
                                {event} Deals Online
                            </Link>
                        </li>
                    </ul>
                    <div className="relative flex items-center justify-center w-full">
                        <img src={bg} alt="" className="w-full h-[80px] lg:h-[160px]" />
                        {/* <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                            <div className='p-4 text-3xl font-bold text-white z-10'>Browse Top Shopping Events</div>
                        </div> */}
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row w-[96%] lg:w-full mx-2">
                        <div className="flex flex-col gap-5 lg:px-5 text-sm items-center">
                            <div className="bg-white p-5 rounded-lg shadow-boxshadow">
                                <div className="text-xl font-bold my-2">About</div>
                                <div className="flex flex-wrap gap-2 text-sm">
                                    <p>{eventDetails.about}</p>

                                </div>
                            </div>
                            <div className="flex flex-col gap-2 shadow-boxshadow rounded-lg p-5 bg-white">
                                <div className="text-xl text-justify" style={{ fontWeight: 700 }}>Today{`'`}s Top Shopping Events</div>
                                {
                                    eventData && eventData?.slice(0, 2).map((ele, index) => {
                                        return (

                                            <ul key={index} className="w-full cursor-pointer list-disc bg-white p-2 rounded-lg flex gap-3 text-justify">
                                                <li className="font-semibold text-[12px] ">{ele.title}</li>
                                            </ul>
                                        )
                                    })
                                }
                                <div className="bg-white flex flex-col gap-2 border border-gray-400 py-5 rounded-lg font-[16px]">
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Total Offers</span>
                                        <span>{eventData.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Total Codes</span>
                                        <span>25</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Best Offer</span>
                                        <span className="whitespace-nowrap">40% Off</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5">
                                        <span className="text-lg text-black">Average Discount</span>
                                        <span className="whitespace-nowrap">25 %</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 shadow-boxshadow rounded-lg">
                                <div className="text-xl font-bold my-2">Popular Store</div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        popularStore.map((ele, index) => <div key={index} className="text-sm p-1 duration-300  bg-gray-300 hover:bg-red-200 rounded-md cursor-pointer" onClick={() => navigate(
                                            `/Stores/${ele.name}`, { state: { sId: ele.id } }
                                        )}>{ele.name}</div>)
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="w-full lg:w-3/4 h-full flex flex-col border-l-2 lg:mx-5 gap-5">
                            <div className='lg:p-4 pt-0 pl-0 text-xl lg:text-3xl font-bold'>Browse Top {event} Shopping Events</div>
                            <div className="flex flex-col gap-2 lg:gap-5 items-start lg:mx-5">
                                {
                                    eventData.slice(0, eventsToShow).map((ele, index) => {
                                        return (
                                            <div key={index} className="group bg-white relative flex flex-col border border-gray-500 rounded-lg p-2 lg:p-5 w-[340px] lg:w-[60rem] hover:shadow-lg duration-300">
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
                                                                <img src={ele.logo_url} alt="H" className="max-h-[50px] h-auto w-[50px] lg:max-h-[75px]  lg:w-[75px] rounded-lg m-2" />
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
                                                                <button className="button has-code1" onClick={() => handleOpen(ele)} >
                                                                    <span className="is-code1">74
                                                                        {ele.coupon_code}</span>
                                                                    <span className="is-code-text1 uppercase"><em>Get {ele.type}</em></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1 items-center  text-xs lg:text-sm cursor-pointer lg:ml-4 lg:mt-2" onClick={() => toggleDetails(index)}>
                                                        See Details <IoAddOutline className="cursor-pointer"></IoAddOutline>
                                                    </div>
                                                    {detailsVisibility[index] && (
                                                        <div className="details flex flex-col lg:ml-4 text-xs lg:text-base">
                                                            <span className="font-bold">Ends {formatDate(ele.due_date)}</span>
                                                            <span className="overflow-x-clip">{ele.description}</span>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            <div className="flex items-center justify-center lg:w-[45rem] mb-4">
                                {eventDetails.Events.length > 25 && (
                                    <button onClick={toggleShowAllEvents} className="whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300">
                                        {showAllEvents ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black p-5">
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-3 lg:gap-5 items-center">
                        <div
                            className="border border-black h-[150px] w-[150px] rounded-full flex flex-wrap items-center justify-center overflow-clip p-1 bg-white">
                            <img src={selectedProduct?.logo_url} alt="logo" className="h-full w-auto object-cover rounded-full" />
                        </div>
                        <div className="flex flex-col gap-5 justify-center items-center flex-wrap">
                            <div className="text-2xl whitespace-nowrap">{selectedProduct.name &&
                                selectedProduct?.name.toUpperCase()}</div>
                            <div className="text-sm lg:text-3xl font-semibold text-black whitespace-nowrap">{selectedProduct.title}</div>
                        </div>
                        <div className="text-lg">Ends {formatDate(selectedProduct.due_date)}</div>
                        <div
                            className="flex items-center lg:min-w-[20rem] w-fit max-w-full justify-center border border-black rounded-full text-xl pl-10 p-2 bg-red-50/40">
                            <span className="copy-text w-[60%] text-center">{selectedProduct.coupon_code}</span>
                            <button
                                className="bg-[#800000] w-[40%] p-2 lg:p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                onClick={handleCopyClick}>
                                Copy
                            </button>
                        </div>
                        {!waiting ? (<div
                            className="text-xs lg:text-2xl text-green-800 w-full flex items-center justify-center gap-5">
                            <span className="whitespace-nowrap"> Copy and paste Coupon code at</span>
                            <a href={productlink} target="_blank" onClick={() => { handleUse(selectedProduct.coupon_id) }}
                                rel="noopener noreferrer" className="whitespace-nowrap duration-300 underline text-[#800000]
                        cursor-pointer flex items-center gap-2">
                                {selectedProduct.name &&
                                    selectedProduct?.name.toUpperCase()} Product
                                <TbExternalLink />
                            </a>
                        </div>) : (<div className="text:sm lg:text-2xl text-[#800000]">Wait for 2 Second...</div>)}

                        <div
                            className="flex gap-2 lg:gap-5 border border-[#800000] px-5 py-3 rounded-full items-center justify-center bg-red-50/40">
                            <span className="text-sm lg:text-lg text-[#800000] whitespace-nowrap">
                                Did the coupon work?
                            </span>
                            <button
                                className="border border-green-600 hover:bg-green-600 text-black hover:text-white duration-150 px-5 py-3 rounded-md focus:outline-none">
                                <FaThumbsUp></FaThumbsUp>
                            </button>
                            <button
                                className="border border-red-600 hover:bg-red-600 text-black hover:text-white duration-150 px-5 py-3 rounded-md focus:outline-none">
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
                                <Link to="http://43.205.126.26:3000//api/forgot-password" className=" underline font-medium transition-colors hover:text-orange-700 cursor-pointer">
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
            <Footer></Footer>
        </>
    )
}

export default EventDetails