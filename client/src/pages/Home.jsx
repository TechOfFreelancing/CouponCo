import { StackedImageAnimation } from "../components/StackedImageAnimation";
import CarouselSlider from "../components/carousel";
import Content from "../components/content";
import Stories from "../components/stories";


export default function Home() {
    return (
        <div>
            <div className="mt-20 lg:mt-28 w-screen flex flex-col lg:flex-row text-5xl items-center justify-center gap-5">
                <CarouselSlider></CarouselSlider>
                <StackedImageAnimation></StackedImageAnimation>
            </div>
            <Content></Content>
            <Stories></Stories>
        </div>
    )
}