import React, { useEffect } from "react";
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

export function Header() {
    const [openSidebar, setopenSidebar] = React.useState(false);
    const [keyword, setKeyWord] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const { role } = React.useContext(AuthContext);

    const OpenSidebar = () => setopenSidebar(true);
    const CloseSidebar = () => setopenSidebar(false);

    useEffect(() => {
        setIsLoggedIn(role === "General");
    }, [role]);

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
            const response = await axios.get('http://localhost:4000/api/logout', {
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

    return (
        <div className="fixed top-0 flex flex-col h-fit lg:h-fit w-screen items-center z-20 opacity-100 lg:border-b-[1px] border-b-[#800000] bg-white">
            <Alert></Alert>
            <nav className="z-10 h-max rounded-none py-2 flex items-center justify-between gap-14 lg:px-28 w-full px-10 lg:h-[93px]">
                <button className="searchIconcursor-pointer sm:hidden" onClick={OpenSidebar}>
                    <ImSearch className="h-6 w-6" />
                </button>
                <Link  to="/" className="cursor-pointer font-medium">
                    Logo
                </Link>
                <div className="hidden lg:block">{navList}</div>
                <div className="seachbar hidden lg:flex p-3 h-[3rem] border-red-700 border-solid border-2 hover:border-red-800 rounded-full w-[25rem]  justify-between" onChange={(e) => { setKeyWord(e.target.value) }}>
                    <input type="search" placeholder='Enter the keyword or url' className=' outline-none bg-transparent text-black' onKeyDown={handleKeyPress} />
                    <button className="searchIcon text-red-900 cursor-pointer">
                        <ImSearch className="h-6 w-6" />
                    </button>
                </div>
                {isLoggedIn ? (
                    <div onClick={handleLogout} className="hidden cursor-pointer lg:inline-block whitespace-nowrap hover:-translate-y-1 duration-300 hover:text-red-500">
                        Logout
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="hidden lg:inline-block whitespace-nowrap hover:-translate-y-1 duration-300 hover:text-red-500">
                            Log In
                        </Link>
                        <Link to="/signup" className="hidden lg:inline-block whitespace-nowrap bg-[#800000] px-4 py-2 text-white rounded-md hover:-translate-y-1 duration-300">
                            Sign Up
                        </Link>
                    </>
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
                <div className="seachbar flex p-3 h-[3rem] border-red-700 border-solid border-2 hover:border-red-800 rounded-full " onChange={(e) => { setKeyWord(e.target.value) }}>
                    <input type="search" placeholder='Enter the keyword or url' className=' outline-none bg-transparent text-black' onKeyDown={handleKeyPress} />
                    <button className="searchIcon text-red-900 cursor-pointer">
                        <ImSearch className="h-6 w-6" />
                    </button>
                </div>
                <div>{navList}</div>
                <div className="flex items-center justify-center">
                    {isLoggedIn ? (
                        <div onClick={handleLogout} className="cursor-pointer whitespace-nowrap">
                            Logout
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

            </Drawer>

        </div>
    );
}