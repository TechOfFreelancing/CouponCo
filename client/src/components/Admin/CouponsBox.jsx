import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export function CouponsBox({ storeId, open, handleOpen }) {

    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const couponsData = await axios.get(`http://localhost:4000/api/coupons/${storeId}`);
                setCoupons(couponsData.data.coupons);
            } catch (error) {
                alert(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };
        fetchData();

    }, [storeId])

    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogHeader className="flex justify-between items-center">
                <div>Coupons</div>
                <Button variant="text" color="blue-gray" onClick={handleOpen}>
                    Close
                </Button>
            </DialogHeader>

            <DialogBody className="overflow-scroll max-h-screen">
                {coupons.map((coupon, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-xl font-bold mr-3">{coupon.title}</div>
                            <span className={`py-1 px-2 rounded-full font-bold ${coupon.type.toLowerCase() === 'code' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>{coupon.type}</span>
                            <div className="text-sm text-gray-600 mb-2">Due: {new Date(coupon.due_date).toLocaleDateString()}</div>
                        </div>
                        <div className="bg-gray-100 text-center rounded p-2 mb-2">{coupon.coupon_code}</div>
                    </div>
                ))}

            </DialogBody>
        </Dialog>
    );
}

CouponsBox.propTypes = {
    storeId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};