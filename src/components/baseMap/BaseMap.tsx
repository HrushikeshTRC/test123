import { Button } from '@radix-ui/themes';
import { DEFAULT_BASEMAP, SATELLITE_BASEMAP } from '../../constants';

type Props = {
    activeBaseMap: string;
    handleBaseMap: (value: string) => void;
};

const baseMaps = [DEFAULT_BASEMAP, SATELLITE_BASEMAP];

const BaseMap = (props: Props) => {
    const { activeBaseMap, handleBaseMap } = props;
    return (
        <>
            {baseMaps.map((item) => {
                return (
                    <Button
                        variant={item === activeBaseMap ? "solid" : "surface"}
                        onClick={() => handleBaseMap(item)}
                        size="2"
                    >
                        {item}
                    </Button>
                );
            })}
        </>
    );
};

export default BaseMap;
