import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import "../components/couponsbutton.css";
import { FaHeart } from "react-icons/fa6";

const Womanfashion = () => {

    const [featuredImages, setFeaturedImages] = useState([]);
    const [store, setStore] = useState([]);
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
                            content: item.content
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
                    setStore(store);

                    setFeaturedImages(fetchedImagesWithId);
                }

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const navigate = useNavigate();
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (

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
                            <span className="text-sm">BSI</span>
                            <span className="text-black bg-blue-200 p-1 rounded-md text-[12px]">Verified</span>
                        </div>
                        <div className="mx-2">
                            <span className="text-red-600 mr-2">Exclusive</span>6% Off Entire Orders at BSI
                        </div>
                        <div className="flex justify-between w-full text-sm px-2">
                            <span>View Terms</span>
                            <span>1.4K Used</span>
                        </div>
                        <div className="flex flex-col items-center justify-between">
                            <button className="button has-code">
                                <span className="is-code">LXA</span>
                                <span className="is-code-text"><em>GET CODE</em></span>
                            </button>
                        </div>
                    </motion.div>
                )).slice(0, 8)}
            </div>
        </div>
    )
}

export default Womanfashion
