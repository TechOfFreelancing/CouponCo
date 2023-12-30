import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Tooltip } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdCheckCircle } from 'react-icons/md';



const CouponReq = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    useEffect(() => {
        // Fetch data from the API
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_SERVER}/api/admin/getUnverifed`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                console.log(response.data.coupons);
                const unverifiedCoupons = response.data.coupons.filter(coupon => !coupon.isVerified);
                console.log(unverifiedCoupons)

                setCoupons(unverifiedCoupons);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                alert(error.response?.data?.message || "Failed to fetch coupons.");
                console.error("Failed to fetch coupons:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleCouponApproval = async (cId) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const body = {
                isVerified: true,
            };

            await axios.put(`${import.meta.env.VITE_LOCAL_SERVER}/api/admin/${cId}`, body, config);
            const updatedCoupons = coupons.filter(coupon => coupon.coupon_id !== cId);
            setCoupons(updatedCoupons);
            toast.success('Coupon Approved successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to approve coupon');
            console.error('Coupon Approval Error:', error);
        }
    };


    const handleCouponDelete = async (cId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_LOCAL_SERVER}/api/admin/${cId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });

            const updatedCoupons = coupons.filter(coupon => coupon.coupon_id !== cId);
            setCoupons(updatedCoupons);
            toast.success("coupon Deleted Successfully!");
        } catch (error) {
            toast.error("Failed to delete coupon");
            console.error('Failed to delete coupon:', error);
        }
    };

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div >
                <Card className="h-full w-full">
                    <div className="flex flex-col justify-center items-center h-full">
                        {coupons.length === 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <img
                                    src="/illustration/noData.png"
                                    alt="no data"
                                    className="w-96 h-auto"
                                />
                            </div>
                        ) : (
                            loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <img
                                        src="/illustration/loading.gif"
                                        alt="loading..."
                                        className="w-96 h-auto"
                                    />
                                </div>) : (
                                < div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:w-[97vw] mt-5 xl:mt-10">
                                    {coupons.map((coupon, index) => (
                                        <div key={index} className="border border-gray-300 cursor-pointer rounded-lg p-4 mb-4 group relative" onClick={() => navigate("/Admin/updateCoupons", { state: { cId: coupon.coupon_id, sId: coupon.store_id } })}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-xl font-bold mr-3">{coupon.title}</div>
                                                <span className={`py-1 px-2 rounded-full font-bold ${coupon.type.toLowerCase() === 'code' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>{coupon.type}</span>
                                                <div className="text-sm text-gray-600 mb-2">Due: {new Date(coupon.due_date).toLocaleDateString('en-GB', options)}</div>
                                            </div>
                                            <div className="text-md text-gray-600 mb-2">{coupon.user_count} uses today</div>
                                            <div className="bg-gray-100 text-center rounded p-2 mb-2">{coupon.coupon_code}</div>
                                            <div className="flex justify-end items-center absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Tooltip content="Approve Coupon">
                                                    <MdCheckCircle
                                                        className="text-green-500 mx-2 cursor-pointer text-3xl" // Adjust the size as needed (text-3xl)
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCouponApproval(coupon.coupon_id);
                                                        }}
                                                    />
                                                </Tooltip>
                                                <Tooltip content="Reject Coupon">
                                                    <MdCancel
                                                        className="text-red-500 cursor-pointer text-3xl" // Adjust the size as needed (text-3xl)
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCouponDelete(coupon.coupon_id);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            ))}
                    </div>
                </Card >
            </div >
        </>
    )
}
export default CouponReq;