import { useFormik } from "formik";
import { toast, Toaster } from 'react-hot-toast'
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ClouserE } from "./ClouserEAdd";
import { ClouserERm } from "./CloserERm";


function UpdateEvent() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBannerFile, setSelectedBannerFile] = useState(null);
    const [event, setEvent] = useState([])
    const [openClouserForm, setOpneClouserForm] = useState(false);
    const [openDeleteClouser, setOpneDeleteClouser] = useState(false);

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    const location = useLocation()

    const handleClouserOpen = () => { setOpneClouserForm(!openClouserForm); };

    const handleDeleteClouserOpen = () => { setOpneDeleteClouser(!openDeleteClouser); };


    const eId = location.state?.eId

    const formik = useFormik({

        initialValues: {
            event_name: event.event_name || '',
            best_offer: event.best_offer || '',
            avg_disc: event.avg_disc || '',
            about: event.about || '',
        },

        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("event_name", values.event_name);
                formData.append("best_offer", values.best_offer);
                formData.append("avg_disc", values.avg_disc);
                formData.append("about", values.about);

                if (selectedFile) {
                    formData.append("eventLogoFile", selectedFile);
                }

                if (selectedBannerFile) {
                    formData.append("eventBannerFile", selectedBannerFile);
                }

                const response = await axios.put(
                    `https://backend.qwiksavings.com/api/admin/updateEvent/${eId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                
                toast.success("Event Updated successfully");
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
                const response = await axios.get(`https://backend.qwiksavings.com/api/getEvent/${eId}`);
                setEvent(response.data.data)

                formik.setValues({
                    event_name: response.data.data.event_name || '',
                    best_offer: response.data.data.best_offer || '',
                    avg_disc: response.data.data.avg_disc || '',
                    about: response.data.data.about || '',
                });

            } catch (error) {
                toast.error(error.response ? error.response.statusText : 'Failed to fetch data');
                console.error('Error Occurred!', error);
            }
        };

        fetchData();
    }, [eId]);


    return (
        <>
            <Toaster position="top-center"></Toaster>
            <ClouserE
                eventId={eId}
                open={openClouserForm}
                handleOpen={handleClouserOpen}
            />
            <ClouserERm
                eventId={eId}
                open={openDeleteClouser}
                handleOpen={handleDeleteClouserOpen}
            />
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Event</h1>
                <div className="flex items-center justify-center">
                    <h1>Logo:</h1>
                    {event && <Avatar src={event?.event_logo_url} size="xxl" className="h-auto w-[150px]" alt="avatar"></Avatar>}
                </div>
                <div className="flex items-center justify-center">
                    <h1>Banner:</h1>
                    {event && <Avatar src={event?.event_banner_url} size="xxl" className="h-auto w-[150px]" alt="avatar"></Avatar>}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="my-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="eventLogoFile"
                        >
                            Upload logo image:
                        </label>
                        <input
                            id="eventLogoFile"
                            type="file"
                            style={inputStyle}
                            onChange={(event) => setSelectedFile(event.target.files[0])}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="eventBannerFile"
                        >
                            Upload Banner image:
                        </label>
                        <input
                            id="eventBannerFile"
                            type="file"
                            style={inputStyle}
                            onChange={(event) => setSelectedBannerFile(event.target.files[0])}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="event_name" className="block mb-1 font-medium">
                            Event Name:
                        </label>
                        <input
                            type="text"
                            id="event_name"
                            name="event_name"
                            value={formik.values.event_name}
                            style={inputStyle}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="about" className="block mb-1 font-medium">
                            about:
                        </label>
                        <textarea
                            id="about"
                            name="about"
                            value={formik.values.about}
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
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="best_offer" className="block mb-1 font-medium">
                            Best Offer:
                        </label>
                        <input
                            id="best_offer"
                            name="best_offer"
                            value={formik.values.best_offer}
                            style={inputStyle}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="avg_disc" className="block mb-1 font-medium">
                            Avg Discout :
                        </label>
                        <input
                            id="avg_disc"
                            name="avg_disc"
                            value={formik.values.avg_disc}
                            style={inputStyle}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 mb-2 bg-blue-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-pink-200"
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

export default UpdateEvent;