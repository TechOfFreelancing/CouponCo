
import Carousel2 from "../components/Carousel2";
import Slider from "../components/Slider";
import { StackedImageAnimation } from "../components/StackedImageAnimation";
import About from "../components/about";
import Categories from "../components/categories";
import Content from "../components/content";
import Content2 from "../components/content2";
import NewsLetter from "../components/newsletter";
import Stories from "../components/stories";
import Womanfashion from "../components/womanfashion";


export default function Home() {
    return (
        <div>
            <div className="mt-20 lg:mt-32 w-screen flex flex-col lg:flex-row text-5xl items-center justify-center lg:pr-[10rem]">
                <Carousel2></Carousel2>
                <StackedImageAnimation></StackedImageAnimation>
            </div>
            <Content></Content>
            <Stories></Stories>
            <Womanfashion></Womanfashion>
            <Categories></Categories>
            <Content2></Content2>
            <About></About>
            <Slider></Slider>
            <NewsLetter></NewsLetter>
        </div>
    )
}