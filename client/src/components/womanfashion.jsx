import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Womanfashion = () => {

    const [featuredImages, setFeaturedImages] = useState([]);
    const [store,setStore] = useState([]);

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

    console.log(featuredImages);

    const navigate = useNavigate();

    return (

        <div className='lg:mx-28 mx-5'>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-10">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">Today&apos;s Top Woman fashion Offers</span>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {featuredImages.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-evenly relative h-[122px] w-[145px] lg:h-[230px] lg:w-[280px] border rounded-lg overflow-hidden hover:-translate-y-2 hover:shadow-lg duration-300">
                        <img
                            src={item.thumbnail}
                            className="cursor-pointer h-2/3 lg:w-[280px] lg:h-[155px]"
                            onClick={() => {
                                navigate('/Store', { state: { sId: item.storeId } });
                            }}
                        />
                        <img src={store[index]?.logo_url} alt="" className="absolute h-[25px] w-[25px] lg:h-[50px] lg:w-[50px] left-2 bottom-10 rounded-sm lg:rounded-2xl" />
                        <span className="text-md font-bold">{store[index]?.name} code</span>
                        <span className="text-sm">{item.content}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Womanfashion
