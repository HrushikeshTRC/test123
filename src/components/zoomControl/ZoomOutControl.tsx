import { Button, IconButton } from "@radix-ui/themes";
import { view } from "../../constants";
import { MinusIcon } from "@radix-ui/react-icons";

const ZoomOutControl = () => {

    const handleZoomOut = () => {
        const currentZoom = view.getZoom();
        view.animate({ zoom: currentZoom! - 1, duration: 200 })
    };

    return (
        <IconButton size="2" variant="surface" onClick={handleZoomOut}>
            <MinusIcon />
        </IconButton>
    )
}

export default ZoomOutControl