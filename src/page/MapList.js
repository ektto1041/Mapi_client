/**
 *  지도 리스트를 출력해주는 화면
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import {CircularProgress, Switch, Typography} from "@mui/material";
import MapItem from "../component/common/MapItem";

const Background = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
}));

const Content = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
}));

const SwitchBox = styled(Box)(p => ({
    width: `100%`,
    height: `50px`,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
}));

const SwitchLabel = styled(Typography)(p => ({
    width: `auto`,
    height: `100%`,
    lineHeight: `50px`,
}));

const MapItemBox = styled(Box)(p => ({
    width: `100%`,
    height: `auto`,
    display: `flex`,
    flexDirection: `column`,
}));

const MapList = () => {
    return (
        <Background>
            <Box sx={{ height: dim.HEADER_HEIGHT }} />

            <Content>
                <SwitchBox>
                    <SwitchLabel>
                        내 지도만 보기
                    </SwitchLabel>

                    <Switch />

                    <SwitchLabel>
                        공개된 지도 보기
                    </SwitchLabel>
                </SwitchBox>

                <MapItemBox>
                    <MapItem />
                    <MapItem />
                    <MapItem />
                    <MapItem />
                    <CircularProgress sx={{ width: `100%`, height: `100%` }} />
                </MapItemBox>
            </Content>
        </Background>
    )
}

export default MapList;