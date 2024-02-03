import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,

} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

export function CouponsBox({ storeId, open, handleOpen }) {

    const [coupons, setCoupons] = useState([]);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponsData = await axios.get(`https://backend.qwiksavings.com/api/coupons/${storeId}`);
                setCoupons(couponsData.data.coupons);
            } catch (error) {
                alert(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };
        fetchData();

    }, [storeId])

    const handleCouponDelete = async (cId) => {
        try {
            await axios.delete(`https://backend.qwiksavings.com/api/admin/${cId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });

            const updatedCoupons = coupons.filter(coupon => coupon.coupon_id !== cId);
            setCoupons(updatedCoupons);
            alert("coupon Deleted Successfully!");
        } catch (error) {
            alert("Failed to delete coupon");
            console.error('Failed to delete coupon:', error);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader className="flex justify-between items-center">
                <div>Coupons</div>
                <Button variant="text" color="blue-gray" onClick={handleOpen}>
                    Close
                </Button>
            </DialogHeader>

            <DialogBody>
                <div className="overflow-scroll h-[50rem] pb-[10rem]">
                    {coupons.map((coupon, index) => (
                        <div key={index} className="relative border border-gray-300 rounded-lg p-4 mb-4 cursor-pointer" >
                            <div className="flex absolute top-2 right-2 text-gray-600 gap-5">
                                <button className="transition-opacity duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCouponDelete(coupon.coupon_id);
                                    }
                                    } >
                                    <MdDelete />
                                </button>
                                <button
                                    className="transition-opacity duration-300"
                                    onClick={() => navigate("/Admin/updateCoupons", { state: { cId: coupon.coupon_id, sId: storeId } })}>
                                    <MdEdit />
                                </button>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <div className="text-xl font-bold mr-3">{coupon.title}</div>
                                <span className={`py-1 px-2 rounded-full font-bold ${coupon.type.toLowerCase() === 'codes' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>{coupon.type}</span>
                                <div className="text-sm text-gray-600 mb-2 whitespace-nowrap">Due: {new Date(coupon.due_date).toLocaleDateString('en-GB', options)}</div>
                            </div>
                            <div className="bg-gray-100 text-center rounded p-2 mb-2">{coupon.coupon_code}</div>
                        </div>
                    ))}
                </div>
            </DialogBody>
        </Dialog>
    );
}

CouponsBox.propTypes = {
    storeId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};