import React from "react";
import {
    Collapse,
    Typography,
    Button,
    IconButton,
    Input
} from "@material-tailwind/react";
import Alert from "./alert";
import { Link } from "react-router-dom";

export function Header() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mx-10 py-5 mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-white">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Stores
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Categories
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Our Codes
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Blog
                </a>
            </Typography>
        </ul>
    );

    return (
        <div className="fixed top-0 flex flex-col h-fit lg:h-fit w-screen bg-purple-600 justify-around items-center z-20 opacity-100">
            <Alert></Alert>
            <nav className=" z-10 h-max max-w-full rounded-none px-4 py-0 ">
                <div className="flex items-center justify-between text-white">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        Logo
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="hidden items-center gap-x-2 lg:flex">
                            <div className="relative flex w-full gap-2 md:w-max">
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                    className=" pl-9 placeholder:text-black focus:!border-black bg-white"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                <div className="!absolute left-3 top-[13px]">
                                    <svg
                                        width="13"
                                        height="14"
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                            fill="#CFD8DC"
                                        />
                                        <path
                                            d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <Button size="md" className="rounded-lg ">
                                Search
                            </Button>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <Link to="/login" className="hidden lg:inline-block whitespace-nowrap">
                                Log In
                            </Link>
                            <Link to="/signup" className="hidden lg:inline-block whitespace-nowrap">
                                Sign in
                            </Link>
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