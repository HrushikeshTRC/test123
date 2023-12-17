import { FEATURE_INFO_OVERLAY_ID } from "../../constants"
import Overlay from "../../library/olReact/overlay/Overlay"
import { Coordinate } from 'ol/coordinate'
import "./featureInfoOverlay.css"
import { FeatureLike } from "ol/Feature"
import { Button, Card, Avatar, Flex, Box, Text } from '@radix-ui/themes';
import { Cross1Icon } from "@radix-ui/react-icons"

type Props = {
    featureInfoPos: Coordinate | undefined;
    featureInfoData: FeatureLike | undefined;
    handleClose: () => void;
}

const FeatureInfoOverlay = (props: Props) => {
    const { featureInfoPos, featureInfoData, handleClose } = props

    return (
        <Overlay id={FEATURE_INFO_OVERLAY_ID} position={featureInfoPos}>
            {
                (featureInfoPos) ? (
                    <div className={`ol-popup ${featureInfoPos ? "active" : ""}`}>
                        <div className="popup-header">
                            <Text className="popup-title">{featureInfoData?.get("name")}</Text>
                            <Button size="1" variant="soft" onClick={handleClose} >
                                <Cross1Icon />
                            </Button>
                        </div>
                        <div className="popup-content">
                            <Box>
                                <Text as="div" size="2" color="gray">
                                    {featureInfoData?.get("description")}
                                </Text>
                            </Box>
                        </div>
                    </div>
                ) : false
            }
        </Overlay>
    )
}

export default FeatureInfoOverlay