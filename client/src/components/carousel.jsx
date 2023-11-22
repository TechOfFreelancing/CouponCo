import { useState, useEffect, useRef } from 'react';
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from 'react-icons/ai';
import axios from 'axios';
import "./carousel.css";
import { useNavigate } from 'react-router-dom';

const CarouselSlider = () => {
    const [featuredImages, setFeaturedImages] = useState([]);
    const [imageCache, setImageCache] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);

    const animation = () => {
        if (slideRef.current) {
            slideRef.current.classList.add("fade-anim");
        }
    }

    const handleOnNextClick = () => {
        animation();
        const nextIndex = (currentIndex + 1) % featuredImages.length;
        setCurrentIndex(nextIndex);

    };

    const handleOnPrevClick = () => {
        animation();
        const productsLength = featuredImages.length;
        const prevIndex = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(prevIndex);

    };


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/storeDisplay');
                if (response.data && response.data.data) {
                    const fetchedImages = response.data.data
                        .filter(item => item.show_in_carousel === 1 && item.thumbnail)
                        .map(item => ({
                            store_id: item.store_id,
                            thumbnail: item.thumbnail
                        }));

                    // Preload images into the cache
                    const imagePromises = fetchedImages.map(async (imageData) => {
                        const img = new Image();
                        img.src = imageData.thumbnail;
                        await img.decode();
                        setImageCache(prevCache => ({ ...prevCache, [imageData.store_id]: img }));
                    });

                    await Promise.all(imagePromises);

                    setFeaturedImages(fetchedImages);
                }

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);


    useEffect(() => {
        const slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);

        const cleanup = () => clearInterval(slideInterval);
        return cleanup;
    },);

    const navigate = useNavigate();


    return (
        <div className="max-w-screen-xl">
            {featuredImages[currentIndex] && (
                <div ref={slideRef} className="w-full relative select-none block">
                    <img
                        src={imageCache[featuredImages[currentIndex].store_id].src} // Accessing the URL using store_id as key
                        alt="hello world"
                        className=' w-screen h-auto lg:w-[856px] lg:h-[310px] cursor-pointer'
                        onClick={() => {
                            navigate(
                                '/Store',
                                { state: { sId: featuredImages[currentIndex].store_id } } // Passing store_id in state
                            );
                        }}
                    />
                    <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                        <button onClick={handleOnPrevClick} className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition">
                            <AiOutlineVerticalRight size={35} />
                        </button>
                        <button onClick={handleOnNextClick} className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition">
                            <AiOutlineVerticalLeft size={35} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarouselSlider;