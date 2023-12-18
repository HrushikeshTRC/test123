import { useContext, useEffect, useState } from "react";
import { MapContext } from "../../library/olReact/MapProvider";
import { Card, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "./zoomLevelControl.css"

const ZoomLevelControl = () => {
    const map = useContext(MapContext);
    const [zoomLevel, setZoomLevel] = useState(0);

    useEffect(() => {
        if (!map) return;

        const view = map.getView();

        const updateZoomLevel = () => {
            const newZoom = view.getZoom();
            // eslint-disable-next-line eqeqeq
            if (newZoom && zoomLevel !== newZoom) {
                setZoomLevel(Math.round(newZoom));
            }
        };

        const key = view.on("change:resolution", updateZoomLevel);

        return () => {
            view.un("change:resolution", key.listener);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    return (
        <>
            <div className="zoomLevel">
                <MagnifyingGlassIcon width="23" height="23" color="grey" />
                <span
                    style={{ color: zoomLevel === 22 ? "red" : "black" }}
                    className="zoomText"
                >
                    <span>{zoomLevel}</span>
                </span>
            </div>
        </>
    );
};

export default ZoomLevelControl;
