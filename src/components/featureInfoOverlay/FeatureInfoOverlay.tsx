import { FEATURE_INFO_OVERLAY_ID } from "../../constants"
import Overlay from "../../library/olReact/overlay/Overlay"
import { Coordinate } from 'ol/coordinate'
import "./featureInfoOverlay.css"
import { FeatureLike } from "ol/Feature"
import { Box, Text, IconButton } from '@radix-ui/themes';
import { Cross1Icon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { getImagesByTitles, getInformationByTitles } from "../../services"
import ImageSlider from "../imageSlider/ImageSlider"

type Props = {
    featureInfoPos: Coordinate | undefined;
    featureInfoData: FeatureLike | undefined;
    handleClose: () => void;
}

const FeatureInfoOverlay = (props: Props) => {
    const { featureInfoPos, featureInfoData, handleClose } = props
    const [data, setData] = useState<any>(null)
    const [imgData, setImgData] = useState<any>(null)

    useEffect(() => {
        setData(null)
        setImgData(null)
        if (featureInfoData) {
            const fetchInformation = async () => {
                try {
                    const res = await getInformationByTitles(featureInfoData?.get("name"))
                    setData(res?.query?.pages?.[0])
                } catch (error) {
                    console.log(error);
                }
            }

            const fetchImages = async () => {
                try {
                    const res = await getImagesByTitles(featureInfoData?.get("name"))
                    setImgData(res?.query?.pages)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchInformation()
            fetchImages()
        }
    }, [featureInfoData])

    console.log(imgData);


    return (
        <Overlay id={FEATURE_INFO_OVERLAY_ID} position={featureInfoPos}>
            {
                (featureInfoPos) ? (
                    <div className={`ol-popup ${featureInfoPos ? "active" : ""}`}>
                        <div className="popup-header">
                            <Text className="popup-title">{featureInfoData?.get("name")}</Text>
                            <IconButton size="1" variant="soft" onClick={handleClose} >
                                <Cross1Icon />
                            </IconButton>
                        </div>
                        <div className="popup-content">
                            <Box>
                                {imgData && <div style={{ marginBottom: "10px" }}><ImageSlider images={imgData} /></div>}
                                <Text as="div" size="2" color="gray">
                                    {data ? data.extract : null}
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