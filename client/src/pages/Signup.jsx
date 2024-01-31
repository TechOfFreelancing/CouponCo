import {
    Card,
    Input,
    Button,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';
import Footer from '../components/Footer'
import AuthContext from "../components/AuthContext";


export default function Register() {
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(name, email, password);
            const response = await axios.post(`https://backend.qwiksavings.com/api/register`, {
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


    return (
        <div className="min-h-screen h-full pt-5">
            <Toaster position="top-center"></Toaster>
            {
                !role ? (<Card color="transparent" className="h-screen flex justify-center items-center" shadow={false}>
                    <img src="/Login/bg.webp" alt="bg" className="absolute hidden lg:inline h-[150vh] w-screen -z-10 opacity-10" />
                    <div className="text-4xl text-black font-semibold mb-2 mt-10 lg:mt-20">Join Now</div>
                    <div className="mt-4 mx-auto font-normal text-black my-2">
                        <span>  Already have an account?  <Link to="/login" className="underline font-medium text-red-500 transition-colors hover:text-red-800">
                            Log In
                        </Link></span>

                    </div>
                    <div className="bg-white p-10 rounded-xl my-5 flex flex-col gap-5">
                        <form className="w-80 max-w-screen-lg lg:w-96 mx-auto">
                            <div className="mb-4 flex flex-col gap-6  items-center justify-center">
                                <Input type="text" size="lg" value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    color="black" label="Name" />
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
                                <span className="text-sm text-gray-500">Password must be 8 characters or more, Don&apos;t use any part of your email, Don&apos;t use a common password</span>
                            </div>
                            <Button className="mt-6 bg-[#800000] rounded-full" type="submit" onClick={handleRegister} fullWidth >
                                Register
                            </Button>
                            <span className="text-sm text-black font-extralight">By continuing, I agree to Qwik Saving’s
                                <span className="underline font-bold cursor-pointer"> Privacy Policy</span> and <span className="underline font-bold cursor-pointer">Terms & use</span></span>
                        </form>
                    </div>
                </Card>) : (<Card color="transparent" className="h-screen flex flex-col justify-center items-center" shadow={false}>
                    <img src="/Login/bg.webp" alt="bg" className="absolute hidden lg:inline h-screen w-screen -z-10 opacity-10" />
                    <div className="text-4xl text-black font-semibold mb-2 mt-10 lg:mt-20">You are alredy loggedin</div>
                    <Link to="/profile" className="text-2xl mb-2 mt-10 lg:mt-20">Click here to profile</Link>
                </Card>)
            }
            <Footer></Footer>
        </div>
    );
}