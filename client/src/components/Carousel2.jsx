import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/carousel.css";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from 'react-icons/ai';


const Carousel2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [featuredImages, setFeaturedImages] = useState([]);

    const calculateTranslateX = (index) => {
        return -index * (window.innerWidth < 1024 ? 108 : 95.5) + '%';
    };
    const handleOnNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleOnPrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? featuredImages.length - 1 : prevIndex - 1
        );
    };

    // const redirect = (refLink) => {
    //     {
    //         console.log(refLink, "function called ")
    //         if (refLink) {
    //             if (!refLink.startsWith('https://')) {
    //                 refLink = `https://${refLink}`;
    //                 return refLink;
    //             }
    //             return refLink;
    //             // window.open(refLink, '_blank');
    //         } else {
    //             // console.error('Reference link not found');
    //             return 0;
    //         }
    //     }
    // }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://13.201.29.102:3000/api/storeDisplay');
                if (response.data && response.data.data) {
                    const fetchedImages = response.data.data
                        .filter(item => item.show_in_carousel === 1 && item.thumbnail)
                        .map(item => ({
                            ref_link: item.ref_link,
                            thumbnail: item.thumbnail
                        }));

                    setFeaturedImages(fetchedImages);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [currentIndex]);


    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index to show the next image
            setCurrentIndex((prevIndex) =>
                prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]);


    return (
        <div className='lg:px-[10rem]'>
            <div className="gap-2 m-2 sm:mt-5  sm:m-5 overflow-auto flex md:scroll-snap-type-x md:mandatory scrollbar-hide rounded-[5rem]">
                <div
                    className="flex transition-transform duration-500 ease-in-out gap-5 lg:gap-10"
                    style={{ transform: `translateX(${calculateTranslateX(currentIndex)})` }}
                >
                    {featuredImages.map((element, index) => (
                        <div
                            className="relative overflow-hidden className shadow-lg cursor-pointer flex-shrink-0 lg:rounded-[4rem] group h-fit w-fit"
                            key={index}
                        >
                            <a
                                href={element.ref_link && (element.ref_link.startsWith('https://') ? element.ref_link : `https://${element.ref_link}`)}
                                target='_blank'
                                rel="noreferrer"
                                className='rounded-xl lg:rounded-none'
                            >
                                <img
                                    className="relative object-cover w-[340px] h-[192px] lg:h-[350px] lg:w-[860px]"
                                    src={element.thumbnail}
                                    alt={`Image ${index + 1}`}
                                />
                            </a>

                            <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3 w-[90vw] lg:w-[50rem]">
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
export default Carousel2;




