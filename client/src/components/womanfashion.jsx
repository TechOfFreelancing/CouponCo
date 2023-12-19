import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion'
import "../components/couponsbutton.css";

import { FaRegBookmark } from "react-icons/fa6";
import { CouponDialog } from "./TopCouponBox";
import { FaHeart } from "react-icons/fa6";


const Womanfashion = () => {

    const [featuredImages, setFeaturedImages] = useState([]);
    const [selectedstore, setSelectedStore] = useState(null);
    const [store, setStore] = useState([]);
    const [cop, setCop] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    };

    const formatUserCount = (count) => {
        if (count >= 10000000) {
            return `${(count / 10000000).toFixed(1)} Cr`;
        } else if (count >= 100000) {
            return `${(count / 100000).toFixed(1)} L`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)} K`;
        } else {
            return count.toString();
    const [likedItems, setLikedItems] = useState([]);

    const handleLikeClick = (index) => {
        // Check if the item is already liked
        if (!likedItems.includes(index)) {
            // If not liked, add it to the likedItems state
            setLikedItems([...likedItems, index]);
        } else {
            // If already liked, remove it from the likedItems state
            setLikedItems(likedItems.filter((item) => item !== index));
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
                    setCop(coupon)

                    setFeaturedImages(fetchedImagesWithId);
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

    return (
        <>
            <CouponDialog
                open={openDialog}
                hadleOpen={handleOpenDialog}
                store={selectedstore}
                selectedProduct={selectedCoupon}
            />
            <div className='lg:mx-28 mx-5'>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10">
                    <div className="flex flex-col gap-1 lg:gap-5">

                        <span className="font-semibold text-lg lg:text-3xl">Today&apos;s Top Woman fashion Offers</span>
                    </div>
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
                            onClick={() => {
                                navigate(`/Stores/${store[index]?.name}`, { state: { sId: item.storeId } });
                            }}
                        />
                        <span
                            className={`p-2 absolute right-1 top-1 rounded-lg ${likedItems.includes(index) ? 'text-red-700' : 'text-white'
                                }`}
                            onClick={() => handleLikeClick(index)}
                        >
                            <FaHeart className="cursor-pointer text-3xl duration-300" />
                        </span>

                            <img src={store[index]?.logo_url} alt="" className="absolute z-10 h-[75px] w-[75px] left-2 bottom-36 border border-white bg-white rounded-full" />
                            <div className="ml-24 flex w-3/5 justify-between items-center text-gray-700">
                                {/* <span className="text-sm">BSI</span> */}
                                <span className="text-black bg-blue-200 p-1 rounded-md text-[12px]">Verified</span>
                            </div>
                            <div className="mx-2">
                                <span className="text-red-600 mr-2">{cop[index]?.title} </span>
                            </div>
                            <div className="flex justify-between w-full text-sm px-2">
                                {/* <span>View Terms</span> */}
                                <span>{formatUserCount(cop[index]?.user_count)} Used</span>
                            </div>
                            <div className="flex flex-col items-center justify-between">
                                <button className="button has-code">
                                    <span className="is-code">{cop[index]?.coupon_code}</span>
                                    <span className="is-code-text" onClick={() => {
                                        handleOpenDialog();
                                        setSelectedStore(store[index]);
                                        setSelectedCoupon(cop[index]);
                                    }}  ><em>GET CODE</em></span>
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