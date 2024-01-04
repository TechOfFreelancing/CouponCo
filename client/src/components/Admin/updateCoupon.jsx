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

const UpdateCoupons = () => {

    const [coupons, setCoupons] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [store, setStore] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const formattedDate = coupons?.due_date?.substring(0, 10)
    const isPresentInHomePage = useRef(false);

    const formik = useFormik({


        initialValues: {
            title: coupons.title || '',
            type: coupons.type || '',
            coupon_code: coupons.couponCode || '',
            due_date: formattedDate || '',
            ref_link: coupons.ref_link || '',
            description: coupons.description || '',
        },

        onSubmit: async (values) => {

            let data = JSON.stringify({
                "title": values.title,
                "type": values.type,
                "coupon_code": values.coupon_code,
                "due_date": values.due_date,
                "ref_link": values.ref_link,
                "description": values.description
            });

            console.log(data);

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `http://localhost:4000/api/admin/${cId}`,
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
                const response = await axios.get(`http://localhost:4000/api/coupons/${sId}/${cId}`);
                const storeData = await axios.get(`http://localhost:4000/api/getStore/${sId}`);

                const result = await axios.get(`http://localhost:4000/api/storeDisplay`);
                setCoupons(response.data.coupon);
                setStore(storeData.data.store);

                const presentInHomePage = result.data.data.some(item => item.coupon_id === cId);
                isPresentInHomePage.current = presentInHomePage;

                formik.setValues({
                    title: response.data.coupon.title || '',
                    type: response.data.coupon.type || '',
                    coupon_code: response.data.coupon.coupon_code || '',
                    due_date: response.data.coupon.due_date.substring(0, 10) || '',
                    ref_link: response.data.coupon.ref_link || '',
                    description: response.data.coupon.description || '',
                });

            } catch (error) {
                toast.error(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };
        fetchData();
    }, [cId]);

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    };

    const handleAdd = async () => {
        const formdata = new FormData();
        try {
            if (selectedFile) {
                formdata.append("thumbFile", selectedFile);
            }

            formdata.append("couponId",cId);

            await axios.post(
                `http://localhost:4000/api/admin/addToOffer/${sId}`,
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
            toast.error(error.response.data.message);
            console.error(error);
        }
    }

    const handleRemoveFrom = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/storeDisplay/${sId}`, {
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