import { useState, useEffect, useRef } from 'react';
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from 'react-icons/ai';
import axios from 'axios';
let count = 0;
let slideInterval;
import "./carousel.css"

const CarouselSlider = () => {
    const [featuredImages, setFeaturedImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/storeDisplay');
                if (response.data && response.data.data) {
                    const fetchedImages = response.data.data
                        .filter(item => item.show_in_carousel === 1 && item.thumbnail)
                        .map(item => item.thumbnail);
                    setFeaturedImages(fetchedImages);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    const handleOnNextClick = () => {
        count = (count + 1) % featuredImages.length;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };
    const handleOnPrevClick = () => {
        const productsLength = featuredImages.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };

    const startSlider = () => {
        slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);
    };

    const removeAnimation = () => {
        slideRef.current.classList.remove("fade-anim");
    };

    useEffect(() => {
        startSlider();
        slideRef.current.addEventListener("animationend", removeAnimation);
        slideRef.current.addEventListener("mouseenter", pauseSlider);
        slideRef.current.addEventListener("mouseleave", startSlider);
        return () => {
            clearInterval(slideInterval);
        };
    }, []);

    return (
        <div className="max-w-screen-xl">
            <div ref={slideRef} className="w-full relative select-none">
                <img src={featuredImages[currentIndex]} alt="" />
                <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                    <button onClick={handleOnPrevClick} className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition">
                        <AiOutlineVerticalRight size={35} />
                    </button>
                    <button onClick={handleOnNextClick} className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition">
                        <AiOutlineVerticalLeft size={35} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarouselSlider;