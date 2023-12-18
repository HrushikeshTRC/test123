import { useEffect, useState } from 'react'
import { unByKey } from 'ol/Observable'
import OlMap from '../../library/olReact/map/OlMap'
import MapProvider from '../../library/olReact/MapProvider'
import { Layers, TileLayer, VectorLayer } from '../../library/olReact/layers'
import { osm, vector, xyz } from '../../library/olReact/source'
import GeoJSON from 'ol/format/GeoJSON';
import { MapBrowserEvent, Feature } from 'ol'
import { CENTER, DEFAULT_BASEMAP, EXTENT_OPS, MAIN_LAYER_ID, POINT_STYLE, SATELLITE_BASEMAP, SATELLITE_BASEMAP_URL, SELECTED_POINT_STYLE, map } from '../../constants'
import FeatureInfoOverlay from '../featureInfoOverlay/FeatureInfoOverlay'
import { Coordinate } from 'ol/coordinate'
import { Geometry } from 'ol/geom'
import Select from '../../library/olReact/interactions/Select'
import olSelect, { SelectEvent } from 'ol/interaction/Select'
import { Controls } from '../../library/olReact/controls'
import CustomControl from '../../library/olReact/controls/customControl/CustomControl'
import ZoomLayerControl from '../zoomLayerControl/ZoomLayerControl'
import BaseMapControl from '../baseMap/BaseMapControl'
import BaseMap from '../baseMap/BaseMap'
import "./trips.css"
import ZoomInControl from '../zoomControl/ZoomInControl'
import ZoomOutControl from '../zoomControl/ZoomOutControl'
import ZoomLevelControl from '../zoomLevelControl/ZoomLevelControl'

const Trips = () => {
    const [featureInfoPos, setFeatureInfoPos] = useState<Coordinate>();
    const [featureInfoData, setFeatureInfoData] = useState<Feature<Geometry>>();
    const [selectInteraction] = useState<olSelect>(new olSelect({ style: SELECTED_POINT_STYLE }))
    const [tripSource] = useState(vector({
        url: "http://localhost:8080/geoserver/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne:trips&outputFormat=application/json",
        format: new GeoJSON(),
    }))
    const [showTileBar, setShowTileBar] = useState(false)
    const [activeBaseMap, setActiveBaseMap] = useState(DEFAULT_BASEMAP);

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
                                visible={activeBaseMap === DEFAULT_BASEMAP}
                            />
                            <TileLayer
                                initialSource={xyz({
                                    url: SATELLITE_BASEMAP_URL,
                                    maxZoom: 23,
                                })}
                                visible={activeBaseMap === SATELLITE_BASEMAP}
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
                                    <ZoomInControl />
                                }
                                controlPosition={{ top: "1rem", left: "0.5rem" }}
                            />
                            <CustomControl
                                control={
                                    <ZoomOutControl />
                                }
                                controlPosition={{ top: "3.2rem", left: "0.5rem" }}
                            />
                            <CustomControl
                                control={
                                    <ZoomLayerControl handleZoomLayer={handleZoomLayerControl} />
                                }
                                controlPosition={{ top: "6rem", left: "0.5rem" }}
                            />
                            <CustomControl
                                control={
                                    <BaseMapControl
                                        showTileBar={showTileBar}
                                        handleTilebarControl={(value) => setShowTileBar(value)}
                                    />
                                }
                                controlContent={
                                    <BaseMap
                                        activeBaseMap={activeBaseMap}
                                        handleBaseMap={(value) => setActiveBaseMap(value)}
                                    />
                                }
                                controlPosition={{ bottom: "1rem", left: "0.5rem" }}
                                controlContentPosition={{ bottom: "0.95rem", left: "2.6rem" }}
                                showContent={showTileBar}
                            />
                            <CustomControl
                                control={<ZoomLevelControl />}
                                controlPosition={{ bottom: "-0.6rem", right: "11.8rem" }}
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