import { useMemo, useState, useEffect } from 'react';
import { GrNext } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeleton';

export const StackedImageAnimation = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardStores, setCardStores] = useState([]);
    const [cardImages, setCardImages] = useState([]);
    const [colorMap, setColorMap] = useState(new Map());

    console.log(cardStores);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/storeDisplay');
                if (response.data && response.data.data) {
                    const filteredStores = response.data.data.filter(store => store.show_in_card === 1);
                    setCardStores(filteredStores);

                    //to fetch store details(like logo , name form store id)
                    const storeDetailsPromises = filteredStores.map(async store => {
                        try {
                            const storeDetails = await axios.get(`http://localhost:4000/api/getStore/${store.store_id}`);
                            return {
                                storeId: store.store_id,
                                logoUrl: storeDetails.data.store.logo_url || null,
                                name: storeDetails.data.store.name || null
                            };
                        } catch (error) {
                            console.error('Error fetching store logo:', error);
                            return {
                                storeId: store.store_id,
                                logoUrl: null
                            };
                        }
                    });

                    const storeDetailsResults = await Promise.all(storeDetailsPromises);
                    setCardImages(storeDetailsResults);
                }
            } catch (error) {
                console.error('Error fetching card stores:', error);
            }
        };

        fetchStores();
    }, []);

    useEffect(() => {
        const generateColors = () => {
            const colors = new Map();
            const maxColors = cardImages.length

            for (let i = 0; i < maxColors; i++) {
                const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                colors.set(i, color);
            }
            setColorMap(colors);
        };

        generateColors();
    }, [cardImages]);


    const handleNextClick = () => {
        setActiveIndex((cur) => (cur + 1) % cardStores.length); // Manually update the active index
    };

    const size = useMemo(() => cardImages.length, [cardImages]);

    const map = useMemo(() => {
        const map = new Map();
        const len = cardImages.length;
        let i = len;
        if (len < activeIndex || activeIndex < 0)
            throw new Error('Invalid index set as active index');

        while (i > 0) {
            map.set((activeIndex + len - i) % len, --i);
        }

        return map;
    }, [activeIndex, cardImages]);

    const navigate = useNavigate();

    return (
        <>

            {
                cardImages ? (
                    <div className="w-[255px] h-[355px] relative p-2 m-5 hidden lg:inline-block">
                        {
                            cardImages.map((imageObj, i) => {
                                const factor = size - 1 - map.get(i);
                                const isPreviousActiveIndex = (activeIndex + size - 1) % size === i;

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            backgroundColor: `${colorMap.get(i)}`,
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
                                            <img src={imageObj.logoUrl} alt={`Logo ${i}`} className='h-14 w-14 rounded-lg' />
                                            <img src={cardStores[activeIndex]?.thumbnail} alt={`Thumbnail ${i}`} className='rounded-sm' />
                                        </div>
                                        <p className='text-sm'>{cardStores[activeIndex]?.content}</p>
                                        <GrNext className="absolute bottom-5 right-5 text-white z-10 p-3 bg-green-400 rounded-full cursor-pointer" onClick={handleNextClick}></GrNext>
                                        <button
                                            className='absolute bottom-5 left-5 bg-blue-600 text-white z-10 text-xl p-3 px-5 rounded-lg hover:bg-blue-700'
                                            onClick={() => {
                                                navigate(
                                                    `/Stores/${imageObj.name}`,
                                                    { state: { sId: imageObj.storeId } }
                                                );
                                            }}
                                        >
                                            Get now
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>

                ) : (
                    <Skeleton></Skeleton>
                )
            }

        </>
    );
};
