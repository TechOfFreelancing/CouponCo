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


export function ClouserRemove({ storeId, open, handleOpen }) {
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
                const response = await axios.get(`http://43.205.126.26:3000/api/clouser`);
                const storesData = response.data.data;
    
                const storeDetails = await Promise.all(
                    storesData.map(async store => {
                        if (store.store_type === displayOption) {
                            const storeResponse = await axios.get(`http://43.205.126.26:3000/api/getStore/${store.sId}`);
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
    
        if (displayOption) {
            fetchData();
        }
    }, [displayOption]);

    const handleRemoveStore = async (store_id) => {
        if (store_id) {
            try {
                await axios.delete(`http://43.205.126.26:3000/api/admin/removeClouser/${store_id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                });
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
                        <div className="mb-4">
                            {showRadioButtons && (
                                <>
                                    <Typography variant="h6">Select Display Option</Typography>
                                    <div>
                                        <Radio
                                            label="Delete from Similar Store"
                                            checked={displayOption === 'similar'}
                                            onChange={() => handleDisplayOptionChange('similar')}
                                        />
                                        <Radio
                                            label="Delete from Popular"
                                            checked={displayOption === 'popular'}
                                            onChange={() => handleDisplayOptionChange('popular')}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        {displayOption && (
                            <div className="overflow-scroll h-[50rem] pb-[10rem]">
                                {stores.map(store => {
                                    if (store.store_id !== storeId) {
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


ClouserRemove.propTypes = {
    storeId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};