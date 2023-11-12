import { StackedImageAnimation } from "../components/StackedImageAnimation";
import About from "../components/about";
import CarouselSlider from "../components/carousel";
import Categories from "../components/categories";
import Content from "../components/content";
import Content2 from "../components/content2";
import NewsLetter from "../components/newsletter";
import Stories from "../components/stories";
import Womanfashion from "../components/womanfashion";


export default function Home() {
    return (
        <div>
            <div className="mt-20 lg:mt-28 w-screen flex flex-col lg:flex-row text-5xl items-center justify-center gap-5">
                <CarouselSlider></CarouselSlider>
                <StackedImageAnimation></StackedImageAnimation>
            </div>
            <Content></Content>
            <Stories></Stories>
            <Womanfashion></Womanfashion>
            <Categories></Categories>
            <Content2></Content2>
            <About></About>
            <NewsLetter></NewsLetter>
        </div>
    )
}