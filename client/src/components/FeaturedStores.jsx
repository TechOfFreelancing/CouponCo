import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Featured_Stores = () => {

    const [featured, setFeatured] = useState([]);
    const [images, setImages] = useState([]);
    const [count, setCount] = useState([]);




    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/storeDisplay`);
                if (response.data && response.data.data) {
                    const filteredStores = response.data.data.filter(store => store.show_in_fetured === 1);
                    setCount(filteredStores);

                    const storeDetails = await Promise.all(filteredStores.map(async store => {
                        try {
                            const storeDetailsResponse = await axios.get(`https://backend.qwiksavings.com/api/getStore/${store.store_id}`);
                            // console.log(storeDetailsResponse);
                            return {
                                name: storeDetailsResponse.data.store.name || null, // Add the name attribute
                                storeId: store.store_id,
                                logoUrl: storeDetailsResponse.data.store.logo_url || null,  
                                coupons:storeDetailsResponse.data.store.coupons
                            };
                        } catch (error) {
                            console.error('Error fetching store details:', error);
                            return null;
                        }
                    }));

                    setFeatured(storeDetails); // Update state with the modified data
                    console.log(featured);
                    const logoUrls = storeDetails.map(detail => detail.logoUrl); // Extract logoUrls
                    setImages(logoUrls);
                }
            } catch (error) {
                console.error('Error fetching card stores:', error);
            }
        };

        fetchStores();
    }, []);

    const navigate = useNavigate();

    // console.log(featured);


    return (
        <div className="h-fit max-h-[100vh] bg-[#FAF9F6] py-5">
            <div className="flex items-center justify-between h-[5rem]">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">Featured Stores</span>
                </div>
                <Link to="/allstores" className="hover:underline h-7 duration-300">
                    All Stores
                </Link>
            </div>
            <div className="flex gap-5 lg:grid lg:grid-cols-8 lg:overflow-hidden overflow-auto overflow-y-hidden scroll-snap-type-x mandatory scrollbar-hide">
                {featured.slice(0, 8).map((ele, index) => (
                    <div key={index} className={`flex flex-col gap-2 h-[10rem] lg:h-[15rem] cursor-pointer group items-center justify-center hover:scale-105 duration-300 hover:z-${index * 10} item flex-shrink-0 scroll-snap-align-start`}>
                        <div
                            className="h-[5rem] w-[5rem] lg:h-[9rem] lg:w-[9rem] rounded-full p-1 lg:p-3 bg-white hover:shadow-boxshadow">
                            <img
                                src={images[index]}
                                alt={`Logo ${index}`}
                                className="h-full w-auto object-cover rounded-full shadow-boxshadow"
                                onClick={() => {
                                    navigate(`/Stores/${ele.name}`, { state: { sId: ele.storeId } });
                                }} />
                        </div>
                        <div className="hover:underline text-center group-hover:underline">
                            <span className="flex justify-center gap-2 items-center ">
                                <span>{ele.coupons}</span>
                                <span>coupons</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Featured_Stores;
