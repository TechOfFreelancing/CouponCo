import { useState, useEffect } from 'react';

function Loader() {
    const [showText, setShowText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        const text = 'Weelcome to my website';
        let index = 0;

        const intervalId = setInterval(() => {
            setShowText((prevText) => prevText + (text[index] || ' '));
            index += 1;

            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, 200);

        // Toggle cursor visibility every 500 milliseconds
        const cursorIntervalId = setInterval(() => {
            setCursorVisible((prevCursorVisible) => !prevCursorVisible);
        }, 500);

        return () => {
            clearInterval(intervalId);
            clearInterval(cursorIntervalId);
        };
    }, []);

    return (
        <div className='h-screen w-screen flex items-center justify-center text-2xl lg:text-5xl overflow-hidden bg-black'>
            <span className='text-red-500 select-none loader'>
                {showText}
                {cursorVisible && <span className='animate-pulse'>|</span>}
            </span>
        </div>
    );
}

export default Loader;
