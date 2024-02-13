import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Navlist = () => {

    const [stores, setStores] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [event, setEvent] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://backend.qwiksavings.com/api/getAllEvents`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setEvent(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchStores = async () => {
            const response = await axios.get(`https://backend.qwiksavings.com/api/getAllStore`);
            if (response) {
                setStores(response.data.stores);
            }
            else {
                console.log("unable to fetch data");
            }
        }
        fetchStores();
    }, []);


    useEffect(() => {
        const fetchData = () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://backend.qwiksavings.com/api/getCategories`,
                headers: {}
            };

            axios.request(config)
                .then((response) => {
                    setCategories(response.data.categories);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        fetchData();
    }, [])

    return (
        <ul className="py-5  mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-black">
            <span className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/all-stores" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2 whitespace-nowrap">
                    Stores
                </Link>
                <div className="hidden lg:block absolute top-0 lg:-left-[27rem] xl:-left-[23.8rem] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[100vw] transform max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {
                            stores.map((ele, index) => {
                                return <div key={index} onClick={() => navigate(`/Stores/${ele.name}`, { state: { sId: ele.id } })} className="cursor-pointer hover:-translate-y-1 duration-300 hover:text-red-500 hover:underline">{ele.name}</div>
                            })
                        }
                    </div>
                </div>
            </span>
            <span className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/all-categories" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2 whitespace-nowrap">
                    Categories
                </Link>
                <div className="hidden lg:block absolute top-0 lg:-left-[33rem] xl:-left-[29.3rem] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[100vw] transform max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {
                            Categories.map((ele, index) => {
                                return <div key={index} className="cursor-pointer hover:-translate-y-1 duration-300 hover:text-red-500 hover:underline" onClick={() => {
                                    navigate("/categoriesdetails", { state: { category: ele.name, category_icon: ele.logo_url } })
                                }}>{ele.name}</div>
                            })
                        }
                    </div>
                </div>
            </span>
            <span className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/our-codes" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-b-2 hover:lg:border-red-500 whitespace-nowrap">
                    Our Codes
                </Link>
            </span>
            <span className="p-1 font-normal font-[Poppins] relative group"
            >
                <Link to="/events" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2 whitespace-nowrap">
                    Events
                </Link>
                <div className="hidden lg:block absolute top-0 lg:-left-[30rem] xl:-left-[44.3rem] transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 w-[100vw] transform max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {
                            event.map((ele, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer hover:-translate-y-1 duration-300 hover:text-red-500 hover:underline"
                                    onClick={() => navigate("/eventdetails", { state: { eId: ele.id, event: ele.event_name } })}
                                >
                                    {ele.event_name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </span>
            <span className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/blogs" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2">
                    Blog
                </Link>
            </span>
        </ul>
    )
}

export default Navlist
