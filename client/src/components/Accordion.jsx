import { FaArrowDown } from "react-icons/fa";

const Accordion = ({ q, a }) => {
    return (
        <div className="w-[308px] lg:w-[77.5rem] border py-5 lg:py-10 bg-white p-5">
            <details className="group w-full">
                <summary className="cursor-pointer list-none items-center gap-5 justify-between font-medium flex">
                    <li className="font-semibold text-lg lg:text-2xl"> {q}</li>
                    <span className="transition group-open:rotate-180 text-2xl font-light">
                        <FaArrowDown></FaArrowDown>
                    </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-5 text-neutral-600 text-justify">{a}
                </p>
            </details>
        </div>
    )
}



export default Accordion;