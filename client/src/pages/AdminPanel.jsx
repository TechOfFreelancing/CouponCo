import { useState } from 'react'
import AdminStores from "../components/Admin/AdminStores";
import AdminCoupons from "../components/Admin/AdminCoupons";
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminFestival from '../components/Admin/AdminFestival';
import CouponReq from '../components/Admin/couponReq';



const AdminPanel = () => {

    const [selectedButton, setSelectedButton] = useState('Stores');
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_SERVER}/api/logout`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response && response.status === 200) {
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

        <div>
            <h2 className='font-bold md:text-2xl text-base  text-center mt-10 flex items-center justify-center'> <hr className="mx-4  md:ml-8 md:mr-4 w-16 h-[3px] bg-black border-0 rounded  " />Welcom to Admin Panel of Coupon Co<hr className="mx-4 md:ml-4 md:mr-8 w-16 h-[3px]  bg-black border-0 rounded  " /></h2>
            <div className='italic text-gray-600 text-center'>Add, Delete & Modify Coupons as well as stores!</div>
            <div className='flex items-center justify-center'>
                <Button className=' bg-blue-500 text-white' onClick={() => { handleLogout() }}>logout</Button>
            </div>
            <div className="buttons text-center">
                <button
                    className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 
          ${selectedButton === 'Stores' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
          `}
                    onClick={() => handleButtonClick('Stores')}
                >
                    Stores
                </button>
                <button
                    className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 
          ${selectedButton === 'Coupons' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
          `}
                    onClick={() => handleButtonClick('Coupons')}
                >
                    Coupons
                </button>
                <button
                    className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 
          ${selectedButton === 'festival' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
          `}
                    onClick={() => handleButtonClick('festival')}
                >
                    Festival
                </button>
                <button
                    className={`bg-white py-2 px-5 m-2 md:m-4 hover:text-black hover:border-2 hover:border-black duration-400 
          ${selectedButton === 'User Coupons' ? 'text-black border-2 border-black' : 'text-gray-800 border-2 border-transparent'}  
          `}
                    onClick={() => handleButtonClick('User Coupons')}
                >
                    User Coupons
                </button>
            </div>
            {
                selectedButton === 'Stores' ? <AdminStores /> : (selectedButton === 'Coupons' ? <AdminCoupons /> : (selectedButton === 'festival' ? <AdminFestival /> : <CouponReq />))
            }
        </div>
    )
}

export default AdminPanel