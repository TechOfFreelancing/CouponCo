import categoriesBasedCoupons from "../../api/CategoriesBasedCoupons";
import "../../components/couponsbutton.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    Typography,
    Card
} from "@material-tailwind/react";
import { FaThumbsUp, FaThumbsDown, FaHeart, FaRegHeart } from 'react-icons/fa6';
import AuthContext from "../../components/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { IoMdClose } from "react-icons/io";




const ClothingBased = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const [likedItems, setLikedItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const [openlogin, setOpenlogin] = useState(false);
    const [openregister, setOpenregister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name1, setName1] = useState('');
    const [email1, setEmail1] = useState('');
    const [password1, setPassword1] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const { role } = useContext(AuthContext);
    // const location = useLocation();

    const handleOpenDialog = () => {
        // setSelectedProduct(product);
        if (!openDialog) {
            setOpenDialog(true);
        } else {
            setOpenDialog(false)
        }
    };

    const handleLikeClick = (index) => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            // Check if the item is already liked
            if (!likedItems.includes(index)) {
                // If not liked, add it to the likedItems state
                setLikedItems([...likedItems, index]);
            } else {
                // If already liked, remove it from the likedItems state
                setLikedItems(likedItems.filter((item) => item !== index));
            }
        } else {
            handleOpenlogin();
        }
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
            console.log(name, email, password);
            const response = await axios.post(`http://localhost:4000/api/register`, {
                name,
                email,
                password,
            });

            toast.success('Registration successful');
            console.log(response);

            setTimeout(() => {
                navigate('/login');
            }, 2000)


        } catch (error) {
            toast(error.response.statusText);
            console.error('Registration failed:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:4000/api/login`, {
                email,
                password
            })

            const { message, token, user } = res.data;

            toast.success(message);

            localStorage.setItem('token', token);
            localStorage.setItem('id', user.user_id);
            localStorage.setItem('role', user.role)
            isLoggedIn(true);
            setTimeout(() => {
                user.role === "Admin" ? navigate('/Admin') : navigate('/')
            }, 1200)

        } catch (error) {
            toast.error(error.response.statusText);
            console.error('Login failed:', error);
        }
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

    useEffect(() => {
        setIsLoggedIn(role === "General");
    }, [role]);






    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="clothing mb-5">
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10 h-[2rem]">
                    <div className="flex flex-col gap-1 lg:gap-5">
                        <span className="font-semibold text-lg lg:text-3xl">Clothings Offers</span>
                    </div>
                    <Link to="/allcategories" className="hover:underline h-7 duration-300 underline">
                        View All Clothing Offers
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-stretch gap-4">
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

                            <img src={item.logo} alt="" className="absolute z-10 h-[75px] w-[75px] left-2 bottom-36 border  bg-white rounded-full" />
                            <div className="ml-24 flex w-[60%] justify-end items-center text-gray-700 ">

                                {item.Verified && <span className="text-black bg-blue-200 px-1 rounded-md text-[12px] uppercase">Verified</span>}
                            </div>
                            <div className="mx-2 h-[48px] px-2 mt-2 text-justify">
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
                    )).slice(0, 8)}
                </div>
            </div>
            <Dialog open={openDialog} handler={handleOpenDialog} >
                <DialogHeader className="flex justify-between items-center">
                    <Button variant="text" color="blue-gray" onClick={handleOpenDialog}>
                        Close
                    </Button>
                </DialogHeader>
                <DialogBody>
                    <div className="flex flex-col items-center">
                        <div className="h-3/4  flex flex-col gap-5 items-center">
                            <div className="h-[150px] w-[150px] bg-white rounded-full flex items-center justify-center mt-5 mx-auto border border-black">
                                <img src="" alt="logo" className='h-auto w-auto px-5' />
                            </div>
                            <div className="flex gap-5 justify-center items-center"> <div className="text-2xl font-bold">Store Name</div>
                                <div className="text-2xl font-bold text-black">title text</div></div>
                            <div className="text-lg">Ends 29/2/2034</div>
                            <div className="flex gap-10 items-center justify-center border border-black rounded-full text-2xl pl-10 p-2 bg-red-50/40">
                                <span className="copy-text tracking-widest">87$8gr</span>
                                <button
                                    className="bg-[#800000]  max-w-fit p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                    onClick={handleCopyClick}>
                                    Copy
                                </button>
                            </div>
                            {copySuccess && <span style={{ color: 'green' }}>Copied!</span>}
                            <div className="text-lg">
                                Copy and paste this code at {""}
                                <a href="https://www.amazon.in/" target="_blank" rel="noopener noreferrer" className="underline text-[#800000] hover:cursor-pointer">
                                    website url
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
                </DialogBody>
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
                                <Link to="http://localhost:4000/api/forgot-password" className=" underline font-medium transition-colors hover:text-orange-700 cursor-pointer">
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

export default ClothingBased;
