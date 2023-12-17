const SubmitCouponForm = () => {

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid black',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        outline: 'none',
    };

    return (
        <div className="lg:w-1/2 flex flex-col gap-5 text-black lg:mx-auto mt-20 lg:mt-32 p-10 border">
            <h1 className="font-bold text-xl text-center">Submit A Coupon & Help Millions Save! </h1>
            <div className="rounded-lg overflow-clip flex-col border">
                <div className="flex w-full gap-0 h-[3rem]">
                    <div className={`w-full border flex items-center justify-center font-semibold  bg-red-500 text-white duration-300 cursor-pointer `}>Add Coupons</div>

                </div>
                <div className="form flex flex-col gap-5 bg-white lg:px-10 lg:py-5">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="title" className="block mb-1 font-medium">
                                Title:
                            </label>
                            <input className="bg-gray-100"
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
                            <select label="Select Version" className="w-full border border-black rounded-lg p-3 bg-gray-100">
                                <option>Sale</option>
                                <option>Code</option>

                            </select>
                        </div>
                       

                        <div className="mb-4">
                            <label htmlFor="couponCode" className="block mb-1 font-medium">
                                CouponCode:
                            </label>
                            <input className="bg-gray-100"
                                type="text"
                                id="couponCode"
                                name="couponCode"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block mb-1 font-medium">
                                Expired Date:
                            </label>
                            <input className="bg-gray-100"
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="link" className="block mb-1 font-medium">
                                Link:
                            </label>
                            <input className="bg-gray-100"
                                type="text"
                                id="link"
                                name="link"
                                style={inputStyle}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-1 font-medium">
                                Description:
                            </label>
                            <input className="bg-gray-100"
                                type="text"
                                id="description"
                                name="description"
                                style={inputStyle}
                            />
                        </div>
                        <div className="flex justify-center mb-4">
                            <button type="submit" className="py-2 px-4 hover:bg-[#800000] bg-red-700 duration-300 text-white rounded-md outline-none">
                                Submit
                            </button>
                        </div>
                        <span className="text-gray-600 text-sm">Please only submit publicly available coupon codes and not private or internal company codes. When in doubt, please obtain permission from the merchant first. See our <span className="text-blue-500">Terms and Conditions</span>  for more information regarding user generated content. Thank you very much!</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SubmitCouponForm
