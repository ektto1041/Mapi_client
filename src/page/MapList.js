/**
 *  지도 리스트를 출력해주는 화면
 */
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import dim from "../resource/Dimentions";
import {CircularProgress, Dialog, DialogTitle, Switch, TextField, Typography} from "@mui/material";
import MapItem from "../component/common/MapItem";
import {useCallback, useEffect, useState} from "react";
import {serverApis} from "../api/Api";
import Spin from "../component/common/Spin";
import {dev, dummy} from "../resource/dev";
import {Cookies, useCookies} from "react-cookie";
import NewMapDialog from "../component/common/NewMapDialog";
import {useNavigate} from "react-router-dom";
import path from "../resource/Path";

const Background = styled(Box)(p => ({
    width: `100%`,
    height: `100%`,
    display: `flex`,
    flexDirection: `column`,
}));

const Content = styled(Box)(p => ({
    width: `100%`,
    height: `calc(100% - 50px)`,
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
    height: `calc(100% - 50px)`,
    display: `flex`,
    flexDirection: `column`,
    overflowY: `auto`,
    overflowX: `hidden`,
}));

const MapList = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isAll, setIsAll] = useState(true);
    const [maps, setMaps] = useState([]);
    const [newMapDialogOpen, setNewMapDialogOpen] = useState(false);
    const [newMapName, setNewMapName] = useState('');
    const [isShare, setIsShare] = useState(false);

    const onShareChange = (e) => {
        setIsShare(e.target.checked);
    };

    useEffect(() => {
        setIsLoading(true);

        if(dev) {
            if(isAll) setMaps(dummy.maps);
            else setMaps(dummy.maps.filter(item => item.userName === '박상연'));

            setIsLoading(false);
        } else {
            if(isAll) {
                serverApis.getAllMap()
                    .then(r => {
                        setMaps(r.data);

                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                const userId = new Cookies().get('userId');

                serverApis.getAllMapByUser(userId)
                    .then(r => {
                        setMaps(r.data);

                        console.log(r.data);

                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }

    }, [isAll]);

    const onSwitchChange = useCallback((e) => {
        setIsAll(e.target.checked);
        console.log(e.target.checked);
    }, []);

    const onDialogOpen = () => {
        console.log("open")
        setNewMapDialogOpen(true);
    };

    const onDialogClose = () => {
        setNewMapDialogOpen(false);
    };

    const onNewMapNameChange = (e) => {
        setNewMapName(e.target.value);
    };

    const onNewMapClick = useCallback(() => {
        const mapDto = {
            name: newMapName,
            share: isShare
        }

        console.log(newMapName);

        serverApis.addMap(mapDto)
            .then(r => {
                // TODO: 새 맵 추가 성공 시
                console.log(r.data);
                navigate(0);
            })
            .catch(e => console.log(e));
    }, [newMapName, isShare]);


    return (
        <Background>
            <Box sx={{ height: dim.headerHeight }} />

            <Content>
                {isLoading ? (
                    <Spin />
                ) : (
                    <>
                        <SwitchBox>
                            <SwitchLabel>
                                내 지도만 보기
                            </SwitchLabel>

                            <Switch checked={isAll} onChange={onSwitchChange} />

                            <SwitchLabel>
                                공개된 지도 보기
                            </SwitchLabel>
                        </SwitchBox>

                        <MapItemBox>
                            {maps.map(item => (
                                <MapItem key={item.idmap} mapId={item.idmap} userName={item.user_name} mapName={item.map_name}/>
                            ))}
                            <MapItem type='add' onDialogOpen={onDialogOpen} />
                        </MapItemBox>

                        {/*  새 지도 다이얼로그  */}
                        <Dialog open={newMapDialogOpen} onClose={onDialogClose}>
                            <DialogTitle>새 지도 생성</DialogTitle>
                            <NewMapDialog newMapName={newMapName} isShare={isShare} onNewMapNameChange={onNewMapNameChange} onShareChange={onShareChange} onNewMapClick={onNewMapClick} />
                        </Dialog>
                    </>
                )}

            </Content>
        </Background>
    )
}

export default MapList;