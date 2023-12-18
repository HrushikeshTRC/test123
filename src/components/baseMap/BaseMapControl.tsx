
import { IconButton } from '@radix-ui/themes';
import { StackIcon } from "@radix-ui/react-icons"

type Props = {
    showTileBar: boolean;
    handleTilebarControl: (value: boolean) => void;
};

const BaseMapControl = (props: Props) => {
    const { showTileBar, handleTilebarControl } = props;

    return (
        <>
            <IconButton
                title={"Map Tiles"}
                variant="surface"
                onClick={() => handleTilebarControl(!showTileBar)}
                size="2"
            >
                <StackIcon />
            </IconButton>
        </>
    );
};

export default BaseMapControl;
