import { Dialog } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import PropTypes from 'prop-types';

export function CouponDialog({ open, handleOpen, store, selectedProduct }) {

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);

        const day = date.getDate();
        const suffix = (day >= 10 && day <= 20) ? 'th' : ['st', 'nd', 'rd'][day % 10 - 1] || 'th';

        return formattedDate.replace(/(\d+)(?=(st|nd|rd|th))/, `$1${suffix}`);
    };

    return (
        <Dialog open={open} handler={handleOpen} size="lg" className="relative text-black py-5" >
            <IoMdClose className="text-black h-6 w-6 absolute right-5 top-5 cursor-pointer" onClick={handleOpen} />
            <div className="flex flex-col items-center">
                <div className="h-3/4  flex flex-col gap-5 items-center">
                    <div className="h-[150px] w-[150px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                        <img src={store?.logo_url} alt="logo" className='h-auto w-auto px-5' />
                    </div>
                    <div className="flex gap-5 justify-center items-center"> <div className="text-2xl font-bold">{store?.name?.toUpperCase()}</div>
                        <div className="text-2xl font-bold text-black">{selectedProduct?.title}</div></div>
                    <div className="text-lg">Ends {formatDate(selectedProduct?.due_date)}</div>
                    <div className="flex gap-10 items-center justify-center border border-black rounded-full text-2xl pl-10 p-2 bg-red-50/40">
                        <span className="copy-text tracking-widest">{selectedProduct?.coupon_code}</span>
                        <button
                            className="bg-[#800000]  max-w-fit p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                        // onClick={handleCopyClick}
                        >
                            Copy
                        </button>
                    </div>
                    <span style={{ color: 'green' }}>Copied!</span>
                    <div className="text-lg">
                        Copy and paste this code at {""}
                        <a href={`http://${selectedProduct?.ref_link}`} target="_blank" rel="noopener noreferrer" className="underline text-[#800000] hover:cursor-pointer">
                            {store?.name}
                        </a>
                    </div>
                    <div className="flex gap-5 border border-[#800000] px-5 py-3 rounded-full items-center justify-center bg-red-50/40">
                        <span className="text-sm lg:text-lg text-[#800000]">
                            Did the coupon work?
                        </span>
                        <button className="border border-green-600 hover:bg-green-600 text-black hover:text-white duration-150 px-5 py-3 rounded-md focus:outline-none">
                            <FaThumbsUp></FaThumbsUp>
                        </button>
                        <button className="border border-red-600 hover:bg-red-600 text-black hover:text-white duration-150 px-5 py-3 rounded-md focus:outline-none">
                            <FaThumbsDown></FaThumbsDown>
                        </button>
                    </div>
                </div>

            </div>
        </Dialog>
    );
}

CouponDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
    store: PropTypes.shape({
        name: PropTypes.string,
        logo_url: PropTypes.string,
    }).isRequired,
    selectedProduct: PropTypes.shape({
        title: PropTypes.string,
        due_date: PropTypes.string,
        coupon_code: PropTypes.string,
        ref_link: PropTypes.string
    }),
};