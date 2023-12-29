import React, { useEffect, useState } from "react";
import {
    Drawer,
    IconButton
} from "@material-tailwind/react";
import Alert from "./alert";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import { ImSearch } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import navList from "./navlist";
import "../components/header.css";
import { FaUserCircle } from "react-icons/fa";

export function Header() {
    const [openSidebar, setopenSidebar] = React.useState(false);
    const [keyword, setKeyWord] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isOffer, setIsOffer] = React.useState(false);
    const { role } = React.useContext(AuthContext);
    const [menuActive, setMenuActive] = useState(false);

    const menuToggle = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const OpenSidebar = () => setopenSidebar(true);
    const CloseSidebar = () => setopenSidebar(false);

    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        CloseSidebar();
        navigate("/Stores", { state: { keyword: keyword } })
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://13.201.29.102:3000/api/logout', {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
                setIsLoggedIn(false);
                alert(response.data.message);
                localStorage.clear();
                navigate("/");
            } else {
                alert("Logout failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred. Please try again later.");
            }
            console.error(error);
        }
    }

    useEffect(() => {
        setIsLoggedIn(role === "General");
    }, [role]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://13.201.29.102:3000/api/festStoreDisplay`);
                if (res.data && res.data.data.length > 1) setIsOffer(true);
            } catch (error) {
                console.error('Error fetching festival details:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="fixed top-0 flex flex-col h-fit lg:h-fit w-screen items-center z-20 opacity-100 lg:border-b-[1px] border-b-[#B33D53] bg-white">
                {isOffer && <Alert></Alert>}
                <nav className=" z-10 h-max rounded-none py-2 flex items-center justify-between gap-14 lg:px-28 w-full px-10 lg:h-[93px]">
                    <button className="searchIconcursor-pointer sm:hidden" onClick={OpenSidebar}>
                        <ImSearch className="h-6 w-6" />
                    </button>
                    <Link to="/" className="cursor-pointer font-medium">
                        Logo
                    </Link>
                    <div className="hidden lg:block">{navList}</div>
                    <div className="seachbar hidden lg:flex p-3 h-[3rem] border-red-700 border-solid border-2 hover:border-red-800 rounded-full w-[20rem]  justify-between" onChange={(e) => { setKeyWord(e.target.value) }}>
                        <input type="search" placeholder='Search for brands, categories' className='outline-none bg-transparent text-black w-full' onKeyDown={handleKeyPress} />
                        <button className="searchIcon text-red-900 cursor-pointer">
                            <ImSearch className="h-6 w-6" />
                        </button>
                    </div>
                    {isLoggedIn ? (
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="action relative">
                                <div className={`menu ${menuActive ? 'active' : ''}`}>
                                    <div className="flex flex-col items-center justify-center">
                                        <Link to="/Profile" className="hidden cursor-pointer lg:inline-block whitespace-nowrap duration-300 hover:text-red-500">
                                            Profile
                                        </Link>
                                        <hr className="border border-gray-500 w-full" />
                                        <span onClick={handleLogout} className="hidden cursor-pointer lg:inline-block whitespace-nowrap duration-300 hover:text-red-500">
                                            Logout
                                        </span>
                                    </div>

                                </div>
                                <div onClick={() => { menuToggle() }} className="profile flex items-center justify-center absolute -top-5">
                                    <FaUserCircle className="text-4xl"></FaUserCircle>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex gap-5 items-center justify-center">
                            <Link to="/login" className="hidden lg:inline-block whitespace-nowrap hover:-translate-y-1 duration-300 text-[#B33D53] bg-white px-4 py-2  rounded-md border border-black">
                                Log In
                            </Link>
                            <Link to="/signup" className="hidden lg:inline-block whitespace-nowrap bg-[#B33D53] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300">
                                Sign Up
                            </Link>
                        </div>
                    )}
                    <GiHamburgerMenu
                        onClick={OpenSidebar} className="cursor-pointer scale-125 hover:scale-150 duration-200 sm:hidden" />
                </nav>
                <Drawer open={openSidebar} onClose={CloseSidebar} placement="right" className="p-4">
                    <div className="mb-2 flex items-center justify-between ">
                        <Link className="cursor-pointer font-medium">
                            Logo
                        </Link>
                        <IconButton variant="text" color="blue-gray" onClick={CloseSidebar}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <div className="seachbar flex p-3 h-3 border-red-700 border-solid border-2 hover:border-red-800 rounded-full " onChange={(e) => { setKeyWord(e.target.value) }}>
                        <input type="search" placeholder='Search for brands, categories' className=' outline-none bg-transparent text-black appearance-none' onKeyDown={handleKeyPress} />
                        <button className="searchIcon text-red-900 cursor-pointer">
                            <ImSearch className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center my-5">
                        {isLoggedIn ? (
                            <div className="flex justify-between w-full mx-10">
                                <Link to="/Profile" className="cursor-pointer whitespace-nowrap">
                                    Profile
                                </Link>
                                <div onClick={handleLogout} className="cursor-pointer whitespace-nowrap">
                                    Logout
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="whitespace-nowrap text-black">
                                    Log In
                                </Link>
                                <Link to="/signup" className="whitespace-nowrap px-4 py-2 text-black rounded-md">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-my-5">{navList}</div>


                </Drawer>

            </div>
        </>
    );
}