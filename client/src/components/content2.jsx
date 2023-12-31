import img1 from '../assets/images/content2/1.png';
import img2 from '../assets/images/content2/2.jpg';

const Content2 = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:px-10 lg:py-20 bg-white">
            <div className="flex flex-col gap-5 items-center justify-center px-5">
                <img src={img1} alt="" className='h-[10rem] w-auto'/>
                <div className="text-2xl font-bold">
                    8,689+
                </div>
                <div className="text-2xl font-bold">
                    Codes added this week
                </div>
                <div className="text-base">
                    At CodeSpotr.com, we’ve secured the top codes and offers from leading brands across the USA, ensuring you get the best savings possible.
                </div>
            </div>

            <div className="flex flex-col gap-5 items-center justify-center px-5">
                <img src={img2} alt="" className='h-[10rem] w-auto'/>
                <div className="text-2xl font-bold">
                    Our Codes
                </div>
                <div className="text-base">
                    Our team of code experts meticulously test and verify each and every code, ensuring they deliver the savings you desire. We stand behind our codes with a guarantee.
                </div>
            </div>
        </div>
    )
}

export default Content2