import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import typesData from "../../api/AllTypes";
import Events from "../../api/event";

const UpdateCoupons = () => {

    const [coupons, setCoupons] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [store, setStore] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState([]);

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

    // console.log(cId);

    const formattedDate = coupons?.due_date?.substring(0, 10)
    const isPresentInHomePage = useRef(false);

    const formik = useFormik({


        initialValues: {
            title: coupons.title || '',
            type: coupons.type || '',
            category: coupons.category || '',
            coupon_code: coupons.couponCode || '',
            due_date: formattedDate || '',
            ref_link: coupons.ref_link || '',
            description: coupons.description || '',
            events: selectedEvents || []
        },

        onSubmit: async (values) => {

            let data = JSON.stringify({
                "title": values.title,
                "type": values.type,
                "coupon_code": values.coupon_code,
                "due_date": values.due_date,
                "ref_link": values.ref_link,
                "description": values.description,
                "events": values.events
            });

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${import.meta.env.VITE_SERVER}/api/admin/${cId}`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
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
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/coupons/${sId}/${cId}`);
                const storeData = await axios.get(`${import.meta.env.VITE_SERVER}/api/getStore/${sId}`);
                const eventName = await axios.get(`${import.meta.env.VITE_SERVER}/api/eventcoupon/${cId}`);
                // console.log(eventName);
                const result = await axios.get(`${import.meta.env.VITE_SERVER}/api/storeDisplay`);
                setCoupons(response.data.coupon);
                setStore(storeData.data.store);
                const events = eventName.length !== 0 && eventName.data.coupons.map((e) => e.event_name);
                setSelectedEvents(events);
                const presentInHomePage = result.data.data.some(item => item.coupon_id === cId);
                isPresentInHomePage.current = presentInHomePage;

                formik.setValues({
                    title: response.data.coupon.title || '',
                    type: response.data.coupon.type || '',
                    category: response.data.coupon.category || '',
                    coupon_code: response.data.coupon.coupon_code || '',
                    due_date: response.data.coupon.due_date.substring(0, 10) || '',
                    ref_link: response.data.coupon.ref_link || '',
                    description: response.data.coupon.description || '',
                    events: events || []
                });

            } catch (error) {
                toast.error(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };

        fetchData();
    }, [cId]);


    // console.log(formik.values.events);

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    };

    const handleAdd = async () => {
        const formdata = new FormData();
        try {
            if (selectedFile) {
                formdata.append("thumbFile", selectedFile);
            }

            formdata.append("couponId", cId);

            await axios.post(
                `${import.meta.env.VITE_SERVER}/api/admin/addToOffer/${sId}`,
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            toast.success("Store Added to Top Offer successfully");
            handleOpenDialog();
        } catch (error) {
            setOpenDialog(!openDialog);
            if (error.response.status == 400) {
                return toast.error("Reach maximum limit");
            }
            toast.error("Error due to already existance of coupon or anything");
            console.log(error);
        }
    }

    const handleRemoveFrom = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER}/api/storeDisplay/${sId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });

            isPresentInHomePage.current = false;
            toast.success(`Store Deleted from Today's Top Successfully!`);
        } catch (error) {
            toast.error("Failed to delete store");
            console.error('Failed to delete store:', error);
        }
    }

    const handleCheckboxChange = (event, eventName) => {
        const isChecked = event.target.checked;

        formik.setFieldValue(
            'events',
            isChecked
                ? [...formik.values.events, eventName]
                : formik.values.events.filter((event) => event !== eventName)
        );
    };

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="w-1/2 mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Coupon</h1>
                <div className="flex items-center justify-center">
                    {coupons && <Avatar src={store.logo_url} size="xxl" className="h-auto w-[150px]" alt="avatar"></Avatar>}
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
                        <select
                            id="type"
                            name="type"
                            style={inputStyle}
                        >
                            <option value="">Select Type</option>
                            <option value="codes">
                                codes
                            </option>
                            <option value="deals">
                                deals
                            </option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-1 font-medium">
                            Category:
                        </label>
                        <select
                            id="type"
                            name="category"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                        >
                            <option value="">Select Category</option>
                            {typesData.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block mb-1 font-medium">
                            Events:
                        </label>
                        <div className="grid grid-cols-3 justify-items-stretch gap-5 my-2">
                            {Events.map((event, index) => (
                                <div key={index} className="inline-flex items-center gap-5">
                                    <input
                                        type="checkbox"
                                        className="bg-[#FAF9F5] w-6 h-6 outline-none border rounded-lg p-1 accent-[#FAF9F5]"
                                        checked={formik.values.events.includes(event.title)}
                                        onChange={(e) => handleCheckboxChange(e, event.title)}
                                    />
                                    <span className="text-md flex items-center gap-2">{event.title}</span>
                                </div>
                            ))}
                        </div>
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
                            value={formik.values.due_date}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="ref_link" className="block mb-1 font-medium">
                            Link:
                        </label>
                        <input
                            type="text"
                            id="ref_link"
                            name="ref_link"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ref_link}
                        />
                    </div>

                    {isPresentInHomePage.current ? (
                        <button
                            type="button"
                            onClick={handleRemoveFrom}
                            className="w-full py-2 px-4 bg-purple-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                        >
                            Remove From Top offers
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleOpenDialog}
                            className="w-full py-2 px-4 bg-purple-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                        >
                            Add To Top offers?
                        </button>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Update Coupon
                    </button>
                </form>
            </div>
            <Dialog size="xs" open={openDialog} handler={handleOpenDialog} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="mb-4">
                            <input
                                type="file"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid black',
                                    borderRadius: '0.375rem',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    outline: 'none'
                                }}
                                onChange={(e) => { setSelectedFile(e.target.files[0]) }}
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleAdd} fullWidth>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

export default UpdateCoupons;