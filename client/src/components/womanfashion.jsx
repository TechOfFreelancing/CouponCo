import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion'
import "../components/couponsbutton.css";
import { FaHeart } from "react-icons/fa6";

const Womanfashion = () => {

    const [featuredImages, setFeaturedImages] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [name, setName] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [store, setStore] = useState([]);
    const [cop, setCop] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [likedItems, setLikedItems] = useState([]);

    const handleLikeClick = async (index, cId) => {
        const token = localStorage.getItem('token');

        // Check if token is present
        if (!token) {
            window.location.href = '/login'; // Redirect to login page if token is not present
            return;
        }

        try {
            const userId = localStorage.getItem('id')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedLikedItems = [...likedItems];

            if (!likedItems.includes(cId)) {
                updatedLikedItems.push(cId);

                setLikedItems(updatedLikedItems);

                await axios.post(`http://localhost:4000/api/saveCoupon/${cId}`, { userId }, config);
            } else {
                const filteredItems = updatedLikedItems.filter((item) => item !== cId);
                setLikedItems(filteredItems);

                await axios.delete(`http://localhost:4000/api/unsaveCoupon/${cId}`, config);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    const handleOpenDialog = (data, logo, name) => {
        setOpenDialog(!openDialog);
        setSelectedCoupon(data);
        setSelectedLogo(logo);
        setName(name)
    };

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options);

        const day = date.getDate();
        const suffix = (day >= 10 && day <= 20) ? 'th' : ['st', 'nd', 'rd'][day % 10 - 1] || 'th';

        return formattedDate.replace(/(\d+)(?=(st|nd|rd|th))/, `$1${suffix}`);
    };

    const correctedRefLink = selectedCoupon?.ref_link?.replace(/(https?:\/\/)([^:\/]+)/, "$1$2:");

    const formatUserCount = (count) => {
        if (count >= 10000000) {
            return `${(count / 10000000).toFixed(1)} Cr`;
        } else if (count >= 100000) {
            return `${(count / 100000).toFixed(1)} L`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)} K`;
        } else {
            return count.toString();
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/storeDisplay');
                if (response.data && response.data.data) {
                    const fetchedImagesWithId = response.data.data
                        .filter(item => item.show_in_top === 1 && item.thumbnail)
                        .map(item => ({
                            storeId: item.store_id,
                            thumbnail: item.thumbnail,
                            cId: item.coupon_id
                        }));

                    const store = await Promise.all(fetchedImagesWithId.map(async store => {
                        try {
                            const storeDetails = await axios.get(`http://localhost:4000/api/getStore/${store.storeId}`);
                            return storeDetails.data.store || null;
                        } catch (error) {
                            console.error('Error fetching store :', error);
                            return null;
                        }
                    }));

                    const coupon = await Promise.all(fetchedImagesWithId.map(async coupon => {
                        try {
                            const couponDetails = await axios.get(`http://localhost:4000/api/coupons/${coupon.storeId}/${coupon.cId}`);
                            return couponDetails.data.coupon || null;
                        } catch (error) {
                            console.error('Error fetching store :', error);
                            return null;
                        }
                    }));

                    setStore(store);
                    setCop(coupon);

                    setFeaturedImages(fetchedImagesWithId);

                    const userId = localStorage.getItem('id');

                    if (userId) {
                        try {
                            const token = localStorage.getItem('token');
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            };

                            const response = await axios.get(`http://localhost:4000/api/getDetails/${userId}`, config);
                            const savedCouponsData = response.data.savedCoupons || [];
                            const likedCouponIds = savedCouponsData.map(coupon => coupon.coupon_id);

                            setLikedItems(likedCouponIds);
                        } catch (error) {
                            console.error('Error fetching saved coupons:', error);
                        }
                    }
                }

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const handleUse = async (cId) => {
        try {
            await axios.put(`http://localhost:4000/api/inCount/${cId}`);
        } catch (error) {
            console.error(error);
        }
    }


    const handleCopyClick = () => {
        const textToCopy = document.querySelector('.copy-text');

        if (textToCopy) {
            const text = textToCopy.textContent || textToCopy.innerText;
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopySuccess(true);
                })
                .catch((err) => {
                    console.error('Unable to copy text to clipboard', err);
                    setCopySuccess(false);
                });
        }
    };

    return (
        <>
            <Dialog open={openDialog} handler={handleOpenDialog} >
                <DialogHeader className="flex justify-between items-center">
                    <Button variant="text" color="blue-gray" onClick={handleOpenDialog}>
                        Close
                    </Button>
                </DialogHeader>
                <DialogBody>
                    <div className="flex flex-col items-center">
                        <div className="h-3/4  flex flex-col gap-5 items-center">
                            <div className="h-[150px] w-[150px] bg-white rounded-full flex items-center justify-center  mt-5 mx-auto border border-black">
                                <img src={selectedLogo} alt="logo" className='h-auto w-auto px-5' />
                            </div>
                            <div className="flex gap-5 justify-center items-center"> <div className="text-2xl font-bold">{store?.name?.toUpperCase()}</div>
                                <div className="text-2xl font-bold text-black">{selectedCoupon?.title}</div></div>
                            <div className="text-lg">Ends {formatDate(selectedCoupon?.due_date)}</div>
                            <div className="flex gap-10 items-center justify-center border border-black rounded-full text-2xl pl-10 p-2 bg-red-50/40">
                                <span className="copy-text tracking-widest">{selectedCoupon?.coupon_code}</span>
                                <button
                                    className="bg-[#800000]  max-w-fit p-5 text-white cursor-pointer whitespace-nowrap hover:shadow-xl rounded-full"
                                    onClick={handleCopyClick}
                                >
                                    Copy
                                </button>
                            </div>
                            {copySuccess && <span style={{ color: 'green' }}>Copied!</span>}
                            <div className="text-lg">
                                Copy and paste this code at {""}
                                <a href={correctedRefLink} target="_blank" onClick={() => { handleUse(selectedCoupon.coupon_id) }} rel="noopener noreferrer" className="underline text-[#800000] hover:cursor-pointer">
                                    {name}
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
                </DialogBody>
            </Dialog>
            <div className='lg:mx-28 mx-5'>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10">
                    <div className="flex flex-col gap-1 lg:gap-5">
                        <span className="font-semibold text-lg lg:text-3xl">Today&apos;s Top Woman fashion Offers</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    {featuredImages.map((item, index) => (
                        <motion.div variants={variants} initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={index}
                            className="group flex flex-col gap-2 items-center justify-start relative h-[325px] w-[300px] border rounded-lg overflow-hidden shadow-lg duration-300 my-5 pb-5">
                            <img
                                src={item.thumbnail}
                                className="cursor-pointer w-full h-1/2"
                            />
                            <span
                                className={`p-2 absolute right-1 top-1 rounded-lg ${likedItems.includes(item.cId) ? 'text-red-700' : 'text-white'}`}
                                onClick={() => handleLikeClick(index, item.cId)}
                            >
                                <FaHeart className="cursor-pointer text-3xl duration-300" />
                            </span>

                            <img src={store[index]?.logo_url} alt="" className="absolute z-10 h-[75px] w-[75px] left-2 bottom-36 border border-white bg-white rounded-full" />
                            <div className="ml-24 flex w-3/5 justify-between items-center text-gray-700">
                                <span className="text-black bg-blue-200 p-1 rounded-md text-[12px]">Verified</span>
                            </div>
                            <div className="mx-2">
                                <span className="text-red-600 mr-2">{cop[index]?.title} </span>
                            </div>
                            <div className="flex justify-between w-full text-sm px-2">
                                <span>{formatUserCount(cop[index]?.user_count)} Used</span>
                            </div>
                            <div className="flex flex-col items-center justify-between">
                                <button className="button has-code" onClick={() => handleOpenDialog(cop[index], store[index]?.logo_url, store[index]?.name)}>
                                    <span className="is-code">{cop[index]?.coupon_code}</span>
                                    <span className="is-code-text"><em>GET CODE</em></span>
                                </button>
                            </div>
                        </motion.div>
                    )).slice(0, 8)}
                </div>
            </div>
        </>
    )
}

export default Womanfashion
