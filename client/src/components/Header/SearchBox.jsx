import { useState, useRef, useEffect } from 'react';
import Categories from "../../api/categories";
import Events from '../../api/event';
import { ImSearch } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const userInput = e.target.value;
        // console.log(userInput)
        setKeyword(userInput);

        // Call a function to get search suggestions based on userInput
        const newSuggestions = getSearchSuggestions(userInput);
        setSuggestions(newSuggestions);
        // console.log(suggestions);
    };

    const getSearchSuggestions = (userInput) => {

        // If the user is searching for events or categories, include all events in suggestions & Filter suggestions based on the user input
        const categorySuggestions = userInput.toLowerCase().includes('categories') || userInput.toLowerCase().includes('category') ? Categories : Categories.filter((ele) =>
            ele.name.toLowerCase().includes(userInput.toLowerCase())
        )
        const eventSuggestions = userInput.toLowerCase().includes('events') || userInput.toLowerCase().includes('event') ? Events : Events.filter((ele) =>
            ele.title.toLowerCase().includes(userInput.toLowerCase())
        )

        return {
            categories: categorySuggestions,
            events: eventSuggestions,
        };
    };

    const handleKeyPress = (e) => {
        // For example, you might want to trigger the search on Enter key
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        console.log('Searching for:', keyword);
        setSuggestions([]);
        setKeyword("");
        //function for category icon
        const selectedCategory = Categories.find((category) =>
            category.name.toLowerCase() === keyword.toLowerCase()
        );

        // Check if the selected keyword is from the Categories & event
        const isCategory = Categories.some((category) => category.name.toLowerCase() === keyword.toLowerCase());
        const isEvent = Events.some((event) => event.title.toLowerCase() === keyword.toLowerCase());

        // Navigate details page with state & keyword
        if (isCategory) navigate("/categoriesdetails", { state: { category: keyword, category_icon: selectedCategory.icon } });
        if (isEvent) navigate("/eventdetails");
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
                    {suggestions.categories.length > 0 && (
                        <>
                            <span className='font-semibold'>
                                Categories
                            </span>
                            <ul className="autocomplete-suggestions flex flex-col gap-2">
                                {suggestions.categories.map((item, index) => (
                                    <li key={index} onClick={() => setKeyword(item.name)} className='border-b cursor-pointer'>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {suggestions.events.length > 0 && (
                        <>
                            <span className='font-semibold'>
                                Events
                            </span>
                            <ul className="autocomplete-suggestions flex flex-col gap-2">
                                {suggestions.events.map((item, index) => (
                                    <li key={index} onClick={() => setKeyword(item.title)} className='border-b cursor-pointer'>
                                        {item.title}
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
