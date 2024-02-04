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


export function Clouser({ storeId, open, handleOpen }) {

    const [displayOption, setDisplayOption] = useState('');
    const [stores, setStores] = useState([]);
    const [showRadioButtons, setShowRadioButtons] = useState(true);

    const handleDisplayOptionChange = (option) => {
        setDisplayOption(option);
        setShowRadioButtons(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all stores
                const responseStores = await axios.get(`https://backend.qwiksavings.com/api/getAllStore`);
                const allStores = responseStores.data.stores;

                // Fetch closure data
                const responseClosure = await axios.get('https://backend.qwiksavings.com/api/clouser');
                const storesData = responseClosure.data.data;

                // Filter out similar and popular store ids
                const similarStoreIds = storesData
                    .filter(store => store.store_type === 'similar')
                    .map(store => store.sId);
                const popularStoreIds = storesData
                    .filter(store => store.store_type === 'popular')
                    .map(store => store.sId);

                // Filter out similar and popular stores from the main list
                const filteredStores = allStores.filter(store => !similarStoreIds.includes(store.id) && !popularStoreIds.includes(store.id));
                console.log(filteredStores)

                // Filter out stores that are already associated with the opened store
                const associatedStoreIds = storesData
                    .filter(store => store.store_id === storeId)
                    .map(store => store.sId);

                console.log(associatedStoreIds)

                const finalFilteredStores = filteredStores.filter(store => !associatedStoreIds.includes(store.id));

                console.log(finalFilteredStores)

                // Set the updated stores in state
                setStores(finalFilteredStores);
            } catch (error) {
                console.error(error);
            }
        };

        if (displayOption) {
            fetchData();
        }
    }, [displayOption]);

    const handleStoreClick = async (clickedStoreId) => {
        if (displayOption && clickedStoreId) {
            try {
                const res = await axios.post(`https://backend.qwiksavings.com/api/admin/addClouser/${storeId}`, {
                    storeType: displayOption,
                    storeid: clickedStoreId,
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
        }
    };
    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="mb-4">
                            {showRadioButtons && (
                                <>
                                    <Typography variant="h6">Select Display Option</Typography>
                                    <div>
                                        <Radio
                                            label="Show on Similar Store"
                                            checked={displayOption === 'similar'}
                                            onChange={() => handleDisplayOptionChange('similar')}
                                        />
                                        <Radio
                                            label="Show on Popular"
                                            checked={displayOption === 'popular'}
                                            onChange={() => handleDisplayOptionChange('popular')}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        {displayOption && (
                            <div className="overflow-scroll h-[50rem] pb-[10rem]">
                                {stores?.map(store => {
                                    if (store.id !== storeId) {
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
                                    }
                                    return null;
                                })}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
}

Clouser.propTypes = {
    storeId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};