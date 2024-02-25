import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const Navlist = () => {

    const [stores, setStores] = useState([]);
    const [Categories, setCategories] = useState([]);
    const [event, setEvent] = useState([]);
    const [isStoresDropdownOpen, setIsStoresDropdownOpen] = useState(false);
    const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
    const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

    const toggleStoresDropdown = () => {
        setIsStoresDropdownOpen(!isStoresDropdownOpen);
    };

    const toggleEventsDropdown = () => {
        setIsEventsDropdownOpen(!isEventsDropdownOpen);
    };

    const toggleCategoriesDropdown = () => {
        setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
    };

    const closeDropdowns = () => {
        setIsStoresDropdownOpen(false);
        setIsEventsDropdownOpen(false);
        setIsCategoriesDropdownOpen(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/getAllEvents`);
                if (response && response.data && response.data.data) {
                    // Extracting unique events starting with different alphabets
                    const uniqueEvents = response.data.data.reduce((acc, current) => {
                        const firstLetter = current.event_name.charAt(0).toUpperCase();
                        if (!acc[firstLetter]) {
                            acc[firstLetter] = current;
                        }
                        return acc;
                    }, {});
                    // Sorting unique events alphabetically
                    const sortedUniqueEvents = Object.values(uniqueEvents).sort((a, b) => a.event_name.localeCompare(b.event_name));
                    setEvents(sortedUniqueEvents);
                } else {
                    console.log("unable to fetch data");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/getAllStore`);
                if (response && response.data && response.data.stores) {
                    // Extracting unique stores starting with different alphabets
                    const uniqueStores = response.data.stores.reduce((acc, current) => {
                        const firstLetter = current.name.charAt(0).toUpperCase();
                        if (!acc[firstLetter]) {
                            acc[firstLetter] = current;
                        }
                        return acc;
                    }, {});
                    // Sorting unique stores alphabetically
                    const sortedUniqueStores = Object.values(uniqueStores).sort((a, b) => a.name.localeCompare(b.name));
                    setStores(sortedUniqueStores);
                } else {
                    console.log("unable to fetch data");
                }
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        };
        fetchStores();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/getCategories`);
                if (response && response.data && response.data.categories) {
                    // Extracting unique categories starting with different alphabets
                    const uniqueCategories = response.data.categories.reduce((acc, current) => {
                        const firstLetter = current.name.charAt(0).toUpperCase();
                        if (!acc[firstLetter]) {
                            acc[firstLetter] = current;
                        }
                        return acc;
                    }, {});
                    // Sorting unique categories alphabetically
                    const sortedUniqueCategories = Object.values(uniqueCategories).sort((a, b) => a.name.localeCompare(b.name));
                    setCategories(sortedUniqueCategories);
                } else {
                    console.log("unable to fetch data");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <ul className="py-5  mb-4 flex flex-col gap-2 lg:mb-0 lg:flex-row lg:items-center lg:gap-6 text-black">
            <span
                className="p-1 font-normal font-[Poppins] relative group"
                onMouseEnter={toggleStoresDropdown}
                onMouseLeave={closeDropdowns}
            >
                <Link to="/all-stores" onClick={closeDropdowns} className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2 whitespace-nowrap">
                    Stores
                </Link>
                <div className={`lg:block absolute top-0 lg:-left-[19.8rem] transition ${isStoresDropdownOpen ? 'opacity-100 visible translate-y-5' : 'opacity-0 invisible translate-y-5'} duration-500 ease-in-out transform z-50 w-[100vw] max-w-[1280px] mx-auto`} onClick={closeDropdowns}>
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {stores.map((ele, index) => (
                            <div key={index} onClick={() => navigate(`/Stores/${ele.name}`, { state: { sId: ele.id } })} className="cursor-pointer hover:-translate-y-1 duration-300 hover:text-red-500 hover:underline">{ele.name}</div>
                        ))}
                    </div>
                </div>
            </span>
            <span
                className="p-1 font-normal font-[Poppins] relative group"
                onMouseEnter={toggleCategoriesDropdown}
                onMouseLeave={closeDropdowns}
            >
                <Link to="/all-categories" onClick={closeDropdowns} className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2 whitespace-nowrap">
                    Categories
                </Link>
                <div className={`lg:block absolute top-0  lg:-left-[25.3rem] transition ${isCategoriesDropdownOpen ? 'opacity-100 visible translate-y-5' : 'opacity-0 invisible translate-y-5'} duration-500 ease-in-out transform z-50 w-[100vw] max-w-[1280px] mx-auto`} onClick={closeDropdowns}>
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {Categories.map((ele, index) => (
                            <div key={index} onClick={() => navigate("/categoriesdetails", { state: { category: ele.name, category_icon: ele.logo_url } })} className="cursor-pointer hover:-translate-y-1 duration-300 hover:text-red-500 hover:underline">{ele.name}</div>
                        ))}
                    </div>
                </div>
            </span>
            <span className="p-1 font-normal font-[Poppins]"
            >
                <Link to="/our-codes" className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-b-2 hover:lg:border-red-500 whitespace-nowrap">
                    Our Codes
                </Link>
            </span>
            <span
                className="p-1 font-normal font-[Poppins] relative group"
                onMouseEnter={toggleEventsDropdown}
                onMouseLeave={closeDropdowns}
            >
                <Link to="/events" onClick={closeDropdowns} className="flex items-center hover:-translate-y-1 duration-300 hover:text-red-500 hover:lg:border-red-500 hover:lg:border-b-2 whitespace-nowrap">
                    Events
                </Link>
                <div className={`lg:block absolute top-0 lg:-left-[40.3rem] transition ${isEventsDropdownOpen ? 'opacity-100 visible translate-y-5' : 'opacity-0 invisible translate-y-5'} duration-500 ease-in-out transform z-50 w-[100vw] max-w-[1280px] mx-auto`} onClick={closeDropdowns}>
                    <div className="grid grid-cols-5 px-20 gap-5 relative top-6 p-6 bg-white rounded-xl shadow-xl w-full">
                        {event.map((ele, index) => (
                            <div key={index} onClick={() => navigate("/eventdetails", { state: { eId: ele.id, event: ele.event_name } })} className="cursor-pointer hover:-translate-y-1 duration-300 hover:text-red-500 hover:underline">{ele.event_name}</div>
                        ))}
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
