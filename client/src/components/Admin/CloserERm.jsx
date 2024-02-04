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


export function ClouserERm({ eventId, open, handleOpen }) {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/clouser`);
                const storesData = response.data.data;

                const storeDetails = await Promise.all(
                    storesData.map(async store => {
                        if (store.event_id === eventId) {
                            const storeResponse = await axios.get(`https://backend.qwiksavings.com/api/getStore/${store.sId}`);
                            const { logo_url, name } = storeResponse.data.store;
                            return { logo_url, name, sId: store.sId };
                        }
                        return null;
                    })
                );

                setStores(storeDetails.filter(Boolean)); // Filter out null values from the array
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [eventId]);

    const handleRemoveStore = async (store_id) => {
        if (store_id) {
            try {
                await axios.delete(
                    `https://backend.qwiksavings.com/api/admin/removePopularForEvent/${store_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        data: {
                            event_id: eventId
                        }
                    }
                );
                setStores(prevStores => prevStores.filter(store => store.sId !== store_id));
                alert("Store removed successfully");
            } catch (error) {
                console.error(error);
                alert("Unable to remove store!");
            }
        }
    };

    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="overflow-scroll h-[50rem] pb-[10rem]">
                            {stores.map(store => {
                                return (
                                    <div
                                        key={store.id}
                                        onClick={() => handleRemoveStore(store.sId)}
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
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
}


ClouserERm.propTypes = {
    eventId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};