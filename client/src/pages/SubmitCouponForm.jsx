import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast'
import { useLocation } from "react-router-dom";

const SubmitCouponForm = () => {

    const location = useLocation()

    const sId = location.state?.storeId;

    const [formData, setFormData] = useState({
        title: '',
        type: 'Sale',
        couponCode: '',
        dueDate: '',
        link: '',
        description: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const { title, type, couponCode, dueDate, link, description } = formData;

        const data = {
            title,
            type,
            couponCode,
            dueDate,
            link,
            description,
            isVerified: false,
        };

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `process.env.URL/api/admin/addCoupons/${sId}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data: JSON.stringify(data)
        };

        axios.request(config)
            .then((response) => {
                toast.success("Coupon Will be Added Soon After Approval!");
                console.log(response.data);
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.error(error);
            });
    }

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="lg:w-1/2 flex flex-col gap-5 text-black lg:mx-auto mt-20 lg:mt-32 p-10 border bg-white">
                {/* <h1 className="font-bold text-xl text-center">Submit A Coupon & Help Millions Save! </h1> */}
                <div className="rounded-lg overflow-clip flex-col border">
                    <div className="flex w-full gap-0 h-[3rem]">
                        <div className={`w-full border flex items-center justify-center font-semibold  bg-[#B33D53] text-white duration-300 cursor-pointer `}>Submit A Coupon & Help Millions Save!</div>
                    </div>
                    <div className="form flex flex-col gap-5 bg-white lg:px-10 lg:py-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-1 font-medium">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="bg-[#FAF9F5]"
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="type" className="block mb-1 font-medium">
                                    
                                    Select an Offer Type:
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full border border-black rounded-lg p-3 bg-[#FAF9F5]"
                                    style={inputStyle}
                                >
                                    <option>Sale</option>
                                    <option>Code</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="couponCode" className="block mb-1 font-medium">
                                    Coupon Code:
                                </label>
                                <input
                                    type="text"
                                    id="couponCode"
                                    name="couponCode"
                                    value={formData.couponCode}
                                    onChange={handleInputChange}
                                    className="bg-[#FAF9F5]"
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dueDate" className="block mb-1 font-medium">
                                    Expired Date:
                                </label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleInputChange}
                                    className="bg-[#FAF9F5]"
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="link" className="block mb-1 font-medium">
                                    Link:
                                </label>
                                <input
                                    type="text"
                                    id="link"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleInputChange}
                                    className="bg-[#FAF9F5]"
                                    style={inputStyle}
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
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="bg-[#FAF9F5]"
                                    style={inputStyle}
                                />
                            </div>

                            <div className="flex justify-center mb-4">
                                <button type="submit" className="py-2 px-4 hover:bg-[#800000] bg-[#B33D53] duration-300 text-white rounded-md outline-none">
                                    Submit
                                </button>
                            </div>

                            <span className="text-gray-600 text-sm">
                                Please only submit publicly available coupon codes and not private or internal company codes.
                                When in doubt, please obtain permission from the merchant first. See our
                                <span className="text-blue-500"> Terms and Conditions</span> for more information regarding user-generated content. Thank you very much!
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitCouponForm
