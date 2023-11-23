import ImagesForLeading2 from '../api/Leanding2';
import { useState, useEffect } from 'react';
import "./carousel.css";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from 'react-icons/ai';


const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const calculateTranslateX = (index) => {
        return -index * 88.9 + '%';
    };
    const handleOnNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === ImagesForLeading2.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleOnPrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? ImagesForLeading2.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index to show the next image
            setCurrentIndex((prevIndex) =>
                prevIndex === ImagesForLeading2.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]);





    return (

        // <div className='px-[10rem]'>
        //     <div className="px-[5rem] gap-2 m-2 sm:mt-5  sm:m-5  overflow-auto flex md:scroll-snap-type-x md:mandatory scrollbar-hide">
        //         {
        //             ImagesForLeading2.map((element, index) => {
        //                 return (
        //                     <div className="overflow-hidden className shadow-lg cursor-pointer relative overflow-y-hidden item flex-shrink-0 scroll-snap-align-start rounded-[6rem]" key={index}>
        //                         <img className="object-cover h-[20rem] w-auto" src={element} alt="Flower and sky" />
        //                     </div>
        //                 )
        //             })
        //         }

        //     </div>
        // </div>
        <div className='px-[10rem]'>
            <div className=" px-[5rem] gap-2 m-2 sm:mt-5  sm:m-5  overflow-auto flex md:scroll-snap-type-x md:mandatory scrollbar-hide ">
                <div
                    className=" flex transition-transform duration-500 ease-in-out gap-10"
                    style={{ transform: `translateX(${calculateTranslateX(currentIndex)})` }}
                >
                    {ImagesForLeading2.map((element, index) => (
                        <div
                            className="relative overflow-hidden className shadow-lg cursor-pointer flex-shrink-0 rounded-[6rem] group"
                            key={index}
                        >
                            <img
                                className="relativeobject-cover h-[20rem] w-auto"
                                src={element}
                                alt={`Image ${index + 1}`}
                            />
                            <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3 w-[55rem]">
                                <button
                                    onClick={handleOnPrevClick}
                                    className="hidden bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition group-hover:block group-hover:animate-left  animate-right duration-300 hover:lg:scale-125"
                                >
                                    <AiOutlineVerticalRight size={35} />
                                </button>
                                <button
                                    onClick={handleOnNextClick}
                                    className="hidden bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition group-hover:block group-hover:animate-right  animate-left duration-300 hover:lg:scale-125"
                                >
                                    <AiOutlineVerticalLeft size={35} />
                                </button>
                            </div>
                        </div>

                    ))}

                </div>

            </div>
        </div>


    )
}
export default Slider;




