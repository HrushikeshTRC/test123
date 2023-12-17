import { FitOptions } from "ol/View";
import { fromLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style } from 'ol/style'

export const MAIN_LAYER_ID = 'trips'
export const CENTER = fromLonLat([78.9629, 20.5937])
export const MAX_ZOOM = 22
export const FEATURE_INFO_OVERLAY_ID = "featureInfoOverlay"
export const EXTENT_OPS: FitOptions = {
    padding: [100, 100, 100, 100],
    duration: 500,
    maxZoom: 15
}

export const POINT_STYLE = new Style({
    image: new Circle({
        radius: 8,
        fill: new Fill({ color: "rgba(255, 255, 255, 0.5)" }),
        stroke: new Stroke({
            color: "#2196f3",
            width: 2,
        }),
    })
})

export const SELECTED_POINT_STYLE = new Style({
    image: new Circle({
        radius: 7,
        fill: new Fill({ color: "rgba(33, 150, 243, 0.9)" }),
        stroke: new Stroke({
            color: "rgba(255, 255, 255, 0.9)",
            width: 2,
        }),
    })
})