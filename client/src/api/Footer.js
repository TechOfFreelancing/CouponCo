
import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt,FaPinterest,FaFacebook } from 'react-icons/fa';
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'



const SITEMAP = [
    {
        id: "1",
        title: "Useful Reads",
        links: [
            { text: "About QS", href: "/account", },
            { text: "Our Codes", href: "/account" },
            { text: "Savings Events", href: "" },
            { text: "Blog", href: "" },
            { text: "How it Works", href: "" },
            { text: "FAQ", href: "" },
            { text: "Submit a Coupon", href: "/submitcoupon" },

        ],
    },
    {
        id: "2",
        title: "Legal Menu",
        links: [
            { text: "Contact Us", href: "/account", },
            { text: "Partner With Us", href: "/account" },
            { text: "Privacy Policy", href: "" },
            { text: "Terms of Service", href: "" },
            { text: "Sitemap", href: "" },
        ],
    },
];

const ICONS = [
    {
        id: "1",
        icon: AiFillInstagram,
        link: ""
    },
    {
        id: "2",
        icon: BsTwitter,
        link: ""
    },
    {
        id: "3",
        icon: BsLinkedin,
        link: ""
    },
    {
        id: "4",
        icon: FaMobileAlt,
        link: ""
    },
    {
        id: "5",
        icon: BiSolidMap,
        link: ""
    },
    {
        id: "6",
        icon: FaPinterest,
        link: ""
    },
    {
        id: "7",
        icon: FaFacebook,
        link: ""
    },
]

export { SITEMAP, ICONS };