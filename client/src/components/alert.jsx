import { useEffect, useState } from 'react';
import gift from '../assets/images/alert/1.webp';
import { GrLinkNext } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Alert = () => {

    const [details, setDetails] = useState({
        "festival_name": "",
        "discount": ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`process.env.URL/api/festStoreDisplay`);
                if (res.data && res.data.data) {
                    const festivalDetails = res.data.data.find(item => item.storeId === null);
                    if (festivalDetails) {
                        setDetails({
                            "festival_name": festivalDetails.festival_name,
                            "discount": festivalDetails.discount
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching festival details:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex h-10 justify-center gap-2 lg:gap-5 items-center bg-black text-white text-[10px] lg:text-base w-screen z-30 group whitespace-nowrap'>
            <img src={gift} alt="gift" className='h-5 lg:h-10 w-auto' />
            <span>Celebrate the {details.festival_name}</span>
            <span
                className='hover:underline group-hover:underline flex gap-2 items-center'
                onClick={() => navigate('/Stores', { state: { isFestival: true } })}
            >
                <div className="flex items-center cursor-pointer">
                    Shop Deals Up to {details.discount}% Off <GrLinkNext style={{ color: 'white' }} />
                </div>
            </span>
        </div>
    )
}

export default Alert
