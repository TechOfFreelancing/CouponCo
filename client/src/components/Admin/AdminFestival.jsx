import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";

function AdminFestival() {

    const [isUpdate, setIsUpdate] = useState(true);
    const [currentFestival, setCurrentFestival] = useState({ festival: '', discount: '' });

    const initialValues = {
        festival: "",
        discount: "",
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/festStoreDisplay`);
                if (response.data.data.length > 0 && response.data.data[0].storeId === null) {
                    const { festival_name, discount } = response.data.data[0];
                    setCurrentFestival({ festival: festival_name, discount });
                    setIsUpdate(true); // Assuming this means data is available for update
                } else {
                    setIsUpdate(false); // No data available, set to create
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {

        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER}/api/deleteOffer`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.message === 'Success!') {
                toast.success("Offers data deleted!");
                setCurrentFestival({ festival: '', discount: '' });
            }
            else {
                toast.error("Unable to delete!");
            }
        } catch (err) {
            console.error(err);
        }

    }


    const handleSubmit = async (values) => {
        try {
            const data = {
                festival: values.festival,
                discount: values.discount
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };

            const apiUrl = isUpdate
                ? `${import.meta.env.VITE_SERVER}/api/updateDetails`
                : `${import.meta.env.VITE_SERVER}/api/admin/addFest&Disc`;

            await axios[isUpdate ? 'put' : 'post'](apiUrl, data, config);
            toast.success('Festival Details Added successfully');
            setCurrentFestival({ festival: data.festival, discount:data.discount });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add festival details');
            console.error(error);
        }
    };


    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Current Festival:
                    <Typography variant="h3" color="blue" textGradient>{currentFestival.festival}</Typography>
                </h2>
                <h2 className="text-2xl font-bold">
                    Current Festival Offer:
                    <Typography variant="h3" color="blue" textGradient>{currentFestival.discount}%</Typography>
                </h2>
            </div>

            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">
                    {isUpdate ? 'Update Festival Details' : 'Add Festival Details'}
                </h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="Festival Name" className="block mb-1 font-medium">
                                Festival Name:
                            </label>
                            <Field
                                type="text"
                                id="festival"
                                name="festival"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="Festival Discount" className="block mb-1 font-medium">
                                Festival Discount(%):
                            </label>
                            <Field
                                type="text"
                                id="discount"
                                name="discount"
                                style={inputStyle}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 mb-3 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Submit
                        </button>
                    </Form>
                </Formik>
                <button
                    onClick={handleDelete}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                >
                    Delete Offer & Festival
                </button>
            </div>
        </>
    );
}

export default AdminFestival;