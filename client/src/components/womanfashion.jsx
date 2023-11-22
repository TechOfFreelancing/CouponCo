import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Womanfashion = () => {

    const [featuredImages, setFeaturedImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/storeDisplay');
                if (response.data && response.data.data) {
                    const fetchedImagesWithId = response.data.data
                        .filter(item => item.show_in_top === 1 && item.thumbnail)
                        .map(item => ({
                            storeId: item.store_id,
                            thumbnail: item.thumbnail
                        }));

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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {featuredImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.thumbnail}
                        className="cursor-pointer duration-300 hover:-translate-y-2 hover:shadow-lg"
                        onClick={() => {
                            navigate('/Store', { state: { sId: item.storeId } });
                        }}
                    />
                ))}

            </div>
        </div>
    )
}

export default Womanfashion
