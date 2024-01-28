import { Formik, Form, Field } from "formik";
import { toast, Toaster } from 'react-hot-toast'


function UpdateCategory() {

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
            <div className="max-w-md mx-auto p-4 bg-white rounded-lg">
                <h1 className="text-center mb-6 text-2xl font-bold">Update Category</h1>
                <Formik>
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
                                // onChange={(event) => setSelectedFile(event.target.files[0])}
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
                            <label htmlFor="todays_top" className="block mb-1 font-medium">
                                todays_top
                            </label>
                            <Field
                                type="text"
                                id="title"
                                name="todays_top"
                                style={inputStyle}
                            />
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

export default UpdateCategory;