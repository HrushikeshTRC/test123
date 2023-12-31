import { useEffect, useContext } from "react";
import { FullScreen } from "ol/control";
import { MapContext } from "../MapProvider";

const FullScreenControl = () => {
    const map = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        let fullScreenControl = new FullScreen({});

        map.addControl(fullScreenControl);

        return () => {
            map.removeControl(fullScreenControl)
        }
    }, [map]);

    return null;
};

export default FullScreenControl;