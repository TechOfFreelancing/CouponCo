import gift from '../assets/images/alert/1.webp';
import { GrLinkNext } from 'react-icons/gr';
const Alert = () => {
    return (
        <div className='flex h-10 justify-center gap-2 lg:gap-5 items-center bg-purple-800 text-white text-[10px] lg:text-base w-screen z-30 group whitespace-nowrap'>
            <img src={gift} alt="gift" className='h-5 lg:h-10 w-auto' />
            <span>Sale-abrate the Holidays</span>
            <span className='hover:underline group-hover:underline flex gap-2 items-center '>Shop Deals Up to 65% Off <GrLinkNext style={{ color: "white" }}></GrLinkNext></span>

        </div>
    )
}

export default Alert
