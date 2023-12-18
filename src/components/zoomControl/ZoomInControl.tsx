import { Button, IconButton } from "@radix-ui/themes";
import { view } from "../../constants";
import { PlusIcon } from "@radix-ui/react-icons";

const ZoomInControl = () => {

    const handleZoomIn = () => {
        const currentZoom = view.getZoom();
        view.animate({ zoom: currentZoom! + 1, duration: 200 })
    };

    return (
        <IconButton size="2" variant="surface" onClick={handleZoomIn}>
            <PlusIcon />
        </IconButton>
    )
}

export default ZoomInControl