import { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
// import { toast, Toaster } from 'react-hot-toast'
// import AuthContext from "./AuthContext";


export default function Login() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const navigate = useNavigate();

    // const { setUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            console.log(email+" "+password);

        } catch (error) {
            // toast.error(error.response.statusText);
            console.error('Login failed:', error);
        }
    };



    return (
        <>
            {/* <Toaster position="top-center"></Toaster> */}
            <Card color="transparent" className="h-screen flex justify-center items-center" shadow={false}>
            <img src="/Login/bg.webp" alt="bg" className="absolute h-screen w-screen -z-10 opacity-90" />
                <div className="bg-gray-200 p-10 rounded-xl border-4 border-indigo-200">
                    <Typography variant="h4" color="blue" className="px-4 text-center">
                        LOGIN
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                        <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                            <Input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="lg" color="blue" label={
                                    <>
                                        Email <span className="text-red-500">*</span>
                                    </>
                                } />
                            <Input
                                size="lg"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                color="blue"
                                label={
                                    <>
                                        Password <span className="text-red-500">*</span>
                                    </>
                                }
                            />
                        </div>
                        {/* <Typography color="gray" className="mt-2 mx-auto font-normal">
                            <a href="https://v-bbackend.vercel.app/api/forgot-password" className=" underline font-medium transition-colors hover:text-orange-700">
                                Forgot your password?
                            </a>
                        </Typography> */}
                        <Button className="mt-6" color="blue" type="submit" onClick={handleLogin} fullWidth>
                            SIGN IN
                        </Button>
                    </form>
                </div>

                <Typography color="gray" className="mt-4 mx-auto font-normal">
                    <Link to="/signup" className=" underline font-medium transition-colors hover:text-blue-700">
                        New customer? Create your account
                    </Link>
                </Typography>

            </Card>
        </>
    );
}
