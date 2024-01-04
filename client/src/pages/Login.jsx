import { useContext, useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import AuthContext from "../components/AuthContext";
import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai'
export default function Login() {

    const { updateUserRole } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


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
            localStorage.setItem('id',user.user_id);
            localStorage.setItem('role', user.role)
            updateUserRole(user.role);
            setTimeout(() => {
                user.role === "Admin" ? navigate('/Admin') : navigate('/')
            }, 1200)

        } catch (error) {
            toast.error(error.response.statusText);
            console.error('Login failed:', error);
        }
    };



    return (
        <div className="min-h-screen h-fit py-14">
            <Toaster position="top-center"></Toaster>
            <Card color="transparent" className="h-full flex flex-col justify-center items-center" shadow={false}>
                <img src="/Login/bg.webp" alt="bg" className="absolute hidden lg:inline h-[150vh] w-screen -z-10 opacity-10" />
                <div className="text-4xl text-black font-semibold mb-2 mt-10 lg:mt-20">Login</div>
                <div className="mt-4 mx-auto font-normal text-black my-2">
                    <span>  New customer?  <Link to="/signup" className="underline font-medium text-red-500 transition-colors hover:text-red-800">
                        Create your account
                    </Link></span>

                </div>
                <div className="bg-white p-10 rounded-xl border flex flex-col gap-5 my-10">

                    <form className="w-80 max-w-screen-lg lg:w-96 mx-auto">
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
                            <Link to="http://localhost:4000/api/forgot-password" className=" underline font-medium transition-colors hover:text-orange-700">
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
