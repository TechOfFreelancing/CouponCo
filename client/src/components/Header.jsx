import React, { useEffect } from "react";
import {
    Collapse,
    Typography,
    Button,
    IconButton,
    Input
} from "@material-tailwind/react";
import Alert from "./alert";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";

export function Header() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const [keyword, setKeyWord] = React.useState("");
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const { role } = React.useContext(AuthContext);


    useEffect(() => {
        setIsLoggedIn(role === "General");
    }, [role]);

    const navigate = useNavigate();

    const navList = (
        <ul className="mx-10 py-5 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-white">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <Link to="/AllStores" className="flex items-center">
                    Stores
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <Link to="/AllCategories" className="flex items-center">
                    Categories
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <Link to="#" className="flex items-center">
                    Our Codes
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <Link to="#" className="flex items-center">
                    Blog
                </Link>
            </Typography>
        </ul>
    );

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        navigate("/AllStores", { state: { keyword: keyword } })
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
        <div className="fixed top-0 flex flex-col h-fit lg:h-fit w-screen bg-purple-600 justify-around items-center z-20 opacity-100">
            <Alert></Alert>
            <nav className=" z-10 h-max max-w-full rounded-none px-4 py-0 ">
                <div className="flex items-center justify-between text-white">
                    <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium">
                        Logo
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="hidden items-center gap-x-2 lg:flex">
                            <div className="relative flex w-full gap-2 md:w-max">
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    onChange={(e) => { setKeyWord(e.target.value) }}
                                    onKeyDown={handleKeyPress}
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                    className=" pl-9 placeholder:text-black focus:!border-black bg-white"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                            </div>
                            <Button size="md" className="rounded-lg " onClick={handleSearch}>
                                Search
                            </Button>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <>
                                {isLoggedIn ? (
                                    <div onClick={handleLogout} className="hidden cursor-pointer lg:inline-block whitespace-nowrap">
                                        Logout
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/login" className="hidden lg:inline-block whitespace-nowrap">
                                            Log In
                                        </Link>
                                        <Link to="/signup" className="hidden lg:inline-block whitespace-nowrap">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <button className="w-full">
                            <span>Log In</span>
                        </button>
                        <button className="w-full">
                            <span>Sign in</span>
                        </button>
                    </div>
                </Collapse >
            </nav>

        </div>
    );
}