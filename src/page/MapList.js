/**
 *  지도 리스트를 출력해주는 화면
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import {CircularProgress, Switch, Typography} from "@mui/material";
import MapItem from "../component/common/MapItem";
import {useEffect, useState} from "react";
import {serverApis} from "../api/Api";
import Spin from "../component/common/Spin";

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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        serverApis.getAllMap()
            .then(r => {
                // r.data = 배열
                r.data.forEach(item => console.log(item));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
                setIsLoading(false);
            });
    }, []);

    return (
        <Background>
            <Box sx={{ height: dim.HEADER_HEIGHT }} />

            <Content>
                {isLoading ? (
                    <Spin />
                ) : (
                    <>
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
                        </MapItemBox>
                    </>
                )}

            </Content>
        </Background>
    )
}

export default MapList;