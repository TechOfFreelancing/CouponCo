
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
            { text: "Savings Events", href: "https://looknbookart.com/pages/faq" },
            { text: "Blog", href: "https://looknbookart.com/pages/faq" },
            { text: "How it Works", href: "https://looknbookart.com/pages/faq" },
            { text: "FAQ", href: "https://looknbookart.com/pages/faq" },
            { text: "Submit a Coupon", href: "/submitcoupon" },

        ],
    },
    {
        id: "2",
        title: "On Legal Menu",
        links: [
            { text: "Contact Us", href: "/account", },
            { text: "Partner With Us", href: "/account" },
            { text: "Privacy Policy", href: "https://looknbookart.com/pages/faq" },
            { text: "Terms of Service", href: "https://looknbookart.com/pages/faq" },
            { text: "Sitemap", href: "https://looknbookart.com/pages/faq" },
        ],
    },
];

const ICONS = [
    {
        id: "1",
        icon: AiFillInstagram,
        link: "https://www.instagram.com/codespotr/"
    },
    {
        id: "2",
        icon: BsTwitter,
        link: "https://twitter.com/CodeSpotr"
    },
    {
        id: "3",
        icon: BsLinkedin,
        link: "https://www.linkedin.com/company/codespotr/"
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
        link: "https://www.pinterest.com/codespotr/"
    },
    {
        id: "7",
        icon: FaFacebook,
        link: "https://www.facebook.com/profile.php?id=100089116364410"
    },
]

export { SITEMAP, ICONS };