import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Radio
} from "@material-tailwind/react";
import axios from "axios";
import PropTypes from 'prop-types';
import { useState } from "react";

export function ShowOnDisplay({ storeId, open, handleOpen }) {
    const [displayOption, setDisplayOption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [cashBack, setCashBack] = useState('');

    const handleDisplayOptionChange = (option) => {
        setDisplayOption(option);
    };

    const handleCashBackChange = (event) => {
        setCashBack(event.target.value);
    };

    const handleSubmit = async () => {
        if (displayOption === 'carousel') {
            const formdata = new FormData();
            try {
                if (selectedFile) {
                    formdata.append("thumbFile", selectedFile);
                }

                await axios.post(
                    `http://localhost:4000/api/admin/addToCarousel/${storeId}`,
                    formdata,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                alert("Store Added to carousel successfully");
                handleOpen();
            } catch (error) {
                alert(error.response.data.message);
                console.error(error);
            }
        }
        else if (displayOption === 'card') {
            const formdata = new FormData();
            try {
                if (selectedFile) {
                    formdata.append("thumbFile", selectedFile);
                }

                await axios.post(
                    `http://localhost:4000/api/admin/addToCard/${storeId}`,
                    formdata,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                alert("Store Added to card successfully");
                handleOpen();
            } catch (error) {
                alert(error.response.data.message);
                console.error(error);
            }
        }
        else {
            let data = JSON.stringify({
                "cashBack": cashBack
            });
            try {
                await axios.post(
                    `http://localhost:4000/api/admin/addToCashBack/${storeId}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                );
                alert("Store Added to CashBack Category successfully");
                handleOpen();
            } catch (error) {
                alert(error.response.data.message);
                console.error(error);
            }

        }
    };

    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <div className="mb-4">
                            <Typography variant="h6">Select Display Option</Typography>
                            <div>
                                <Radio
                                    label="Show on Carousel"
                                    checked={displayOption === 'carousel'}
                                    onChange={() => handleDisplayOptionChange('carousel')}
                                />
                                <Radio
                                    label="Show on Card Flip"
                                    checked={displayOption === 'card'}
                                    onChange={() => handleDisplayOptionChange('card')}
                                />
                                <Radio
                                    label="Show on CashBack Category"
                                    checked={displayOption === 'cashback'}
                                    onChange={() => handleDisplayOptionChange('cashback')}
                                />
                            </div>
                        </div>
                        {displayOption !== '' && (
                            <div className="mb-4">
                                {displayOption === 'carousel' || displayOption === 'card' ? (
                                    <input
                                        type="file"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid black',
                                            borderRadius: '0.375rem',
                                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                            outline: 'none'
                                        }}
                                        onChange={(e) => { setSelectedFile(e.target.files[0]) }}
                                    />
                                ) : (
                                    <>
                                        <Typography variant="h6">Enter Cash Back Value (%)</Typography>
                                        <input
                                            type="number"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid black',
                                                borderRadius: '0.375rem',
                                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                                outline: 'none'
                                            }}
                                            value={cashBack}
                                            onChange={handleCashBackChange}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleSubmit} fullWidth>
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}

ShowOnDisplay.propTypes = {
    storeId: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    handleOpen: PropTypes.func.isRequired,
};