import { content2 } from '../api/content2';

const Content2 = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between mb-10 h-[2rem]">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <span className="font-semibold text-lg lg:text-3xl">How to use Qwik Savings</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-stretch gap-5">
                {
                    content2.map((ele, index) => <div key={index} className="bg-[#FAF9F5] rounded-lg flex flex-col gap-5 items-center justify-center px-5 h-[420px] shadow-boxshadow" >
                        <img src={ele.img} alt="" className='h-1/2 w-auto' />
                        <div className="h-1/8 text-2xl font-bold">
                            {ele.id}. {ele.text}
                        </div>
                        <div className="h-1/8 text-center">
                            {ele.content}
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

export default Content2