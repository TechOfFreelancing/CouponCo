import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa6";
const Womanfashion = () => {

    const [featuredImages, setFeaturedImages] = useState([]);
    const [store, setStore] = useState([]);

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

    return (

        <div className='lg:mx-28 mx-5'>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">Today&apos;s Top Woman fashion Offers</span>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5">
                {featuredImages.map((item, index) => (
                    <div key={index} className="flex flex-col gap-5 items-center justify-start relative h-[160px] w-[145px] lg:h-[230px] lg:w-[230px] border rounded-lg overflow-hidden hover:scale-105 shadow-lg duration-300 my-5">
                        <img
                            src={item.thumbnail}
                            className="cursor-pointer w-full h-1/2 lg:h-3/5 lg:w-[230px]"
                            onClick={() => {
                                navigate(`/Stores/${store[index]?.name}`, { state: { sId: item.storeId } });
                            }}
                        />
                        <img src={store[index]?.logo_url} alt="" className="absolute z-10 h-[35px] w-[35px] lg:h-[50px] lg:w-[50px] left-2 bottom-16 lg:bottom-20 border border-black bg-white rounded-sm lg:rounded-2xl" />
                        <div className="flex flex-col items-center justify-between">
                            <span className="text-sm lg:text-xl font-bold text-center w-[10rem] whitespace-nowrap">{store[index]?.name} code</span>
                            <div className="flex text-[#800000]  cursor-pointer items-center justify-between gap-2">
                                <span className="text-[#800000] text-[10px] lg:text-md whitespace-nowrap">{item.content} coupon available</span>
                                <FaLink className="h-6 w-6" />
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Womanfashion
