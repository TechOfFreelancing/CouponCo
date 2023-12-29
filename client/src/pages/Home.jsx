
import { StackedImageAnimation } from "../components/StackedImageAnimation";
import About from "../components/about";
import Content from "../components/content";
import Content2 from "../components/content2";
import NewsLetter from "../components/newsletter";
import Stories from "../components/stories";
import Womanfashion from "../components/womanfashion";
import Carousel from "../components/Carousel3";


export default function Home() {
    return (
        <div className="bg-[#FAF9F5]">
            <div className="mt-20 lg:mt-32 md:w-[80vw] lg:w-[90vw] mx-auto flex flex-col lg:flex-row text-5xl items-center justify-center lg:pr-[5rem] px-5">
                <Carousel></Carousel>
                <StackedImageAnimation></StackedImageAnimation>
            </div>
            <Content></Content>
            <Stories></Stories>
            <Womanfashion></Womanfashion>
            <Content2></Content2>
            <About></About>
            <NewsLetter></NewsLetter>
        </div>
    )
}