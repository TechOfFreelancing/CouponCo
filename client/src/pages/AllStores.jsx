import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const firstLatter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const AllStores = () => {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [stores, setStores] = useState([]);
    // const [updateTrigger, setUpdateTrigger] = useState(false);

    const location = useLocation();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    const navigate = useNavigate();

    const type = location.state?.type;

    const keyword = location.state?.keyword;

    const isFestival = location.state?.isFestival;

    // Fetch stores based on the festival or regular conditions
    // const fetchStores = useCallback(async () => {
    //     try {
    //         let fetchedStores = [];

    //         if (isFestival) {
    //             const response = await axios.get(`http://13.201.29.102:3000/api/festStoreDisplay`, {
    //                 headers: { "Content-Type": "application/json" }
    //             });

    //             const storeDetailsPromises = response.data.data.map(async (store) => {
    //                 if (store.storeId) {
    //                     const response = await axios.get(`http://13.201.29.102:3000/api/getStore/${store.storeId}`);
    //                     return response.data.store;
    //                 }
    //                 return null;
    //             });

    //             const storeDetails = await Promise.all(storeDetailsPromises);
    //             fetchedStores = storeDetails.filter(Boolean);
    //         } else {
    //             let apiUrl = `http://13.201.29.102:3000/api/getAllStore?`;

    //             if (type) {
    //                 apiUrl += `&type=${type}`;
    //             }

    //             if (keyword) {
    //                 apiUrl += `&keyword=${keyword}`;
    //             }

    //             const response = await axios.get(apiUrl, { headers: { "Content-Type": "application/json" } });
    //             fetchedStores = response.data.stores;
    //         }

    //         setStores(fetchedStores);
    //     } catch (error) {
    //         console.error("Failed to fetch stores:", error);
    //     }
    // }, [isFestival, type, keyword]);


    // const updateStoreCounts = useCallback(async () => {
    //     try {
    //         const updatedStores = await Promise.all(stores.map(async (store) => {
    //             try {
    //                 const couponsResponse = await axios.get(`http://13.201.29.102:3000/api/coupons/${store.id}`);
    //                 const coupons = couponsResponse.data.coupons;

    //                 if (coupons.length > 0) {
    //                     const expiredCoupons = coupons.filter(
    //                         (coupon) => new Date(coupon.due_date) < new Date()
    //                     );

    //                     const expiredOffers = expiredCoupons.filter(
    //                         (coupon) => coupon.type.toLowerCase() === 'deal' || coupon.type.toLowerCase() === 'offers'
    //                     );

    //                     const couponsCount = expiredCoupons.length;
    //                     const offersCount = expiredOffers.length;

    //                     const decreaseData = JSON.stringify({
    //                         couponsCount: couponsCount.toString(),
    //                         offersCount: offersCount.toString(),
    //                     });

    //                     // Make a PATCH request to decrease counts in the backend
    //                     await axios.patch(`http://13.201.29.102:3000/api/decreaseCount/${store.id}`, decreaseData);

    //                     // Update the store with new counts
    //                     return {
    //                         ...store,
    //                         coupons: Math.max(store.coupons - couponsCount, 0),
    //                         offers: Math.max(store.offers - offersCount, 0),
    //                     };
    //                 }

    //                 // If no coupons, return the store as is
    //                 return store;
    //             } catch (error) {
    //                 console.error(`Error updating store ${store.id} counts:`, error);
    //                 return store;
    //             }
    //         }));

    //         setStores(updatedStores);
    //     } catch (error) {
    //         console.error("Error updating store counts:", error);
    //     }
    // }, [stores]);

    // // Initial fetch
    // useEffect(() => {
    //     fetchStores();
    // }, []);

    // // Update store counts based on conditions
    // useEffect(() => {
    //     if (stores.length > 0 && updateTrigger) {
    //         updateStoreCounts();
    //         setUpdateTrigger(false);
    //     }
    // }, [stores, updateTrigger, updateStoreCounts]);

    // // Set updateTrigger to true when stores change
    // useEffect(() => {
    //     if (stores.length > 0 && !updateTrigger) {
    //         setUpdateTrigger(true);
    //     }
    // }, [stores, updateTrigger]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                if (isFestival) {
                    const response = await axios.get(`http://13.201.29.102:3000/api/festStoreDisplay`, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    const storeDetailsPromises = response.data.data.map(async (store) => {
                        if (store.storeId) {
                            const response = await axios.get(`http://13.201.29.102:3000/api/getStore/${store.storeId}`);
                            return response.data.store;
                        }
                        return null; // Cases where storeId is null or undefined
                    });

                    const storeDetails = await Promise.all(storeDetailsPromises);

                    setStores(storeDetails.filter(Boolean)); // Filtering out null values
                }

                else {
                    let apiUrl = `http://13.201.29.102:3000/api/getAllStore?`;

                    if (type) {
                        apiUrl += `&type=${type}`;
                    }

                    if (keyword) {
                        apiUrl += `keyword=${keyword}`;
                    }

                    const response = await axios.get(apiUrl, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    setStores(response.data.stores);
                }
            } catch (error) {
                alert(error.response?.data?.message || "Failed to fetch Store.");
                console.error("Failed to fetch Stores:", error);
            }
        };

        fetchStores();
    }, [type, keyword]);

    return (
        <div className="lg:w-[75vw] flex flex-col gap-5 text-black border lg:mx-auto mt-20 lg:mt-32 lg:p-10">
            <span className="text-2xl font-semibold">All Brands & Stores A-Z</span>
            <div className="border-2 border-gray-400">
                <span className="text-lg text-gray-700 m-2">Browse by stores</span>
                <div className="flex flex-wrap gap-2 justify-start items-center m-2">
                    <button className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === 'All' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleCategoryClick('All')}>All</button>
                    {firstLatter.map((letter, index) => (
                        <button
                            key={index}
                            className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === letter ? 'bg-black text-white' : ''}`}
                            onClick={() => handleCategoryClick(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                    <button
                        className={`border-2 border-gray-600 h-[50px] w-[50px] ${selectedCategory === '#' ? 'bg-black text-white' : ''}`}
                        onClick={() => handleCategoryClick('#')}
                    >
                        #
                    </button>
                </div>
            </div>
            <div>
                {selectedCategory === "All" ? (
                    Array.from([...firstLatter, '0-9']).map((letter, index) => {
                        const filteredStores = stores.filter((store) => {
                            if (letter === '0-9') {
                                return /\d/.test(store?.name?.charAt(0));
                            } else {
                                return store?.name?.charAt(0).toLowerCase() === letter.toLowerCase();
                            }
                        });

                        if (filteredStores.length === 0) {
                            return null;
                        }

                        return (
                            <div key={index} className="border-2 border-gray-400 mb-3">
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {filteredStores.map((ele) => (
                                        <div
                                            key={ele.id}
                                            className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0 cursor-pointer"
                                            onClick={() => {
                                                navigate(`/Stores/${ele.name}`, { state: { sId: ele.id } });
                                            }}
                                        >
                                            <div className="flex gap-4">
                                                <div className="border border-black p-1 h-[75px] w-[75px] rounded-full overflow-clip object-cover flex flex-wrap items-center justify-center"><img src={ele.logo_url} alt={ele.name} /></div>
                                                <div className="flex flex-col justify-evenly">
                                                    <div className="whitespace-pre-wrap">{ele.name}</div>
                                                    <div className=" text-sm text-gray-800">10 coupons | 5 offers</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })

                ) : selectedCategory === "#" ? (
                    Array.from(Array.from({ length: 10 }).map((_, i) => `${i}`)).map(
                        (letter, index) => (
                            <div key={index} className="border-2 border-gray-400 mb-3">
                                <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                                <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                    {stores
                                        .filter((store) => store?.name?.charAt(0) === letter)
                                        .map((ele) => (
                                            <div key={ele.id} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0 cursor-pointer" onClick={() => {
                                                navigate(
                                                    `/Stores/${ele.name}`, { state: { sId: ele.id } }
                                                )
                                            }}>
                                                <div className="flex gap-4">
                                                    <div className="border border-black p-1 h-[75px] w-[75px] rounded-full overflow-clip object-cover flex flex-wrap items-center justify-center"><img src={ele.logo_url} alt={ele.name} /></div>
                                                    <div className="flex flex-col justify-evenly">
                                                        <div className="whitespace-pre-wrap">{ele.name}</div>
                                                        <div className=" text-sm text-gray-800">10 coupons | 5 offers</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                    )
                ) : (Array.from(firstLatter.map((letter) => letter)).map(
                    (letter, index) => (
                        <div
                            key={index} className={`border-2 border-gray-400 mb-3 ${selectedCategory.toLocaleLowerCase() === letter.toLocaleLowerCase() ? '' : 'hidden'}`}>
                            <div className="text-4xl font-medium mx-5 my-2">{letter}</div>
                            <div className="lg:grid lg:grid-cols-3 gap-3 mx-3">
                                {stores
                                    .filter((store) => store?.name?.charAt(0).toLocaleLowerCase() === selectedCategory.toLocaleLowerCase())
                                    .map((ele) => (
                                        <div key={ele.id} className="px-5 py-3 font-thin bg-gray-200 mb-3 lg:mb-0 cursor-pointer" onClick={() => {
                                            navigate(
                                                `/Stores/${ele.name}`, { state: { sId: ele.id } }
                                            )
                                        }}>
                                            <div className="flex gap-4">
                                                <div className="border border-black p-1 h-[75px] w-[75px] rounded-full overflow-clip object-cover flex flex-wrap items-center justify-center"><img src={ele.logo_url} alt={ele.name} /></div>
                                                <div className="flex flex-col justify-evenly">
                                                    <div className="whitespace-pre-wrap">{ele.name}</div>
                                                    <div className=" text-sm text-gray-800">10 coupons | 5 offers</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}
export default AllStores