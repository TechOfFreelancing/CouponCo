import { useMemo, useState } from 'react';
import { GrNext } from 'react-icons/gr';
import images from "./stackImages";

export const StackedImageAnimation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const size = useMemo(() => images.length, []);


    const handleNextClick = () => {
        setActiveIndex((cur) => (cur + 1) % size); // Manually update the active index
    };

    const map = useMemo(() => {
        const map = new Map();
        const len = images.length;
        let i = len;
        if (len < activeIndex || activeIndex < 0)
            throw new Error('Invalid index set as active index');

        while (i > 0) {
            map.set((activeIndex + len - i) % len, --i);
        }

        return map;
    }, [activeIndex]);

    return (
        <div className="w-[255px] h-[355px] relative p-2 m-5">
            {images.map((image, i) => {
                const factor = size - 1 - map.get(i);
                const isPreviousActiveIndex = (activeIndex + size - 1) % size === i;

                return (
                    <div
                        key={i}
                        style={{
                            backgroundColor: `${image.background}`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "10px",
                            width: "inherit",
                            height: "inherit",
                            position: "absolute",
                            top: 0,
                            right: `${0 - 0.05 * factor * 580}px`,
                            transform: `scale(${1 - 0.075 * factor})`,
                            zIndex: map.get(i),
                            transition: `z-index 0.6s ease, transform 0.6s ease${isPreviousActiveIndex ? ", right 0.3s ease" : ""}`
                        }}
                    >
                        <div className="flex flex-col gap-5 items-center justify-center m-5 h-[200px]">
                            <img src={image.logo} alt={image.id} className='h-14 w-14 rounded-lg' />
                            <img src={image.item} alt={image.id} className='rounded-sm' />
                        </div>
                        <GrNext className="absolute bottom-5 right-5 text-white z-10 p-3 bg-green-400 rounded-full cursor-pointer" onClick={handleNextClick}></GrNext>
                        <button className='absolute bottom-5 left-5 bg-blue-600 text-white z-10 text-xl p-3 px-5 rounded-lg hover:bg-blue-700'>Grab now</button>
                    </div>

                );
            })}
        </div >
    );
};
