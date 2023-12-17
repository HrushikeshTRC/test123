import { useEffect, useState } from 'react'
import { unByKey } from 'ol/Observable'
import OlMap from '../../library/olReact/map/OlMap'
import MapProvider from '../../library/olReact/MapProvider'
import { Layers, TileLayer, VectorLayer } from '../../library/olReact/layers'
import { osm, vector } from '../../library/olReact/source'
import GeoJSON from 'ol/format/GeoJSON';
import { Map, View, MapBrowserEvent, Feature } from 'ol'
import { CENTER, EXTENT_OPS, MAIN_LAYER_ID, MAX_ZOOM, POINT_STYLE, SELECTED_POINT_STYLE } from '../../constants'
import FeatureInfoOverlay from '../featureInfoOverlay/FeatureInfoOverlay'
import { Coordinate } from 'ol/coordinate'
import { Geometry } from 'ol/geom'
import Select from '../../library/olReact/interactions/Select'
import olSelect, { SelectEvent } from 'ol/interaction/Select'
import { Controls } from '../../library/olReact/controls'
import CustomControl from '../../library/olReact/controls/customControl/CustomControl'
import ZoomLayerControl from '../zoomLayerControl/ZoomLayerControl'

const map = new Map({
    view: new View({
        center: CENTER,
        zoom: 4.7,
        maxZoom: MAX_ZOOM,
        // minZoom: 4,
    }),
});

const Trips = () => {
    const [featureInfoPos, setFeatureInfoPos] = useState<Coordinate>();
    const [featureInfoData, setFeatureInfoData] = useState<Feature<Geometry>>();
    const [selectInteraction] = useState<olSelect>(new olSelect({ style: SELECTED_POINT_STYLE }))
    const [tripSource] = useState(vector({
        url: "http://localhost:8080/geoserver/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:trips&outputFormat=application/json",
        format: new GeoJSON(),
    }))

    // useEffect(() => {
    //     const key = map.on('pointermove', function (e) {
    //         map.forEachFeatureAtPixel(e.pixel, function (f) {
    //             f.setStyle(new Style({
    //                 image: new Circle({
    //                     radius: 6,
    //                     fill: new Fill({ color: "white" }),
    //                     stroke: new Stroke({
    //                         color: "#2196f3",
    //                         width: 4,
    //                     }),
    //                 })
    //             }));
    //             return true;
    //         });

    //         const vectorLayer = map.getAllLayers()[1];
    //         vectorLayer.getSource()!.getFeatures().forEach((f) => {
    //             if (!map.hasFeatureAtPixel(e.pixel, { layerFilter: (l) => l.get("id") === MAIN_LAYER_ID })) {
    //                 f.setStyle(pointStyle);
    //             }
    //         });
    //     });
    //     return () => {
    //         unByKey(key)
    //     }
    // }, [])

    function onSingleClick(e: MapBrowserEvent<any>) {
        const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature)
        if (feature) {
            const coordinates = feature.getGeometry()!.getCoordinates();
            setFeatureInfoPos(coordinates)
            setFeatureInfoData(feature)
        } else {
            setFeatureInfoPos(undefined)
            setFeatureInfoData(undefined)
        }
    }

    function handleCloseFeatureInfoOverlay() {
        setFeatureInfoPos(undefined);
        selectInteraction.getFeatures().clear();
    }

    function onFeatureSelect(e: SelectEvent) {
        const selectedFeature = e.selected[0];
        const extent = selectedFeature.getGeometry().getExtent();
        map.getView().fit(extent, EXTENT_OPS);
    }

    function handleZoomLayerControl() {
        const extent = tripSource.getExtent()
        map.getView().fit(extent, EXTENT_OPS);
    }

    return (
        <>
            <div style={{ width: "100vw" }}>
                <MapProvider map={map}>
                    <OlMap
                        zoom={5}
                        center={CENTER}
                        height={"100vh"}
                        onSingleClick={onSingleClick}
                    >
                        <Layers>
                            <TileLayer
                                initialSource={osm()}
                            />
                            <VectorLayer
                                style={POINT_STYLE}
                                source={tripSource}
                                properties={{ id: MAIN_LAYER_ID }}
                            />
                            <Select interaction={selectInteraction} onFeatureSelect={onFeatureSelect} />
                        </Layers>
                        <Controls>
                            <CustomControl
                                control={
                                    <ZoomLayerControl handleZoomLayer={handleZoomLayerControl} />
                                }
                                controlPosition={{ top: "9rem", left: "0.5rem" }}
                            />
                        </Controls>
                    </OlMap>
                    <FeatureInfoOverlay
                        featureInfoPos={featureInfoPos}
                        featureInfoData={featureInfoData}
                        handleClose={handleCloseFeatureInfoOverlay}
                    />
                </MapProvider>
            </div>
        </>
    )
}

export default Trips