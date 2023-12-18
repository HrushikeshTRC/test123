import { Button, IconButton } from '@radix-ui/themes';
import { SymbolIcon } from "@radix-ui/react-icons"

type Props = {
    handleZoomLayer: () => void;
};

const ZoomLayerControl = (props: Props) => {
    const { handleZoomLayer } = props;

    return (
        <>
            <IconButton
                onClick={handleZoomLayer}
                variant='surface'
                size="2"
            >
                <SymbolIcon />
            </IconButton>
        </>
    );
};

export default ZoomLayerControl;
