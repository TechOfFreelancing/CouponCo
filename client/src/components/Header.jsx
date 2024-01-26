import { useEffect, useState, useContext } from "react";
import {
    Drawer,
    IconButton
} from "@material-tailwind/react";
import Alert from "./alert";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import NavList from "./navlist";
import logo from '../assets/images/used/logo.png'
import mobile_logo from '../assets/images/used/favicon.png'
import { ProfileMenu } from "./Header/ProfileMenu";
import SearchBar from "./Header/SearchBox";


export function Header() {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isOffer, setIsOffer] = useState(false);
    const { role, updateUserRole } = useContext(AuthContext);

    const OpenSidebar = () => setOpenSidebar(true);
    const CloseSidebar = () => setOpenSidebar(false);

    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
                updateUserRole("");
                alert(response.data.message);
                localStorage.clear();
                // console.log("logout headerside", role);
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

    // useEffect(() => {
    //     console.log("header side", role);
    // }, [role]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/festStoreDisplay`);
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
                <nav className="z-10 h-max rounded-none py-2 flex items-center justify-between lg:px-28 w-full px-5 lg:h-[93px]">
                    <Link to="/" className="cursor-pointer font-medium">
                        <img src={logo} alt="Qwik Savings" className="h-20 w-[15rem] hidden lg:inline-block" />
                    </Link>
                    <Link to="/" className="cursor-pointer font-medium">
                        <img src={mobile_logo} alt="Qwik Savings" className="h-10 w-10 inline-block lg:hidden" />
                    </Link>
                    <div className="hidden lg:block"><NavList></NavList></div>
                    <SearchBar></SearchBar>
                    {role ? (
                        <div className="hidden lg:inline-block">
                            <ProfileMenu></ProfileMenu>
                        </div>

                    ) : (
                        <div className="flex items-center justify-between gap-5">
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
                <Drawer placement="right" open={openSidebar} onClose={CloseSidebar} className="lg:hidden p-5" overlay={false}>
                    <div className="flex flex-col bg-white">
                        <div className="mb-2 flex items-center justify-between">
                            <Link to="/" className="cursor-pointer font-medium">
                                <img src={logo} alt="Qwik Savings" className="h-auto w-[10rem]" />
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
                        <div className="flex items-center justify-center my-5">
                            {role ? (
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
                                    <Link to="/login" className="whitespace-nowrap text-black" onClick={() => setOpenSidebar(!openSidebar)}>
                                        Log In
                                    </Link>
                                    <Link to="/signup" className="whitespace-nowrap px-4 py-2 text-black rounded-md" onClick={() => setOpenSidebar(!openSidebar)}>
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="-my-5"><NavList></NavList></div>
                    </div>
                </Drawer>
            </div>
        </>
    );
}