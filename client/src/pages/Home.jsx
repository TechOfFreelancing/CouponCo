
import { StackedImageAnimation } from "../components/StackedImageAnimation";
import About from "../components/about";
import Content from "../components/content";
import Footer from "../components/Footer";
import Featured_Stores from "../components/FeaturedStores";
// import Womanfashion from "../components/womanfashion";
import Carousel from "../components/Carousel3";
import CategoriesbasedCoupons from "../components/CategoriesbasedCoupons";


export default function Home() {
    return (
        <>
            <div className="border-b-[1px] border-b-[#B33D53]">
                <div className="bg-[#FAF9F5] px-5 lg:px-28 mt-28 lg:mt-36 lg:mb-4  mx-auto flex flex-col lg:flex-row gap-5 text-5xl items-center justify-center">

                    <Carousel></Carousel>
                    <StackedImageAnimation></StackedImageAnimation>

                </div>
                <div className="bg-white px-5 lg:px-28">
                    <Content></Content>
                </div>
                <div className="px-5 lg:px-28">
                    <Featured_Stores></Featured_Stores>
                </div>
                {/* <Womanfashion></Womanfashion> */}
                <CategoriesbasedCoupons></CategoriesbasedCoupons>

                <div className="bg-white px-5 lg:px-28">
                    <About></About>
                </div>

            </div>
            <Footer></Footer>
        </>
    )
}