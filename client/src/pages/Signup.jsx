import {
    Card,
    Input,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';
import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai'


export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(name, email, password);
            const response = await axios.post(`http://13.201.29.102:3000/api/register`, {
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
        <div className="min-h-screen h-full py-14">
            <Toaster position="top-center"></Toaster>
            <Card color="transparent" className="h-full flex justify-center items-center" shadow={false}>
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
                        <span className="text-sm text-black font-extralight">By continuing, I agree to RetailMeNot’s
                            <span className="underline font-bold cursor-pointer"> Privacy Policy</span> and <span className="underline font-bold cursor-pointer">Terms & use</span></span>
                    </form>
                </div>
            </Card>

            <hr className=' border-black hidden lg:block' />
            <div className="flex flex-col lg:flex-row flex-nowrap lg:mx-20 justify-between mt-10 items-center gap-5">
                <div className='text-[#800000]'>&copy; Coupon Co {new Date().getFullYear()}</div>
                <div className="contact flex flex-col lg:flex-row gap-5 text-[#800000] items-center">
                    <span className='whitespace-nowrap'>Email : support@looknbookart.com
                    </span>
                    <span className='whitespace-nowrap'>Phone: +91.96649 70700</span>
                </div>
                <div className="flex icons gap-5 text-[#800000] text-xl">
                    <AiFillInstagram></AiFillInstagram>
                    <BsLinkedin></BsLinkedin>
                    <BsTwitter></BsTwitter>
                    <FaMobileAlt></FaMobileAlt>
                    <BiSolidMap></BiSolidMap>
                </div>
            </div>
        </div>
    );
}