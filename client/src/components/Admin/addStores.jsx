import { useEffect, useState } from "react";

import { Formik, Form, Field } from "formik";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import typesData from "../../api/AllTypes";
import { useNavigate } from "react-router-dom";



function AddStores() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    const initialValues = {
        name: "",
        title: "",
        description: "",
        moreAbout: "",
        hint: "",
        type: "",
        best_offer: "",
        avg_disc: "",
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };


    const handleSubmit = async (values) => {
        try {

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("moreAbout", values.moreAbout);
            formData.append("hint", values.hint);
            formData.append("type", values.type);
            formData.append("best_offer", values.best_offer);
            formData.append("avg_disc", values.avg_disc);

            if (selectedFile) {
                formData.append("storeFile", selectedFile);
            }

            const response = await axios.post(
                `https://backend.qwiksavings.com/api/admin/addStore`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                }
            );
            toast.success("Store Added successfully");

        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch data from the API
        const fetchProducts = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_SERVER}/api/getCategories`,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
              }
            );
            setCategories(response.data.categories);
          } catch (error) {
            alert(error.response?.data?.message || "Failed to fetch category.");
            console.error("Failed to fetch category:", error);
          }
        };
    
        fetchProducts();
      }, []);

      console.log(categories);


    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Add New Store</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <div className="my-5">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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

                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-1 font-medium">
                                Name:
                            </label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="title" className="block mb-1 font-medium">
                                title:
                            </label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="type" className="block mb-1 font-medium">
                                Type:
                            </label>
                            <Field
                                as="select"
                                id="type"
                                name="type"
                                style={inputStyle}
                            >
                                <option value="type">Select Type</option>
                                {categories.map((type, index) => (
                                    <option key={index} value={type.name}>
                                        {type.name}

                                    </option>
                                ))}
                            </Field>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-1 font-medium">
                                About:
                            </label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid black',
                                    borderRadius: '0.375rem',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    outline: 'none',
                                    resize: 'vertical',
                                }}
                                rows={4}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="moreAbout" className="block mb-1 font-medium">
                                More About:
                            </label>
                            <Field
                                as="textarea"
                                id="moreAbout"
                                name="moreAbout"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid black',
                                    borderRadius: '0.375rem',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    outline: 'none',
                                    resize: 'vertical',
                                }}
                                rows={4}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="best_offer" className="block mb-1 font-medium">
                                Best Offer(%):
                            </label>
                            <Field
                                id="best_offer"
                                name="best_offer"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="avg_disc" className="block mb-1 font-medium">
                                Avg Discout(%):
                            </label>
                            <Field
                                id="avg_disc"
                                name="avg_disc"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="hint" className="block mb-1 font-medium">
                                How to Apply:
                            </label>
                            <Field
                                as="textarea"
                                id="hint"
                                name="hint"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid black',
                                    borderRadius: '0.375rem',
                                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                    outline: 'none',
                                    resize: 'vertical',
                                }}
                                rows={4}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default AddStores;