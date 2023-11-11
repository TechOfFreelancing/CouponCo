import { useState, useEffect, useRef } from 'react';
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import featuredImages from './featuredImages';
let count = 0;
let slideInterval;
import "./carousel.css"



const CarouselSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef();

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    const handleOnNextClick = () => {
        console.log("Next Slider")
        count = (count + 1) % featuredImages.length;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };
    const handleOnPrevClick = () => {
        console.log("Previous Slider")
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
                <img src={featuredImages[currentIndex]} alt=""/>
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

    )
}

export default CarouselSlider