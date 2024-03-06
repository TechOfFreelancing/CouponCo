import React, { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AiOutlineVerticalLeft, AiOutlineVerticalRight } from "react-icons/ai"
import axios from "axios"
import Skeleton from "./Skeleton"

const variants = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : 1000,
    opacity: 0,
    scale: 0.5,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 150, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 150, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
}

const Carousel = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [featuredImages, setFeaturedImages] = useState([])

  const nextStep = () => {
    setDirection(1)
    setIndex((prevIndex) =>
      prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevStep = () => {
    setDirection(-1)
    setIndex((prevIndex) =>
      prevIndex === 0 ? featuredImages.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://backend.qwiksavings.com/api/storeDisplay"
        )
        if (response.data && response.data.data) {
          const fetchedImages = response.data.data
            .filter((item) => item.show_in_carousel === 1 && item.thumbnail)
            .map((item) => ({
              ref_link: item.ref_link,
              thumbnail: item.thumbnail,
            }))

          setFeaturedImages(fetchedImages)
        }
      } catch (error) {
        console.error("Error fetching images:", error)
      }
    }

    fetchImages()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === featuredImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredImages])

  return (
    <div className='container overflow-clip rounded-[20px] h-[125px] lg:h-[350px] w-screen lg:w-auto'>
      {featuredImages.length > 0 ? (
        <div className='slideshow group lg:w-[850px] xl:min-w-[950px]  w-screen my-0 lg:my-auto'>
          <AnimatePresence initial={false} custom={direction}>
            <a
              href={
                featuredImages[index].ref_link &&
                (featuredImages[index].ref_link.startsWith("https://")
                  ? featuredImages[index].ref_link
                  : `https://${featuredImages[index].ref_link}`)
              }
              target='_blank'
              rel='noreferrer'
              className='rounded-[20px] lg:rounded-none'
            >
              <motion.img
                variants={variants}
                animate='animate'
                initial='initial'
                exit='exit'
                src={featuredImages[index].thumbnail}
                alt='slides'
                className='slides object-cover w-[95vw] h-auto lg:h-[350px] lg:w-[850px] xl:min-w-[950px]  rounded-[20px]'
                key={featuredImages[index].thumbnail}
                custom={direction}
              />
            </a>
          </AnimatePresence>
          <div className='absolute top-[53.5px] lg:top-[11rem] transform -translate-y-1/2 flex justify-between items-start px-3 lg:px-10 w-full'>
            <button
              onClick={prevStep}
              className='bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition group-hover:block group-hover:animate-left  animate-right duration-300 hover:scale-125'
            >
              <AiOutlineVerticalRight className='w-4 h-4 lg:h-6 lg:w-6 ' />
            </button>
            <button
              onClick={nextStep}
              className='bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition group-hover:block group-hover:animate-right  animate-left duration-300 hover:scale-125'
            >
              <AiOutlineVerticalLeft className='w-4 h-4 lg:h-6 lg:w-6' />
            </button>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}

export default Carousel
