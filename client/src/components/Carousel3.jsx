import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import "../components/slideshow.css";
import { useEffect } from 'react';
import { AiOutlineVerticalLeft, AiOutlineVerticalRight } from 'react-icons/ai';
import axios from 'axios';
import Skeleton from './Skeleton';

const variants = {
    initial: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
        }
    },
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        // transition: 'ease-in',
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: direction => {
        return {
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            // scale: 0.5,
            // transition: 'ease-in',
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        }
    },
}



const Carousel = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [featuredImages, setFeaturedImages] = useState([]);

    function nextStep() {
        setDirection(1)
        if (index === featuredImages.length - 1) {
            setIndex(0)
            return
        }
        setIndex(index + 1)
    }

    function prevStep() {
        setDirection(1)
        if (index === 0) {
            setIndex(featuredImages.length - 1)
            return
        }
        setIndex(index - 1)
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCAL_SERVER}/api/storeDisplay`);
                if (response.data && response.data.data) {
                    const fetchedImages = response.data.data
                        .filter(item => item.show_in_carousel === 1 && item.thumbnail)
                        .map(item => ({
                            ref_link: item.ref_link,
                            thumbnail: item.thumbnail
                        }));

                    setFeaturedImages(fetchedImages);
                    // console.log(featuredImages)
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the index to show the next image
            setIndex((prevIndex) =>
                prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [index]);

    return (
        <div className='container overflow-clip rounded-xl lg:rounded-[3rem] h-[200px] lg:h-[350px]' >
            {
                featuredImages[index] ? (
                    <div className='slideshow group lg:w-[860px] w-screen my-0 lg:my-auto mx-auto'>
                        <AnimatePresence initial={false} custom={direction}>
                            <a
                                href={featuredImages[index].ref_link && (featuredImages[index].ref_link.startsWith('https://') ? featuredImages[index].ref_link : `https://${featuredImages[index].ref_link}`)}

                                target='_blank'
                                rel="noreferrer"
                                className='rounded-2xl lg:rounded-none'
                            >

                                <motion.img
                                    variants={variants}
                                    animate='animate'
                                    initial='initial'
                                    exit='exit'
                                    src={featuredImages[index].thumbnail}
                                    alt='slides'
                                    className='slides object-cover w-[340px] h-[192px] lg:h-[350px] lg:w-[860px] rounded-2xl'
                                    key={featuredImages[index].thumbnail}
                                    custom={direction}

                                />
                            </a>
                        </AnimatePresence>
                        <div className="absolute top-1/2 lg:top-1/3 transform -translate-y-1/2 flex justify-between items-start px-3 lg:px-10 w-full">
                            <button
                                onClick={prevStep}
                                className="hidden bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition group-hover:block group-hover:animate-left  animate-right duration-300 hover:scale-125"
                            >
                                <AiOutlineVerticalRight className='h-6 w-6 ' />
                            </button>
                            <button
                                onClick={nextStep}
                                className="hidden bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition group-hover:block group-hover:animate-right  animate-left duration-300 hover:scale-125"
                            >
                                <AiOutlineVerticalLeft className='h-6 w-6' />
                            </button>
                        </div>
                    </div>

                ) : (
                    <Skeleton></Skeleton>
                )
            }


        </div>
    )
}

export default Carousel;