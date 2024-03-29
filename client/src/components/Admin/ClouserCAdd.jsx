import {
    Dialog,
    Card,
    CardBody,
    Typography,
    Radio
} from "@material-tailwind/react";
import axios from "axios";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";


export function ClouserC({ categoryId, open, handleOpen }) {

    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all stores
                const responseStores = await axios.get(`https://backend.qwiksavings.com/api/getAllStore`);
                const allStores = responseStores.data.stores;

                // Fetch closure data
                const responseClosure = await axios.get('https://backend.qwiksavings.com/api/clouser');
                const storesData = responseClosure.data.data;

                // Filter out stores that are already associated with the opened store
                const associatedStoreIds = storesData
                    .filter(store => store.category_id === categoryId)
                    .map(store => store.sId);

                // Check if there are no associated stores
                const finalFilteredStores = associatedStoreIds.length === 0
                    ? allStores
                    : allStores.filter(store => !associatedStoreIds.includes(store.id));

                // Set the updated stores in state
                setStores(finalFilteredStores);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [categoryId]);

    const handleStoreClick = async (clickedStoreId) => {
        try {
            const res = await axios.post(`https://backend.qwiksavings.com/api/admin/addPopularForCategory/${clickedStoreId}`, {
                category_id: categoryId,
            },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                });
            alert(res.data.message)

            // Remove the clicked store from the UI
            setStores(prevStores => prevStores.filter(store => store.id !== clickedStoreId));
        } catch (error) {
            console.error(error);
            alert("Unable to add!");
        }
    };

    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="overflow-scroll h-[50rem] pb-[10rem]">
                            <div className="overflow-scroll h-[50rem] pb-[10rem]">
                                {stores?.map(store => {
                                    return (
                                        <div
                                            key={store.id}
                                            onClick={() => handleStoreClick(store.id)}
                                            className="flex items-center border border-black rounded-full cursor-pointer p-2"
                                            style={{ marginBottom: '10px' }}
                                        >
                                            <div className="w-16 h-16 rounded-full overflow-hidden mr-2 flex items-center justify-center">
                                                <img src={store.logo_url} alt={store.name} className="w-full h-full object-contain" />
                                            </div>
                                            <Typography className="flex-grow">{store.name}</Typography>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
}

ClouserC.propTypes = {
    storeId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};