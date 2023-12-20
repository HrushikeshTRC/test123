import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import "./imageSlider.css"
import { Flex, IconButton } from "@radix-ui/themes";

type Props = {
    images: Array<{
        title: string;
        imageinfo: Array<{
            url: string;
        }>
    }>
}

const ImageSlider = (props: Props) => {
    const { images } = props
    const sliderRef = useRef(null);
    const scrollAmount = 100;

    return (
        <Flex align={"center"}>
            <IconButton
                size={"1"}
                variant="soft"
                onClick={() => {
                    const container = sliderRef.current;
                    container.scrollLeft -= scrollAmount;
                }}
            >
                <ChevronLeftIcon />
            </IconButton>
            <Flex className="img-slider-container" ref={sliderRef} gap={"2"} >
                {images.map((img, i) => {
                    return (
                        <img
                            className="sliderImage"
                            alt={img?.title}
                            key={i}
                            src={img?.imageinfo?.[0].url}
                        />
                    );
                })}
            </Flex>
            <IconButton
                size={"1"}
                variant="soft"
                onClick={() => {
                    const container = sliderRef.current;
                    container.scrollLeft += scrollAmount;
                }}
            >
                <ChevronRightIcon />
            </IconButton>
        </Flex>
    )
}

export default ImageSlider