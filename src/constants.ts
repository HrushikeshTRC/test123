import { Map } from "ol";
import View, { FitOptions } from "ol/View";
import { defaults } from "ol/control";
import { fromLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style } from 'ol/style'

export const MAIN_LAYER_ID = 'trips'
export const CENTER = fromLonLat([78.9629, 20.5937])
export const MAX_ZOOM = 22
export const FEATURE_INFO_OVERLAY_ID = "featureInfoOverlay"
export const EXTENT_OPS: FitOptions = {
    padding: [100, 100, 100, 100],
    duration: 500,
    maxZoom: 8
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

export const view = new View({
    center: CENTER,
    zoom: 4.7,
    maxZoom: MAX_ZOOM,
    // minZoom: 4,
})

export const map = new Map({
    view,
    controls: defaults({ zoom: false })
});

export const DEFAULT_BASEMAP = "Default"
export const SATELLITE_BASEMAP = "Satellite"

export const SATELLITE_BASEMAP_URL = 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
