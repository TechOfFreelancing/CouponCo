import { Link, useNavigate } from "react-router-dom";
import { IoCreateOutline } from 'react-icons/io5';
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography, Button, CardFooter, Tooltip } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const AdminStores = () => {
    const [count, setCount] = useState(1);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get(
                    `https://backend.qwiksavings.com/api/getAllStore?page=${count}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setStores(response.data.stores);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                alert(error.response?.data?.message || "Failed to fetch Store.");
                console.error("Failed to fetch Stores:", error);
            }
        };

        fetchStores();
    }, [count]);

    const handleStoreDelete = async (storeId) => {
        try {
            await axios.delete(`https://backend.qwiksavings.com/api/admin/delete/${storeId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });

            const updatedStores = stores.filter(store => store.id !== storeId);
            setStores(updatedStores);
            toast.success("Store Deleted Successfully!");
        } catch (error) {
            toast.error("Failed to delete store");
            console.error('Failed to delete store:', error);
        }
    };

    return (
        <>
            <Toaster position="top-center"></Toaster>
            <div>
                <Link to="/Admin/addStore" className="flex m-5 gap-2 text-gray-600 items-center">
                    <IoCreateOutline /> <span>Add Stores</span>
                </Link>
                <Card className="h-full w-full">
                    <div className="flex flex-col justify-center items-center h-full">
                        {stores.length === 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <img
                                    src="/illustration/noData.png"
                                    alt="no data"
                                    className="w-96 h-auto"
                                />
                            </div>
                        ) : (
                            loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <img
                                        src="/illustration/loading.gif"
                                        alt="loading..."
                                        className="w-96 h-auto"
                                    />
                                </div>)
                                : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:w-[97vw] mt-5 xl:mt-10">
                                    {stores.map((store) => (
                                        <div key={store.id} className="relative group" onClick={() => navigate("/Admin/updateStore", { state: { sId: store.id } })}>
                                            <div className="flex flex-col gap-2 h-[10rem] lg:h-[20rem] cursor-pointer items-center justify-center">
                                                <div className="h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem] p-5 rounded-full flex items-center justify-center border-2 border-black hover:shadow-2xl overflow-hidden">
                                                    <img src={store.logo_url} alt={store.name} className="h-auto w-auto max-h-full max-w-full" />
                                                </div>
                                                <div className="hover:underline text-center group-hover:underline">
                                                    <span className="flex justify-center gap-2 items-center">
                                                        <span>{store.name}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <Tooltip content="Delete Store">
                                                <button
                                                    className="absolute top-2 right-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStoreDelete(store.id);
                                                    }
                                                    }
                                                >
                                                    <MdDelete />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>)
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
export default AdminStores;