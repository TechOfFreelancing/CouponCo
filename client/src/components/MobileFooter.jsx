import { SITEMAP, ICONS } from "../api/Footer";
import { Typography } from "@material-tailwind/react";

import { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${id === open ? "rotate-180" : ""
                } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}
export default function MobileFooter() {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <div className="md:hidden mx-5 mb-[100px]">
            {
                SITEMAP.map((element) => {
                    return (
                        <Accordion open={open === element.id} icon={<Icon id={element.id} open={open} />} key={element.id}>
                            <AccordionHeader onClick={() => handleOpen(element.id)} className="text-black text-base">
                                {element.title}
                            </AccordionHeader>

                            <AccordionBody>
                                <ul className="space-y-1 text-gray-300">
                                    {element.links.map(({ text, icon: Icon, href, inputPlaceholder, buttonText }, index) => (
                                        <Typography
                                            key={index}
                                            as="li"

                                            className="font-normal"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                lineHeight: '26px',
                                                color: '#404040',
                                            }}
                                        >
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="flex gap-5 items-center justify-center py-1 pr-2 text-gray-500 transition-transform hover:scale-105 hover:text-black dark:hover:text-black"
                                                >
                                                    {Icon && <Icon />}
                                                    {text}
                                                </a>
                                            ) : (
                                                <div className="flex items-center ">
                                                    {Icon && <Icon />}
                                                    <div>
                                                        <div className="mb-1">{text}</div>
                                                        {inputPlaceholder && (
                                                            <div className="ml-auto flex">
                                                                <input
                                                                    type="email"
                                                                    placeholder={inputPlaceholder}
                                                                    className="mx-2"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="bg-pink-500 text-white px-4 py-1 rounded-r hover:bg-pink-600 focus:outline-none"
                                                                >
                                                                    {buttonText}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </Typography>
                                    ))}
                                </ul>
                            </AccordionBody>
                        </Accordion>
                    )
                })
            }

        </div>
    );
}
