import { StackedImageAnimation } from "../components/StackedImageAnimation";
import CarouselSlider from "../components/carousel";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
    return (
        <div className="h-full pt-5 w-[100vw] flex items-center  text-5xl bg-black justify-center gap-5">
            <CarouselSlider></CarouselSlider>
            <ChakraProvider>
                <StackedImageAnimation></StackedImageAnimation>
            </ChakraProvider>

        </div>
    )
}