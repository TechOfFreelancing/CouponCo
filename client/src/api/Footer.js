
import { BiSolidMap } from 'react-icons/bi';
import { FaMobileAlt, FaPinterest, FaFacebook } from 'react-icons/fa';
import { BsTwitter, BsLinkedin } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'



const SITEMAP = [
    {
        id: "1",
        title: "Useful Reads",
        links: [
            { text: "About QS", href: "/aboutus", },
            { text: "Our Codes", href: "/ourcodes" },
            { text: "Savings Events", href: "/savingevents" },
            { text: "Blog", href: "/blogs" },
            { text: "How it Works", href: "/howitworks" },
            { text: "FAQ", href: "/faqs" },
            { text: "Submit a Coupon", href: "/submitcoupon" },

        ],
    },
    {
        id: "2",
        title: "Legal",
        links: [
            { text: "Contact Us", href: "/contactus" },
            { text: "Advertise With Us", href: "/advertisewithus" },
            { text: "Privacy Policy", href: "/privacypolicy" },
            { text: "Terms of Service", href: "/termofservices" },
            { text: "Sitemap", href: "/aboutus" },
        ],
    },
];



export { SITEMAP };