import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, CardFooter } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

const AllStores = () => {
    const [count, setCount] = useState(1);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const type = location.state?.type;
    const keyword = location.state?.keyword;

    const isFestival = location.state?.isFestival;

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    useEffect(() => {
        const fetchStores = async () => {
            try {
                if (isFestival) {
                    const response = await axios.get(`http://localhost:4000/api/festStoreDisplay`, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    const storeDetailsPromises = response.data.data.map(async (store) => {
                        if (store.storeId) {
                            const response = await axios.get(`http://localhost:4000/api/getStore/${store.storeId}`);
                            return response.data.store;
                        }
                        return null; // Cases where storeId is null or undefined
                    });

                    const storeDetails = await Promise.all(storeDetailsPromises);

                    setStores(storeDetails.filter(Boolean)); // Filtering out null values
                }

                else {
                    let apiUrl = `http://localhost:4000/api/getAllStore?page=${count}`;

                    if (type) {
                        apiUrl += `&type=${type}`;
                    }

                    if (keyword) {
                        apiUrl += `&keyword=${keyword}`;
                    }

                    const response = await axios.get(apiUrl, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    setStores(response.data.stores);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Failed to fetch Stores:", error);
            }
        };

        fetchStores();
    }, [count, type, keyword]);

    return (
        <>
            <div className="mt-14">
                <Card className="w-full">
                    <div className="flex flex-col">
                        {stores.length === 0 ? (
                            <div className="flex justify-center items-center h-96">
                                <img
                                    src="/illustration/noData.png"
                                    alt="no data"
                                    className="w-96 h-auto"
                                />
                            </div>
                        ) : loading ? (
                            <div className="flex justify-center items-center h-96">
                                <img
                                    src="/illustration/loading.gif"
                                    alt="loading..."
                                    className="w-96 h-auto"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-5 xl:mt-10">
                                {stores.map((store,index) => (
                                    <motion.div variants={variants} initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.25, ease: "easeInOut", duration: 0.5 }} key={store.id} className="relative group" onClick={() => {
                                        navigate(
                                            `/Stores/${store.name}`, { state: { sId: store.id } }
                                        )
                                    }}>
                                        <div className="flex flex-col gap-2 h-40 lg:h-80 cursor-pointer items-center justify-center">
                                            <div className="h-20 w-20 lg:h-40 lg:w-40 p-5 rounded-full flex items-center justify-center border-2 border-black hover:shadow-2xl overflow-hidden">
                                                <img src={store.logo_url} alt={store.name} className="h-auto w-auto max-h-full max-w-full" />
                                            </div>
                                            <div className="hover:underline text-center group-hover:underline">
                                                <span className="flex justify-center items-center">{store.name}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            Page {count}
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" color="blue-gray" size="sm" disabled={count === 1} onClick={() => { setCount(count - 1) }}>
                                Previous
                            </Button>
                            <Button variant="outlined" color="blue-gray" size="sm" disabled={stores.length === 0} onClick={() => { setCount(count + 1) }}>
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
export default AllStores;