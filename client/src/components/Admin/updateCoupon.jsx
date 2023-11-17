import { useFormik } from "formik";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";

const UpdateCoupons = () => {

    const [coupons, setCoupons] = useState([]);
    const [store, setStore] = useState([]);

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    const location = useLocation();

    const sId = location.state?.sId;

    const cId = location.state?.cId;

    const formik = useFormik({


        initialValues: {
            title: coupons.title || '',
            type: coupons.type || '',
            coupon_code: coupons.couponCode || '',
            due_date: coupons.due_date || '',
            link: coupons.link || '',
            description: coupons.description || '',
        },

        onSubmit: async (values) => {

            let data = JSON.stringify({
                "title": values.title,
                "type": values.type,
                "coupon_code": values.coupon_code,
                "due_date": values.due_date,
                "link": values.link,
                "description": values.description
            });

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost:4000/api/admin/${cId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    toast.success("Coupon Updated successfully!");
                    console.log(response.data);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.error(error);
                });
        },
    });

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/coupons/${sId}/${cId}`);
                const storeData = await axios.get(`http://localhost:4000/api/getStore/${sId}`);
                setCoupons(response.data.coupon);
                setStore(storeData.data.store);

                console.log(response.data.coupon);

                formik.setValues({
                    title: response.data.coupon.title || '',
                    type: response.data.coupon.type || '',
                    coupon_code: response.data.coupon.coupon_code || '',
                    due_date: response.data.coupon.due_date || '',
                    link: response.data.coupon.link || '',
                    description: response.data.coupon.description || '',
                });

            } catch (error) {
                toast.error(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };
        fetchData();
    }, [cId]);

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Coupon</h1>
                <div className="flex items-center justify-center">
                    {coupons && <Avatar src={store.logo_url} size="xxl" className="h-auto w-auto" alt="avatar"></Avatar>}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 font-medium">
                            title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="block mb-1 font-medium">
                            Type:
                        </label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1 font-medium">
                            Description:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="CouponCode" className="block mb-1 font-medium">
                            CouponCode:
                        </label>
                        <input
                            type="text"
                            id="coupon_code"
                            name="coupon_code"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.coupon_code}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block mb-1 font-medium">
                            DueDate:
                        </label>
                        <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="Link" className="block mb-1 font-medium">
                            Link:
                        </label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.link}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Update Coupon
                    </button>
                </form>
            </div>
        </>
    );
}

export default UpdateCoupons;