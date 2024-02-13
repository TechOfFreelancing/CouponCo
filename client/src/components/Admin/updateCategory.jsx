import { useFormik } from "formik";
import { toast, Toaster } from 'react-hot-toast'
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClouserCRm } from "./ClouserCRm";
import { ClouserC } from "./ClouserCAdd";


function UpdateCategory() {

    const [category, setCategory] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [openClouserForm, setOpneClouserForm] = useState(false);
    const [openDeleteClouser, setOpneDeleteClouser] = useState(false);

    const location = useLocation()

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    const handleClouserOpen = () => { setOpneClouserForm(!openClouserForm); };

    const handleDeleteClouserOpen = () => { setOpneDeleteClouser(!openDeleteClouser); };

    const cId = location.state?.cId;

    const formik = useFormik({

        initialValues: {
            name: category.name || '',
            About: category.About || '',
            todays_top: category.todays_top || '',
        },

        onSubmit: async (values) => {
            try {

                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("todays_top", values.todays_top);
                formData.append("About", values.About);

                if (selectedFile) {
                    formData.append("categoryFile", selectedFile);
                }

                const response = await axios.put(
                    `https://backend.qwiksavings.com/api/admin/updateCategory/${cId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                
                toast.success("Category Updated successfully");
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                    console.error(error.response.data);
                } else {
                    toast.error("An error occurred. Please try again later.");
                    console.error(error);
                }
            }
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/getCategory/${cId}`);
                setCategory(response.data.category);

                formik.setValues({
                    name: response.data.category.name || '',
                    About: response.data.category.About || '',
                    todays_top: response.data.category.todays_top || '',
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
            <Toaster position="top-center" />
            <ClouserC
                categoryId={cId}
                open={openClouserForm}
                handleOpen={handleClouserOpen}
            />
            <ClouserCRm
                categoryId={cId}
                open={openDeleteClouser}
                handleOpen={handleDeleteClouserOpen}
            />
            <div className="max-w-[1280px] mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Category</h1>
                <div className="flex items-center justify-center">
                    {category && <Avatar src={category?.logo_url} size="xxl" className="h-auto w-[150px]" alt="avatar"></Avatar>}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="my-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="categoryFile"
                        >
                            Upload image:
                        </label>
                        <input
                            id="categoryFile"
                            type="file"
                            style={inputStyle}
                            className="w-full p-2 border rounded"
                            onChange={(event) => setSelectedFile(event.target.files[0])}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 font-medium">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            style={inputStyle}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="todays_top" className="block mb-1 font-medium">
                            Add This Category to Today's Top?:
                        </label>
                        <select
                            id="todays_top"
                            name="todays_top"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.todays_top}
                        >
                            <option value="">Select Option</option>
                            <option value="1">
                                Yes
                            </option>
                            <option value="0">
                                No
                            </option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="About" className="block mb-1 font-medium">
                            About:
                        </label>
                        <textarea
                            id="About"
                            name="About"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            value={formik.values.About}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded resize-vertical"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mb-2 px-4 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Submit
                    </button>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleClouserOpen}
                            className="flex-1 py-2 px-4 mb-3 bg-yellow-500 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Add To Clouser
                        </button>

                        <button
                            type="button"
                            onClick={handleDeleteClouserOpen}
                            className="flex-1 py-2 px-4 bg-purple-500 text-white rounded-md mb-3 hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Remove From Clouser
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateCategory;