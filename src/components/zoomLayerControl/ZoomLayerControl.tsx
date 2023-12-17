import { Button } from '@radix-ui/themes';
import { SymbolIcon } from "@radix-ui/react-icons"

type Props = {
    handleZoomLayer: () => void;
};

const ZoomLayerControl = (props: Props) => {
    const { handleZoomLayer } = props;

    return (
        <>
            <Button
                title={"Zoom to Layer"}
                className="btn-sm btn-icon toolbar-control"
                onClick={handleZoomLayer}
                style={{ top: "-26px" }}
            >
                <SymbolIcon />
            </Button>
        </>
    );
};

export default ZoomLayerControl;
