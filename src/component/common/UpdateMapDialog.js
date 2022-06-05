import {Switch, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {styled} from "@mui/system";
import {useEffect, useState} from "react";
import {serverApis} from "../../api/Api";
import {useNavigate} from "react-router-dom";

/**
 *  지도를 업데이트하는 다이얼로그의 내부
 */
const UpdateMapDialog = ({ item: { mapName, mapId, share }}) => {
    const navigate = useNavigate();

    const [mapNameInput, setMapNameInput] = useState(mapName);
    const [isShare, setIsShare] = useState(Boolean(share));

    const onMapNameChange = (e) => {
        setMapNameInput(e.target.value);
    };

    const onShareChange = (e) => {
        setIsShare(e.target.checked);
    };

    const onUpdateClick = () => {
        const mapUpdateDto = {
            mapId,
            name: mapNameInput,
            share: isShare,
        };

        serverApis.updateMap(mapUpdateDto)
            .then(r => {
                navigate(0);
            })
            .catch(e => console.log(e));
    };

    return (
        <Container>
            <TextField
                value={mapNameInput}
                onChange={onMapNameChange}
                sx={{width: `100%`}}
                placeholder={'새 지도 이름'}
            />
            <ItemBox>
                <Box
                    sx={{
                        display: `flex`,
                        flexDirection: `row`
                    }}
                >
                    <Switch checked={isShare} onChange={onShareChange} />
                    <Typography lineHeight='40px'>
                        공개
                    </Typography>
                </Box>

                <Button
                    variant={`contained`}
                    sx={{
                        width: `20%`,
                    }}
                    onClick={onUpdateClick}
                >
                    수정
                </Button>
            </ItemBox>

        </Container>
    );
};

const Container = styled(Box)(p => ({
    width: `300px`,
    height: `auto`,
    padding: `10px`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `end`,
}));

const ItemBox = styled(Box)(p => ({
    width: `100%`,
    marginTop: `10px`,
    display: `flex`,
    justifyContent: `space-between`,
}));

export default UpdateMapDialog;