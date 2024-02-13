
import { StackedImageAnimation } from "../components/StackedImageAnimation";
import About from "../components/about";
import Content from "../components/content";
import Footer from "../components/Footer";
import Featured_Stores from "../components/FeaturedStores";
import Carousel from "../components/Carousel3";
import CategoriesbasedCoupons from "../components/CategoriesbasedCoupons";


export default function Home() {
    return (
        <>
            <div className="border-b-[1px] border-b-[#B33D53]">
                <div className="bg-[#FAF9F5] px-5 max-w-[1280px] mx-auto mt-28 lg:mt-36 lg:mb-4  flex flex-col lg:flex-row gap-5 text-5xl items-center justify-center">

                    <Carousel></Carousel>
                    <StackedImageAnimation></StackedImageAnimation>

                </div>
                <div className="bg-white px-5">
                    <Content></Content>
                </div>
                <div className="px-5 bg-white">
                    <Featured_Stores></Featured_Stores>
                </div>
                <CategoriesbasedCoupons></CategoriesbasedCoupons>

                <div className="bg-white px-5">
                    <About></About>
                </div>

            </div>
            <Footer></Footer>
        </>
    )
}