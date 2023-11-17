import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { CouponsBox } from "./CouponsBox";

function UpdateStores() {

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const location = useLocation();

    const [store, setStore] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const handleRemoveFAQ = (index) => {
        const updatedFaqs = [...faqs];
        updatedFaqs.splice(index, 1);
        setFaqs(updatedFaqs);
    };


    const handleFAQChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFaqs = faqs.map((faq, i) => {
            if (i === index) {
                return {
                    ...faq,
                    [name.slice(0, -3)]: value // Remove the index from the name
                };
            }
            return faq;
        });
        setFaqs(updatedFaqs);
    };

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    };

    const sId = location.state?.sId;

    const navigate = useNavigate();

    const formik = useFormik({

        initialValues: {
            name: store.name || '',
            description: store.description || '',
            type: store.type || '',
        },

        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                const updateUrl = `http://localhost:4000/api/admin/updateStore/${sId}`;

                formData.append("name", values.name);
                formData.append("description", values.description);
                formData.append("type", values.type);

                if (selectedFile) {
                    formData.append("storeFile", selectedFile);
                }

                const validFaqs = faqs.filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== '');
                if (validFaqs.length > 0) {
                    const faqData = {};
                    validFaqs.forEach((faq) => {
                        faqData[faq.question] = faq.answer;
                    });
                    const faqUrl = `http://localhost:4000/api/admin/addFaq/${sId}`;

                    await axios.put(faqUrl, faqData, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    toast.success("FAQs added successfully");
                }


                const response = await axios.put(updateUrl, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                toast.success("Store updated successfully");
                console.log(response.data);
            } catch (error) {
                toast.error(error.response.data.message);
                console.error(error);
            }
        },
    });

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
                const response = await axios.get(`http://localhost:4000/api/getStore/${sId}`);
                setStore(response.data.store);
                const fetchedFaqs = response.data.store.faq;

                if (fetchedFaqs && fetchedFaqs.length > 0) {
                    setFaqs(fetchedFaqs);
                } else {
                    setFaqs([{ question: "", answer: "" }]);
                }

                formik.setValues({
                    name: response.data.store.name || '',
                    description: response.data.store.description || '',
                    type: response.data.store.type || '',
                });
            } catch (error) {
                toast.error(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };
        fetchData();
    }, [sId]);

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <CouponsBox
                storeId={sId}
                open={openDialog}
                handleOpen={handleOpenDialog}
            />
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Store</h1>
                <div className="flex items-center justify-center">
                    {store && <Avatar src={store.logo_url} size="xxl" className="h-auto w-auto" alt="avatar"></Avatar>}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 font-medium">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
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
                        <label
                            className="block mb-1 font-medium"
                            htmlFor="storeFile"
                        >
                            Upload image:
                        </label>
                        <input
                            id="storeFile"
                            type="file"
                            style={inputStyle}
                            onChange={(event) => setSelectedFile(event.target.files[0])}
                        />
                    </div>

                    {faqs.map((faq, index) => (
                        <div key={index} className={`mb-4 flex items-center`}>
                            <div className="flex gap-4 w-3/4">
                                <input
                                    type="text"
                                    name={`question[${index}]`}
                                    placeholder="Question"
                                    value={faq.question}
                                    onChange={(e) => handleFAQChange(index, e)}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name={`answer[${index}]`}
                                    placeholder="Answer"
                                    value={faq.answer}
                                    onChange={(e) => handleFAQChange(index, e)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveFAQ(index)}
                                className="ml-4 p-2 border rounded hover:bg-red-600 hover:text-white"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
                        className={`w-full py-2 px-4 bg-red-500 text-white mb-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200`}
                    >
                        + Add FAQ
                    </button>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Update Store
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/Admin/addCoupons", { state: { sId: sId } })}
                        className="w-full py-2 px-4 bg-purple-500 text-white rounded-md mb-3 hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Add New Coupon
                    </button>

                    <button
                        type="button"
                        onClick={handleOpenDialog}
                        className="w-full py-2 px-4 bg-yellow-500 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Show Coupons
                    </button>
                </form>
            </div>
        </>
    );
}

export default UpdateStores;