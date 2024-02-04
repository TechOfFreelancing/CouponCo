import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    Input,
    Typography,
    Card,
} from "@material-tailwind/react";
import { FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa6";
import Home_Garden from '../../assets/images/categories/Home_Garden.png'
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../../components/AuthContext";
import "../../styles/couponsbutton.css";
import { TbExternalLink } from 'react-icons/tb'

const HomeGardenBased = () => {
    const [likedItems, setLikedItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [openlogin, setOpenlogin] = useState(false);
    const [openregister, setOpenregister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name1, setName1] = useState("");
    const [email1, setEmail1] = useState("");
    const [password1, setPassword1] = useState("");
    const [homegarden, setHomeGarden] = useState([]);
    const [open, setOpen] = useState(false);
    const [productlink, setProductlink] = useState('');
    const [waiting, setWaiting] = useState(false);

    const { updateUserRole, role } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleOpenlogin = () => setOpenlogin(!openlogin);
    const handleOpenregister = () => setOpenregister(!openregister);

    const closeboth = () => {
        setOpenlogin(false);
        setOpenregister(false);
    };

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
            await axios.patch(`https://backend.qwiksavings.com/api/inCount/${cId}`);
        } catch (error) {
            console.error(error);
        }
    };

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

                await axios.post(`https://backend.qwiksavings.com/api/saveCoupon/${cId}`, { userId }, config);
            } else {
                const filteredItems = updatedLikedItems.filter((item) => item !== cId);
                setLikedItems(filteredItems);

                await axios.delete(`https://backend.qwiksavings.com/api/unsaveCoupon/${cId}`, config);
            }
        } catch (error) {
            console.error("Error occurred:", error);
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

                    const response = await axios.get(`https://backend.qwiksavings.com/api/getDetails/${userId}`, config);
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
                const response = await axios.get("https://backend.qwiksavings.com/api/storeDisplay/Home Garden");
                setHomeGarden(response.data.data);
            } catch (error) {
                console.log("Unable to get data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="clothing mb-5">
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10 h-[2rem]">
                    <div className="flex flex-col gap-1 lg:gap-5">
                        <span className="font-semibold text-lg lg:text-3xl">Home Garden Offers</span>
                    </div>
                    <div className="hover:underline h-7 duration-300 underline cursor-pointer"
                        onClick={() => {
                            navigate("/categoriesdetails", { state: { category: "Home Garden", category_icon: Home_Garden } })
                        }}>
                        View All Home Garden Offers
                    </div>
                </div>
                <div className="lg:grid grid-cols-1 lg:grid-cols-4 justify-items-stretch gap-4 overflow-auto flex scroll-snap-type-x mandatory scrollbar-hide">
                    {homegarden
                        .filter(item => new Date(item.due_date) >= new Date())
                        .slice(0, 4)
                        .map((item, index) => (
                            <div key={index} className="group flex flex-col gap-3 items-center justify-start relative h-[335px] w-fit border rounded-lg overflow-hidden shadow-lg duration-300 my-4 pb-10 bg-white overflow-y-hidden item flex-shrink-0 scroll-snap-align-start">
                                <img src={item.thumbnail} className="cursor-pointer w-full h-1/2" onClick={() => navigate(`/Stores/${item.name}`, { state: { sId: item.id } })} />
                                <span
                                    className={`p-2 hidden group-hover:inline-block duration-300 absolute right-1 top-1 rounded-lg bg-gray-300/80 ${role && likedItems.includes(item.coupon_id) ? 'text-red-500' : 'text-white'
                                        }`}
                                    onClick={() => handleLikeClick(index, item.coupon_id)}
                                >
                                    <FaHeart className="cursor-pointer text-xl duration-300" />
                                </span>
                                <div
                                    className="absolute z-10 left-2 bottom-36 mt-2 shadow-boxshadow h-[75px] w-[75px] rounded-full flex flex-wrap items-center justify-center overflow-clip p-1 bg-white cursor-pointer"
                                    onClick={() => navigate(`/Stores/${item.name}`, { state: { sId: item.id } })}>
                                    <img src={item.logo_url} alt="logo" className="h-full w-auto object-cover rounded-full" />
                                </div>
                                <div className="ml-24 flex w-[60%] justify-end items-center text-gray-700 ">
                                    {item.isVerified && <span className="text-black bg-blue-200 px-1 rounded-md text-[12px] uppercase">Verified</span>}
                                </div>
                                <div className="mx-4 h-[48px] p-2 text-start cursor-pointer" onClick={() => handleOpen(item)}>
                                    <span className="text-black mr-2 ">{item.title}</span>
                                </div>
                                <div className="flex justify-between items-center w-full text-sm px-5 text-[10px]">
                                    <span>{item.name}</span>
                                    <span>{item.user_count} Used</span>
                                </div>
                                <div className="flex flex-col items-center justify-between">
                                    <button className="button has-code" onClick={() => handleOpen(item)} >
                                        <span className="is-code">74{item.coupon_code}</span>
                                        <span className="is-code-text uppercase"><em>Get {item.type}</em></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black p-5">
                <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={() => handleClose()} />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-3 lg:gap-5 items-center">
                        <div
                            className="border border-black h-[150px] w-[150px] rounded-full flex flex-wrap items-center justify-center overflow-clip p-1 bg-white">
                            <img src={selectedProduct?.logo_url} alt="logo" className="h-full w-auto object-cover rounded-full" /></div>
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

export default HomeGardenBased;
