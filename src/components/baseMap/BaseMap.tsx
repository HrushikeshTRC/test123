import { Box, Card, Container, IconButton } from '@radix-ui/themes';
import { DEFAULT_BASEMAP, SATELLITE_BASEMAP } from '../../constants';
import defaultImg from "../../assets/img/default.png"
import satelliteImg from "../../assets/img/satellite.png"
import "./baseMap.css"

type Props = {
    activeBaseMap: string;
    handleBaseMap: (value: string) => void;
};

// style={{ background: "white", padding: "5px", height: "32px", borderRadius: "5px" }}
const BaseMap = (props: Props) => {
    const { activeBaseMap, handleBaseMap } = props;

    return (
        <Box className={`bm-container`}>
            <IconButton
                variant={DEFAULT_BASEMAP === activeBaseMap ? "solid" : "surface"}
                onClick={() => handleBaseMap(DEFAULT_BASEMAP)}
                size="2"
            >
                <img src={defaultImg} width={"26"} height={"26"} />
            </IconButton>
            <IconButton
                variant={SATELLITE_BASEMAP === activeBaseMap ? "solid" : "surface"}
                onClick={() => handleBaseMap(SATELLITE_BASEMAP)}
                size="2"
                style={{ marginLeft: "2px" }}
            >
                <img src={satelliteImg} width={"26"} height={"26"} />
            </IconButton>
        </Box>
    );
};

export default BaseMap;
