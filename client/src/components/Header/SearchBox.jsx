import { useState, useRef, useEffect } from 'react';
import { ImSearch } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [store, setStore] = useState([]);
    const [Categories,setCategories] = useState([]);
    const [Events,setEvents] = useState([]);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const userInput = e.target.value;
        setKeyword(userInput);
        const newSuggestions = getSearchSuggestions(userInput);
        setSuggestions(newSuggestions);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend.qwiksavings.com/api/getAllStore`);
                const categories = await axios.get(`https://backend.qwiksavings.com/api/getCategories`);
                const events = await axios.get(`https://backend.qwiksavings.com/api/getAllEvents`);
                setStore(response.data.stores);
                setCategories(categories.data.categories);
                setEvents(events.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // console.log(Events);
    const getSearchSuggestions = (userInput) => {
        const categorySuggestions = userInput.toLowerCase().includes('categories') || userInput.toLowerCase().includes('category') ? Categories : Categories.filter((ele) =>
            ele.name.toLowerCase().includes(userInput.toLowerCase())
        );
        const eventSuggestions = userInput.toLowerCase().includes('events') || userInput.toLowerCase().includes('event') ? Events : Events.filter((ele) =>
            ele.event_name.toLowerCase().includes(userInput.toLowerCase())
        );
        const storeSuggestions = userInput.toLowerCase().includes('stores') || userInput.toLowerCase().includes('store') ? store : store.filter(store =>
            store.name.toLowerCase().includes(userInput.toLowerCase())
        );

        return {
            categories: categorySuggestions,
            events: eventSuggestions,
            stores: storeSuggestions,
        };
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        console.log('Searching for:', keyword);
        setSuggestions([]);
        setKeyword("");

        // Find the selected store
        const selectedStore = suggestions.stores.find((store) =>
            store.name.toLowerCase() === keyword.toLowerCase()
        );

        // Check if the selected keyword is from Categories, Events, or Stores
        const isCategory = Categories.some((category) => category.name.toLowerCase() === keyword.toLowerCase());
        const isEvent = Events.some((event) => event.event_name.toLowerCase() === keyword.toLowerCase());
        const isStore = store.some((store) => store.name.toLowerCase() === keyword.toLowerCase());


        // Navigate details page with state & keyword
        if (isCategory) navigate("/categoriesdetails", { state: { category: keyword, category_icon: selectedCategory.icon } });
        if (isEvent) navigate("/eventdetails");
        if (isStore) navigate("/Stores");
    };

    useEffect(() => {
        // Add event listener to document for clicks outside the search bar
        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col relative bg-white w-[200px] h-[43px] lg:h-[48px] lg:w-[309px] border-red-700 border-solid border-2 rounded-full' ref={searchContainerRef}>
            <div className="searchbar flex p-2 lg:p-3 justify-between text-xs lg:text-lg">
                <input
                    type="search"
                    placeholder="Search for brands, categories"
                    className="outline-none bg-transparent text-black w-full lg:-mt-1"
                    value={keyword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <button className="searchIcon text-red-900 cursor-pointer" onClick={() => handleSearch()}>
                    <ImSearch className="h-6 w-6 hover:scale-110 duration-300" />
                </button>
            </div>
            {Object.keys(suggestions).length > 0 && (
                <div className='bg-white absolute top-10 left-0 w-[200px] lg:w-[309px] rounded-xl min-h-min max-h-[250px] lg:max-h-[272px] overflow-scroll -z-10 p-5 flex flex-col gap-3'>
                    {suggestions.categories?.length > 0 && (
                        <>
                            <span className='font-semibold'>
                                Categories
                            </span>
                            <ul className="autocomplete-suggestions flex flex-col gap-2">
                                {suggestions.categories.map((item, index) => (
                                    <li key={index} onClick={() => {
                                        setKeyword(item.name);
                                        setSuggestions([]);
                                        navigate("/categoriesdetails", { state: { category: item.name, category_icon: item.logo_url } })
                                    }} className='border-b cursor-pointer'>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {suggestions.events?.length > 0 && (
                        <>
                            <span className='font-semibold'>
                                Events
                            </span>
                            <ul className="autocomplete-suggestions flex flex-col gap-2">
                                {suggestions.events.map((item, index) => (
                                    <li key={index} onClick={() => {
                                        setKeyword(item.event_name);
                                        setSuggestions([]);
                                        navigate("/eventdetails", { state: { event: item.event_name } })
                                    }} className='border-b cursor-pointer'>
                                        {item.event_name}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {suggestions.stores?.length > 0 && (
                        <>
                            <span className='font-semibold'>
                                Stores
                            </span>
                            <ul className="autocomplete-suggestions flex flex-col gap-2">
                                {suggestions.stores.map((store, index) => (
                                    <li key={index} onClick={() => {
                                        setKeyword(store.name);
                                        setSuggestions([]);
                                        navigate(
                                            `/Stores/${store.name}`, { state: { sId: store.id } }
                                        )
                                    }} className='border-b cursor-pointer'>
                                        {store.name}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}

        </div>
    );
};

export default SearchBar;
