import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { CouponsBox } from "./CouponsBox";
import { ShowOnDisplay } from "./ShowOnDisplay";
import { Clouser } from "./ClouserAdd";
import { ClouserRemove } from "./ClouserRemove";
import typesData from "../../api/AllTypes";



function UpdateStores() {

    const [openDialog, setOpenDialog] = useState(false);
    const [openDisplayForm, setOpenDisplayForm] = useState(false);
    const [openClouserForm, setOpneClouserForm] = useState(false);
    const [openDeleteClouser, setOpneDeleteClouser] = useState(false);
    const [categories, setCategories] = useState([]);



    const [selectedFile, setSelectedFile] = useState(null);
    const location = useLocation();

    const [store, setStore] = useState([]);

    const [faqs, setFaqs] = useState([]);
    const handleRemoveFAQ = (index) => {
        const updatedFaqs = [...faqs];
        updatedFaqs.splice(index, 1);
        setFaqs(updatedFaqs);
    };

    const isPresentInHomePage = useRef(false);
    const [showcase, setShowCase] = useState([]);
    const [isPresentInOffer, setIsPresentInOffer] = useState(false);


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

    const handleFormOpen = () => { setOpenDisplayForm(!openDisplayForm); };

    const handleClouserOpen = () => { setOpneClouserForm(!openClouserForm); };

    const handleDeleteClouserOpen = () => { setOpneDeleteClouser(!openDeleteClouser); };

    const sId = location.state?.sId;

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            name: store.name || '',
            title: store.title || '',
            description: store.description || '',
            moreAbout: store.moreAbout || '',
            type: store.type || '',
            hint: store.hint || "",
            best_offer: store.best_offer || "",
            avg_disc: store.avg_disc || "",
        },

        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                const updateUrl = `https://backend.qwiksavings.com/api/admin/updateStore/${sId}`;

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

                const validFaqs = faqs.filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== '');
                if (validFaqs.length > 0) {
                    const faqData = {};
                    validFaqs.forEach((faq) => {
                        faqData[faq.question] = faq.answer;
                    });
                    const faqUrl = `https://backend.qwiksavings.com/api/admin/addFaq/${sId}`;

                    await axios.put(faqUrl, faqData, {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    });

                    toast.success("FAQs added successfully");
                }


                const response = await axios.put(updateUrl, formData, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                });
                

                toast.success("Store updated successfully");

            } catch (error) {
                toast.error(error.response.data.message);
                console.error(error);
            }
        },
    });

    const handleRemoveFrom = async (showcaseItem) => {
        try {

            const showcases = [];

            if (showcaseItem.includes('carousel')) {
                showcases.push('show_in_carousel');
            }
            if (showcaseItem.includes('card')) {
                showcases.push('show_in_card');
            }
            if (showcaseItem.includes('featured')) {
                showcases.push('show_in_fetured');
            }
            if (showcaseItem.includes(`today's offer`)) {
                showcases.push('show_in_top');
            }

            // Join the showcases array to create the showInFieldName
            const showInFieldName = showcases.join(',');

            await axios.delete(`https://backend.qwiksavings.com//api/storeDisplay/${sId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                data: { show_in: showInFieldName }
            });

            isPresentInHomePage.current = false;
            toast.success(`Store Deleted from ${showcaseItem} Successfully!`);
            // Remove the specific showcaseItem from the showcase state
            const updatedShowcase = showcase.filter(item => item !== showcaseItem);
            setShowCase(updatedShowcase);
        } catch (error) {
            toast.error("Failed to delete store");
            console.error('Failed to delete store:', error);
        }
    }

    useEffect(() => {
        // Fetch data from the API
        const fetchProducts = async () => {
          try {
            const response = await axios.get(
              `https://backend.qwiksavings.com/api/getCategories`,
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


    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    const handleRemoveFromFestivalOffer = async () => {
        try {
            await axios.delete(`https://backend.qwiksavings.com/api/admin/deleteStoreFromFest/${sId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            setIsPresentInOffer(false)
            toast.success(`Store Deleted from Offer Successfully!`);
        } catch (error) {
            toast.error("Failed to delete store from offer");
            console.error('Failed to delete store from offer', error);
        }
    }

    const handleAddToFestivalOffer = async () => {
        try {
            await axios.post(
                `https://backend.qwiksavings.com/api/admin/addStoreToFest/${sId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setIsPresentInOffer(true);
            toast.success(`Store Added to Festival Offer Successfully!`);

        } catch (error) {
            toast.error("Failed to Add store to offer");
            console.error('Failed to add store to offer', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/getStore/${sId}`);

                const result = await axios.get(`https://backend.qwiksavings.com/api/storeDisplay`);

                const offerRes = await axios.get(`https://backend.qwiksavings.com/api/festStoreDisplay`);

                const presentInOffer = offerRes.data.data.some(item => item.storeId === sId);
                setIsPresentInOffer(presentInOffer);

                const presentInHomePage = result.data.data.some(item => item.store_id === sId);
                isPresentInHomePage.current = presentInHomePage;

                if (presentInHomePage) {
                    const showcaseItems = result.data.data.filter(item => item.store_id === sId);

                    const showcases = showcaseItems.reduce((acc, item) => {
                        if (item.show_in_carousel === 1) {
                            acc.push('carousel');
                        }
                        if (item.show_in_card === 1) {
                            acc.push('card');
                        }
                        if (item.show_in_fetured === 1) {
                            acc.push('featured');
                        }
                        if (item.show_in_top === 1) {
                            acc.push(`today's offer`);
                        }
                        return acc;
                    }, []);

                    setShowCase(showcases)
                }

                setStore(response.data.store);
                const fetchedFaqs = response.data.store.faq;

                if (fetchedFaqs && fetchedFaqs.length > 0) {
                    setFaqs(fetchedFaqs);
                } else {
                    setFaqs([{ question: "", answer: "" }]);
                }

                formik.setValues({
                    name: response.data.store.name || '',
                    title: response.data.store.title || '',
                    description: response.data.store.description || '',
                    moreAbout: response.data.store.moreAbout || '',
                    type: response.data.store.type || '',
                    hint: response.data.store.hint || '',
                    best_offer: response.data.store.best_offer || '',
                    avg_disc: response.data.store.avg_disc || '',
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
            <ShowOnDisplay
                storeId={sId}
                open={openDisplayForm}
                handleOpen={handleFormOpen}
            />
            <Clouser
                storeId={sId}
                open={openClouserForm}
                handleOpen={handleClouserOpen}
            />
            <ClouserRemove
                storeId={sId}
                open={openDeleteClouser}
                handleOpen={handleDeleteClouserOpen}
            />
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Store</h1>
                <div className="flex items-center justify-center">
                    {store && <Avatar src={store.logo_url} size="xxl" className="h-auto w-auto" alt="avatar"></Avatar>}
                </div>
                <form onSubmit={formik.handleSubmit}>
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
                        <label htmlFor="title" className="block mb-1 font-medium">
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                        >
                            <option value="">Select Type</option>
                            {categories.map((type, index) => (
                                <option key={index} value={type.name}>
                                    {type.name}

                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-1 font-medium">
                            About:
                        </label>
                        <textarea
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
                        <label htmlFor="moreAbout" className="block mb-1 font-medium">
                            More About:
                        </label>
                        <textarea
                            type="text"
                            id="moreAbout"
                            name="moreAbout"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.moreAbout}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="hint" className="block mb-1 font-medium">
                            How to Apply:
                        </label>
                        <textarea
                            type="text"
                            id="hint"
                            name="hint"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.hint}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="best_offer" className="block mb-1 font-medium">
                            Best Offer(%):
                        </label>
                        <textarea
                            type="text"
                            id="best_offer"
                            name="best_offer"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.best_offer}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="avg_disc" className="block mb-1 font-medium">
                            Avg Discout(%):
                        </label>
                        <textarea
                            type="text"
                            id="avg_disc"
                            name="avg_disc"
                            style={inputStyle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.avg_disc}
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

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleOpenDialog}
                            className="flex-1 py-2 px-4 mb-3 bg-yellow-500 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Show Coupons
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/Admin/addCoupons", { state: { sId: sId } })}
                            className="flex-1 py-2 px-4 bg-purple-500 text-white rounded-md mb-3 hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                        >
                            Add New Coupon
                        </button>
                    </div>

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

                    {isPresentInHomePage.current && (
                        <div>
                            {showcase.length > 0 && (
                                showcase.map((showcaseItem, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleRemoveFrom(showcaseItem)}
                                        className="w-full py-2 px-4 bg-red-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                                    >
                                        Remove From {showcaseItem}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleFormOpen}
                        className="w-full py-2 px-4 bg-purple-500 mb-3 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                    >
                        Add To Home Page?
                    </button>

                    {isPresentInOffer ? (
                        <button
                            type="button"
                            onClick={handleRemoveFromFestivalOffer}
                            className="w-full py-2 px-4 bg-yellow-500 mb-3 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                        >
                            Remove from Festival Offer
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleAddToFestivalOffer}
                            className="w-full py-2 px-4 bg-yellow-500 mb-3 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring"
                        >
                            Add to Current Festival Offer
                        </button>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
                    >
                        Update Store
                    </button>
                </form>
            </div>
        </>
    );
}

export default UpdateStores;