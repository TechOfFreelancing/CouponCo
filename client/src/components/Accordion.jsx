import { FaArrowDown } from "react-icons/fa";

const Accordion = ({ q, a }) => {
    return (
        <div className="w-[77.5rem] border-b-2 py-10">
            <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <li className="font-semibold text-2xl"> {q}</li>
                    <span className="transition group-open:rotate-180 text-2xl font-light">
                        <FaArrowDown></FaArrowDown>
                    </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-5 text-neutral-600">{a}
                </p>
            </details>
        </div>
    )
}



export default Accordion;